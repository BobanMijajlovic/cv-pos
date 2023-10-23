import React, {useCallback, useState} from 'react';
import {Text, View, ViewStyle} from 'react-native';

import styles from './style';
import {TSelectionProps} from './d';
import {Colors} from 'src/constants/Colors';
import {Picker} from 'react-native-woodpicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

const Selection = ({
  label,
  hideLabel,
  rootStyle = {},
  labelStyle = {},
  errorStyle = {},
  containerStyle = {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  style = {},
  selectionStyle = {},
  error,
  onOpen: _onOpen,
  onClose: _onClose,
  disabled,
  ...rest
}: TSelectionProps) => {
  /** label need to be translated */

  const isLabelToShow = !hideLabel && !!label;
  const errorString = error || '\u00a0';
  const isError = !!error;

  const [opened, setOpened] = useState(true);
  const onOpen = useCallback(() => {
    setOpened(true);
    _onOpen && _onOpen();
  }, [setOpened, _onOpen]);

  const onClose = useCallback(() => {
    setOpened(false);
    _onClose && _onClose();
  }, [setOpened, _onClose]);

  return (
    <View style={[styles.root, rootStyle]}>
      {isLabelToShow && (
        <Text
          testID={'label-selection-test'}
          style={[
            styles.label,
            labelStyle,
            isError && {color: Colors.PALETTE.RED._800},
            disabled && {color: Colors.PALETTE.GRAY._500},
          ]}>
          {label}
        </Text>
      )}
      <View style={styles.selectionContainer}>
        <Picker
          {...rest}
          disabled={disabled}
          style={
            [
              styles.pickerStyle,
              isError && {borderColor: Colors.PALETTE.RED._200},
              selectionStyle,
              disabled && {borderColor: Colors.PALETTE.GRAY._400},
            ] as ViewStyle
          }
          containerStyle={styles.pickerContainerStyle}
          textInputStyle={
            [
              styles.pickerTextInputStyle,
              isError && {borderColor: Colors.PALETTE.RED._200},
              disabled && {
                borderColor: Colors.PALETTE.GRAY._400,
                color: Colors.PALETTE.GRAY._500,
              },
            ] as ViewStyle
          }
        />
        <FontAwesome
          name={opened ? 'caret-down' : 'caret-up'}
          size={24}
          style={styles.iconRight}
        />
      </View>
      <Text testID={'error-selection-test'} style={[styles.error, errorStyle]}>
        {errorString}
      </Text>
    </View>
  );
};

export default Selection;
