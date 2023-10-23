import {useReducer, useCallback, useRef, useEffect, useMemo} from 'react';
import {
  TValidation,
  TReducerAction,
  EVENTS,
  SubmitState,
  TChangeValuePayload,
  TFields,
  TValidationRules,
  TSetFieldError,
} from './d';
import {NativeSyntheticEvent, TextInputFocusEventData} from 'react-native';

const EmptyRule = (_value?: string) => false;

const reducer = <T>(
  state: TValidation<T>,
  action: TReducerAction<T>,
): TValidation<T> => {
  switch (action.type) {
    default:
      return state;

    case EVENTS.resetAll: {
      const fields = Object.keys(state.fields).reduce((acc, x) => {
        return {
          ...acc,
          [x]: {
            ...(state.fields as TFields<T>)[x as keyof T],
            error: false,
            dirty: false,
            value: (action.payload as T)[x as keyof T],
          },
        };
      }, {} as TFields<T>) as TFields<T>;
      return {
        ...state,
        submit: SubmitState.None,
        error: false,
        fields,
      };
    }

    case EVENTS.setGlobalErrors:
      return {
        ...state,
        error: action.payload as string,
      };

    case EVENTS.clearSubmit:
      return {
        ...state,
        submit: SubmitState.Working,
      };

    case EVENTS.validateField: {
      const {payload} = action;
      const {field} = payload as TChangeValuePayload<T>;
      const validation = state.fields[field].validationRule || EmptyRule;
      const prev = state.fields[field];
      return {
        ...state,
        fields: {
          ...state.fields,
          [field]: {
            ...prev,
            error: validation(prev.value),
          },
        },
      };
    }

    case EVENTS.resetValue: {
      const {payload} = action;
      const {field, value} = payload as TChangeValuePayload<T>;
      const prev = state.fields[field];
      return {
        ...state,
        error: false,
        fields: {
          ...state.fields,
          [field]: {
            ...prev,
            dirty: false,
            value,
            error: false,
          },
        },
      };
    }

    case EVENTS.setValue: {
      const {payload} = action;
      const {field, value} = payload as TChangeValuePayload<T>;
      const validation = state.fields[field].validationRule || EmptyRule;
      const prev = state.fields[field];
      return {
        ...state,
        error: false,
        fields: {
          ...state.fields,
          [field]: {
            ...prev,
            value,
            error: !prev.dirty ? false : validation(value),
          },
        },
      };
    }

    case EVENTS.validateSubmit: {
      const _state = {
        ...state,
        fields: Object.keys(state.fields).reduce((acc: TFields<T>, f) => {
          const prev = state.fields[f as keyof T];
          const validation = prev.validationRule || EmptyRule;
          return {
            ...acc,
            [f]: {
              ...prev,
              dirty: true,
              error: validation(prev.value),
            },
          };
        }, {} as TFields<T>),
      };
      const _submit = Object.keys(_state.fields).every(
        f => !_state.fields[f as keyof T].error,
      );
      return {
        ..._state,
        submit: _submit ? SubmitState.Approved : SubmitState.Refused,
      };
    }

    case EVENTS.resetErrors: {
      return {
        ...state,
        error: false,
        fields: Object.keys(state.fields).reduce((acc: TFields<T>, f) => {
          const prev = state.fields[f as keyof T];
          return {
            ...acc,
            [f]: {
              ...prev,
              error: false,
            },
          };
        }, {} as TFields<T>),
      };
    }

    case EVENTS.clearFieldError: {
      const {payload} = action;
      const field = payload as keyof T;
      const prev = state.fields[field];
      return {
        ...state,
        error: false,
        fields: {
          ...state.fields,
          [field]: {
            ...prev,
            dirty: false,
            error: false,
          },
        },
      };
    }

    case EVENTS.setFieldError: {
      const {payload} = action;
      const {field, error} = payload as TSetFieldError<T>;
      const prev = state.fields[field];
      return {
        ...state,
        fields: {
          ...state.fields,
          [field]: {
            ...prev,
            dirty: true,
            error,
          },
        },
      };
    }
  }
};

export type TPromiseReturn<T> = TFields<T>;

