import React, {useCallback, useContext, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {View} from 'react-native';
import {_selectorFiscalGetPayments} from '../../store/Fiscal/helpers';
import PayingType from './payingType';
import {
  _selectorReceipt,
  _selectorReceiptNeedToPay,
  _selectorReceiptPaying,
  _selectorReceiptTransactionType,
} from '../../store/Receipt/helpers';
import SwipeList from '../../components/swipeList';
import PayingTypeAction from './payingType/PayingTypeAction';
import style from './style';
import {ReceiptPayingType} from 'src/store/Receipt/d';
import {Translate} from 'src/translate/data';
import Button from 'src/components/button';
import {PayingContext} from 'src/screens/receiptPaying/context';
import {useReceipt} from 'src/hooks/receipt/useReceipt';
import {toNumberFixed} from 'src/util/utils';
import HwtPopover from 'src/components/popover';
import ReceiptPaymentsPopover from 'src/screens/receiptPaying/payingType/ReceiptPaymentsPopover';
import {ButtonFill} from 'src/components/button/d';
import {Colors} from 'src/constants/Colors';
import {
  iconFontAwesomeArrowDown,
  iconFontAwesomeMoneyBill,
  iconFontAwesomeMoneyCheckAlt,
  iconReceipt,
} from 'src/icon';
import {TTransactionType} from 'src/store/lpfr/d';

const PayingByType = () => {
  const {canFinish} = useContext(PayingContext);
  const payments = useSelector(_selectorFiscalGetPayments);
  const receiptPaying = useSelector(_selectorReceiptPaying);

  const receiptPayments = useMemo(() => {
    return receiptPaying.map(p => ({
      ...p,
      label: payments.find(x => x.type === p.type)?.label || '',
    }));
  }, [receiptPaying, payments]);

  return (
    <View style={style.paymentsRoot}>
      <SwipeList
        data={receiptPayments}
        renderItemComponent={PayingType}
        renderHiddenItemComponent={PayingTypeAction}
        disableRightSwipe
        emptyProps={{
          emptyTitle: Translate.TR_RECEIPT_NO_PAYMENTS,
          emptyIcon: iconReceipt,
        }}
      />
      {!canFinish && <PaymentsButtons />}
    </View>
  );
};

export default PayingByType;

export const PaymentsButtons = () => {
  const payments = useSelector(_selectorFiscalGetPayments);
  const isNeedToPay = useSelector(_selectorReceiptNeedToPay);
  const transactionType = useSelector(_selectorReceiptTransactionType);

  const buttons = useMemo(() => {
    const _buttons = [
      {
        type: ReceiptPayingType.CASH,
        icon: iconFontAwesomeMoneyBill,
        label: payments.find(x => x.type === ReceiptPayingType.CASH)?.label,
      },
      {
        type: ReceiptPayingType.CARD,
        icon: iconFontAwesomeMoneyCheckAlt,
        label: payments.find(x => x.type === ReceiptPayingType.CARD)?.label,
      },
      {
        type: -1,
        label: Translate.PAYMENTS_BUTTON_OTHER_LABEL,
        icon: iconFontAwesomeArrowDown,
        buttons: payments.filter(
          p =>
            !(
              p.type === ReceiptPayingType.CASH ||
              p.type === ReceiptPayingType.CARD
            ),
        ),
      },
    ];

    return _buttons.map(b => ({
      ...b,
      disabled:
        !isNeedToPay ||
        (transactionType === TTransactionType.Refund &&
          b.type !== ReceiptPayingType.CASH),
    }));
  }, [transactionType, payments, isNeedToPay]);

  return (
    <View style={style.paymentButtons}>
      {buttons.map((button, key) => {
        return button.type === -1 ? (
          <PaymentButtonOther {...button} key={key} />
        ) : (
          <PaymentButton
            {...button}
            key={key}
            rootStyle={style.paymentButton}
          />
        );
      })}
    </View>
  );
};

export const PaymentButton = ({label, type, rootStyle, ...rest}: any) => {
  const {payValue, reset} = useContext(PayingContext);
  const isNeedToPay = useSelector(_selectorReceiptNeedToPay);
  const receipt = useSelector(_selectorReceipt);
  const {addPayment} = useReceipt();

  const {transactionType, invoiceType, advanceProps} = receipt;

  const handlerOnPress = useCallback(() => {
    let _val = toNumberFixed(payValue);

    _val = _val ? _val : isNeedToPay;
    if (type === ReceiptPayingType.CARD) {
      _val = isNeedToPay;
    }
    if (_val) {
      addPayment({
        type,
        value: toNumberFixed(_val),
      });
      reset();
    }
  }, [
    advanceProps,
    transactionType,
    invoiceType,
    isNeedToPay,
    reset,
    addPayment,
    type,
    payValue,
  ]);

  return (
    <Button
      fill={ButtonFill.SOLID}
      color={Colors.PALETTE.BLUE._700}
      title={label}
      onPress={handlerOnPress}
      rootStyle={rootStyle}
      titleStyle={style.paymentButtonTitle}
      {...rest}
    />
  );
};

const PaymentButtonOther = ({label, buttons, ...rest}: any) => {
  return (
    <HwtPopover
      component={ReceiptPaymentsPopover}
      componentRenderProps={{
        buttons,
      }}
      placement={'bottom'}>
      {(showPopUp, ref) => (
        <Button
          fill={ButtonFill.SOLID}
          color={Colors.PALETTE.BLUE._700}
          title={label}
          onPress={showPopUp}
          ref={ref}
          rootStyle={style.paymentButton}
          titleStyle={style.paymentButtonTitle}
          {...rest}
        />
      )}
    </HwtPopover>
  );
};
