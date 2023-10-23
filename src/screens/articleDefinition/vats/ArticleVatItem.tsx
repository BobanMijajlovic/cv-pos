import React, {
  useCallback,
  useEffect
} from 'react';
import {View} from 'react-native';
import {TTaxCategory} from 'src/screens/settings/d';
import style from './style';

import SettingsVatItem from 'src/screens/settingsVats/SettingsVatItem';
//@ts-ignore
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Colors} from 'src/constants/Colors';

const ArticleVatItem = ({
  name,
  value,
  label,
  setChecked,
  disabled,
  isChecked,
}: TTaxCategory & {
  setChecked: (label: string, checked?: boolean) => void;
  disabled?: boolean;
  isChecked: boolean;
}) => {
  const onCheck = useCallback(
    (checked?: boolean) => {
      setChecked(label, checked);
    },
    [setChecked, label],
  );

  return (
    <View style={[style.articleVatContainer, disabled && style.disabled]}>
      <View style={style.articleVatDef}>
        <SettingsVatItem name={name} value={value} label={label} noBorder />
      </View>
      <View style={style.articleVatCheck}>
        <BouncyCheckbox
          size={25}
          useNativeDriver
          isChecked={isChecked}
          disableBuiltInState
          fillColor={Colors.PALETTE.BLUE._700}
          unfillColor={Colors.WHITE}
          iconStyle={{borderColor: Colors.PALETTE.BLUE._700}}
          onPress={onCheck}
          disabled={disabled}
        />
      </View>
    </View>
  );
};

export default ArticleVatItem;
