import {DatePickerProps} from 'react-native-date-picker';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export type IOSDatePickerMode = 'date' | 'time' | 'datetime' | 'countdown';
export type AndroidDatePickerMode = 'date' | 'time';
export type DatePickerDisplay = 'spinner' | 'default' | 'clock' | 'calendar';

export type TDatePickerProps = {
  setDate?: (date: Date) => void;
  rootStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  dateLabelStyle?: StyleProp<TextStyle>;
  dateTextStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
  mode?: string;
  label?: string;
  autoClose?: boolean;
  title?: string;
  date?: Date;
  error?: string | boolean;
  useLabel?: boolean;
  useHelperText?: boolean;
};

export enum DateModes {
  DATE = 'date',
  DATE_TIME = 'datetime',
  TIME = 'time',
}
