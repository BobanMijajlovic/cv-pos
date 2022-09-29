import {DefaultPropTypes} from 'react-native-progress';

export enum ProgressType {
  circleSnail = 0,
  circle = 1,
  bar = 2,
  pie = 3,
}

export type TProgressCircleSnailProps = {
  type: ProgressType;
  size?: number;
  color?: string;
} & DefaultPropTypes;
