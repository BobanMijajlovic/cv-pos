import React, {useCallback, useMemo} from 'react';
import {View, Text} from 'react-native';
import style from 'src/screens/receipt/style';
import Button from 'src/components/button';
import {Translate} from 'src/translate/data';
import {ButtonFill} from 'src/components/button/d';
import {Colors} from 'src/constants/Colors';
import {useSelector} from 'react-redux';
import {
  _selectorReceiptTypeString,
  _selectorReceiptBuyer,
  _selectorReceiptBuyerOptional,
  _selectorReceiptGetRefundProps,
  _selectorReceipt,
  _selectorReceiptAdvanceOption,
} from 'src/store/Receipt/helpers';
import {ClientType} from 'src/store/Receipt/d';
import {_selectorClientGetSelected} from 'src/store/Client/helpers';
import {formatDateString, formatPrice} from 'src/util/utils';
import {DateModes} from 'src/components/dateTimePicker/d';
import {useNavigation} from '@react-navigation/native';
import {ReceiptFormNavName} from 'src/navigation/d';
import ComponentRender from 'src/components/componentRender';
import {
  getReceiptOptionalBuyerData,
  getReceiptBuyerData,
} from 'src/util/helpers';

const ReceiptInfo = () => {
  const receiptTypeStr = useSelector(_selectorReceiptTypeString);
  const receipt = useSelector(_selectorReceipt);
  const {navigate} = useNavigation();

  const openForm = useCallback(() => {
    navigate(ReceiptFormNavName);
  }, [navigate]);

  const [isAdvanceOption, isRefundReceipt] = useMemo(() => {
    return [
      !!receipt.advanceProps?.advanceReceipt,
      !!receipt.refundProps?.referentReceipt,
    ];
  }, [receipt]);

  return (
    <View style={style.receiptRoot}>
      <View style={style.receiptInfoRoot}>
        <ComponentRender
          label={Translate.TR_RECEIPT_INFO_RECEIPT_TYPE}
          labelStyle={style.receiptInfoHeader}
          value={`${receiptTypeStr}`}
          valueStyle={style.receiptInfoContent}
        />
      </View>
      <ClientInfo />
      <OptionalDataInfo />
      {isRefundReceipt && <RefundInfo />}
      {isAdvanceOption && <AdvanceInfo />}
      <View style={style.buttonRoot}>
        <Button
          upperCase
          title={Translate.TR_ITEM_LABEL_BUTTON_UPDATE}
          onPress={openForm}
          fill={ButtonFill.CLEAR}
          color={Colors.PALETTE.BLUE._700}
          titleStyle={{
            fontSize: 15,
            fontWeight: 'bold',
          }}
          rootStyle={{
            borderColor: Colors.PALETTE.BLUE._700,
            paddingHorizontal: 5,
            paddingVertical: 6,
            minWidth: 75,
          }}
        />
      </View>
    </View>
  );
};

export default ReceiptInfo;

export const AdvanceInfo = () => {
  const advanceOptions = useSelector(_selectorReceiptAdvanceOption);
  return (
    <View style={style.advanceRoot}>
      <Text style={style.receiptInfoHeader}>
        {Translate.TR_RECEIPT_INFO_ADVANCE_DATA}
      </Text>
      <View style={style.advanceRow}>
        <ComponentRender
          label={Translate.TR_RECEIPT_INFO_RECEIPT_NUMBER}
          labelStyle={style.advanceHeader}
          value={advanceOptions.advanceReceipt}
          valueStyle={style.advanceContent}
        />
      </View>
      <View style={style.advanceRow}>
        <ComponentRender
          label={Translate.TR_RECEIPT_INFO_RECEIPT_AMOUNT}
          labelStyle={style.advanceHeader}
          value={formatPrice(advanceOptions.advanceFinance)}
          valueStyle={style.advanceContent}
        />
      </View>
    </View>
  );
};

export const RefundInfo = () => {
  const refundProps = useSelector(_selectorReceiptGetRefundProps);
  const {referentReceipt, dateTime} = refundProps || {};
  return (
    <View style={style.refundRoot}>
      <Text style={style.receiptInfoHeader}>
        {Translate.TR_RECEIPT_INFO_REFUND_DATA}
      </Text>
      <View style={style.refundRow}>
        <ComponentRender
          label={Translate.TR_RECEIPT_INFO_RECEIPT_NUMBER}
          labelStyle={style.refundHeader}
          value={!referentReceipt && !dateTime ? '####' : referentReceipt}
          valueStyle={style.refundContent}
        />
      </View>
      <View style={style.refundRow}>
        <ComponentRender
          label={Translate.TR_RECEIPT_INFO_RECEIPT_NUMBER}
          labelStyle={style.refundHeader}
          value={
            !referentReceipt && !dateTime
              ? '####/##/##'
              : dateTime &&
                formatDateString(DateModes.DATE_TIME, new Date(dateTime))
          }
          valueStyle={style.refundContent}
        />
      </View>
    </View>
  );
};

export const OptionalDataInfo = () => {
  const optionalData = useSelector(_selectorReceiptBuyerOptional);
  const {type, value} = optionalData || ({value: '##############'} as any);

  const data = useMemo(() => {
    const val = getReceiptOptionalBuyerData(type) || {
      value: '#############',
      label: '#############',
    };
    return val;
  }, [type]);

  return (
    <View style={style.optionalDataRoot}>
      <Text style={style.receiptInfoHeader}>
        {Translate.TR_RECEIPT_INFO_OPTIONAL_DATA}
      </Text>
      <View style={style.optionalDataRow}>
        <ComponentRender
          label={data.label}
          labelStyle={style.optionalDataHeader}
          value={value}
          valueStyle={style.optionalDataContent}
        />
      </View>
    </View>
  );
};

export const ClientInfo = () => {
  const buyer = useSelector(_selectorReceiptBuyer);
  const client = useSelector(_selectorClientGetSelected);
  const {type, value} = buyer || {};

  const data = useMemo(() => {
    const val = getReceiptBuyerData(type) || {
      value: '############',
      label: '############',
    };
    return val;
  }, [type]);

  return (
    <View style={style.clientContentContainer}>
      <View style={style.clientRow}>
        <Text style={style.receiptInfoHeader}>
          {Translate.TR_RECEIPT_INFO_CLIENT_DATA}
        </Text>
      </View>
      {type === ClientType.PIB && client ? (
        <View>
          <View style={style.clientNameContainer}>
            <Text style={style.clientNameLabel}>{client.name}</Text>
          </View>
          <View style={style.clientDataContainer}>
            <Text style={style.clientPibAndMbText}>
              {client.tin && Translate.TR_RECEIPT_INFO_TIN_LABEL + client.tin}
            </Text>
            <Text style={style.clientPibAndMbText}>
              {client.uniqueCompanyNumber &&
                Translate.TR_RECEIPT_INFO_UNIQUE_COMPANY_NUMBER_LABEL +
                  client.uniqueCompanyNumber}
            </Text>
          </View>
          {client.zipCode && client.city && client.street ? (
            <View style={style.clientAddressContainer}>
              <Text style={style.clientAddressText}>
                {client.city && client.zipCode && client.street
                  ? client.street + ', ' + client.zipCode + ', ' + client.city
                  : ' '}
              </Text>
            </View>
          ) : (
            <></>
          )}
        </View>
      ) : (
        <View style={style.clientRow}>
          <ComponentRender
            label={data.label}
            labelStyle={style.typeReceiptHeader}
            value={value}
            valueStyle={style.typeReceiptContent}
          />
        </View>
      )}
    </View>
  );
};
