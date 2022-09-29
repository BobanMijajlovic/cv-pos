import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {TQuickMoneyPaying} from '../../screens/receiptPaying/d';

export const QuickMoneyButtons = [10, 20, 50, 100, 200, 500, 1000, 2000, 5000];

export type TQuickButtonKeyProps = {
  value: number;
  disabled?: boolean;
  icon?: string;
  round?: boolean;
  rootStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
  counter?: number;
};

export type TQuickButtonsProps = {
  isDisabled?: boolean;
  values: number[] | Partial<TQuickMoneyPaying>[];
  keyRootStyle?: StyleProp<ViewStyle>;
  keyTextStyle?: StyleProp<TextStyle>;
  rowStyle?: StyleProp<ViewStyle>;
};
