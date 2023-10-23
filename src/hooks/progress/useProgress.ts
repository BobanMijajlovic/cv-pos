import {useDispatch, useSelector} from 'react-redux';
import {_selectorProgress} from 'src/store/Application/helpers';
import {useCallback, useRef} from 'react';
import {_actionApplicationSetProgress} from 'src/store/Application/action';
import {TProgress} from 'src/store/Application/d';

const TIMEOUT = 750;
export const useProgress = () => {
  const dispatch = useDispatch();
  const progress = useSelector(_selectorProgress);
  const {isProgress, timer, text} = progress;
  const refData = useRef({
    time: Date.now(),
    tm: 0,
  });

  const setProgress = useCallback(
    (text?: string, timer?: number) => {
      dispatch(_actionApplicationSetProgress({isProgress: true, timer, text}));
      refData.current.time = Date.now();
      clearTimeout(refData.current.tm);
    },
    [dispatch, refData],
  );
  const resetProgress = useCallback(() => {
    dispatch(_actionApplicationSetProgress({isProgress: false}));
    clearTimeout(refData.current.tm);
  }, [dispatch, refData]);

  const endProgress = useCallback(() => {
    const time = Date.now();
    const tt = time - refData.current.time;
    if (tt > TIMEOUT) {
      resetProgress();
    } else {
      refData.current.tm = setTimeout(resetProgress, TIMEOUT - tt) as any;
    }
  }, [refData, resetProgress]);

  return {
    isProgress,
    timer,
    text,
    setProgress,
    resetProgress,
    endProgress,
  };
};
