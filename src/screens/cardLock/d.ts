export type TLockScreenPinCircleProps = {
  active?: boolean;
  value?: string;
  error?: boolean;
  visibility?: boolean;
};

type TPinCircles = string[] | undefined[] | undefined;

export type TPinCirclesProps = {
  pins?: TPinCircles;
  error?: boolean;
  visible?: boolean;
};

export type TCardLockContext = {
  visibility?: boolean;
  pins: TPinCircles;
  error?: boolean;
  onVerifyPin: () => Promise<void>;
  setVisibility: () => void;
};
