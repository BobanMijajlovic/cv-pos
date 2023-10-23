import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {TInputPropsPriceQuantity} from './d';
import Input from './index';
import {formatPrice} from 'src/util/utils';
import {NativeSyntheticEvent, TextInputFocusEventData} from 'react-native';

export const InputPriceQuantity = ({
  onChangeText,
  decPosition = 2,
  inputStyle = {},
  onBlur,
  value,
  ...rest
}: TInputPropsPriceQuantity) => {
  const refValue = useRef(value);

  useEffect(() => {
    refValue.current = value;
  }, [value, refValue]);

  const priceValue = useCallback(
    (s: string) => {
      let value = s.replace(/[^0-9\.]/g, '');
      value = value.replace(/^0{2,}/, '0');
      value = value.replace(/^\./, '0.');
      value = value.replace(/^0([^\.])/, '0.$1');
      const array = value.split('.');
      if (array.length < 2) {
        return value;
      }
      const val = array.slice(0, -1).join('');
      return `${val}.${array[array.length - 1].substring(0, decPosition)}`;
    },
    [decPosition],
  );

  const _onChangeText = useCallback(
    (s: string) => {
      onChangeText?.(priceValue(s));
    },
    [onChangeText, priceValue],
  );

  const _onBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      const _value = formatPrice(refValue.current || 0, decPosition);
      _onChangeText(`${_value}`);
      onBlur?.(e);
    },
    [onBlur, _onChangeText, refValue],
  );

  const _inputStyle = useMemo(() => {
    return {
      textAlign: 'right',
      ...(inputStyle as any),
    };
  }, [inputStyle]);

  return (
    <Input
      {...rest}
      keyboardType={'numeric'}
      onChangeText={_onChangeText}
      maxLength={12}
      inputStyle={_inputStyle}
      value={value}
      onBlur={_onBlur}
    />
  );
};

export default InputPriceQuantity;
