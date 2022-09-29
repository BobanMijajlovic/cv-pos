import React, {useCallback, useMemo, useState} from 'react';
import {Text, View} from 'react-native';
import style from './style';
import {__chunk} from '../../util/lodash';
import {TQuickButtonKeyProps, TQuickButtonsProps} from './d';
import KeyboardButton from 'src/components/keyboard/KeyboardButton';
import {guid} from 'src/util/utils';
import {isNumber} from 'lodash';

const QuickButtonKey = ({
  value,
  disabled,
  icon,
  round,
  rootStyle = {},
  valueStyle = {},
  counter,
}: TQuickButtonKeyProps) => {
  return (
    <KeyboardButton disabled={disabled || value < 0} keyString={`${value}`}>
      <View
        style={[
          style.quickButton,
          round && style.quickButtonRound,
          disabled && style.quickButtonDisabled,
          rootStyle,
        ]}>
        {icon && <>icon</>}
        {counter && (
          <Text style={[style.quickButtonCounter, valueStyle]}>x{counter}</Text>
        )}
        <Text
          style={[
            style.quickButtonText,
            disabled && style.quickButtonTextDisabled,
            valueStyle,
          ]}>
          {value > 0 ? value : ''}
        </Text>
      </View>
    </KeyboardButton>
  );
};

const QuickButtons = ({
  isDisabled,
  values,
  keyRootStyle,
  rowStyle,
  keyTextStyle,
}: TQuickButtonsProps) => {
  const [rStyle, setRStyle] = useState<any>({
    row: {},
    key: {},
  } as any);
  const keyboardRows = useMemo(() => {
    const _values = [...values];
    let m = -1;
    while (_values.length % 3 !== 0) {
      _values.push(m--);
    }
    return __chunk(_values, 3).map(x => ({
      guid: guid(),
      data: x,
    }));
  }, [values]);

  const onKeyboardLayout = useCallback(
    (event: any) => {
      const {height} = event.nativeEvent.layout;
      const _height = height / keyboardRows.length;
      const key = _height * 0.9;

      setRStyle({
        row: {
          height: _height,
        },
        key: {
          width: key,
          height: key,
        },
      });
    },
    [keyboardRows, setRStyle],
  );

  return (
    <View onLayout={onKeyboardLayout} style={style.root}>
      {keyboardRows.map((x, guid) => {
        return (
          <View key={guid} style={[style.keyboardRow, rStyle.row, rowStyle]}>
            {x.data.map((b: any) => {
              const obj = isNumber(b) ? {value: b} : {...b};
              return (
                <QuickButtonKey
                  {...obj}
                  round
                  key={obj.value}
                  disabled={isDisabled}
                  rootStyle={[rStyle.key, keyRootStyle]}
                  valueStyle={keyTextStyle}
                />
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

export default QuickButtons;
