import React, {useCallback, useMemo, useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import style from 'src/components/keyboard/style';
import KeyboardButton from 'src/components/keyboard/KeyboardButton';
import {
  KeyboardKeys,
  NumericKeyboardKeys,
  TNumericKeyboardProps,
  TNumericKeyProps,
  KeyboardKeysSelling,
} from 'src/components/keyboard/d';
import {__chunk} from '../../util/lodash';
import {guid} from '../../util/utils';
import {isArray} from 'lodash';

const NumericKey = ({
  value,
  disabled,
  round = true,
  rootStyle,
  textStyle,
  notDisableClear,
}: TNumericKeyProps) => {
  const _notDisableClear = useMemo(
    () =>
      (value !== KeyboardKeys.KEY_NUMBER_CLEAR && notDisableClear) || disabled,
    [value, notDisableClear, disabled],
  );
  const _textStyle = useMemo(() => {
    const text = textStyle;
    if (isArray(text)) {
      return text
        .filter(x => !!x)
        .reduce(
          (acc: any, x: any) => ({
            ...acc,
            ...x,
          }),
          {},
        );
    }
    return text;
  }, [textStyle]);

  return (
    <KeyboardButton disabled={_notDisableClear} keyString={value}>
      <View
        style={[
          style.buttonContainer,
          round && style.buttonRound,
          _notDisableClear && style.disabled,
          rootStyle,
        ]}>
        <Text
          style={[
            style.buttonText,
            _notDisableClear && style.disabledText,
            _textStyle,
          ]}>
          {value}
        </Text>
      </View>
    </KeyboardButton>
  );
};

const NumericKeyboard = ({
  rootStyle,
  rowStyle,
  keyRootStyle,
  keyTextStyle,
  disabled,
  notDisableClear,
  type,
  disabledValues,
}: TNumericKeyboardProps) => {
  const [rStyle, setRStyle] = useState<any>({
    row: {},
    key: {},
  } as any);

  const keyboardRows = useMemo(() => {
    if (type === 'selling') {
      return __chunk(KeyboardKeysSelling, 3).map(x => ({
        guid: guid(),
        data: x,
      }));
    }
    return __chunk(NumericKeyboardKeys, 3).map(x => ({
      guid: guid(),
      data: x,
    }));
  }, [type]);

  const onKeyboardLayout = useCallback(
    (event: any) => {
      const {height, width} = event.nativeEvent.layout;
      const _height = height / keyboardRows.length;
      const keyWidth = (width * 28) / 100;

      setRStyle({
        row: {
          height: _height,
          width,
        },
        key: {
          width: keyWidth,
          height: _height - 10,
        },
        keyText: {
          fontSize: 26,
        },
      });
    },
    [keyboardRows, setRStyle],
  );

  return (
    <View onLayout={onKeyboardLayout} style={[style.root, rootStyle]}>
      {keyboardRows.map((row: any) => {
        return (
          <View key={row.guid} style={[style.row, rStyle.row, rowStyle]}>
            {row.data.map((v: any) => {
              const isDisabled = disabledValues?.includes(v);
              return (
                <NumericKey
                  notDisableClear={notDisableClear}
                  rootStyle={[
                    keyRootStyle,
                    rStyle.key,
                    v === KeyboardKeys.KEY_NUMBER_EMPTY && style.notVisible,
                    v === KeyboardKeys.KEY_NUMBER_CLEAR && style.cButton,
                    v === KeyboardKeys.KEY_NUMBER_PLU && style.pButton,
                  ]}
                  textStyle={[
                    keyTextStyle,
                    v === KeyboardKeys.KEY_NUMBER_CLEAR && style.cButtonText,
                    v === KeyboardKeys.KEY_NUMBER_PLU && style.pButtonText,
                    rStyle.keyText,
                  ]}
                  key={v}
                  value={v}
                  disabled={disabled || isDisabled}
                />
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

export default NumericKeyboard;
