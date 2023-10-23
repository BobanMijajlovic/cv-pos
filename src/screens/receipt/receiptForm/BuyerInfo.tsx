import React, {useCallback, useMemo, useEffect, useRef} from 'react';
import {View, Text} from 'react-native';
import style from './style';
import {Translate} from 'src/translate/data';
import {__pick} from 'src/util/lodash';
import {iconFontAwesomeTrash} from 'src/icon';
import Selection from 'src/components/selection';
import {
  ReceiptBuyerInfo,
  ReceiptBuyerInfoAdditional,
} from 'src/constants/ReceiptTypes';
import {PickerItem} from 'react-native-woodpicker';
import ButtonIcon from 'src/components/button/ButtonIcon';
import Input from 'src/components/input';
import {TBuyerInfoProps, TBuyerType} from './d';
import {Colors} from 'src/constants/Colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useNavigation} from '@react-navigation/native';

const BuyerInfo = ({
  isAdditional = false,
  validation,
  isUsed = true,
  toggleUsed,
}: TBuyerInfoProps) => {
  const {fields, onBlurs, onChange, onChangesTexts, resetValueField} =
    validation;

  const refStateInit = useRef(false);
  const {navigate} = useNavigation();

  const stringNameType = isAdditional
    ? 'buyerInfoTypeAdditional'
    : 'buyerInfoType';

  const stringNameInput = isAdditional
    ? 'buyerInfoDataAdditional'
    : 'buyerInfoData';

  const typeValue = fields[stringNameType]?.value;

  const inputRef = useRef(null);

  const setRefInput = useCallback(
    (e: any) => {
      inputRef.current = e;
    },
    [inputRef],
  );

  /** buyerInfoType  */
  const selectionsBuyerInfoType = useMemo(
    () =>
      isAdditional
        ? ReceiptBuyerInfoAdditional.map(x => __pick(x, ['label', 'value']))
        : ReceiptBuyerInfo.map(x => __pick(x, ['label', 'value'])),
    [isAdditional],
  );

  const onChangeType = useCallback(
    (value: PickerItem) => {
      onChange(value.value, stringNameType);
      resetValueField('', stringNameInput);
    },
    [onChange, stringNameType, stringNameInput, resetValueField],
  );

  const selectedType = useMemo(
    () =>
      selectionsBuyerInfoType.find(x => x.value === typeValue) || {
        label: Translate.TR_VALIDATION_SELECT_ONE_TYPE,
        value: '',
      },
    [selectionsBuyerInfoType, typeValue],
  );

  const selectedTypeFull = useMemo(
    () =>
      (isAdditional
        ? ReceiptBuyerInfoAdditional.find(x => x.value === typeValue)
        : ReceiptBuyerInfo.find(x => x.value === typeValue)) ||
      ({} as TBuyerType),
    [typeValue, isAdditional],
  );

  const isNumericInput = !!selectedTypeFull?.isNumericType;

  const clearBuyerInfoTypeData = useCallback(() => {
    onChange('', stringNameInput);
  }, [onChange, stringNameInput]);

  const onChangeInputBuyerInfoData = useCallback(
    (s: string) => {
      const value = isNumericInput ? s.replace(/[^0-9]/g, '') : s;
      onChangesTexts[stringNameInput]?.(value);
    },
    [isNumericInput, onChangesTexts, stringNameInput],
  );

  useEffect(() => {
    if (!refStateInit.current) {
      return;
    }
    if (isUsed) {
      (inputRef.current as any)?.focus();
    } else {
      onChangesTexts[stringNameInput]('');
      onChangesTexts[stringNameType]('');
    }
  }, [isUsed, inputRef, stringNameInput, stringNameType, onChangesTexts]);

  /** end of buyer info type */
  useEffect(() => {
    refStateInit.current = true;
  }, [refStateInit]);

  return (
    <View
      style={[
        style.rootSection,
        !isAdditional && {backgroundColor: Colors.PALETTE.GREEN._50},
        isAdditional &&
          isUsed && {backgroundColor: Colors.PALETTE.LIGHT_BLUE._25},
        isAdditional && !isUsed && {backgroundColor: Colors.PALETTE.GRAY._100},
        {paddingTop: 10},
      ]}>
      <View style={style.labelWithCheckRoot}>
        <Text style={[style.labelSection, style.labelWithCheck]}>
          {isAdditional
            ? Translate.TR_RECEIPT_INFO_OPTIONAL_DATA
            : Translate.TR_RECEIPT_INFO_CLIENT_DATA}
        </Text>
        {toggleUsed && (
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
        )}
      </View>

      <Selection
        label={Translate.TR_RECEIPT_CLIENT_FORM_TYPE_LABEL}
        labelStyle={style.labels}
        item={selectedType}
        items={selectionsBuyerInfoType}
        onItemChange={onChangeType}
        error={fields[stringNameType].error}
        selectionStyle={style.selectionStyle}
        rootStyle={style.selectionRoot}
        disabled={!isUsed}
      />

      <Input
        setRef={setRefInput}
        keyboardType={isNumericInput ? 'numeric' : 'default'}
        label={selectedTypeFull?.labelInput || ''}
        labelStyle={style.labels}
        onBlur={onBlurs[stringNameInput]}
        onChangeText={onChangeInputBuyerInfoData}
        maxLength={selectedTypeFull?.maxLength || 32}
        value={fields[stringNameInput].value as string}
        error={fields[stringNameInput].error}
        disable={!isUsed}
        iconLeft={
          selectedTypeFull?.iconLeft ? (
            <ButtonIcon
              rootStyle={{
                height: '100%',
                paddingLeft: 0,
              }}
              iconStyle={[style.inputIcon, !isUsed && style.inputIconDisabled]}
              icon={selectedTypeFull.iconLeft.icon}
              onPress={() => {
                selectedTypeFull.iconLeft.onPress?.(navigate);
              }}
            />
          ) : null
        }
        iconRight={
          <ButtonIcon
            rootStyle={{
              height: '100%',
            }}
            iconStyle={[style.inputIcon, !isUsed && style.inputIconDisabled]}
            onPress={clearBuyerInfoTypeData}
            icon={iconFontAwesomeTrash}
          />
        }
      />
    </View>
  );
};

export default BuyerInfo;
