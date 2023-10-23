import {TTranslate} from 'src/translate/d';

export enum EVENTS {
  resetErrors = 'resetErrors',
  setValue = 'setValue',
  validateSubmit = 'validateSubmit',
  validateField = 'validateField',
  clearSubmit = 'clearSubmit',
  setGlobalErrors = 'setGlobalErrors',
  resetAll = 'resetAll',
  resetValue = 'resetValue',
  setFieldError = 'setFieldError',
  clearFieldError = 'clearFieldError',
}

export enum SubmitState {
  None,
  Working,
  Approved,
  Refused,
}

export type TChangeValuePayload<T> = {
  value?: string;
  field: keyof T;
};

export type TReducerAction<T> = {
  type: EVENTS;
  payload?:
    | string
    | TChangeValuePayload<T>
    | boolean
    | Date
    | number
    | Partial<T>
    | keyof T;
};

export type TValidationField = {
  error: boolean | string;
  dirty?: boolean;
  value: string | Date | number | boolean;
  validationRule: (value?: any) => boolean | string;
};

export type TFields<T> = {
  [key in keyof T]: TValidationField;
};

export type TSetFieldError<T> = {
  error: string;
  field: keyof T;
};

export type TValidation<T> = {
  submit: SubmitState;
  error: string | boolean;
  fields: TFields<T>;
};

export type TValidationRules<T> = {
  [key in keyof Partial<T>]: (value?: any) => boolean | string | TTranslate;
};
