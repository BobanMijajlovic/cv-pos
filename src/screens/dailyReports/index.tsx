import React, {useContext} from 'react';
import {ScrollView, View} from 'react-native';
import style from './style';
import DailyReportsHeader from 'src/screens/dailyReports/DailyReportsHeader';
import DailyReportContextContainer, {
  DailyReportContext,
} from 'src/screens/dailyReports/context';
import EmptyComponent from 'src/components/swipeList/EmptyComponent';
import {iconFontAwesomeTimesReports} from 'src/icon';
import {Translate} from 'src/translate/data';
import {TDailyXReport} from 'src/database/d';
import {TTransactionType} from 'src/store/lpfr/d';
import DailyReportItem from 'src/screens/dailyReports/DailyReportItem';
import {__get} from 'src/util/lodash';

const DailyReport = ({report}: {report?: TDailyXReport | undefined}) => {
  if (!report?.[TTransactionType.Sale] && !report?.[TTransactionType.Refund]) {
    return (
      <EmptyComponent
        emptyIcon={iconFontAwesomeTimesReports}
        emptyTitle={Translate.TR_NO_REPORT}
      />
    );
  }

  return (
    <ScrollView style={style.root}>
      {Object.keys(TTransactionType)
        .filter(x => !isNaN(Number(x)))
        .map((transaction, key) => {
          return (
            <DailyReportItem
              key={key}
              type={key}
              invoicePart={__get(report, transaction)}
            />
          );
        })}
    </ScrollView>
  );
};

export const DailyReportContainer = () => {
  const {report} = useContext(DailyReportContext);

  return (
    <View style={style.root}>
      <DailyReportsHeader />
      <DailyReport report={report} />
    </View>
  );
};

const DailyReports = () => {
  return (
    <DailyReportContextContainer>
      <DailyReportContainer />
    </DailyReportContextContainer>
  );
};

export default DailyReports;
