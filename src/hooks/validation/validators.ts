import {Translate} from 'src/translate/data';

export const isUrlValid = (url: string) =>
  /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi.test(url);

// eslint-disable-next-line max-len
export const isEmailValid = (mail: string) =>
  /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/.test(
    mail,
  );

/**
 * Validates password string.
 * Password is valid if it has at least 8 characters, contains at least 1 uppercase character and 1 number.
 * @param {*} password
 */
export const isPasswordValid = (password: string) => {
  const conditions = [
    /\d/, // must have a digit
    // /[a-z]/, // must have lowercase // doesn't need to have lowercase
    /[A-ZÀ-Ž]/, // must have uppercase
    /.{8,}/, // must be 8 chars
  ];
  return conditions.reduce((out, next) => out && next.test(password), true);
};

export const isNaN = (number: number) => {
  const n = Number(number);
  return Number.isNaN(n);
};

export const isFalsy = (value: string) =>
  !value || ['undefined', 'null'].includes(value);

export const checkBarCode = (value: string) => {
  return /\d{1,16}/.exec(value)
    ? false
    : Translate.TR_VALIDATION_BARCODE_NOT_VALID;
};

export const checkPriceValid = (value: string) => {
  const price = Number(value);
  if (isNaN(price)) {
    return Translate.TR_VALIDATION_PRICE_NOT_VALID;
  }
  if (price < 0.1) {
    return Translate.TR_VALIDATION_PRICE_NOT_VALID;
  }
  return false;
};

export const checkDescriptionValid = (value: string) => {
  let val = (value || '').replace(/\s{2,}/g, '').trim();
  return val.length > 2 ? false : Translate.TR_VALIDATION_DESC_NOT_VALID;
};

export const checkRequired = (value?: string | Date) => {
  if (!value) {
    return Translate.TR_VALIDATION_REQUIRED;
  }
  return false;
};

export const checkArrayRequired = (value?: any[]) => {
  if (!value?.length) {
    return Translate.TR_VALIDATION_REQUIRED;
  }
  return false;
};

export const checkPin = (value?: string) => {
  if (!value || value?.length < 4) {
    return Translate.TR_VALIDATION_PIN_NOT_VALID;
  }
  return false;
};

export const checkPort = (value?: string) => {
  if (value && value.length === 4) {
    return Translate.TR_VALIDATION_PORT_NOT_VALID;
  }
  return false;
};
