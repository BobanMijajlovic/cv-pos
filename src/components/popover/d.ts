import {StyleProp, TextStyle} from 'react-native';
import React from 'react';

export type TPopoverModal = {
  contentStyle?: StyleProp<TextStyle>;
  arrowStyle?: StyleProp<TextStyle>;
  backgroundStyle?: StyleProp<TextStyle>;
  onClose?: () => void;
  component: any;
  componentRenderProps?: any;
  placement: 'top' | 'end' | 'bottom' | 'start';
};

export type TPopover = {
  children: (
    showPopUp: (e: any) => void,
    ref: React.MutableRefObject<any>,
  ) => React.ReactNode;
} & TPopoverModal;

export type TPopoverIcon = {
  iconStyle?: StyleProp<TextStyle>;
  icon: string;
} & TPopoverModal;
