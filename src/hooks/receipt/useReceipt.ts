import {useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  ReceiptPayingType,
  TBuyerInfo,
  TReceiptChangeQuantity,
  TReceiptPaying,
  TRefundProps,
} from 'src/store/Receipt/d';
import {
  _actionReceiptAddDiscount,
  _actionReceiptAddItem,
  _actionReceiptAddPaying,
  _actionReceiptChangeQuantity,
  _actionReceiptClearDiscount,
  _actionReceiptNeedChangeDiscount,
  _actionReceiptNeedChangeQty,
  _actionReceiptRemoveItem,
  _actionReceiptRemovePaying,
  _actionReceiptResetPaying,
  _actionReceiptResetRefund,
  _actionReceiptResetState,
  _actionReceiptSetBuyer,
  _actionReceiptSetInvoiceType,
  _actionReceiptSetRefundProps,
  _actionReceiptSetTransactionType,
} from 'src/store/Receipt/action';
import * as ArticleTable from 'src/database/Article';
import {
  _selectorReceipt,
  _selectorReceiptItems,
  _selectorReceiptPaying,
} from '../../store/Receipt/helpers';
import {_selectorFiscalGetVats} from '../../store/Fiscal/helpers';
import {__divide, __multiply, __round, __subtract} from '../../util/lodash';
import {
  _actionClientRemove,
  _actionClientSetSelected,
} from 'src/store/Client/action';
import {TClient} from 'src/store/Client/d';
import useLPFRFunctions from 'src/hooks/useLPFR/useLPFRFunctions';
import {
  TAuditRequest,
  TInvoiceResponse,
  TInvoiceType,
  TTransactionType,
} from 'src/store/lpfr/d';
import {_selectorApplicationUser} from 'src/store/Application/helpers';
import DailyReport from 'src/database/DailyReport';
import {TEST_SIMULATOR} from 'src/config';
import {usePrinter} from 'src/hooks/printer/usePrinter';
import {useProgress} from 'src/hooks/progress/useProgress';
import {Translate} from 'src/translate/data';
import {calculateItemPrice} from 'src/screens/receipt/utils';
import {ArticleMeasureValues} from 'src/constants/Article';
import {useError} from 'src/hooks/error/useErrors';
import {processError} from 'src/util/error';
import {TInvoiceRequestItems} from 'src/printer/d';

