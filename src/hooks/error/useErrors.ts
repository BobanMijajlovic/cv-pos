import {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {LPFRactionClearAll} from 'src/store/lpfr/action';
import {TLPFRReqError} from 'src/store/lpfr/d';

export type TErrorState = {
  error?: number | string;
  isNeedToRender?: boolean;
};

let listeners: any[] = [];

let errorState: TErrorState = {};

export const useError = () => {
  const [state, setState] = useState<TErrorState>(errorState);
  const dispatch = useDispatch();

  const triggerChangeState = useCallback((data: TErrorState) => {
    errorState = data;
    for (const l of listeners) {
      l(errorState);
    }
  }, []);

  const resetState = useCallback(() => {
    triggerChangeState({
      ...state,
      isNeedToRender: false,
    });
  }, [triggerChangeState]);

  const licenceError = useCallback(
    (errorCode: number | string) => {
      if (errorCode === 90300) {
        dispatch(LPFRactionClearAll());
      }
    },
    [dispatch],
  );

  const setError = useCallback(
    (error: TLPFRReqError) => {
      const _error = error?.modelState?.[0]?.errors?.[0];
      console.log('erro state ', state.error, _error);
      if (state.error !== _error) {
        triggerChangeState({
          error: _error,
          isNeedToRender: true,
        });
        return;
      } else {
        if (state.isNeedToRender) {
          triggerChangeState({
            ...state,
            isNeedToRender: false,
          });
          return;
        }
      }
    },
    [triggerChangeState, state],
  );

  const clearErrors = useCallback(
    (error: number | string) => {
      if (error !== state.error) {
        return;
      }
      triggerChangeState({
        ...state,
        error,
      });
    },
    [triggerChangeState],
  );

  useEffect(() => {
    listeners.push(setState);
    return () => {
      listeners = listeners.filter(li => li !== setState);
    };
  }, [setState]);

  return {
    error: state.error,
    isNeedToRender: state.isNeedToRender,
    timer: 2000,
    setError,
    resetState,
    clearErrors,
  };
};
