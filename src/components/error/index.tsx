import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {
  _selectorLPFRError,
  _selectorLPFRIsError,
  _selectorLPFRPin,
} from 'src/store/lpfr/helpers';
import {useError} from 'src/hooks/error/useErrors';
import {useProgress} from 'src/hooks/progress/useProgress';
import {processError} from 'src/util/error';

const Errors = () => {
  const errors = useSelector(_selectorLPFRError);
  const pin = useSelector(_selectorLPFRPin);
  const isError = useSelector(_selectorLPFRIsError);
  const {setError, error, isNeedToRender, resetState} = useError();
  const {isProgress, endProgress} = useProgress();
  const counter = useRef(0);

  useEffect(() => {
    if (isNeedToRender && error) {
      processError({
        error: {
          response: error,
        },
        isLPFR: true,
      });
      isProgress && endProgress();
    }
  }, [isProgress, endProgress, error, isNeedToRender]);

  useEffect(() => {
    if (error === 2400 || !pin?.length) {
      return;
    }

    if (counter.current === 0 && error && isError && error !== 2400) {
      setError(errors);
      counter.current++;
      return;
    }
    if (counter.current > 10) {
      counter.current = 0;
      resetState();
      return;
    }
    counter.current++;
  }, [pin, error, resetState, counter, setError, errors, isError]);

  return <></>;
};

export default Errors;
