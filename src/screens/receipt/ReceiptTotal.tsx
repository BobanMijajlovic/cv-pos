import React, {useCallback, useMemo} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {
  _selectorReceiptTotalByReceipt,
  _selectorReceiptCanFinish,
  _selectorReceipt,
  _selectorReceiptCanPay,
} from 'src/store/Receipt/helpers';
import {formatPrice} from 'src/util/utils';
import style from 'src/screens/receipt/style';
import {useNavigation} from '@react-navigation/native';
import {ReceiptFormNavName, ReceiptPayingNavName} from 'src/navigation/d';
import {Translate} from 'src/translate/data';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {iconFontAwesomeHandPointer} from 'src/icon';
import {Colors} from 'src/constants/Colors';
import {useReceipt} from 'src/hooks/receipt/useReceipt';

const ReceiptTotal = () => {
  const {navigate} = useNavigation();
  const total = useSelector(_selectorReceiptTotalByReceipt);
  const canBeFinished = useSelector(_selectorReceiptCanFinish);
  const canBePay = useSelector(_selectorReceiptCanPay);
  const {resetPaying} = useReceipt();

  const handlerGoToPaying = useCallback(() => {
    if (!canBePay) {
      navigate(ReceiptFormNavName);
      return;
    }
    if (canBeFinished) {
      navigate(ReceiptPayingNavName);
      resetPaying();
    }
  }, [navigate, canBePay, resetPaying, canBeFinished]);

  return (
    <TouchableOpacity
      disabled={!canBeFinished}
      style={style.totalContainer}
      onPress={handlerGoToPaying}>
      <View style={style.receiptSummaryTitle}>
        <Text style={style.receiptSummaryTotalText}>
          {Translate.TR_RECEIPT_TOTAL_LABEL}
        </Text>
        <Text style={style.receiptSummaryTapToPayText}>
          {Translate.TR_RECEIPT_PAYING_LABEL}
        </Text>
      </View>
      <View style={style.receiptSummaryFinance}>
        <Text style={style.receiptTotalFinanceText}>{formatPrice(total)}</Text>
      </View>
      <FontAwesome5Icon
        name={iconFontAwesomeHandPointer}
        size={20}
        color={
          canBeFinished ? Colors.PALETTE.BLUE._700 : Colors.PALETTE.RED._800
        }
        style={style.receiptTotalIcon}
      />
    </TouchableOpacity>
  );
};

export default ReceiptTotal;
