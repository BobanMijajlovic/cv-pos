import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export type TEmptyTagProps = {
  model: any;
  field: string;
  placeholder?: string;
  condition?: boolean;
  format?: (value: any) => void;
  maxLength?: number;
  textStyle?: StyleProp<TextStyle>;
  rootStyle?: StyleProp<ViewStyle>;
};
