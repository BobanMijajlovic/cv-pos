import React, {useMemo} from 'react';
import {
  InvoiceTypeValues,
  PaymentTypeValues,
} from 'src/constants/DailyReportTypes';
import {View, Text} from 'react-native';
import style from 'src/screens/dailyReports/style';
import {formatPrice} from 'src/util/utils';
import {Translate} from 'src/translate/data';

const DailyReportInvoiceTypePart = ({items, type}: any) => {
  const title = useMemo(
    () => InvoiceTypeValues.find(x => x.value === type)?.label || '',
    [type],
  );

  return (
    <View style={{flex: 1, width: '100%'}}>
      <View style={style.dateReportItem}>
        <View style={style.dailyReportInvoicePartHeaderContainer}>
          <Text style={style.dailyReportTotalCountersText}>{title}</Text>
          <Text style={style.dailyReportCountersText}>
            {items.counter ? items.counter : '#'}
          </Text>
        </View>
      </View>
      <VatItems items={items.vats} />
      <PaymentsItems items={items.payments} />
    </View>
  );
};

export default DailyReportInvoiceTypePart;

const VatItem = ({item}: any) => {
  return (
    <View style={style.dateReportVatItem}>
      <View style={style.dailyReportRightPartContainer}>
        <View style={style.dailyReportLabelContainer}>
          <Text style={style.dateReportVatItemType}>{item.label}</Text>
          {!isNaN(item.rate) && (
            <Text style={style.dateReportVatItemTxt}>
              {formatPrice(item.rate)} %
            </Text>
          )}
        </View>
        {!isNaN(item.rate) && (
          <Text style={style.dateReportVatItemTxt}>
            {formatPrice(item.finance)}
          </Text>
        )}
      </View>
      <Text style={style.dateReportVatItemTxt}>{formatPrice(item.total)}</Text>
    </View>
  );
};

const VatItems = ({items}: any) => {
  return (
    <>
      <View style={style.dateReportInvoiceTypeItemHeaderContainer}>
        <Text style={style.dateReportInvoiceTypeItemHeaderTxt}>
          {Translate.TR_VATS_HEADER}
        </Text>
      </View>
      {items.vats ? (
        items.vats.map((x: any, key: any) => {
          return <VatItem item={x} key={key} />;
        })
      ) : (
        <></>
      )}
      <View style={style.dateReportVatItemSummary}>
        <Text style={style.dateReportVatsTotalHelpText}>
          {Translate.TR_RECEIPT_TOTAL_LABEL}
        </Text>
        <View style={style.dailyReportVatsTotalContainer}>
          <Text style={style.dateReportVatsTotalTaxText}>
            {formatPrice(items?.totalTax)}
          </Text>
          <Text style={style.dateReportVatsTotalText}>
            {formatPrice(items.total)}
          </Text>
        </View>
      </View>
    </>
  );
};

const PaymentsItems = ({items}: any) => {
  return (
    <>
      <View style={style.dateReportInvoiceTypeItemHeaderContainer}>
        <Text style={style.dateReportInvoiceTypeItemHeaderTxt}>
          {Translate.TR_PAYMENTS_HEADER}
        </Text>
      </View>
      {items.payments ? (
        items.payments.map((x: any, key: any) => {
          return <PaymentsItem item={x} key={key} />;
        })
      ) : (
        <></>
      )}
      <View style={style.dateReportVatItemSummary}>
        <Text style={style.dateReportSummaryText}>
          {Translate.TR_RECEIPT_TOTAL_LABEL}
        </Text>
        <Text style={style.dateReportSummaryText}>
          {formatPrice(items.total)}
        </Text>
      </View>
    </>
  );
};

const PaymentsItem = ({item}: any) => {
  return (
    <View style={style.dateReportVatItem}>
      <Text style={style.dateReportPaymentItemTxt}>
        {PaymentTypeValues.find(x => x.value === item.payment_type)?.label ||
          ''}
      </Text>
      <Text style={style.dateReportVatItemTxt}>
        {formatPrice(item.finance)}
      </Text>
    </View>
  );
};
