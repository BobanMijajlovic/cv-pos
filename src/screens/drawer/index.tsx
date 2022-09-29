import React, {useCallback} from 'react';
import {Animated, View} from 'react-native';
import {iconFontAwesomeTimes} from 'src/icon';
import style from './style';
import Dashboard from '../dashboard';
import {useNavigation} from '@react-navigation/native';
import ButtonIcon from '../../components/button/ButtonIcon';
import {ButtonFill} from '../../components/button/d';
import {Colors} from '../../constants/Colors';

export const DrawerCloseButton = () => {
  const {goBack} = useNavigation();

  const openDrawer = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <ButtonIcon
      fill={ButtonFill.CLEAR}
      color={Colors.PALETTE.BLUE._700}
      onPress={openDrawer}
      icon={iconFontAwesomeTimes}
      iconStyle={style.iconStyle}
    />
  );
};

const Drawer = () => {
  return (
    <Animated.View style={style.drawerRoot}>
      <View style={style.drawerContainer}>
        <Dashboard />
      </View>
    </Animated.View>
  );
};

export default Drawer;
