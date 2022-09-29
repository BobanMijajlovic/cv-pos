import React from 'react';
import {View} from 'react-native';
import style from 'src/screens/settingsVats/style';
import {
  iconFontAwesomeCashRegister,
  iconFontAwesomeUsers,
  iconFontAwesomeInfo,
  iconFontAwesomeServer,
} from 'src/icon';
import BottomTabs from 'src/components/bottomTabs';
import Users from 'src/screens/users';
import About from 'src/screens/about';
import SettingsVats from 'src/screens/settingsVats';
import {Translate} from 'src/translate/data';
import Server from 'src/screens/server';

const Settings = () => {
  return (
    <View style={style.root}>
      <BottomTabs
        buttomsTab={[
          {
            component: SettingsVats,
            name: Translate.TR_SETTINGS_TAB_VATS_LABEL,
            icon: iconFontAwesomeCashRegister,
          },
          {
            component: Users,
            name: Translate.TR_SETTINGS_TAB_CASHIERS_LABEL,
            icon: iconFontAwesomeUsers,
          },
          {
            component: About,
            name: Translate.TR_SETTINGS_TAB_ABOUT_LABEL,
            icon: iconFontAwesomeInfo,
          },
          {
            component: Server,
            name: Translate.TR_SETTINGS_TAB_SERVER_LABEL,
            icon: iconFontAwesomeServer,
          },
        ]}
      />
    </View>
  );
};

export default Settings;
