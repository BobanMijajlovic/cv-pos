import React, {
  createContext,
  useCallback,
  useRef,
  useMemo,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import {TKeyboardInternContext, TButtonHandler} from './d';
import { useFocusEffect } from "@react-navigation/native";

export const KeyboardInternContext = createContext(
  {} as TKeyboardInternContext,
);

/** button handler for performance issues recommended to be useCallback function */
export const useKeyboardInternal = (buttonHandler: TButtonHandler) => {
  const {addListener, removeListener} = useContext(KeyboardInternContext);
  useFocusEffect(
    React.useCallback(() => {
      addListener(buttonHandler);
      return () => {
        removeListener(buttonHandler);
      }
    }, [addListener, removeListener, buttonHandler])
  );

};

const KeyboardInternContainer = ({children}: {children: ReactNode}) => {
  const refListeners = useRef<TButtonHandler[]>([]);

  const onPress = useCallback(
    (key: string) => {
      refListeners.current.forEach(l => l({key}));
    },
    [refListeners],
  );

  const addListener = useCallback(
    (listener: TButtonHandler) => {
      refListeners.current = [...refListeners.current, listener];
    },
    [refListeners],
  );

  const removeListener = useCallback(
    (listener: TButtonHandler) => {
      refListeners.current = refListeners.current.filter(l => l !== listener);
    },
    [refListeners],
  );

  const value = useMemo(() => {
    return {
      onPress,
      addListener,
      removeListener,
    };
  }, [onPress, addListener, removeListener]);

  return (
    <KeyboardInternContext.Provider value={value}>
      {children}
    </KeyboardInternContext.Provider>
  );
};

export default KeyboardInternContainer;
