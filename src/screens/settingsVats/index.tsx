import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import style from 'src/screens/settingsVats/style';
import SettingsVatItem from 'src/screens/settingsVats/SettingsVatItem';
import useLpfrEsir from 'src/hooks/useLPFR/useLpfrEsir';
import {Translate} from 'src/translate/data';

const SettingsVats = () => {
  const {tax} = useLpfrEsir();

  return (
    <ScrollView>
      <View style={style.root}>
        <View style={style.validFormContainer}>
          <Text
            style={
              style.validFormText
            }>{`${Translate.TR_SETTINGS_VALID_TAX_LABEL}`}</Text>
        </View>
        {tax &&
          tax.map((vat: any, key: any) => (
            <SettingsVatItem {...vat} key={key} />
          ))}
      </View>
    </ScrollView>
  );
};

export default SettingsVats;
