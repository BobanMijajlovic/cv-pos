import React, {useMemo} from 'react';
import {View, Text} from 'react-native';
import style from 'src/screens/dailyReports/style';
import {TransactionTypeValues} from 'src/constants/DailyReportTypes';
import {TInvoiceType} from 'src/store/lpfr/d';
import {__get} from 'src/util/lodash';
import DailyReportInvoiceTypePart from 'src/screens/dailyReports/DailyReportInvoiceTypePart';
import {Translate} from 'src/translate/data';

const DailyReportItem = ({invoicePart, type}: any) => {
  const title = useMemo(
    () => TransactionTypeValues.find(x => x.value === type)?.label || '',
    [type],
  );

  const data = Object.keys(TInvoiceType)
    .filter(x => !isNaN(Number(x)))
    .map(invoice => {
      return __get(invoicePart, invoice, undefined);
    })
    .filter(x => !!x);

  return (
    <View style={{flex: 1, width: '100%'}}>
      <View style={style.dateReportItem}>
        <View style={style.dailyReportHeaderContainer}>
          <Text style={style.dailyReportTotalCountersText}>
            {Translate.TR_TRANSACTION_TYPE_HEADER}
            {title}
          </Text>
        </View>
        {data.map((item, key) => {
          return (
            <DailyReportInvoiceTypePart key={key} items={item} type={key} />
          );
        })}
      </View>
    </View>
  );
};

export default DailyReportItem;
