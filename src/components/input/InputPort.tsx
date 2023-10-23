import React, {useCallback} from 'react';
import {TInputProps} from 'src/components/input/d';
import Input from 'src/components/input/index';

export const InputPort = ({onChangeText, ...rest}: TInputProps) => {
  const _onChangeText = useCallback(
    (s: string) => {
      const value = s.replace(/[^0-9]/g, '');
      onChangeText && onChangeText(value);
    },
    [onChangeText],
  );

  return (
    <Input
      {...rest}
      keyboardType={'numeric'}
      onChangeText={_onChangeText}
      maxLength={4}
    />
  );
};

export default InputPort;
