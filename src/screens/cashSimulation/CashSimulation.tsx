import React, {useCallback, useState, useEffect, useRef} from 'react';

import NumericKeyboard from 'src/components/keyboard/NumericKeyboard';
import style from './style';
import {TButtonEvent, KeyboardKeys} from 'src/components/keyboard/d';
import {useKeyboardInternal} from 'src/components/keyboard/context';
import {useFocusEffect} from '@react-navigation/native';
import {useReceipt} from 'src/hooks/receipt/useReceipt';
import * as ArticleTable from 'src/database/Article';
import {TSimulationState} from 'src/screens/cashSimulation/d';
import DisplaySimulation from 'src/screens/cashSimulation/DisplaySimulation';
import {_selectorApplicationIsKeyboardSimulation} from 'src/store/Application/helpers';
import {useSelector, useDispatch} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import {_actionApplicationOpenKeyboardSimulation} from 'src/store/Application/action';

const CLEAR_STATE = {
  value: '',
  quantity: 0,
  error: '',
  findPlu: false,
};

const processKey = (key: KeyboardKeys, currentState: TSimulationState) => {
  if (currentState.error) {
    return currentState;
  }
  switch (key) {
    default:
      return currentState;
    case KeyboardKeys.KEY_NUMBER_CLEAR:
      return CLEAR_STATE;

    case KeyboardKeys.KEY_NUMBER_X: {
      if (currentState.quantity) {
        return currentState;
      }
      const number = Number(currentState.value);
      if (isNaN(number)) {
        return {
          ...CLEAR_STATE,
          quantity: 1,
        };
      }
      if (number > 9999999) {
        return {
          ...CLEAR_STATE,
          error: 'PREVELIKA VREDNOST',
        };
      }

      return {
        ...CLEAR_STATE,
        quantity: number,
      };
    }

    case KeyboardKeys.KEY_NUMBER_DOT: {
      if (currentState.quantity) {
        return currentState;
      }
      if (!currentState.value) {
        return {
          ...currentState,
          findPlu: false,
          value: '0.',
        };
      }
      const index = currentState.value.indexOf('.');
      if (index !== -1) {
        return currentState;
      }
      const number = Number(currentState.value);
      if (isNaN(number)) {
        return {
          ...currentState,
          findPlu: false,
          value: '0.',
        };
      }
      if (number > 9999999) {
        return {
          ...CLEAR_STATE,
          error: 'PREVELIKA VREDNOST',
        };
      }

      return {
        ...CLEAR_STATE,
        value: `${number}.`,
      };
    }

    case KeyboardKeys.KEY_NUMBER_PLU: {
      const number = Number(currentState.value);
      if (
        !currentState.value ||
        currentState.value.indexOf('.') !== -1 ||
        isNaN(number) ||
        !number
      ) {
        return {
          ...currentState,
          error: 'POGRESNA VREDNOST',
        };
      }

      return {
        ...currentState,
        findPlu: true,
      };
    }

    case KeyboardKeys.KEY_NUMBER_0:
    case KeyboardKeys.KEY_NUMBER_1:
    case KeyboardKeys.KEY_NUMBER_2:
    case KeyboardKeys.KEY_NUMBER_3:
    case KeyboardKeys.KEY_NUMBER_4:
    case KeyboardKeys.KEY_NUMBER_5:
    case KeyboardKeys.KEY_NUMBER_6:
    case KeyboardKeys.KEY_NUMBER_7:
    case KeyboardKeys.KEY_NUMBER_8:
    case KeyboardKeys.KEY_NUMBER_9: {
      const splits = currentState.value.split('.');
      if (splits.length === 2) {
        if (splits[1].length === 3) {
          return currentState;
        }
      } else {
        if (currentState.value.length > 15) {
          return currentState;
        }
      }
      return {
        ...currentState,
        findPlu: false,
        value: currentState.value + key,
      };
    }
  }
};

const CashSimulation = () => {
  const [data, setData] = useState<TSimulationState>({
    ...CLEAR_STATE,
  });

  const isVisible = useSelector(_selectorApplicationIsKeyboardSimulation);
  const dispatch = useDispatch();

  const {addItem} = useReceipt();

  const {error, findPlu} = data;

  const thError = useRef<any>(0);
  const refData = useRef(data);
  refData.current = data;

  useEffect(() => {
    if (!error) {
      clearTimeout(thError.current);
      return;
    }
    clearTimeout(thError.current);
    thError.current = setTimeout(() => {
      setData({
        ...CLEAR_STATE,
      });
    }, 2500);
  }, [error, setData, thError]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        dispatch(_actionApplicationOpenKeyboardSimulation(false));
        clearTimeout(thError.current);
      };
    }, [dispatch]),
  );

  useEffect(() => {
    if (!findPlu) {
      return;
    }
    const fn = async () => {
      /// find article and set in receipt
      const item = await ArticleTable.getByBarCode(refData.current.value);
      if (!item) {
        setData({
          ...CLEAR_STATE,
          error: 'ARTIKAL NE POSTOJI',
        });
        return;
      }
      addItem(item.id, refData.current.quantity || 1);
      setData({...CLEAR_STATE});
    };

    fn().then();
  }, [findPlu, refData, setData, addItem]);

  const handlerKeyboard = useCallback(
    (btn: TButtonEvent) => {
      const {key} = btn;
      // @ts-ignore
      setData(v => processKey(key, v));
    },
    [setData],
  );

  useKeyboardInternal(handlerKeyboard);

  return (
    <Animatable.View
      style={[style.root, isVisible && style.rootVisible]}
      animation={'slideInUp'}
      duration={800}
      easing={'ease-in-out'}
      useNativeDriver>
      <DisplaySimulation {...data} />
      <NumericKeyboard type={'selling'} keyTextStyle={{fontSize: 26}} />
    </Animatable.View>
  );
};

export default CashSimulation;
