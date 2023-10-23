import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useState, useMemo} from 'react';
import {ReceiptSearchNavName} from '../../navigation/d';
import {Text, View, TouchableOpacity, Animated} from 'react-native';
import style from './style';
import ButtonIcon from '../../components/button/ButtonIcon';
import {ButtonFill} from '../../components/button/d';
import {Colors} from '../../constants/Colors';
import {
  iconFontAwesomeSearch,
  iconFontAwesomeArrowCircleDown,
  iconFontAwesomeArrowCircleUp,
  iconFontAwesomeKeyboard,
} from '../../icon';
import Collapsible1 from 'src/components/collapsible';
import ReceiptInfo from 'src/screens/receipt/ReceiptInfo';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Translate} from 'src/translate/data';
import { useDispatch } from "react-redux";
import { _actionApplicationToggleKeyboardSimulation } from "src/store/Application/action";

const ReceiptHeader = () => {
  const {navigate} = useNavigation();
  const openSearch = useCallback(
    () => navigate(ReceiptSearchNavName),
    [navigate],
  );

  const dispatch = useDispatch()

  const toggleOpenKeyboardSimulation = useCallback(()=> {
      dispatch(_actionApplicationToggleKeyboardSimulation())
  },[dispatch])

  const [isCollapsed, setCollapsed] = useState(false);

  const handlerPress = useCallback(() => setCollapsed(v => !v), [setCollapsed]);

  const icon = useMemo(
    () =>
      !isCollapsed
        ? iconFontAwesomeArrowCircleDown
        : iconFontAwesomeArrowCircleUp,
    [isCollapsed],
  );

  return (
    <>
      <View style={style.header}>
        <ButtonIcon
          fill={ButtonFill.OUTLINE}
          color={Colors.PALETTE.BLUE._700}
          onPress={openSearch}
          icon={iconFontAwesomeSearch}
        />

        <ButtonIcon
          fill={ButtonFill.OUTLINE}
          color={Colors.PALETTE.BLUE._600}
          onPress={toggleOpenKeyboardSimulation}
          icon={iconFontAwesomeKeyboard}
        />

        <TouchableOpacity onPress={handlerPress}>
          <View style={style.receiptHeaderInfoContainer}>
            <Text style={style.receiptHeaderInfoText}>
              {Translate.TR_RECEIPT_HEADER_RECEIPT_DATA}
            </Text>
            <FontAwesome5Icon name={icon} style={style.receiptHeaderIcon} />
          </View>
        </TouchableOpacity>
      </View>
      <Animated.View style={style.receiptCollapsibleContainer}>
        {/* <Collapsible align={'center'} collapsed={isCollapsed}>
          <ReceiptInfo />
        </Collapsible>*/}
      </Animated.View>
      <Collapsible1 collapsed={isCollapsed}>
        <ReceiptInfo />
      </Collapsible1>
    </>
  );
};

export default ReceiptHeader;
