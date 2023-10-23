import React, {useState, useCallback, useMemo} from 'react';
import {View, TouchableOpacity, Text, Platform} from 'react-native';
import style from 'src/components/dateTimePicker/style';
import DatePicker, {DatePickerProps} from 'react-native-date-picker';
import {TDatePickerProps} from 'src/components/dateTimePicker/d';
import {formatDateString} from 'src/util/utils';
import {Translate} from 'src/translate/data';

const DateTimePicker = ({
  date,
  setDate,
  dateLabelStyle = {},
  dateTextStyle = {},
  labelStyle = {},
  rootStyle = {},
  mode,
  title,
  autoClose = false,
  onDateChange,
  label,
  error,
  errorStyle,
  useHelperText = true,
  useLabel = true,
  ...rest
}: TDatePickerProps & DatePickerProps) => {
  const [open, setOpen] = useState(false);

  const errorString = error || '\u00a0';
  const isError = !!error;

  const onConfirm = useCallback(
    (_date: Date) => {
      setOpen(false);
      setDate && setDate(_date);
    },
    [setDate, setOpen],
  );

  const onCancel = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const showPicker = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const formattedDate = useMemo(
    () => (date ? formatDateString(mode as any, date).replace(/,/g, '') : ''),
    [date, mode],
  );

  const _onDateChange = useCallback(
    (date: Date) => {
      onDateChange(date);
      autoClose && setOpen(true);
    },
    [autoClose, onDateChange, setOpen],
  );

  const props = !autoClose && {
    onConfirm: onConfirm,
    onCancel: onCancel,
    confirmText: Translate.TR_CONFIRM_TEXT,
    cancelText: Translate.TR_CANCEL_TEXT,
  };

  return (
    <View style={[style.root, rootStyle]}>
      {useLabel && <Text style={[style.dateLabel, labelStyle]}>{label}</Text>}
      <TouchableOpacity
        onPress={showPicker}
        style={style.dateTimePickerContainer}>
        <View style={[style.dateValueContainer, dateLabelStyle]}>
          <Text style={[style.dateValueText, dateTextStyle]}>
            {formattedDate}
          </Text>
        </View>
      </TouchableOpacity>
      {useHelperText && (
        <Text
          testID={'error-date-time-picker-test'}
          style={[style.error, errorStyle]}>
          {errorString}
        </Text>
      )}
      <DatePicker
        modal
        {...rest}
        onDateChange={_onDateChange}
        mode={mode}
        locale={'bs-Latn'}
        androidVariant={Platform.OS ? 'iosClone' : 'nativeAndroid'}
        open={open}
        date={date}
        title={title}
        {...props}
      />
    </View>
  );
};

export default DateTimePicker;
