import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  _selectorReceiptGetRefundProps,
  _selectorReceiptInvoiceType,
  _selectorReceiptTransactionType,
  _selectorReceiptTypeString,
} from 'src/store/Receipt/helpers';
import {Text, TouchableOpacity, View} from 'react-native';
import style from './style';
import ReceiptTotal from 'src/screens/receipt/ReceiptTotal';
import ReceiptTypePopover, {
  TReceiptTypes,
} from 'src/screens/receipt/ReceiptTypePopover';
import HwtPopover from 'src/components/popover';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {iconFontAwesomeArrowCircleUp} from 'src/icon';
import {Translate} from 'src/translate/data';
import {useReceipt} from 'src/hooks/receipt/useReceipt';
import {TInvoiceType, TTransactionType} from 'src/store/lpfr/d';
import {useNavigation} from '@react-navigation/native';
import {ReceiptFormNavName} from 'src/navigation/d';

const ReceiptFooter = () => {
  const receiptTypeString = useSelector(_selectorReceiptTypeString);
  const invoiceType = useSelector(_selectorReceiptInvoiceType);
  const transactionType = useSelector(_selectorReceiptTransactionType);
  const refundProps = useSelector(_selectorReceiptGetRefundProps);
  const {referentReceipt} = refundProps || {};
  const {setInvoiceType, setTransactionType} = useReceipt();
  const {navigate} = useNavigation();
  const [types, setTypes] = useState({
    invoiceType: invoiceType,
    transactionType: transactionType,
  } as TReceiptTypes);

  const changeTypes = useCallback(
    (field: string, type: TInvoiceType | TTransactionType) => {
      setTypes(t => ({
        ...t,
        [field]: type,
      }));
    },
    [setTypes],
  );

  const handlerOnClosePopover = useCallback(() => {
    setTransactionType(types.transactionType);
    setInvoiceType(types.invoiceType);
  }, [types, setInvoiceType, setTransactionType]);

  useEffect(() => {
    if (
      transactionType === TTransactionType.Refund ||
      invoiceType === TInvoiceType.Proforma ||
      invoiceType === TInvoiceType.Copy ||
      (invoiceType === TInvoiceType.Advance &&
        transactionType === TTransactionType.Sale)
    ) {
      if (!refundProps?.referentReceipt || !refundProps?.dateTime) {
        navigate(ReceiptFormNavName);
        return;
      }
    }
  }, [navigate, transactionType, invoiceType, refundProps]);

  return (
    <View style={style.receiptFooterContainer}>
      <HwtPopover
        component={ReceiptTypePopover}
        componentRenderProps={{
          changeTypes,
          types,
        }}
        onClose={handlerOnClosePopover}
        placement={'top'}>
        {(showPopUp, ref) => (
          <TouchableOpacity
            style={style.receiptFooterTypeContainer}
            onPress={showPopUp}
            ref={ref}>
            <View style={style.receiptFooterTypeInfoContainer}>
              <View style={style.receiptFooterRow}>
                <Text style={style.receiptFooterHeaderTypeText}>
                  {Translate.TR_RECEIPT_FOOTER_RECEIPT_TYPE}
                </Text>
                <Text style={style.receiptFooterRefundNumberText}>
                  {referentReceipt ? referentReceipt : ''}
                </Text>
              </View>
              <View style={style.receiptFooterType}>
                <Text style={style.receiptFooterTypeText}>
                  {receiptTypeString}
                </Text>
              </View>
            </View>
            <FontAwesome5Icon
              name={iconFontAwesomeArrowCircleUp}
              style={style.receiptFooterTypeIcon}
            />
          </TouchableOpacity>
        )}
      </HwtPopover>
      <ReceiptTotal />
    </View>
  );
};

export default ReceiptFooter;
