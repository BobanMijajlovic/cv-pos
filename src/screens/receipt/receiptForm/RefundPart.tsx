import React, {useCallback, useRef, useMemo, useEffect} from 'react';
import {View, Text} from 'react-native';
import style from './style';
import {Translate} from 'src/translate/data';
import InputDescription from 'src/components/input/InputDescription';
import DateTimePicker from 'src/components/dateTimePicker';
import {DateModes} from 'src/components/dateTimePicker/d';
import {TValidationType} from 'src/screens/receipt/receiptForm/d';

const stringInputField = 'refundReceiptNumber';
const stringDateField = 'refundReceiptDate';

const RefundPart = ({validation}: {validation: TValidationType}) => {
  const {fields, onBlurs, onChangesTexts, onChange} = validation;

  const {refundReceiptDate} = fields;
  const {value: dateValueString} = refundReceiptDate;

  const inputCountRef = useRef(null);

  const setRefCounter = useCallback(
    (e: any) => {
      inputCountRef.current = e;
    },
    [inputCountRef],
  );

  const handlerChangeDate = useCallback(
    (value: Date) => {
      const valueStr = value.toISOString();
      onChange(valueStr, stringDateField);
    },
    [onChange],
  );

  const onChangeTextInput = useCallback(
    (value: string) => {
      value = (value || '').toUpperCase();
      onChangesTexts[stringInputField](value);
    },
    [onChangesTexts],
  );

  const dateValue = useMemo(
    () => new Date(dateValueString as string),
    [dateValueString],
  );
  return (
    <View style={style.rootSection}>
      <View style={style.rootRow}>
        <InputDescription
          setRef={setRefCounter}
          onBlur={onBlurs[stringInputField]}
          label={Translate.TR_RECEIPT_INFO_RECEIPT_NUMBER}
          onChangeText={onChangeTextInput}
          value={fields[stringInputField].value as string}
          error={fields[stringInputField].error}
          labelStyle={style.labels}
          rootStyle={style.refundInputRoot}
        />
        <DateTimePicker
          setDate={handlerChangeDate}
          onDateChange={handlerChangeDate}
          label={Translate.TR_RECEIPT_REFUND_DATE_TIME_LABEL}
          date={dateValue}
          error={fields[stringDateField].error}
          dateLabelStyle={style.dateTimeInputLabel}
          dateTextStyle={style.dateTimeInputText}
          rootStyle={style.dateTimeInputRoot}
          mode={DateModes.DATE_TIME}
          title={Translate.TR_DATE_TIME_TITLE}
          is24hourSource={'locale'}
        />
      </View>
    </View>
  );
};

export default RefundPart;
