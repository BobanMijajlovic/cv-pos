import React, {useCallback, useContext, useEffect} from 'react';
import {View} from 'react-native';
import NumericKeyboard from 'src/components/keyboard/NumericKeyboard';
import {KeyboardKeys} from 'src/components/keyboard/d';
import style from 'src/screens/cardLock/style';
import LockCardKeyboardHeader from 'src/screens/cardLock/lockCardkeybordHeader';
import CardLockContextContainer, {
  CardLockContext,
} from 'src/screens/cardLock/context';
import Button from 'src/components/button';
import {ButtonFill} from 'src/components/button/d';
import {Colors} from 'src/constants/Colors';
import {useSelector} from 'react-redux';
import {
  _selectorLPFRIsPinRequired,
  _selectorLPFRIsPinVerified,
  _selectorLPFRPin,
} from 'src/store/lpfr/helpers';
import {useNavigation} from '@react-navigation/native';
import {useProgress} from 'src/hooks/progress/useProgress';
import {Translate} from 'src/translate/data';
import {DashboardNavName} from 'src/navigation/d';
import {useError} from 'src/hooks/error/useErrors';

const ButtonConfirm = () => {
  const {pins, onVerifyPin} = useContext(CardLockContext);

  const isPinVerified = useSelector(_selectorLPFRIsPinVerified);
  const isPinRequired = useSelector(_selectorLPFRIsPinRequired);
  const pin = useSelector(_selectorLPFRPin);
  const {error} = useError();

  const {setProgress, endProgress} = useProgress();

  const {navigate} = useNavigation();

  useEffect(() => {
    if (!isPinVerified || error === 1300 || isPinRequired || !pin?.length) {
      return;
    }
    endProgress();
    navigate(DashboardNavName);
  }, [pin, error, isPinVerified, isPinRequired, navigate, endProgress]);

  const isEnabled = pins?.length === 4;

  const onPressHandler = useCallback(() => {
    setProgress();
    onVerifyPin().then();
  }, [onVerifyPin, setProgress]);

  return (
    <View style={style.confirmButtonContainer}>
      <Button
        title={Translate.TR_CONFIRM_TEXT}
        onPress={onPressHandler}
        disabled={!isEnabled}
        fill={ButtonFill.OUTLINE}
        rootStyle={style.buttonConfirm}
        titleStyle={style.buttonConfirmText}
        color={Colors.PALETTE.BLUE._900}
      />
    </View>
  );
};

const CardLock = () => {
  return (
    <CardLockContextContainer>
      <View style={style.root}>
        <LockCardKeyboardHeader />
        <ButtonConfirm />
        <View style={style.keyboardRoot}>
          <NumericKeyboard
            disabledValues={[KeyboardKeys.KEY_NUMBER_DOT]}
            keyTextStyle={style.pinCircleText}
            keyRootStyle={style.lockScreenKeyboardKey}
          />
        </View>
      </View>
    </CardLockContextContainer>
  );
};

export default CardLock;
