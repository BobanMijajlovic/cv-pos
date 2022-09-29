import React from 'react';
import {StyleProp, TextInputProps, TextStyle, ViewStyle} from 'react-native';
import {TTranslate} from 'src/translate/d';

export type TInputProps = {
  label?: string;
  hideLabel?: boolean;
  labelStyle?: StyleProp<TextStyle>;
  disable?: boolean;
  error?: string | boolean;
  setRef?: (r: any) => void;
  rootStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
  iconRightStyle?: StyleProp<TextStyle>;
  iconLeftStyle?: StyleProp<TextStyle>;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  translate?: TTranslate;
} & TextInputProps;

export type TInputPropsPriceQuantity = {
  decPosition?: number;
} & TInputProps;

export type TInputSearchProps = {
  timeOutTrigger?: number;
} & TInputProps;
