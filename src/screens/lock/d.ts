export type TLockScreenPinCircleProps = {
  active?: boolean;
  value?: string;
  error?: boolean;
};

type TPinCircles = string[] | undefined[] | undefined;

export type TPinCirclesProps = {
  pins?: TPinCircles;
  error?: boolean;
};
