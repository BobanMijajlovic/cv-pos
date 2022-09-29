import React, {useRef, useCallback, useEffect} from 'react';
import {View, Text} from 'react-native';
import style from './style';
import {Translate} from 'src/translate/data';
import InputDescription from 'src/components/input/InputDescription';
import {TValidationType} from 'src/screens/receipt/receiptForm/d';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Colors} from 'src/constants/Colors';
import InputPriceQuanity from 'src/components/input/InputPriceQuanity';

const inputStringField = 'advanceReceiptNumber';
const inputStringFinanceField = 'advanceReceiptFinance';

const AdvancePart = ({
  validation,
  isUsed,
  toggleUsed,
}: {
  validation: TValidationType;
  isUsed: boolean;
  toggleUsed: () => void;
}) => {
  const {fields, onBlurs, onChangesTexts, resetValueField} = validation;

  const refStateInit = useRef(false);

  const inputCountRef = useRef(null);
  const inputFinanceRef = useRef(null);

  const onChangeTextInput = useCallback(
    (value: string) => {
      value = (value || '').toUpperCase();
      onChangesTexts[inputStringField](value);
    },
    [onChangesTexts],
  );

  const onChangeFinance = useCallback(
    (value: string) => {
      value = value;
      onChangesTexts[inputStringFinanceField](value);
    },
    [onChangesTexts],
  );

  const setRefCounter = useCallback(
    (e: any) => {
      inputCountRef.current = e;
    },
    [inputCountRef],
  );

  const setRefFinance = useCallback(
    (e: any) => {
      inputFinanceRef.current = e;
    },
    [inputFinanceRef],
  );

  useEffect(() => {
    if (!refStateInit.current) {
      return;
    }
    if (isUsed) {
      (inputCountRef.current as any)?.focus();
    } else {
      resetValueField('', inputStringField);
    }
  }, [isUsed, resetValueField, inputCountRef, refStateInit]);

  useEffect(() => {
    refStateInit.current = true;
  }, [refStateInit]);

  return (
    <View
      style={[
        style.rootSection,
        isUsed && {backgroundColor: Colors.PALETTE.LIGHT_BLUE._50},
        !isUsed && {backgroundColor: Colors.PALETTE.GRAY._100},
        {paddingTop: 10},
      ]}>
      <View style={style.labelWithCheckRoot}>
        <Text style={[style.labelSection, style.labelWithCheck]}>
          {Translate.TR_RECEIPT_INFO_ADVANCE_RECEIPT_DATA}
        </Text>
        <BouncyCheckbox
          size={22}
          useNativeDriver
          isChecked={isUsed}
          disableBuiltInState
          fillColor={Colors.PALETTE.BLUE._700}
          unfillColor={Colors.WHITE}
          iconStyle={{borderColor: Colors.PALETTE.BLUE._700}}
          onPress={toggleUsed}
        />
      </View>
      <View style={style.rootRow}>
        <InputDescription
          setRef={setRefCounter}
          onBlur={onBlurs[inputStringField]}
          label={Translate.TR_RECEIPT_INFO_RECEIPT_NUMBER}
          onChangeText={onChangeTextInput}
          value={fields[inputStringField].value as string}
          error={fields[inputStringField].error}
          labelStyle={style.labels}
          rootStyle={{flex: 1}}
          disable={!isUsed}
        />
      </View>
      <View style={style.rootRow}>
        <InputPriceQuanity
          setRef={setRefFinance}
          onBlur={onBlurs[inputStringFinanceField]}
          label={Translate.TR_RECEIPT_INFO_ADVANCE_RECEIPT_FINANCE}
          onChangeText={onChangeFinance}
          value={fields[inputStringFinanceField].value as string}
          error={fields[inputStringFinanceField].error}
          labelStyle={style.labels}
          rootStyle={{flex: 1}}
          disable={!isUsed}
        />
      </View>
    </View>
  );
};

export default AdvancePart;
