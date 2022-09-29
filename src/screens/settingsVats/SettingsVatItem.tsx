import React from 'react';
import {Text, View} from 'react-native';
import {TTaxCategory} from 'src/screens/settings/d';
import style from 'src/screens/settingsVats/style';
import {formatPrice, setBackgroundColorByName} from 'src/util/utils';

const SettingsVatItem = ({
  name,
  value,
  label,
  noBorder,
}: TTaxCategory & {noBorder?: boolean}) => {
  return (
    <View style={[style.vatItemContainer, noBorder && {borderBottomWidth: 0}]}>
      <View style={style.vatItemLabelContainer}>
        <View
          style={[
            style.vatItemLabelBackground,
            {backgroundColor: setBackgroundColorByName(name)},
          ]}>
          <Text style={style.vatItemLabelText}>{label}</Text>
        </View>
      </View>
      <View style={style.vatItemsNameAndValueContainer}>
        <Text style={style.vatItemsNameText}>{name}</Text>
        <Text style={style.vatItemsValueText}>{formatPrice(value)} %</Text>
      </View>
    </View>
  );
};

export default SettingsVatItem;
