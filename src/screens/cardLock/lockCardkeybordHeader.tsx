import React, {useMemo, useContext} from 'react';
import style from 'src/screens/cardLock/style';
import {Text, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {
  iconFontAwesomeCard,
  iconFontAwesomeVisibility,
  iconFontAwesomeVisibilityOff,
} from 'src/icon';
import {TLockScreenPinCircleProps} from 'src/screens/cardLock/d';
import Shake from 'src/components/animated/Shake';
import {ERROR_LOCK_SCREEN_PIN_NOT_VALID} from 'src/constants/Errors';
import {Translate} from 'src/translate/data';
import ButtonIcon from 'src/components/button/ButtonIcon';
import {ButtonFill} from 'src/components/button/d';
import {Colors} from 'src/constants/Colors';
import {CardLockContext} from 'src/screens/cardLock/context';

export const LockScreenPinCircle = ({
  active,
  error,
  value,
  visibility,
}: TLockScreenPinCircleProps) => {
  return (
    <View
      style={[
        style.pinValueContainer,
        active && style.pinActive,
        error && style.pinError,
      ]}>
      <Text
        style={[
          style.pinValueText,
          visibility && style.pinValueVisibilityText,
        ]}>
        {value}
      </Text>
    </View>
  );
};

export const LockScreenPinCircles = () => {
  const {pins, error, visibility, setVisibility} = useContext(CardLockContext);

  const _pins = useMemo(() => {
    const arr = pins ? [...pins] : [];
    while (arr.length < 4) {
      arr.push(undefined);
    }
    return arr;
  }, [pins]);

  return (
    <View style={style.pinCirclesContainer}>
      <View style={{flexDirection: 'row'}}>
        <View style={style.pinsContainer}>
          {_pins.map((pin, key) => (
            <LockScreenPinCircle
              key={key}
              value={pin}
              active={!!pin}
              error={error}
              visibility={visibility}
            />
          ))}
        </View>
        <ButtonIcon
          fill={ButtonFill.CLEAR}
          color={Colors.PALETTE.BLUE._700}
          icon={
            !visibility
              ? iconFontAwesomeVisibility
              : iconFontAwesomeVisibilityOff
          }
          iconStyle={style.visibilityIcon}
          onPress={setVisibility}
        />
      </View>
      <View style={style.helperTextContainer}>
        <Text style={style.helperText}>
          {error ? ERROR_LOCK_SCREEN_PIN_NOT_VALID : <>&nbsp;</>}
        </Text>
      </View>
    </View>
  );
};

const LockCardKeyboardHeader = () => {
  const {error} = useContext(CardLockContext);
  return (
    <Shake start={!!error}>
      <View style={style.keyboardHeaderContainer}>
        <FontAwesome5Icon
          style={style.keyboardIcon}
          name={iconFontAwesomeCard}
        />
        <Text style={style.keyboardHeaderText}>
          {Translate.TR_CARD_LOCK_SCREEN_TITLE}
        </Text>
        <LockScreenPinCircles />
      </View>
    </Shake>
  );
};

export default LockCardKeyboardHeader;
