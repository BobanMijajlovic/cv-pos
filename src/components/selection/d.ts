import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {PickerProps, DatePickerProps} from 'react-native-woodpicker';

export type TSelectionProps = {
  label?: string;
  hideLabel?: boolean;
  labelStyle?: StyleProp<TextStyle>;
  error?: string | boolean;
  rootStyle?: StyleProp<ViewStyle>;
  errorStyle?: StyleProp<TextStyle>;
  selectionStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<TextStyle>;
} & PickerProps;

export type TSelectionDateProps = {
  label?: string;
  hideLabel?: boolean;
  labelStyle?: StyleProp<TextStyle>;
  error?: string | boolean;
  rootStyle?: StyleProp<ViewStyle>;
  errorStyle?: StyleProp<TextStyle>;
  selectionStyle?: StyleProp<ViewStyle>;
  text?: string;
} & Omit<DatePickerProps, 'text'>;

export const NO_SELECT_LABEL = '- select date -';
