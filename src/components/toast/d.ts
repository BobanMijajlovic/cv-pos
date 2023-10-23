import {ViewStyle, StyleProp, TextStyle} from 'react-native';
import React from 'react';

export enum ToastType {
  success = 'success',
  error = 'error',
  info = 'info',
  custom = 'custom',
}

export enum ToastPosition {
  top = 'top',
  bottom = 'bottom',
}

export type TToastModalProps = {
  contentContainerStyle?: StyleProp<ViewStyle>;
  text1Style?: StyleProp<TextStyle>;
  text2Style?: StyleProp<TextStyle>;
  activeOpacity?: number;
  height?: number;
};

export type TToastModal = {
  type: ToastType;
  position?: ToastPosition;
  title?: string;
  message: string;
  visibilityTime?: number;
  autoHide?: boolean;
  topOffset?: number;
  bottomOffset?: number;
  style?: StyleProp<ViewStyle>;
  props?: TToastModalProps;
  closeIcon?: boolean;
  Component?: any;
};

export type TToastProps = {
  rootStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  messageStyle?: StyleProp<TextStyle>;
  closeIconStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  title?: string;
  message?: string;
  icon?: string;
  closeIcon?: boolean;
  type?: ToastType;
  props?: any;
  onShow?: () => void;
  onHide?: () => void;
  onPress?: () => void;
};
