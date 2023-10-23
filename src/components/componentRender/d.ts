import React from 'react';
import {StyleProp, TextStyle} from 'react-native';

export type TComponentRenderProps = {
  label: string;
  value?: string | number | React.ReactNode;
  placeholder?: string;
  direction?: ComponentDirection;
  justify?: ComponentJustify;
  fullWidth?: boolean;
  labelStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
};

export enum ComponentJustify {
  CENTER,
  BETWEEN,
  AROUND,
  START,
  END,
}

export enum ComponentDirection {
  ROW,
  COLUMN,
}
