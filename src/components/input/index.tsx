import React from 'react';
import {Text, TextInput, View} from 'react-native';
import styles from './style';
import {TInputProps} from './d';
import {Colors} from 'src/constants/Colors';

const Input = ({
  label,
  hideLabel,
  rootStyle = {},
  labelStyle = {},
  inputStyle = {},
  errorStyle = {},
  iconRightStyle = {},
  error,
  iconRight,
  iconLeft,
  setRef,
  autoCapitalize = 'none',
  autoCorrect = false,
  disable,
  ...rest
}: TInputProps) => {
  /** label need to be translated */

  const isLabelToShow = !hideLabel && !!label;
  const errorString = error || '\u00a0';
  const isError = !!error;
  const isDisable = disable;

  return (
    <View style={[styles.root, rootStyle]}>
      {isLabelToShow && (
        <Text
          testID={'label-input-test'}
          style={[
            styles.label,
            labelStyle,
            isError && {color: Colors.PALETTE.RED._800},
            isDisable && styles.inputDisabled,
          ]}>
          {label}
        </Text>
      )}
      <View style={styles.inputContainer}>
        {iconLeft && (
          <View
            testID={'icon-left-input-test'}
            style={[
              styles.iconLeft,
              isError && {color: Colors.PALETTE.RED._400},
              iconRightStyle,
            ]}>
            {iconLeft}
          </View>
        )}
        <TextInput
          {...rest}
          ref={setRef}
          testID={'input-test'}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          editable={!isDisable}
          selectTextOnFocus={!isDisable}
          style={[
            styles.input,
            isError && {borderColor: Colors.PALETTE.RED._200},
            !!iconRight && styles.iconRightInputPadding,
            !!iconLeft && styles.iconLeftInputPadding,
            isDisable && styles.inputDisabled,
            inputStyle,
          ]}
        />
        {iconRight && (
          <View
            testID={'icon-right-input-test'}
            style={[
              styles.iconRight,
              isError && {color: Colors.PALETTE.RED._400},
              iconRightStyle,
            ]}>
            {iconRight}
          </View>
        )}
      </View>
      <Text testID={'error-input-test'} style={[styles.error, errorStyle]}>
        {errorString}
      </Text>
    </View>
  );
};

export default Input;
