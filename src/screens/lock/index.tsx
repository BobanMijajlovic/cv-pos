import React, {useCallback, useEffect, useState} from 'react';
import style from 'src/screens/lock/style';
import {View} from 'react-native';
import NumericKeyboard from 'src/components/keyboard/NumericKeyboard';
import KeyboardHeader from 'src/screens/lock/keyboardHeder';
import {useNumericKeyboard} from 'src/hooks/keyboard/useKeyboard';
import {KeyboardKeys, TButtonEvent} from 'src/components/keyboard/d';
import {useKeyboardInternal} from 'src/components/keyboard/context';
import {useProgress} from 'src/hooks/progress/useProgress';
import * as UserTable from 'src/database/User';
import {useNavigation} from '@react-navigation/native';
import {DashboardNavName} from 'src/navigation/d';
import {useDispatch} from 'react-redux';
import {_actionApplicationSetUser} from 'src/store/Application/action';

const Lock = () => {
  const [error, setError] = useState<boolean>(false);
  const [pins, setPins] = useState<string[] | undefined>([]);
  const {processKeyboard} = useNumericKeyboard();
  const {setProgress, endProgress} = useProgress();
  const {navigate} = useNavigation();
  const dispatch = useDispatch();

  const handlerKeyboard = useCallback(
    ({key}: TButtonEvent) => {
      const value = processKeyboard(key, '', 0);
      setPins((v: any) => {
        if (v && v?.length > 3 && key !== 'C') {
          return v;
        }
        if (key === 'C') {
          return [];
        }
        return [...v, value];
      });
      setError(false);
    },
    [processKeyboard, setPins, setError],
  );

  useKeyboardInternal(handlerKeyboard);

  const resetPins = useCallback(() => {
    setPins([]);
    setError(false);
  }, [setError, setPins]);

  useEffect(() => {
    if (pins?.length === 4) {
      setProgress();
      (async () => {
        let pin = pins.join('');
        const user = await UserTable.getByPin(pin);
        if (!user) {
          setError(true);
          setTimeout(() => resetPins(), 5000);
          return;
        }
        resetPins();
        dispatch(_actionApplicationSetUser(user));
        endProgress();
        navigate(DashboardNavName);
      })();
    }
  }, [pins, dispatch, navigate, setProgress, setError, resetPins]);

  return (
    <View style={style.root}>
      <KeyboardHeader pins={pins} error={error} />
      <View style={style.keyboardRoot}>
        <NumericKeyboard
          disabledValues={[KeyboardKeys.KEY_NUMBER_DOT]}
          keyTextStyle={style.pinCircleText}
          keyRootStyle={style.lockScreenKeyboardKey}
        />
      </View>
    </View>
  );
};

export default Lock;
