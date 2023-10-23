import {TouchableOpacity} from 'react-native';
import React, {useCallback, useContext} from 'react';
import {KeyboardInternContext} from './context';
import {TButtonProps} from './d';

const KeyboardButton = ({
  children,
  keyString,
  disabled,
  ...rest
}: TButtonProps) => {
  const {onPress} = useContext(KeyboardInternContext);
  const _onPress = useCallback(() => {
    !disabled && onPress(keyString);
  }, [disabled, onPress, keyString]);
  return (
    <TouchableOpacity onPress={_onPress} disabled={disabled} {...rest}>
      {children}
    </TouchableOpacity>
  );
};

export default KeyboardButton;
