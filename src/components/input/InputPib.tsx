import React, {useCallback} from 'react';
import {TInputProps} from './d';
import Input from './index';

export const InputPib = ({onChangeText, ...rest}: TInputProps) => {
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
      maxLength={10}
    />
  );
};

export default InputPib;
