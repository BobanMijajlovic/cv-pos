import React, {useMemo} from 'react';
import style from 'src/screens/lock/style';
import {Text, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {iconFontAwesomeLock} from 'src/icon';
import {TLockScreenPinCircleProps, TPinCirclesProps} from 'src/screens/lock/d';
import Shake from 'src/components/animated/Shake';
import {ERROR_LOCK_SCREEN_PIN_NOT_VALID} from 'src/constants/Errors';
import {Translate} from 'src/translate/data';

export const LockScreenPinCircle = ({
  active,
  error,
}: TLockScreenPinCircleProps) => {
  return (
    <View
      style={[
        style.pinValueContainer,
        active && style.pinActive,
        error && style.pinError,
      ]}
    />
  );
};

export const LockScreenPinCircles = ({pins, error}: TPinCirclesProps) => {
  const _pins = useMemo(() => {
    const arr = pins ? [...pins] : [];
    while (arr.length < 4) {
      arr.push(undefined);
    }
    return arr;
  }, [pins]);

  return (
    <View style={style.pinCirclesContainer}>
      <View style={style.pinsContainer}>
        {_pins.map((pin, key) => (
          <LockScreenPinCircle
            key={key}
            value={pin}
            active={!!pin}
            error={error}
          />
        ))}
      </View>
      <View style={style.helperTextContainer}>
        <Text style={style.helperText}>
          {error ? ERROR_LOCK_SCREEN_PIN_NOT_VALID : <>&nbsp;</>}
        </Text>
      </View>
    </View>
  );
};

const KeyboardHeader = ({pins, error}: any) => {
  return (
    <Shake start={error}>
      <View style={style.keyboardHeaderContainer}>
        <FontAwesome5Icon
          style={style.keyboardIcon}
          name={iconFontAwesomeLock}
        />
        <Text style={style.keyboardHeaderText}>
          {Translate.TR_LOCK_SCREEN_TITLE}
        </Text>
        <LockScreenPinCircles pins={pins} error={error} />
      </View>
    </Shake>
  );
};

export default KeyboardHeader;
