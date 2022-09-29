import {Text, View} from 'react-native';
import style from './style';
import NumericKeyboard from '../../components/keyboard/NumericKeyboard';
import React, {useCallback, useContext, useEffect, useMemo} from 'react';
import {useKeyboardInternal} from '../../components/keyboard/context';
import {formatCurrencyQty, formatPrice} from '../../util/utils';
import {PayingContext} from './context';
import {useSelector} from 'react-redux';
import {
  _selectorReceiptNeedToPay,
  _selectorReceiptTotalByReceipt,
  _selectorReceiptTotalPayed,
} from '../../store/Receipt/helpers';
import MoneyKeyboard from './keyboardMoney';
import {TButtonEvent} from '../../components/keyboard/d';
import {Translate} from 'src/translate/data';
import FinishReceipt from 'src/screens/receiptPaying/FinishReceipt';

const PayingKeyboard = () => {
  const {
    isMoney,
    addMoney,
    moneyPayingTotal,
    reset,
    payValue,
    handlerPayValue,
    canFinish,
    receiptTotal,
  } = useContext(PayingContext);
  const isNeedToPay = useSelector(_selectorReceiptNeedToPay);
  const totalToPay = useSelector(_selectorReceiptTotalByReceipt);

  const totalPayed = useSelector(_selectorReceiptTotalPayed);

  const value = useMemo(
    () =>
      isMoney
        ? formatPrice(moneyPayingTotal)
        : formatCurrencyQty(payValue.length ? payValue : '0.00'),
    [isMoney, moneyPayingTotal, payValue],
  );

  const handlerKeyboard = useCallback(
    (btn: TButtonEvent) => {
      isMoney ? addMoney(btn) : handlerPayValue(btn);
    },
    [isMoney, addMoney, handlerPayValue],
  );

  const handlerClear = useCallback(() => {
    reset();
  }, [reset]);

  useKeyboardInternal(handlerKeyboard);

  if (canFinish) {
    return <FinishReceipt />;
  }

  return (
    <View style={style.keyboardContainer}>
      <View style={style.keyboardHeader}>
        <View style={style.keyboardHeaderPreviewCell}>
          <Text style={style.keyboardHeaderHelpPreview}>
            {Translate.TR_RECEIPT_PAYING_PAYED_LABEL}
          </Text>
          <Text style={style.keyboardHeaderPreview}>
            {formatPrice(totalPayed)}
          </Text>
        </View>
        <View style={style.keyboardInputPreview}>
          <Text style={style.keyboardHeaderHelpPreview} />
          <Text style={style.keyboardInputText}>{value}</Text>
        </View>
        <View style={style.keyboardHeaderPreviewCell}>
          <Text style={style.keyboardHeaderHelpPreview}>
            {Translate.TR_RECEIPT_PAYING_TOTAL_LABEL}
          </Text>
          <Text style={style.keyboardHeaderPreview}>
            {formatPrice(receiptTotal)}
          </Text>
        </View>
      </View>
      <View style={style.keyboardRoot}>
        {isMoney ? (
          <MoneyKeyboard isNeedToPay={!!isNeedToPay} />
        ) : (
          <NumericKeyboard
            disabled={!isNeedToPay}
            keyRootStyle={style.keyboardKeyRoot}
          />
        )}
      </View>
    </View>
  );
};
export default PayingKeyboard;
