import React, {useCallback, useMemo, useState} from 'react';
import {Text, View, ViewStyle} from 'react-native';

import styles from './style';
import {NO_SELECT_LABEL, TSelectionDateProps} from './d';
import {Colors} from 'src/constants/Colors';
import {DatePicker} from 'react-native-woodpicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

const SelectionDate = ({
  label,
  hideLabel,
  rootStyle = {},
  labelStyle = {},
  errorStyle = {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  style = {},
  selectionStyle = {},
  error,
  value,
  text,
  onOpen: _onOpen,
  onClose: _onClose,
  ...rest
}: TSelectionDateProps) => {
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

  const _text = useMemo(() => {
    return text || (value ? value.toLocaleDateString() : NO_SELECT_LABEL);
  }, [text, value]);

  return (
    <View style={[styles.root, rootStyle]}>
      {isLabelToShow && (
        <Text
          testID={'label-selection-date-test'}
          style={[
            styles.label,
            isError && {color: Colors.PALETTE.RED._800},
            labelStyle,
          ]}>
          {label}
        </Text>
      )}
      <View style={styles.selectionContainer}>
        <DatePicker
          {...rest}
          text={_text}
          value={value}
          onOpen={onOpen}
          onClose={onClose}
          style={
            [
              styles.pickerStyle,
              isError && {borderColor: Colors.PALETTE.RED._200},
              selectionStyle,
            ] as ViewStyle
          }
          containerStyle={[styles.pickerContainerStyle] as ViewStyle}
          textInputStyle={
            [
              styles.pickerTextInputStyle,
              {textAlign: 'center'},
              isError && {color: Colors.PALETTE.RED._200},
            ] as ViewStyle
          }
        />
        <FontAwesome
          name={opened ? 'calendar-alt' : 'calendar-day'}
          size={24}
          style={styles.iconRight}
        />
      </View>
      <Text
        testID={'error-selection-date-test'}
        style={[styles.error, errorStyle]}>
        {errorString}
      </Text>
    </View>
  );
};

export default SelectionDate;
