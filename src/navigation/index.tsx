/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {useCallback, useEffect} from 'react';
import ArticleDefinition from 'src/screens/articleDefinition';
import Articles from 'src/screens/articles';
import {Translate} from 'src/translate/data';
import {
  ArticleDefinitionNavName,
  ArticlesNavName,
  CardLockName,
  ClientsDefinitionNavName,
  ClientSearchNavName,
  ClientsNavName,
  DailyReportsName,
  DashboardNavName,
  DrawerNavName,
  InitEsdcName,
  JournalPreviewNavName,
  LockNavName,
  ReceiptChangeDiscountNavName,
  ReceiptChangeQtyNavName,
  ReceiptFormNavName,
  ReceiptNavName,
  ReceiptPayingNavName,
  ReceiptSearchNavName,
  SettingsNavName,
  UserDefinitionNavName,
  UserNavName,
} from 'src/navigation/d';
import Receipt from 'src/screens/receipt';
import Dashboard from 'src/screens/dashboard';
import Settings from 'src/screens/settings';
import ButtonIcon from 'src/components/button/ButtonIcon';
import {ButtonFill} from 'src/components/button/d';
import {Colors} from 'src/constants/Colors';
import Drawer from 'src/screens/drawer';
import {
  iconFontAwesomeBars,
  iconFontAwesomeChevronLeft,
  iconFontAwesomeUser,
} from 'src/icon';
import ReceiptPaying from 'src/screens/receiptPaying';
import {DrawerCloseButton} from '../screens/drawer';
import ReceiptSearch from '../screens/receiptSearch';
import ReceiptChangeQty from '../screens/receiptChangeQty';
import Users from 'src/screens/users';
import UserDefinition from 'src/screens/userDefinition';
import style from './style';
import {NativeModules, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Lock from 'src/screens/lock';
import {useSelector} from 'react-redux';
import {_selectorApplicationUser} from 'src/store/Application/helpers';
import DailyReports from 'src/screens/dailyReports';
import PopoverIcon from 'src/components/popover/PopoverIcon';
import UserPopoverPreview from 'src/screens/users/userPopoverPreview';
import CardLock from 'src/screens/cardLock';
import Clients from 'src/screens/clients';
import ClientDefinition from 'src/screens/clientDefinition';
import ClientSearch from 'src/screens/clientSearch';
import ReceiptForm from 'src/screens/receipt/receiptForm';
import ToastDefinition from 'src/components/toast/index';
import {_selectorLPFRIsPinVerified} from 'src/store/lpfr/helpers';
import JournalPreview from 'src/screens/journalPreview';
import ReceiptChangeDiscount from 'src/screens/receiptChangeDiscount';
import {useError} from 'src/hooks/error/useErrors';
import InitEsdc from 'src/screens/initEsdc';
// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<any>();

const NavigationDefaultMenuButton = () => {
  const {navigate} = useNavigation();
  const route = useRoute();
  const user = useSelector(_selectorApplicationUser);
  const {PrinterModule, LEDModule, ScannerModule} = NativeModules;

  const openDrawer = useCallback(() => {
    navigate(DrawerNavName);
  }, [navigate]);

  return (
    <View style={style.navigateIconsContainer}>
      <PopoverIcon
        icon={iconFontAwesomeUser}
        component={UserPopoverPreview}
        componentRenderProps={user}
        placement={'bottom'}
        contentStyle={{
          paddingHorizontal: 10,
          borderRadius: 15,
          paddingVertical: 5,
        }}
      />
      {route.name !== DashboardNavName && (
        <ButtonIcon
          fill={ButtonFill.CLEAR}
          color={Colors.PALETTE.BLUE._700}
          onPress={openDrawer}
          icon={iconFontAwesomeBars}
          iconStyle={style.navigationTin}
        />
      )}
    </View>
  );
};

export const ComponentBack = (props: any) => {
  if (!props.canGoBack) {
    return <></>;
  }
  const title = props.label?.length ? props.label : props.truncatedLabel;
  return (
    <TouchableOpacity
      onPress={props.onPress && props.onPress}
      style={style.navigationLeftRoot}>
      <FontAwesome5Icon
        name={iconFontAwesomeChevronLeft}
        style={style.navigationBackIcon}
      />
      <Text style={style.navigationBackTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const RootNavigator = () => {
  const user = useSelector(_selectorApplicationUser);
  const isPinVerified = useSelector(_selectorLPFRIsPinVerified);
  const {error} = useError();

  const {navigate} = useNavigation();

  useEffect(() => {
    if (!user) {
      navigate(LockNavName);
      return;
    }
    if (!isPinVerified) {
      navigate(CardLockName);
      return;
    }
    if (error === 2400) {
      navigate(InitEsdcName);
      return;
    }
  }, [user, navigate, isPinVerified, error]);

  return (
    <Stack.Navigator
      initialRouteName={DashboardNavName}
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: style.navigationRoot,
        headerTitleStyle: style.navigationTitle,
        headerLeft: props => <ComponentBack {...props} />,
        headerRight: () => <NavigationDefaultMenuButton />,
        cardStyle: {backgroundColor: Colors.WHITE},
      }}>
      <Stack.Screen
        name={DrawerNavName}
        component={Drawer}
        options={{
          headerTitle: '',
          headerLeft: () => null,
          headerRight: () => <DrawerCloseButton />,
        }}
      />
      <Stack.Screen
        name={DashboardNavName}
        component={Dashboard}
        options={{
          title: Translate.TR_DASHBOARD_PAGE_TITLE,
          headerLeft: () => <></>,
        }}
      />
      <Stack.Screen
        name={SettingsNavName}
        component={Settings}
        options={{
          title: Translate.TR_DASHBOARD_BUTTON_LABEL_SETTINGS,
        }}
      />
      <Stack.Screen
        name={ArticlesNavName}
        component={Articles}
        options={{
          title: Translate.TR_ITEMS_PAGE_TITLE,
        }}
      />
      <Stack.Screen
        name={ArticleDefinitionNavName}
        component={ArticleDefinition}
        options={{
          title: Translate.TR_ITEM_DEFINE_PAGE_LABEL_NEW,
        }}
      />
      <Stack.Screen
        name={ReceiptNavName}
        component={Receipt}
        options={{
          title: Translate.TR_RECEIPT_PAGE_TITLE,
        }}
      />
      <Stack.Screen
        name={ReceiptPayingNavName}
        component={ReceiptPaying}
        options={{
          title: Translate.TR_RECEIPT_PAYING_PAGE_TITLE,
        }}
      />
      <Stack.Screen
        name={ReceiptSearchNavName}
        component={ReceiptSearch}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name={ReceiptChangeQtyNavName}
        component={ReceiptChangeQty}
        options={{
          title: '',
          headerTruncatedBackTitle: Translate.TR_RECEIPT_SEARCH_SALE_PAGE_TITLE,
        }}
      />
      <Stack.Screen
        name={ReceiptChangeDiscountNavName}
        component={ReceiptChangeDiscount}
        options={{
          title: Translate.TR_RECEIPT_DISCOUNT_PAGE_TITLE,
          headerTruncatedBackTitle: Translate.TR_RECEIPT_PAGE_TITLE,
        }}
      />
      <Stack.Screen
        name={UserNavName}
        component={Users}
        options={{
          title: Translate.TR_USER_PAGE_TITLE,
        }}
      />
      <Stack.Screen
        name={UserDefinitionNavName}
        component={UserDefinition}
        options={{
          title: Translate.TR_USER_DEFINE_PAGE_LABEL_NEW,
        }}
      />
      <Stack.Screen
        name={LockNavName}
        component={Lock}
        options={{
          title: Translate.TR_LOCK_PAGE_TITLE,
          headerLeft: () => null,
          headerRight: () => null,
        }}
      />
      <Stack.Screen
        name={DailyReportsName}
        component={DailyReports}
        options={{
          title: Translate.TR_DASHBOARD_BUTTON_LABEL_DAILY_REPORT,
        }}
      />
      <Stack.Screen
        name={CardLockName}
        component={CardLock}
        options={{
          title: Translate.TR_DASHBOARD_BUTTON_LABEL_CARD_LOCK,
          headerLeft: () => null,
          headerRight: () => null,
        }}
      />
      <Stack.Screen
        name={ClientsNavName}
        component={Clients}
        options={{
          title: Translate.TR_DASHBOARD_BUTTON_LABEL_CLIENTS,
        }}
      />
      <Stack.Screen
        name={ClientsDefinitionNavName}
        component={ClientDefinition}
        options={{
          title: Translate.TR_CLIENTS_DEFINE_PAGE_LABEL_NEW,
        }}
      />
      <Stack.Screen
        name={ClientSearchNavName}
        component={ClientSearch}
        options={{
          title: Translate.TR_CLIENTS_SEARCH_SALE_PAGE_TITLE,
        }}
      />
      <Stack.Screen
        name={ReceiptFormNavName}
        component={ReceiptForm}
        options={{
          title: Translate.TR_RECEIPT_FORM_TITLE,
          headerLeft: props => <ComponentBack {...props} />,
        }}
      />
      <Stack.Screen
        name={JournalPreviewNavName}
        component={JournalPreview}
        options={{
          title: Translate.TR_DASHBOARD_JOURNAL_PREVIEW_TITLE,
          headerLeft: props => <ComponentBack {...props} />,
        }}
      />
      <Stack.Screen
        name={InitEsdcName}
        component={InitEsdc}
        options={{
          title: Translate.TR_DASHBOARD_PAGE_INIT_ESDC_TITLE,
          headerLeft: () => null,
          headerRight: () => null,
        }}
      />
    </Stack.Navigator>
  );
};
const Navigation = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
      <ToastDefinition />
    </NavigationContainer>
  );
};
export default Navigation;
