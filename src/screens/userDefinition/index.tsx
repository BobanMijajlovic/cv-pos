import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {View} from 'react-native';
import useValidation from 'src/hooks/validation/useValidation';
import {Translate} from 'src/translate/d';
import style from './style';
import InputDescription from 'src/components/input/InputDescription';
import Selection from 'src/components/selection';
import {PickerItem} from 'react-native-woodpicker';
import Button from 'src/components/button';
import {ButtonFill} from 'src/components/button/d';
import {Colors} from 'src/constants/Colors';
import {TUserModel, UserPriority} from 'src/database/d';
import {useProgress} from 'src/hooks/progress/useProgress';
import {__omit} from 'src/util/lodash';
import * as UserTable from 'src/database/User';
import {TUserDefinitionForm} from 'src/screens/userDefinition/d';
import {checkPin, checkRequired} from 'src/hooks/validation/validators';
import {iconFontAwesomeUsers} from 'src/icon';
import {UserPriorityTypes} from 'src/constants/UserTypes';
import {useNavigation, useRoute} from '@react-navigation/native';
import InputPassword from 'src/components/input/InputPassword';
import ScrollViewContainer from 'src/components/scrollView';
import {processError} from 'src/util/error';

const UserDefinition = () => {
  const {goBack, setOptions} = useNavigation();
  const {params} = useRoute();
  const {
    onChange,
    submit,
    fields,
    onBlurs,
    onChangesTexts,
    resetData,
    resetValueField,
  } = useValidation<TUserDefinitionForm>(
    {
      fullName: '',
      nickname: '',
      pin: '',
      priority: UserPriority.CASHIER,
    },
    {
      fullName: checkRequired,
      nickname: checkRequired,
      pin: checkPin,
    },
  );

  const {id} = params || ({} as any);
  const {setProgress, endProgress} = useProgress();

  const inputFullNameRef = useRef(null);

  const {fullName, nickname, pin, priority} = fields;

  const priorityOpts = UserPriorityTypes;

  const {value: fullNameValue, error: fullNameError} = fullName;
  const {value: nicknameValue, error: nicknameError} = nickname;
  const {value: pinValue, error: pinError} = pin;
  // @ts-ignore
  const {value: priorityValue, error: priorityError} = priority;

  const setRefInputFullName = useCallback(
    (e: any) => {
      inputFullNameRef.current = e;
    },
    [inputFullNameRef],
  );

  const setFocusFullName = useCallback(() => {
    // @ts-ignore
    inputFullNameRef.current?.focus();
  }, [inputFullNameRef]);

  const _onChangePriority = useCallback(
    (value: PickerItem) => {
      onChange(value.value, 'priority');
    },
    [onChange],
  );

  const _priorityChosen = useMemo(
    () =>
      priorityOpts.find(p => +p.value === +priorityValue) || priorityOpts[0],
    [priorityOpts, priorityValue],
  );

  const onSubmit = useCallback(async () => {
    setProgress();
    const data = await submit();
    if (!data) {
      endProgress();
      return;
    }
    const {fullName, nickname, pin, priority: _priority} = data as any;
    const user = {
      fullName: fullName.value,
      nickname: nickname.value,
      pin: pin.value,
      priority: _priority.value,
    } as TUserModel;

    try {
      id ? await UserTable.update(user, id) : await UserTable.insert(user);
    } catch (e) {
      processError({
        error: e,
      });
      endProgress();
      return;
    }
    resetData({
      fullName: '',
      nickname: '',
      pin: '',
      priority: _priority,
    });
    setFocusFullName();
    goBack();
    endProgress();
  }, [
    endProgress,
    setProgress,
    submit,
    resetData,
    setFocusFullName,
    goBack,
    id,
  ]);

  useEffect(() => {
    if (!id) {
      return;
    }
    setOptions({
      title: Translate.TR_USER_DEFINE_PAGE_LABEL_UPDATE,
    });
    (async () => {
      const user = await UserTable.getById(id);
      Object.keys(__omit(user, ['id'])).forEach(key =>
        resetValueField(user[key].toString(), key as any),
      );
    })();
  }, [id, setOptions, resetValueField]);

  return (
    <ScrollViewContainer
      icon={iconFontAwesomeUsers}
      rootStyle={style.scrollView}>
      <View style={style.viewRoot}>
        <InputDescription
          setRef={setRefInputFullName}
          onBlur={onBlurs.fullName}
          label={Translate.TR_USER_LABEL_FULL_NAME}
          onChangeText={onChangesTexts.fullName}
          value={fullNameValue as string}
          error={fullNameError}
          labelStyle={style.labels}
        />
      </View>

      <View style={[style.viewRoot]}>
        <InputDescription
          onBlur={onBlurs.nickname}
          label={Translate.TR_USER_LABEL_NICK_NAME}
          onChangeText={onChangesTexts.nickname}
          value={nicknameValue as string}
          error={nicknameError}
          labelStyle={[style.labels]}
        />
      </View>

      <View style={[style.viewRoot]}>
        <InputPassword
          keyboardType={'numeric'}
          onBlur={onBlurs.pin}
          label={Translate.TR_USER_LABEL_PIN}
          onChangeText={onChangesTexts.pin}
          value={pinValue as string}
          error={pinError}
          labelStyle={[style.labels]}
          maxLength={4}
        />
        <Selection
          item={_priorityChosen}
          label={Translate.TR_USER_LABEL_PRIORITY}
          items={priorityOpts}
          onItemChange={_onChangePriority}
          error={priorityError}
          labelStyle={[style.labels]}
          selectionStyle={{borderColor: Colors.PALETTE.BLUE._700}}
        />
      </View>

      <View style={style.buttonsContainer}>
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

export default UserDefinition;
