import React, {useCallback, useEffect, useRef} from 'react';
import {View} from 'react-native';
import style from 'src/screens/clientDefinition/style';
import InputDescription from 'src/components/input/InputDescription';
import {Translate} from 'src/translate/data';
import useValidation from 'src/hooks/validation/useValidation';
import {TClientModel} from 'src/database/d';
import {useProgress} from 'src/hooks/progress/useProgress';
import * as ClientTable from 'src/database/clients';
import {__omit} from 'src/util/lodash';
import {TClientDefinitionForm} from 'src/screens/clientDefinition/d';
import Button from 'src/components/button';
import {ButtonFill} from 'src/components/button/d';
import {Colors} from 'src/constants/Colors';
import {checkRequired} from 'src/hooks/validation/validators';
import {
  checkPib,
  checkUniqCompanyNumber,
  checkZipCode,
} from 'src/screens/clientDefinition/validation';
import InputPib from 'src/components/input/InputPib';
import InputNumeric from 'src/components/input/InputNumeric';
import {iconFontAwesomeAddressBook} from 'src/icon';
import ScrollViewContainer from 'src/components/scrollView';
import {useNavigation, useRoute} from '@react-navigation/native';
import {processError} from 'src/util/error';

const ClientDefinition = () => {
  const {goBack, setOptions} = useNavigation();
  const {params} = useRoute();
  const {submit, fields, onBlurs, onChangesTexts, resetData, resetValueField} =
    useValidation<TClientDefinitionForm>(
      {
        name: '',
        tin: '',
        uniqueCompanyNumber: '',
        city: '',
        street: '',
        zipCode: '',
      },
      {
        name: checkRequired,
        tin: checkPib,
        uniqueCompanyNumber: checkUniqCompanyNumber,
        zipCode: checkZipCode,
      },
    );

  const {id} = params || ({} as any);
  const {setProgress, endProgress} = useProgress();

  const inputNameRef = useRef(null);

  const {name, tin, uniqueCompanyNumber, city, street, zipCode} = fields;

  const {value: nameValue, error: nameError} = name;
  const {value: tinValue, error: tinError} = tin;
  const {value: uniqueCompanyNumberValue, error: uniqueCompanyNumberError} =
    uniqueCompanyNumber;
  const {value: cityValue, error: cityError} = city;
  const {value: streetValue, error: streetError} = street;
  const {value: zipCodeValue, error: zipCodeError} = zipCode;

  const setRefInputName = useCallback(
    (e: any) => {
      inputNameRef.current = e;
    },
    [inputNameRef],
  );

  const setFocusName = useCallback(() => {
    // @ts-ignore
    inputNameRef.current?.focus();
  }, [inputNameRef]);

  const onSubmit = useCallback(async () => {
    setProgress();
    const data = await submit();
    if (!data) {
      endProgress();
      return;
    }
    const {name, tin, uniqueCompanyNumber, city, street, zipCode} = data as any;

    const client = {
      name: name.value,
      tin: tin.value,
      uniqueCompanyNumber: uniqueCompanyNumber.value,
      city: city.value,
      street: street.value,
      zipCode: zipCode.value,
    } as TClientModel;

    try {
      id
        ? await ClientTable.update(client, id)
        : await ClientTable.insert(client);
    } catch (e) {
      processError({
        error: e,
      });
      endProgress();
      return;
    }
    resetData({
      name: '',
      tin: '',
      uniqueCompanyNumber: '',
      city: '',
      street: '',
      zipCode: '',
    });
    setFocusName();
    goBack();
    endProgress();
  }, [endProgress, setProgress, submit, resetData, setFocusName, goBack, id]);

  useEffect(() => {
    setFocusName();
  }, []);

  useEffect(() => {
    if (!id) {
      return;
    }
    setProgress();
    setOptions({
      title: Translate.TR_CLIENTS_DEFINE_PAGE_LABEL_UPDATE,
    });
    (async () => {
      const client = await ClientTable.getById(id);
      Object.keys(__omit(client, ['id'])).forEach(key =>
        resetValueField(client[key].toString(), key as any),
      );
    })();

    endProgress();
  }, [id, endProgress, setProgress, setOptions, resetValueField]);

  return (
    <ScrollViewContainer
      rootStyle={style.scrollView}
      icon={iconFontAwesomeAddressBook}>
      <View style={style.viewRoot}>
        <InputDescription
          setRef={setRefInputName}
          onBlur={onBlurs.name}
          label={Translate.TR_CLIENTS_LABEL_NAME}
          onChangeText={onChangesTexts.name}
          value={nameValue as string}
          error={nameError}
          labelStyle={style.labels}
        />
      </View>

      <View style={style.viewRoot}>
        <InputPib
          onBlur={onBlurs.tin}
          label={Translate.TR_CLIENTS_LABEL_PIB}
          onChangeText={onChangesTexts.tin}
          value={tinValue as string}
          error={tinError}
          labelStyle={style.labels}
        />
        <InputNumeric
          onBlur={onBlurs.uniqueCompanyNumber}
          label={Translate.TR_CLIENTS_LABEL_UNIQUE_COMPANY_NUMBER}
          onChangeText={onChangesTexts.uniqueCompanyNumber}
          value={uniqueCompanyNumberValue as string}
          error={uniqueCompanyNumberError}
          labelStyle={style.labels}
        />
      </View>

      <View style={style.viewRoot}>
        <InputDescription
          onBlur={onBlurs.city}
          label={Translate.TR_CLIENTS_LABEL_CITY}
          onChangeText={onChangesTexts.city}
          value={cityValue as string}
          error={cityError}
          labelStyle={style.labels}
        />
        <InputNumeric
          onBlur={onBlurs.zipCode}
          label={Translate.TR_CLIENTS_LABEL_ZIP_CODE}
          onChangeText={onChangesTexts.zipCode}
          value={zipCodeValue as string}
          error={zipCodeError}
          labelStyle={style.labels}
        />
      </View>

      <View style={style.viewRoot}>
        <InputDescription
          onBlur={onBlurs.street}
          label={Translate.TR_CLIENTS_LABEL_STREET}
          onChangeText={onChangesTexts.street}
          value={streetValue as string}
          error={streetError}
          labelStyle={style.labels}
        />
      </View>

      <View style={[style.buttons]}>
        <Button
          onPress={onSubmit}
          upperCase
          title={
            !id
              ? Translate.TR_ITEM_LABEL_BUTTON_SAVE
              : Translate.TR_ITEM_LABEL_BUTTON_UPDATE
          }
          fill={ButtonFill.OUTLINE}
          color={Colors.PALETTE.BLUE._700}
          titleStyle={style.buttonConfirmText}
          rootStyle={style.buttonConfirmRoot}
        />
      </View>
    </ScrollViewContainer>
  );
};

export default ClientDefinition;
