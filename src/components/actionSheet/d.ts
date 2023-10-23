import {ActionSheetOptions} from '@expo/react-native-action-sheet';
import {StyleProp, TextStyle} from 'react-native';
import React from 'react';

export type TShowActionSheet = {
  showActionSheetWithOptions: (
    options: ActionSheetOptions,
    callback: (buttonIndex: number) => void,
  ) => void;
  onSelection: (index: number) => void;
  withTitle?: boolean;
  withMessage?: boolean;
  withIcons?: boolean;
  withSeparators?: boolean;
  withCustomStyles?: boolean;
  withAnchor?: boolean;
  useModal?: boolean;
};

type TActionSheetItemProps = {
  label: string;
  icon?: React.ReactNode;
  onPress?: () => void;
};

export type TActionSheetProps = {
  items: TActionSheetItemProps[];
  cancelButtonIndex?: number;
  destructiveButtonIndex?: number;
  title?: string;
  message?: string;
  icons?: any;
  anchor?: boolean;
  tintIcons?: boolean;
  showSeparators?: boolean;
  textStyle?: StyleProp<TextStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<TextStyle>;
  useModal?: boolean;
};
