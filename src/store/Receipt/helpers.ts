import {createSelector} from 'reselect';
import {TReduxState} from 'src/store/d';
import {
  TAdvanceProps,
  TBuyerInfoData,
  TReceiptState,
} from 'src/store/Receipt/d';
import {__add, __multiply, __round, __subtract} from 'src/util/lodash';
import {TInvoiceType, TTransactionType} from 'src/store/lpfr/d';
import {
  InvoiceTypeValues,
  TransactionTypeValues,
} from 'src/constants/ReceiptTypes';
import {calculateItemPrice} from 'src/screens/receipt/utils';
import {toNumberFixed} from 'src/util/utils';

export const _selectorReceipt = createSelector(
  (state: TReduxState): TReceiptState => state.receipt,
  receipt => receipt,
);

export const _selectorReceiptItems = createSelector(
  (state: TReduxState): TReceiptState => state.receipt,
  receipt => receipt.items,
);

export const _selectorReceiptNumberItems = createSelector(
  (state: TReduxState): TReceiptState => state.receipt,
  receipt => receipt.items.length,
);

export const _selectorReceiptPaying = createSelector(
  (state: TReduxState): TReceiptState => state.receipt,
  receipt => receipt.paying,
);

export const _selectorReceiptTotalByReceipt = createSelector(
  (state: TReduxState): TReceiptState => state.receipt,
  receipt =>
    __round(
      receipt.items.reduce((acc, x) => {
        return __add(acc, __multiply(x.quantity, calculateItemPrice(x)));
      }, 0),
      2,
    ),
);

export const _selectorReceiptIsAdvance = createSelector(
  (state: TReduxState): TReceiptState => state.receipt,
  receipt => {
    const {transactionType, invoiceType, advanceProps} = receipt;
    if (
      transactionType === TTransactionType.Sale &&
      invoiceType === TInvoiceType.Normal &&
      advanceProps &&
      advanceProps?.advanceReceipt &&
      advanceProps?.advanceFinance
    ) {
      return true;
    }
    return false;
  },
);

export const _selectorReceiptTotalPayed = createSelector(
  (state: TReduxState) => state.receipt.paying,
  paying =>
    __round(
      paying.reduce((acc, x) => __add(acc, x.value), 0),
      2,
    ),
);

export const _selectorReceiptCanFinish = createSelector(
  (state: TReduxState) => state.receipt.items,
  items => items?.length,
);

export const _selectorReceiptNeedToPay = createSelector(
  (state: TReduxState) => state.receipt,
  receipt =>
    (() => {
      const {advanceProps, transactionType, invoiceType} = receipt;
      let totalToPay = __round(
        receipt.items.reduce((acc, x) => {
          return __add(acc, __multiply(x.quantity, calculateItemPrice(x)));
        }, 0),
        2,
      );
      const totalPayed = __round(
        receipt.paying.reduce((acc, x) => __add(acc, x.value), 0),
        2,
      );
      if (
        transactionType === TTransactionType.Sale &&
        invoiceType === TInvoiceType.Normal &&
        advanceProps &&
        advanceProps?.advanceReceipt &&
        advanceProps?.advanceFinance
      ) {
        totalToPay = __round(
          __subtract(totalToPay, toNumberFixed(advanceProps.advanceFinance)),
          2,
        );
      }
      const value = __round(__subtract(totalToPay, totalPayed), 2);
      return value >= 0 ? value : 0;
    })(),
);

export const _selectorReceiptGetLastAction = createSelector(
  (state: TReduxState) => state.receipt,
  receipt => receipt.lastAction || {guid: ''},
);

export const _selectorReceiptNeedChangeQty = createSelector(
  (state: TReduxState) => state.receipt,
  receipt => receipt.needChangeQty,
);

export const _selectorReceiptNeedChangeDiscount = createSelector(
  (state: TReduxState) => state.receipt,
  receipt => receipt.needChangeDiscount,
);

export const _selectorReceiptGetItemByGuid = (guid: string) =>
  createSelector(
    (state: TReduxState) => state.receipt,
    receipt => receipt.items.find(i => i.guid === guid),
  );

export const _selectorReceiptGetRefundProps = createSelector(
  (state: TReduxState) => state.receipt,
  receipt => receipt.refundProps,
);

export const _selectorReceiptBuyer = createSelector(
  (state: TReduxState) => state.receipt,
  receipt => receipt.buyer?.buyerInfoBasic as TBuyerInfoData,
);

export const _selectorReceiptBuyerOptional = createSelector(
  (state: TReduxState) => state.receipt,
  receipt => receipt.buyer?.buyerInfoAdditional as TBuyerInfoData,
);

export const _selectorReceiptAdvanceOption = createSelector(
  (state: TReduxState) => state.receipt,
  receipt => receipt.advanceProps as TAdvanceProps,
);

export const _selectorReceiptInvoiceType = createSelector(
  (state: TReduxState) => state.receipt,
  receipt => receipt.invoiceType as TInvoiceType,
);

export const _selectorReceiptTransactionType = createSelector(
  (state: TReduxState) => state.receipt,
  receipt => receipt.transactionType as TTransactionType,
);

export const _selectorInvoiceTypeString = createSelector(
  (state: TReduxState): TInvoiceType => state.receipt.invoiceType,
  invoiceType =>
    InvoiceTypeValues.find(t => t.value === invoiceType)?.label || '',
);

export const _selectorTransactionTypeString = createSelector(
  (state: TReduxState): TTransactionType => state.receipt.transactionType,
  transactionType =>
    TransactionTypeValues.find(t => t.value === transactionType)?.label || '',
);

export const _selectorReceiptTypeString = createSelector(
  (state: TReduxState): TReceiptState => state.receipt,
  receipt =>
    `${
      InvoiceTypeValues.find(t => t.value === receipt.invoiceType)?.label || ''
    } - ${
      TransactionTypeValues.find(t => t.value === receipt.transactionType)
        ?.label || ''
    }`,
);

export const _selectorReceiptCanPay = createSelector(
  (state: TReduxState): TReceiptState => state.receipt,
  receipt => {
    const {transactionType, invoiceType, refundProps, buyer} = receipt;
    if (
      (transactionType === TTransactionType.Refund ||
        invoiceType === TInvoiceType.Copy) &&
      (!refundProps || !refundProps?.referentReceipt || !refundProps?.dateTime)
    ) {
      return false;
    }

    if (
      invoiceType === TInvoiceType.Advance &&
      transactionType === TTransactionType.Sale &&
      (!buyer || !buyer?.buyerInfoBasic?.value)
    ) {
      return false;
    }
    return true;
  },
);
