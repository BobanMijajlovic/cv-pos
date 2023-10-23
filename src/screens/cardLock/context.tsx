import React, {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {TCardLockContext} from 'src/screens/cardLock/d';
import {useNumericKeyboard} from 'src/hooks/keyboard/useKeyboard';
import {TButtonEvent} from 'src/components/keyboard/d';
import {useKeyboardInternal} from 'src/components/keyboard/context';
import useLPFRFunctions from 'src/hooks/useLPFR/useLPFRFunctions';

export const CardLockContext = createContext({} as TCardLockContext);

const CardLockContextContainer = ({children}: {children: ReactNode}) => {
  const [visibility, setVisibility] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [pins, setPins] = useState<string[] | undefined>([]);
  const {processKeyboard} = useNumericKeyboard();
  const {verifyPin} = useLPFRFunctions();

  const resetPins = useCallback(() => {
    setPins([]);
    setError(false);
  }, [setError, setPins]);

  const handlerChangeVisibility = useCallback(() => {
    setVisibility(v => !v);
  }, [setVisibility]);

  const handlerKeyboard = useCallback(
    ({key}: TButtonEvent) => {
      if (error) {
        resetPins();
        setVisibility(false);
      }
      const value = processKeyboard(key, '', 0);
      setPins((v: any) => {
        if (v && v?.length > 3 && key !== 'C') {
          return v;
        }
        if (key === 'C') {
          return [];
        }
        return [...v, value.replace('.', '')];
      });
      setError(false);
    },
    [processKeyboard, setPins, setError, error, resetPins],
  );

  useKeyboardInternal(handlerKeyboard);

  const onVerifyPin = useCallback(async () => {
    let str = pins?.join('') || '';
    if (str.length !== 4) {
      return;
    }
    //str = '6385';
    resetPins();
    await verifyPin(str);
  }, [verifyPin, pins, resetPins]);

  const data = useMemo(
    () => ({
      setVisibility: handlerChangeVisibility,
      resetPins,
      handlerKeyboard,
      visibility,
      pins,
      error,
      onVerifyPin,
    }),
    [
      handlerChangeVisibility,
      resetPins,
      handlerKeyboard,
      visibility,
      pins,
      error,
      onVerifyPin,
    ],
  );

  return (
    <CardLockContext.Provider value={data}>{children}</CardLockContext.Provider>
  );
};

export default CardLockContextContainer;