const useValidation = <T>(
  validationObject: T,
  validationRules: TValidationRules<T> = {} as TValidationRules<T>,
) => {
  const refSubmitPromise = useRef<any>(null);
  const refLastData = useRef<any>();

  // @ts-ignore
  const [formData, dispatchReducer]: [
    TValidation<T>,
    (s: TReducerAction<T>) => void,
  ] = useReducer<any>(reducer, {
    submit: false,
    error: false,
    fields: Object.keys(validationObject).reduce((acc, field) => {
      const value = validationObject[field as keyof T];
      return {
        ...acc,
        [field]: {
          error: false,
          dirty: false,
          value,
          validationRule: validationRules[field as keyof T] || EmptyRule,
        },
      };
    }, {} as TFields<T>),
  });

  const {submit: submitState, error: errorGlobal, fields} = formData;

  const fieldsString = useRef(Object.keys(validationObject));
  useEffect(() => {
    refLastData.current = fields;
  }, [fields, refLastData]);

  const resetData = useCallback(
    (data: Partial<T>) => {
      dispatchReducer({
        type: EVENTS.resetAll,
        payload: data,
      });
    },
    [dispatchReducer],
  );

  const onChange = useCallback(
    (value: string | Date | boolean | number, field: keyof T) => {
      dispatchReducer({
        type: EVENTS.setValue,
        payload: {
          value,
          field,
        } as TChangeValuePayload<T>,
      } as TReducerAction<T>);
    },
    [dispatchReducer],
  );

  const resetValueField = useCallback(
    (
      value: string | Date | boolean | number | null | undefined,
      field: keyof T,
    ) => {
      dispatchReducer({
        type: EVENTS.resetValue,
        payload: {
          value,
          field,
        } as TChangeValuePayload<T>,
      } as TReducerAction<T>);
    },
    [dispatchReducer],
  );

  const onBlurField = useCallback(
    (field: keyof T) => {
      dispatchReducer({
        type: EVENTS.validateField,
        payload: {
          field,
        },
      });
    },
    [dispatchReducer],
  );

  const setGlobalError = useCallback(
    (payload: string) => {
      dispatchReducer({
        type: EVENTS.setGlobalErrors,
        payload,
      });
    },
    [dispatchReducer],
  );

  const submit = useCallback(async () => {
    dispatchReducer({
      type: EVENTS.resetErrors,
    });

    return new Promise<TFields<T>>(resolve => {
      refSubmitPromise.current && refSubmitPromise.current(false);
      refSubmitPromise.current = resolve;
      dispatchReducer({
        type: EVENTS.validateSubmit,
      });
    });
  }, [dispatchReducer, refSubmitPromise]);

  useEffect(() => {
    if (submitState !== SubmitState.Working) {
      refSubmitPromise.current &&
        refSubmitPromise.current(
          submitState === SubmitState.Approved ? refLastData.current : false,
        );
      refSubmitPromise.current = null;
      dispatchReducer({
        type: EVENTS.clearSubmit,
      });
    }
  }, [refSubmitPromise, submitState, dispatchReducer, refLastData]);

  const onChangesTexts = useMemo(() => {
    return fieldsString.current.reduce((acc, f) => {
      return {
        ...acc,
        [f]: (text: string) => onChange(text, f as keyof T),
      };
    }, {}) as {[key in keyof T]: (text: string) => void};
  }, [onChange, fieldsString]);

  const onBlurs = useMemo(() => {
    return fieldsString.current.reduce((acc, f) => {
      return {
        ...acc,
        [f]: (e: NativeSyntheticEvent<TextInputFocusEventData>) =>
          onBlurField(f as keyof T),
      };
    }, {}) as {[key in keyof T]: () => void};
  }, [onBlurField, fieldsString]);

  const setFieldError = useCallback(
    (field: keyof T, error: string) => {
      dispatchReducer({
        type: EVENTS.setFieldError,
        payload: {
          field,
          error,
        } as TSetFieldError<T>,
      });
    },
    [dispatchReducer],
  );

  const clearFieldError = useCallback(
    (payload: keyof T) => {
      dispatchReducer({
        type: EVENTS.clearFieldError,
        payload,
      });
    },
    [dispatchReducer],
  );

  return {
    onChange,
    onBlurField,
    errorGlobal,
    fields,
    submit,
    setGlobalError,
    onBlurs,
    onChangesTexts,
    resetData,
    resetValueField,
    setFieldError,
    clearFieldError,
  };
};

export const TypeUseValidation = <T>() => {
  return useValidation({} as T);
};

export default useValidation;