export const useReceipt = () => {
  const {sendInvoices} = useLPFRFunctions();
  const {printReceipt} = usePrinter();
  const user = useSelector(_selectorApplicationUser);
  const payments = useSelector(_selectorReceiptPaying);
  const items = useSelector(_selectorReceiptItems);
  const vats = useSelector(_selectorFiscalGetVats);
  const receipt = useSelector(_selectorReceipt) || {};
  const {setProgress, resetProgress} = useProgress();

  const {refundProps, transactionType, invoiceType, advanceProps, buyer} =
    receipt;

  const getVat = useCallback(
    (label: string) => {
      return vats.find(v => v.label === label);
    },
    [vats],
  );

  const dispatch = useDispatch();

  const addItem = useCallback(
    (articleId: number, quantity = 1) => {
      ArticleTable.getById(articleId).then(v => {
        if (v && v.id) {
          dispatch(
            _actionReceiptAddItem({
              quantity,
              article: v,
            }),
          );
        }
      });
    },
    [dispatch],
  );

  const needChangeQty = useCallback(
    (guid: string) => {
      dispatch(_actionReceiptNeedChangeQty(guid));
    },
    [dispatch],
  );

  const removeItem = useCallback(
    (ind: number) => {
      dispatch(_actionReceiptRemoveItem(ind));
    },
    [dispatch],
  );

  const addPayment = useCallback(
    (paying: TReceiptPaying) => {
      dispatch(_actionReceiptAddPaying(paying));
    },
    [dispatch],
  );

  const removePayment = useCallback(
    (type: ReceiptPayingType) => {
      dispatch(_actionReceiptRemovePaying(type));
    },
    [dispatch],
  );

  const changeQuantity = useCallback(
    (receiptQty: TReceiptChangeQuantity) => {
      dispatch(_actionReceiptChangeQuantity(receiptQty));
    },
    [dispatch],
  );

  const setBuyer = useCallback(
    (buyer: Partial<TBuyerInfo>) => {
      dispatch(_actionReceiptSetBuyer(buyer));
    },
    [dispatch],
  );

  const setInvoiceType = useCallback(
    (type: TInvoiceType | undefined) => {
      dispatch(_actionReceiptSetInvoiceType(type));
    },
    [dispatch],
  );

  const setTransactionType = useCallback(
    (transaction: TTransactionType) => {
      dispatch(_actionReceiptSetTransactionType(transaction));
    },
    [dispatch],
  );

  const resetState = useCallback(() => {
    dispatch(_actionReceiptResetState());
    dispatch(_actionClientRemove());
  }, [dispatch]);

  const refundSetProps = useCallback(
    (data: TRefundProps) => {
      dispatch(_actionReceiptSetRefundProps(data));
    },
    [dispatch],
  );

  const addReceiptMissingJournalData = (
    receipt: TAuditRequest & TInvoiceResponse,
  ) => {
    console.log(receipt);
  };

  const finishReceipt = useCallback(async () => {
    setProgress(Translate.TR_FINISH_RECEIPT_LOADING_TEXT);
    try {
      const Items = items.map(item => ({
        name: `${item.article.description.substring(0, 32)}${
          ArticleMeasureValues.find(x => x.value === `${item.article.mes}`)
            ?.label || ''
        }`,
        quantity: item.quantity,
        unitPrice: __round(item.article.price, 2),
        labels: ['vat', 'vat1', 'vat2', 'vat3']
          .map(x => (item.article as any)?.[x] || null)
          .filter(x => x !== 'null' && !!x),
        totalAmount: __round(
          __multiply(calculateItemPrice(item), item.quantity),
          2,
        ),
      }));

      const Payment = payments.map(payment => ({
        amount: payment.value,
        paymentType: payment.type,
      }));

      const data = Object.assign(
        {
          invoiceType,
          transactionType,
          items: Items,
          payment: Payment,
          cashier: user?.id,
        },
        refundProps?.referentReceipt
          ? {referentDocumentNumber: refundProps?.referentReceipt}
          : {},
        refundProps?.dateTime ? {referentDocumentDT: refundProps.dateTime} : {},
        advanceProps?.advanceReceipt
          ? {referentDocumentNumber: advanceProps?.advanceReceipt}
          : {},
        buyer?.buyerInfoBasic && buyer?.buyerInfoBasic?.type
          ? {
              buyerId: `${buyer.buyerInfoBasic.type}:${buyer.buyerInfoBasic.value}`,
            }
          : {},

        buyer?.buyerInfoAdditional && buyer?.buyerInfoAdditional?.type
          ? {
              buyerCostCenterId: `${buyer.buyerInfoAdditional.type}:${buyer.buyerInfoAdditional.value}`,
            }
          : {},
      );

      console.log(data);
      let result;
      try {
        result = await sendInvoices(data);
        console.log(result);
      } catch (e) {
        processError({
          error: e,
          isLPFR: true,
        });
      }
      /** this is only for test */
      //const {data, result} = await import('../receipt/test.json');

      try {
        await DailyReport.insertReceipt(
          new Date(),
          {
            ...data,
            ...result,
          },
          user?.id as number,
        );
      } catch (e) {
        console.log(e);
      }

      /**
       *  Treba dodati na stampi ESIR broj ( Verzija software-a esira )
       *  Iznad ESIR Vreme
       */

      if (!TEST_SIMULATOR) {
        await printReceipt(result);
      }
      resetState();
    } catch (e) {
      /** console.log( e ) */
      console.log(e);
    } finally {
      resetProgress();
    }
  }, [
    user,
    invoiceType,
    transactionType,
    advanceProps,
    buyer,
    refundProps,
    setProgress,
    resetProgress,
    sendInvoices,
    items,
    payments,
    resetState,
    printReceipt,
  ]);

  const isNeedRefundPropsDialog = useMemo(() => {
    if (
      transactionType === TTransactionType.Refund ||
      invoiceType === TInvoiceType.Advance ||
      invoiceType === TInvoiceType.Proforma
    ) {
      return !refundProps?.referentReceipt || !refundProps?.dateTime;
    }
    return false;
  }, [transactionType, invoiceType, refundProps]);

  const resetRefund = useCallback(() => {
    dispatch(_actionReceiptResetRefund());
  }, [dispatch]);

  const setClient = useCallback(
    (client: TClient) => {
      dispatch(_actionClientSetSelected(client));
    },
    [dispatch],
  );

  const removeClient = useCallback(
    () => dispatch(_actionClientRemove()),
    [dispatch],
  );

  const resetPaying = useCallback(
    () => dispatch(_actionReceiptResetPaying()),
    [dispatch],
  );

  const needChangeDiscount = useCallback(
    (guid: string) => dispatch(_actionReceiptNeedChangeDiscount(guid)),
    [dispatch],
  );

  const addDiscount = useCallback(
    (guid: string, discount: number) => {
      dispatch(_actionReceiptAddDiscount(guid, discount));
    },
    [dispatch],
  );

  const clearDiscount = useCallback(
    (guid: string) => {
      dispatch(_actionReceiptClearDiscount(guid));
    },
    [dispatch],
  );

  const data = useMemo(
    () => ({
      clearDiscount,
      addItem,
      removeItem,
      addPayment,
      removePayment,
      changeQuantity,
      setBuyer,
      resetState,
      needChangeQty,
      finishReceipt,
      isNeedRefundPropsDialog,
      refundSetProps,
      resetRefund,
      setClient,
      resetPaying,
      removeClient,
      setInvoiceType,
      setTransactionType,
      needChangeDiscount,
      addDiscount,
    }),
    [
      clearDiscount,
      addDiscount,
      addItem,
      removeItem,
      addPayment,
      removePayment,
      changeQuantity,
      setBuyer,
      resetState,
      needChangeQty,
      finishReceipt,
      isNeedRefundPropsDialog,
      refundSetProps,
      resetRefund,
      setClient,
      resetPaying,
      removeClient,
      setInvoiceType,
      setTransactionType,
      needChangeDiscount,
    ],
  );

  return data;
};
