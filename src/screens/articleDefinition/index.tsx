import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {ScrollView, View} from 'react-native';
import style from 'src/screens/articleDefinition/style';
import InputBarCode from 'src/components/input/InputBarCode';
import {Translate} from 'src/translate/data';
import Selection from 'src/components/selection';
import useValidation from 'src/hooks/validation/useValidation';
import {
  TArticleDefinitionForm,
  TArticleVat,
} from 'src/screens/articleDefinition/d';
import {
  checkBarCode,
  checkDescriptionValid,
  checkPriceValid,
} from 'src/hooks/validation/validators';
import {PickerItem} from 'react-native-woodpicker';
import {
  ArticleMeasureValues,
  ArticleVatsArray,
  checkVats,
} from 'src/constants/Article';
import InputDescription from 'src/components/input/InputDescription';
import InputPriceQuantity from 'src/components/input/InputPriceQuanity';
import {ButtonFill} from 'src/components/button/d';
import {Colors} from 'src/constants/Colors';
import Button from 'src/components/button';
import {useProgress} from 'src/hooks/progress/useProgress';
import {useNavigation, useRoute} from '@react-navigation/native';
import ArticleVats from 'src/screens/articleDefinition/vats';
import * as ArticleTable from 'src/database/Article';
import {__get, __omit} from 'src/util/lodash';
import {TArticleModal} from 'src/database/d';
import {processError} from 'src/util/error';
import {descriptionFixString} from 'src/util/utils';

