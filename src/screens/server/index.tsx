import React from 'react';
import {View, Text} from 'react-native';
import style from 'src/screens/server/style';
import InputPort from 'src/components/input/InputPort';
import useValidation from 'src/hooks/validation/useValidation';
import {checkBarCode} from 'src/hooks/validation/validators';
import {TServerForm} from 'src/screens/server/d';
import {useProgress} from 'src/hooks/progress/useProgress';
import {Translate} from 'src/translate/data';
import Button from 'src/components/button';
import {ButtonFill} from 'src/components/button/d';
import {Colors} from 'src/constants/Colors';

const Server = () => {
  const {setProgress, endProgress} = useProgress();
  const validation = useValidation<TServerForm>(
    {
      port: '',
    },
    {
      port: checkBarCode,
    },
  );

  const {
    onChange,
    submit,
    fields,
    onBlurs,
    onChangesTexts,
    resetData,
    resetValueField,
  } = validation;

  const {port} = fields;
  const {value: portValue, error: portError} = port;
  return (
    <View style={style.root}>
      <View style={style.serverHeaderContainer}>
        <Text style={style.serverHeader}>
          {Translate.TR_SETTINGS_SERVER_HEADER_LABEL}
        </Text>
      </View>
      <View style={style.row}>
        <InputPort
          label={Translate.TR_SETTINGS_SERVER_INPUT_PORT_LABEL}
          onChangeText={onChangesTexts.port}
          value={portValue as string}
          error={portError}
          labelStyle={style.labels}
          disable={false}
          inputStyle={style.input}
          rootStyle={style.inputPortRoot}
        />
        <Button
          onPress={() => {}}
          upperCase
          title={Translate.TR_ITEM_LABEL_BUTTON_SAVE}
          fill={ButtonFill.OUTLINE}
          color={Colors.PALETTE.BLUE._700}
          titleStyle={style.submitButtonTitle}
          rootStyle={style.submitButtonRoot}
          //disabled={buttonSubmitDisabled}
        />
      </View>
    </View>
  );
};

export default Server;
