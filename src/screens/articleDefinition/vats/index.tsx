import style from '../style';
import ArticleVatItem from './ArticleVatItem';
import {Text, View} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {Translate} from 'src/translate/data';
import useLpfrEsir from 'src/hooks/useLPFR/useLpfrEsir';

const ArticleVats = ({validation}: {validation: any}) => {
  const {fields, onChange} = validation;

  const {vats} = fields;
  const {value: vatsState, error: vatsError} = vats;
  const {tax} = useLpfrEsir();

  const vatsArray = useMemo(
    () =>
      [...tax].map(tax => {
        const isChecked = !!vatsState.find((x: any) => x.value === tax.label);
        return {
          ...tax,
          isChecked,
          disabled:
            vatsState.filter((x: any) => x.value).length === 4 && !isChecked,
        };
      }),
    [tax, vatsState],
  );

  const handlerCheckVat = useCallback(
    (label: string) => {
      const arr = [...vatsState] as any;
      let index = arr.findIndex((x: any) => x?.value && x.value === label);
      if (index === -1) {
        index = arr.findIndex((x: any) => !x.value);
      }
      arr.splice(index, 1, {
        ...arr[index],
        value: arr[index]?.value ? undefined : label,
      });
      onChange(arr, 'vats');
    },
    [onChange, vatsState],
  );

  return (
    <>
      <View style={style.viewRoot}>
        <View style={style.vatsHeaderContainer}>
          <Text style={style.vatsHeaderText}>
            {Translate.TR_ITEM_DEFINITION_VATS}
          </Text>
          <Text style={style.vatErrorText}>{vatsError ? vatsError : ''}</Text>
        </View>
      </View>
      <View style={style.vatsList}>
        {vatsArray &&
          vatsArray.map((vat: any, key: any) => (
            <ArticleVatItem key={key} {...vat} setChecked={handlerCheckVat} />
          ))}
      </View>
    </>
  );
};

export default ArticleVats;