const ArticleDefinition = () => {
  const {params} = useRoute();
  const {setOptions, goBack} = useNavigation();
  const {setProgress, endProgress} = useProgress();
  const {id} = params || ({} as any);

  const validation = useValidation<TArticleDefinitionForm>(
    {
      barcode: '',
      description: '',
      price: '',
      mes: '',
      vats: [...ArticleVatsArray],
    },
    {
      barcode: checkBarCode,
      price: checkPriceValid,
      description: checkDescriptionValid,
      vats: checkVats,
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

  const {barcode, description, price, mes, vats} = fields;
  const {value: barCodeValue, error: barCodeError} = barcode;
  const {value: priceValue, error: priceError} = price;
  const {value: descValue, error: descError} = description;
  const {value: mesValue, error: mesError} = mes;
  const {value: vatsArr} = vats;

  const inputBarCodeRef = useRef(null);

  const setRefInputBarCode = useCallback(
    (e: any) => {
      inputBarCodeRef.current = e;
    },
    [inputBarCodeRef],
  );

  const setFocusBarCode = useCallback(() => {
    // @ts-ignore
    inputBarCodeRef.current?.focus();
  }, [inputBarCodeRef]);

  const _mesChosen = useMemo(
    () =>
      ArticleMeasureValues.find(v => v.value === `${mesValue}`) ||
      ArticleMeasureValues[0],
    [mesValue],
  );

  const _onChangeMeasure = useCallback(
    (value: PickerItem) => {
      onChange(value.value, 'mes');
    },
    [onChange],
  );

  const buttonSubmitDisabled = useMemo(
    () =>
      `${barCodeValue}`.length < 3 ||
      (descValue as string).length < 2 ||
      priceValue <= 0 ||
      (vatsArr as any)?.length < 1,
    [barCodeValue, descValue, priceValue, vatsArr],
  );

  const onSubmit = useCallback(async () => {
    setProgress();
    const data = await submit();
    if (!data) {
      endProgress();
      return;
    }
    const {barcode, description, price, mes: _measure, vats} = data as any;
    let mes = Number(_measure.value);

    const art = [...(vats?.value || [])].reduce(
      (acc: TArticleModal, vat: TArticleVat) => {
        const val =
          !vat?.value || vat?.value === 'undefined' || vat?.value === null
            ? null
            : vat.value;
        return {
          ...acc,
          [vat.model]: val,
        };
      },
      {
        barcode: barcode.value,
        description: descriptionFixString(description.value),
        price: +price.value,
        mes,
      },
    );

    console.log(art);
    try {
      id ? await ArticleTable.update(art, id) : await ArticleTable.insert(art);
    } catch (e) {
      processError({
        error: e,
        validation,
      });
      endProgress();
      return;
    }
    resetData({
      barcode: '',
      description: '',
      price: '1.000',
      vats: [...ArticleVatsArray],
      mes: _measure.value,
    });
    setFocusBarCode();
    goBack();
  }, [
    id,
    validation,
    resetData,
    goBack,
    setFocusBarCode,
    setProgress,
    submit,
    endProgress,
  ]);

  useEffect(() => {
    if (!id) {
      const mes = ArticleMeasureValues[0]?.value as any;
      resetValueField(mes, 'mes');
      return;
    }
    setProgress();
    setOptions({title: Translate.TR_ITEM_DEFINE_PAGE_LABEL_UPDATE});
    (async () => {
      const article = await ArticleTable.getById(id);
      await Object.keys(__omit(article, ['id'])).forEach(key => {
        resetValueField(article[key] ? `${article[key]}` : '', key as any);
      });
      console.log(article);
      if (article.mes) {
        const mes = ArticleMeasureValues.find(
          v => v.value === `${article.mes}`,
        ) as any;
        resetValueField(mes, 'mes');
      }
      const vats = ([...ArticleVatsArray] as any).map((a: any) => {
        let value = __get(article, a.model);
        value = value === 'undefined' || value === 'null' ? null : value;
        if (!value) {
          return a;
        }
        return {
          ...a,
          value,
        };
      });
      resetValueField(vats as any, 'vats' as any);
      endProgress();
    })();
  }, [endProgress, setProgress, setOptions, id, resetValueField]);

  useEffect(() => {
    setFocusBarCode();
  }, [setFocusBarCode]);

  useEffect(() => {
    console.log(_mesChosen, mesValue);
  });

  return (
    <ScrollView contentContainerStyle={style.scrollView}>
      <View style={style.viewRoot}>
        <InputBarCode
          setRef={setRefInputBarCode}
          onBlur={onBlurs.barcode}
          label={Translate.TR_ITEM_LABEL_BAR_CODE}
          onChangeText={onChangesTexts.barcode}
          value={barCodeValue as string}
          error={barCodeError}
          labelStyle={style.labels}
          disable={false}
          inputStyle={style.input}
          rootStyle={style.inputBarcodeRoot}
        />
        <InputPriceQuantity
          onBlur={onBlurs.price}
          decPosition={3}
          label={Translate.TR_ITEM_LABEL_PRICE}
          onChangeText={onChangesTexts.price}
          value={priceValue as string}
          error={priceError}
          labelStyle={[style.labels]}
          inputStyle={style.input}
        />
      </View>
      <View style={style.viewRoot}>
        <InputDescription
          onBlur={onBlurs.description}
          label={Translate.TR_ITEM_LABEL_DESCRIPTION}
          onChangeText={onChangesTexts.description}
          value={descValue as string}
          error={descError}
          labelStyle={[style.labels]}
          inputStyle={style.input}
        />
        <Selection
          item={_mesChosen}
          label={Translate.TR_ITEM_LABEL_MEASURE}
          items={ArticleMeasureValues}
          onItemChange={_onChangeMeasure}
          error={mesError}
          labelStyle={[style.labels]}
          rootStyle={style.selectRoot}
          selectionStyle={style.select}
        />
      </View>
      <ArticleVats validation={validation} />
      <View style={[style.viewRoot, style.buttonRoot]}>
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
          titleStyle={style.submitButtonTitle}
          rootStyle={style.submitButtonRoot}
          //disabled={buttonSubmitDisabled}
        />
      </View>
    </ScrollView>
  );
};

export default ArticleDefinition;
