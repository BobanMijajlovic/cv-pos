import React, {useContext, useCallback} from 'react';
import {View} from 'react-native';
import style from 'src/screens/journalPreview/style';
import InputDescription from 'src/components/input/InputDescription';
import {Translate} from 'src/translate/data';
import {ButtonFill} from 'src/components/button/d';
import {Colors} from 'src/constants/Colors';
import Button from 'src/components/button';
import {JournalPreviewContext} from 'src/screens/journalPreview/context';
import useValidation from 'src/hooks/validation/useValidation';
import {checkRequired} from 'src/hooks/validation/validators';
import {TJournalPreviewForm} from 'src/screens/journalPreview/d';

const JournalPreviewHeader = () => {
  const {invoiceId, setInvoiceId} = useContext(JournalPreviewContext);

  const setId = useCallback(() => {
    setInvoiceId('proba');
    console.log(invoiceId);
  }, [invoiceId, setInvoiceId]);

  const {submit, fields, onBlurs, onChangesTexts, resetData, resetValueField} =
    useValidation<TJournalPreviewForm>(
      {
        invoiceId: '',
      },
      {
        invoiceId: checkRequired,
      },
    );

  /*  const {setProgress, endProgress} = useProgress();

  const inputNameRef = useRef(null);

  const {invoiceId} = fields;

  const {value: invoiceIdValue, error: invoiceIdError} = invoiceId;*/

  return (
    <View style={style.headerContainer}>
      <InputDescription
        //onBlur={onBlurs.nickname}
        label={Translate.TR_JOURNAL_PREVIEW_ID_INPUT_LABEL}
        /* onChangeText={onChangesTexts.nickname}
        value={nicknameValue as string}
        error={nicknameError}*/
        labelStyle={[style.labels]}
      />
      <Button
        onPress={setId}
        upperCase
        title={Translate.TR_ITEM_LABEL_BUTTON_SAVE}
        fill={ButtonFill.OUTLINE}
        color={Colors.PALETTE.BLUE._700}
        titleStyle={style.submitButtonTitle}
        rootStyle={style.submitButtonRoot}
        //disabled={buttonSubmitDisabled}
      />
    </View>
  );
};

export default JournalPreviewHeader;
