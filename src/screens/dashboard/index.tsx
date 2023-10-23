import React, {useCallback} from 'react';
import style from 'src/screens/dashboard/style';
import {Translate} from 'src/translate/data';
import {useNavigation} from '@react-navigation/native';
import {
  ArticlesNavName,
  ReceiptNavName,
  UserNavName,
  DailyReportsName,
  SettingsNavName,
  ClientsNavName,
} from 'src/navigation/d';
import {Text, TouchableOpacity, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {
  iconArticles,
  iconFontAwesomeUsers,
  iconReceipt,
  iconFontAwesomeTimesReports,
  iconFontAwesomeCogs,
  iconFontAwesomeAddressBook,
} from 'src/icon';

type TDashboardButtonProps = {
  navigationName?: string;
  title: string;
  icon: string;
  onPress?: () => void;
};

const DashboardButton = ({
  navigationName,
  title,
  icon,
  onPress,
}: TDashboardButtonProps) => {
  const {navigate} = useNavigation();

  const onPressHandler = useCallback(() => {
    navigationName && navigate(navigationName);
    onPress && onPress();
  }, [navigate, navigationName, onPress]);

  return (
    <TouchableOpacity
      onPress={onPressHandler}
      style={style.dashboardButtonContainer}>
      <View style={style.dashboardButtonRoot}>
        <FontAwesome5Icon style={style.dashboardButtonIcon} name={icon} />
        <Text style={style.dashboardButtonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Dashboard = () => {
  return (
    <View style={style.root}>
      <View style={style.dashboardContainer}>
        <DashboardButton
          navigationName={ReceiptNavName}
          icon={iconReceipt}
          title={Translate.TR_DASHBOARD_BUTTON_LABEL_RECEIPT}
        />
        <DashboardButton
          navigationName={ArticlesNavName}
          icon={iconArticles}
          title={Translate.TR_DASHBOARD_BUTTON_LABEL_ARTICLES}
        />
        <DashboardButton
          navigationName={UserNavName}
          icon={iconFontAwesomeUsers}
          title={Translate.TR_USER_PAGE_TITLE}
        />
        <DashboardButton
          navigationName={ClientsNavName}
          icon={iconFontAwesomeAddressBook}
          title={Translate.TR_DASHBOARD_BUTTON_LABEL_CLIENTS}
        />
        <DashboardButton
          navigationName={DailyReportsName}
          icon={iconFontAwesomeTimesReports}
          title={Translate.TR_DASHBOARD_BUTTON_LABEL_DAILY_REPORT}
        />
        <DashboardButton
          navigationName={SettingsNavName}
          icon={iconFontAwesomeCogs}
          title={Translate.TR_DASHBOARD_BUTTON_LABEL_SETTINGS}
        />
        {/* <DashboardButton
          navigationName={JournalPreviewNavName}
          icon={iconFontAwesomeInvoice}
          title={Translate.TR_DASHBOARD_BUTTON_LABEL_JOURNAL_PREVIEW}
        />*/}
      </View>
    </View>
  );
};

export default Dashboard;
