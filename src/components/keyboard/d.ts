import {ReactNode} from 'react';
import {TouchableHighlightProps, StyleProp, TextStyle} from 'react-native';

export type TKeyboardInternContext = {
  onPress: (key: string) => void;
  addListener: (listener: TButtonHandler) => void;
  removeListener: (listener: TButtonHandler) => void;
};

export enum KeyboardKeys {
  KEY_NUMBER_0 = '0',
  KEY_NUMBER_1 = '1',
  KEY_NUMBER_2 = '2',
  KEY_NUMBER_3 = '3',
  KEY_NUMBER_4 = '4',
  KEY_NUMBER_5 = '5',
  KEY_NUMBER_6 = '6',
  KEY_NUMBER_7 = '7',
  KEY_NUMBER_8 = '8',
  KEY_NUMBER_9 = '9',
  KEY_NUMBER_DOT = '.',
  KEY_NUMBER_CLEAR = 'C',
  KEY_NUMBER_PLU = 'PLU',
  KEY_NUMBER_X = 'X',
  KEY_NUMBER_EMPTY = '',
}

export const NumericKeyboardKeys = [
  KeyboardKeys.KEY_NUMBER_1,
  KeyboardKeys.KEY_NUMBER_2,
  KeyboardKeys.KEY_NUMBER_3,
  KeyboardKeys.KEY_NUMBER_4,
  KeyboardKeys.KEY_NUMBER_5,
  KeyboardKeys.KEY_NUMBER_6,
  KeyboardKeys.KEY_NUMBER_7,
  KeyboardKeys.KEY_NUMBER_8,
  KeyboardKeys.KEY_NUMBER_9,
  KeyboardKeys.KEY_NUMBER_DOT,
  KeyboardKeys.KEY_NUMBER_0,
  KeyboardKeys.KEY_NUMBER_CLEAR,
];

export const KeyboardKeysSelling = [
  KeyboardKeys.KEY_NUMBER_PLU,
  KeyboardKeys.KEY_NUMBER_EMPTY,
  KeyboardKeys.KEY_NUMBER_CLEAR,
  KeyboardKeys.KEY_NUMBER_1,
  KeyboardKeys.KEY_NUMBER_2,
  KeyboardKeys.KEY_NUMBER_3,
  KeyboardKeys.KEY_NUMBER_4,
  KeyboardKeys.KEY_NUMBER_5,
  KeyboardKeys.KEY_NUMBER_6,
  KeyboardKeys.KEY_NUMBER_7,
  KeyboardKeys.KEY_NUMBER_8,
  KeyboardKeys.KEY_NUMBER_9,
  KeyboardKeys.KEY_NUMBER_DOT,
  KeyboardKeys.KEY_NUMBER_0,
  KeyboardKeys.KEY_NUMBER_X,
];

export type TButtonEvent = {
  key: string;
};

export type TButtonHandler = (data: TButtonEvent) => void;

export type TButtonProps = {
  children: ReactNode;
  keyString: string;
} & TouchableHighlightProps;

export type TNumericKeyProps = {
  value: string;
  disabled?: boolean;
  round?: boolean;
  rootStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
  notDisableClear?: boolean;
};

export type TNumericKeyboardProps = {
  type?: 'selling';
  disabled?: boolean;
  rootStyle?: StyleProp<TextStyle>;
  rowStyle?: StyleProp<TextStyle>;
  keyRootStyle?: StyleProp<TextStyle>;
  keyTextStyle?: StyleProp<TextStyle>;
  notDisableClear?: boolean;
  disabledValues?: string[];
};
