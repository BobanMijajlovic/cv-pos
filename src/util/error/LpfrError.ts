import {__isString} from 'src/util/lodash';
import {EXCEPTIONS} from 'src/util/error/d';
import {errorToast} from 'src/components/toast';

const process = (e: any) => {
  if (__isString(e)) {
    return e;
  }
  const data = e.response;
  const errorsExc = Object.values(EXCEPTIONS);
  if (data && !data?.modelState) {
    const msg = errorsExc.find(e => `${e.number}` === `${data}`)?.label;
    return msg || 'Error';
  }
  const modelState = e?.modelState;
  if (!modelState || !modelState?.length) {
    return 'Error';
  }
  const modState = modelState[0];
  if (!modState || !modState?.errors) {
    return 'Error';
  }
  const errors = modState.errors.map((x: any) =>
    errorsExc.find(e => `${e.number}` === `${x}`),
  );
  return errors[0]?.label || 'Error';
};

export const processLPFRError = (e: any) => {
  if (e) {
    const s = process(e);
    errorToast(s);
  }
};
