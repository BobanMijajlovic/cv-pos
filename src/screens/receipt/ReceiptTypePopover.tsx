import * as React from 'react';
import {useMemo, useCallback, useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import style from './style';
import {useSelector} from 'react-redux';
import {_selectorReceiptTransactionType} from 'src/store/Receipt/helpers';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {iconFontAwesomeCheck} from 'src/icon';
import {Translate} from 'src/translate/data';
import {
  InvoiceTypeValues,
  TransactionTypeValues,
} from 'src/constants/ReceiptTypes';
import {TInvoiceType, TTransactionType} from 'src/store/lpfr/d';

export type TReceiptTypes = {
  invoiceType: TInvoiceType;
  transactionType: TTransactionType;
};

type TReceiptTypePopoverProps = {
  changeTypes: (field: string, type: TInvoiceType | TTransactionType) => void;
  types: TReceiptTypes;
};

const ReceiptTypePopover = ({types, changeTypes}: TReceiptTypePopoverProps) => {
  const transactionType = useSelector(_selectorReceiptTransactionType);

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    [0, 1].includes(transactionType) && setDisabled(false);
  }, [transactionType, setDisabled]);

  const invoiceTypeOpts = useMemo(() => InvoiceTypeValues, []);
  const transactionTypeOpts = useMemo(() => TransactionTypeValues, []);

  const onPressInvoiceType = useCallback(
    (type: TInvoiceType) => {
      changeTypes('invoiceType', type);
    },
    [changeTypes],
  );

  const onPressTransactionType = useCallback(
    (type: TTransactionType) => {
      changeTypes('transactionType', type);
      setDisabled(false);
    },
    [setDisabled, changeTypes],
  );

  return (
    <View style={style.receiptFooterPopover}>
      <Text style={style.receiptFooterSelectHeader}>
        {Translate.TR_RECEIPT_POPOVER_TRANSACTION_TYPE}
      </Text>
      <View>
        <View style={style.receiptFooterPopoverRow}>
          {transactionTypeOpts &&
            transactionTypeOpts.map(({value, label}) => (
              <TouchableOpacity
                key={value}
                onPress={() => onPressTransactionType(value)}
                style={style.receiptFooterSelect}>
                <Text style={style.receiptFooterSelectText}>{label}</Text>
                {types.transactionType === value && (
                  <FontAwesome5Icon
                    name={iconFontAwesomeCheck}
                    style={style.receiptTypeSelectIconCheck}
                  />
                )}
              </TouchableOpacity>
            ))}
        </View>
        <View>
          <Text style={style.receiptFooterSelectHeader}>
            {Translate.TR_RECEIPT_POPOVER_INVOICE_TYPE}
          </Text>
          {invoiceTypeOpts &&
            invoiceTypeOpts.map(({value, label}) => (
              <TouchableOpacity
                disabled={disabled}
                key={value}
                onPress={() => onPressInvoiceType(value)}
                style={style.receiptFooterSelect}>
                <Text style={style.receiptFooterSelectText}>{label}</Text>
                {types.invoiceType === value && (
                  <FontAwesome5Icon
                    name={iconFontAwesomeCheck}
                    style={style.receiptTypeSelectIconCheck}
                  />
                )}
              </TouchableOpacity>
            ))}
        </View>
      </View>
    </View>
  );
};
export default ReceiptTypePopover;
