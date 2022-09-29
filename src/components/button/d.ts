import {ReactChild} from 'react';
import {ColorValue, StyleProp, TextStyle} from 'react-native';

export enum ButtonFill {
  CLEAR = 'clear',
  OUTLINE = 'outline',
  SOLID = 'solid',
}

export enum ButtonType {
  primary = 'primary',
  secondary = 'secondary',
  link = 'link',
}

export type TButton = {
  type?: ButtonType;
  title: string;
  fill: ButtonFill;
  onPress: (e: any) => void;
  upperCase: boolean;
  bold: boolean;
  color: ColorValue;
  rootStyle: StyleProp<TextStyle>;
  titleStyle: StyleProp<TextStyle>;
  children: ReactChild;
  disabled?: boolean;
  round?: boolean;
  forwardedRef?: any;
  icon?: string;
  iconStyle: StyleProp<TextStyle>;
};

export type TButtonIcon = {
  type?: ButtonType;
  fill?: ButtonFill;
  round?: boolean;
  onPress: () => void;
  color?: ColorValue;
  rootStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<TextStyle>;
  icon: string;
  disabled?: boolean;
  ref?: any;
  forwardedRef?: any;
  onLayout?: any;
};
