import React, {useCallback} from 'react';
import {TInputProps} from './d';
import Input from './index';

export const InputDescription = ({onChangeText, ...rest}: TInputProps) => {
  const _onChangeText = useCallback(
    (s: string) => {
      let value = s.replace(/^\s+/, '');
      value = value.replace(/^\s{2,}/, ' ');
      onChangeText?.(value);
    },
    [onChangeText],
  );

  return <Input {...rest} onChangeText={_onChangeText} maxLength={40} />;
};

export default InputDescription;
