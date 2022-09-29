import {TError, TErrorsModel} from 'src/util/error/d';
import {Translate} from 'src/translate/data';
import {__get} from 'src/util/lodash';
import {errorToast} from 'src/components/toast';
import {processLPFRError} from 'src/util/error/LpfrError';

const parseError = (error: TError[]) => {
  if (!error || !Array.isArray(error) || error.length === 0) {
    return Translate.TR_UNKNOWN_ERROR;
  }

  const data: any = {};
  for (const [, value] of Object.entries(error)) {
    if (!value.property) {
      return;
    }
    data[value.property] = Object.values(value.errors)[0];
  }
  if (Object.keys(data).length === 0) {
    return Translate.TR_UNKNOWN_ERROR;
  }
  return data;
};

const processModelError = (error: TErrorsModel) => {
  if (
    !error.modelState ||
    !Array.isArray(error.modelState) ||
    error.modelState.length === 0
  ) {
    return error.message ? error.message : Translate.TR_UNKNOWN_ERROR;
  }
  return parseError(error.modelState);
};

export const error = (error: any, validation?: any) => {
  const err = processModelError(error);
  if (typeof err === 'string') {
    return err;
  }
  let isMulti = false;
  if (validation) {
    for (const [key, value] of Object.entries(err)) {
      /** set validation for property **/
      const err = __get(Translate, value as string, Translate.TR_UNKNOWN_ERROR);
      validation.setFieldError(key, err);
      isMulti = true;
    }
  }
  if (!isMulti) {
    return error?.message ? error.message : Translate.TR_UNKNOWN_ERROR;
  }
  return void 0;
};

export const esirError = (error: any, validation?: any) => {
  const err = error(error, validation);
  if (err) {
    errorToast(err);
  }
};

export const processError = ({
  error,
  validation,
  isLPFR,
}: {
  error: any;
  validation?: any;
  isLPFR?: boolean;
}) => {
  if (isLPFR) {
    processLPFRError(error);
    return;
  }

  esirError(error, validation);
};
