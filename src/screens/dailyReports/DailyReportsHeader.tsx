import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import style from 'src/screens/dailyReports/style';
import DateTimePicker from 'src/components/dateTimePicker';
import {DailyReportContext} from 'src/screens/dailyReports/context';
import {Translate} from 'src/translate/data';

const DailyReportsHeader = () => {
  const {dateStart, setStartDate} = useContext(DailyReportContext);

  return (
    <View style={style.dailyReportsHeader}>
      <Text style={style.dailyReportsHeaderText}>
        {Translate.TR_CHOOSE_DATE}
      </Text>
      <DateTimePicker
        date={dateStart ? dateStart : new Date()}
        onDateChange={setStartDate}
        setDate={setStartDate}
        mode={'date'}
        useHelperText={false}
        useLabel={false}
        title={Translate.TR_DATE_TITLE}
      />
    </View>
  );
};

export default DailyReportsHeader;
