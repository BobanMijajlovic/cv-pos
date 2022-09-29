import {Text, View} from 'react-native';
import style from './style';
import React from 'react';
import {useSelector} from 'react-redux';
import {
  _selectorInvoiceTypeString,
  _selectorTransactionTypeString,
} from '../../store/Receipt/helpers';

const PayingHeader = () => {
  const invoiceTypeString = useSelector(_selectorInvoiceTypeString);
  const transactionTypeString = useSelector(_selectorTransactionTypeString);

  return (
    <View style={style.receiptFooterRow}>
      <View style={style.receiptHeaderTextRoot}>
        <Text style={style.headerText}>
          {invoiceTypeString} - {transactionTypeString}
        </Text>
      </View>
    </View>
  );
};

export default PayingHeader;
