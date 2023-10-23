import {StyleProp, TextStyle} from 'react-native';

export type TModal = {
  rootStyle?: StyleProp<TextStyle>;
  component: any;
  visible: boolean;
  onSubmit?: any;
  hideCloseIcon?: boolean;
};
