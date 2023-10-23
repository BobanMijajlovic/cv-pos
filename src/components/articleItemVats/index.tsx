import React, {useMemo} from 'react';
import {__get} from 'src/util/lodash';
import style from './style';
import {setBackgroundColorByTax} from 'src/util/utils';
import {Text, View} from 'react-native';

const ArticleItemVats = ({article}: {article: any}) => {
  const vatsArray = useMemo(
    () =>
      ['vat', 'vat1', 'vat2', 'vat3']
        .map(x => {
          const vat = __get(article, x);
          if (!vat || vat === 'null' || vat === 'undefined') {
            return undefined;
          }
          return vat;
        })
        .filter(x => !!x),
    [article],
  );
  return (
    <View style={style.itemTaxContainer}>
      {vatsArray &&
        vatsArray.map((vat, key) => (
          <View
            key={key}
            style={[
              style.itemTax,
              {backgroundColor: setBackgroundColorByTax(vat)},
            ]}>
            <Text style={style.itemTaxText}>{vat}</Text>
          </View>
        ))}
    </View>
  );
};

export default ArticleItemVats;
