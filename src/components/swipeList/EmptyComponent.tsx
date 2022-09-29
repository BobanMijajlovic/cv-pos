import React, { useCallback } from 'react';
import style from './style';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {
  iconFontAwesomeSearch,
  iconFontAwesomeKeyboard
} from '../../icon';
import {
  Text,
  View
} from 'react-native';
import { Translate } from '../../translate/data';
import {
  TEmptyListComponent,
  EmptyTypes
} from './d';
import { useDispatch } from "react-redux";
import { _actionApplicationToggleKeyboardSimulation } from "src/store/Application/action";
import ButtonIcon from "src/components/button/ButtonIcon";
import { ButtonFill } from "src/components/button/d";
import { Colors } from "src/constants/Colors";

const EmptyComponent = ({emptyIcon, emptyTitle, type}: TEmptyListComponent) => {

  const dispatch = useDispatch()

  const toggleOpenKeyboardSimulation = useCallback(()=> {
         dispatch(_actionApplicationToggleKeyboardSimulation())
  },[dispatch])

  return (
    <View style={style.emptyListContainer}>
      <FontAwesome5Icon
        name={emptyIcon ? emptyIcon : iconFontAwesomeSearch}
        style={style.emptyIcon}
      />
      <Text style={style.emptyListText}>
        {emptyTitle ? emptyTitle : Translate.TR_LIST_ITEM_EMPTY_LABEL}
      </Text>


      {
        type === EmptyTypes.receipt && <ButtonIcon
        rootStyle={[style.iconKeyboardRoot]}
        iconStyle={[style.iconKeyboardIcon]}
        fill={ButtonFill.OUTLINE}
        color={Colors.PALETTE.BLUE._600}
        onPress={toggleOpenKeyboardSimulation}
        icon={iconFontAwesomeKeyboard}
      />
      }

    </View>
  );
};

export default EmptyComponent;
