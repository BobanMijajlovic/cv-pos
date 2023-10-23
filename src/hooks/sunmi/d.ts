export enum SunmiTextAlign {
  LEFT = 0,
  CENTER = 1,
  RIGHT = 2,
}

export type TSunmiPrintText = {
  text: string;
  align?: SunmiTextAlign;
  fontSize?: number;
  isOriginal?: boolean;
};
