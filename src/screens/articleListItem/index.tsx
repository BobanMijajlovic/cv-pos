import React, {useCallback, useMemo} from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import style from 'src/screens/articleListItem/style';
import {formatPrice} from 'src/util/utils';
import {TArticleModal} from '../../database/d';
import {useNavigation} from '@react-navigation/native';
import {ArticleDefinitionNavName} from 'src/navigation/d';
import ArticleItemVats from '../../components/articleItemVats';
import {ArticleMeasureValues} from 'src/constants/Article';

const ArticleListItem = (article: {index: number} & TArticleModal) => {
  const {id, barcode, description, price, mes, index} = article;
  const {navigate} = useNavigation();
  const handlerOnEdit = useCallback(() => {
    id &&
      navigate(ArticleDefinitionNavName, {
        id,
      });
  }, [id, navigate]);

  const strDescription = useMemo(() => {
    const mesStr =
      ArticleMeasureValues.find(x => x.value === `${mes}`)?.label || '';
    return `${description}${mesStr}`;
  }, [mes, description]);

  return (
    <TouchableHighlight onPress={handlerOnEdit}>
      <View style={[style.root, index % 2 !== 0 && style.itemOdd]}>
        <View style={style.descriptionContainer}>
          <View style={style.flexRow}>
            <Text style={style.descriptionLabel}>{strDescription}</Text>
            <ArticleItemVats article={article} />
          </View>
          <View style={style.flexRow}>
            <Text style={style.itemBarcode}>{barcode}</Text>
            <Text style={style.itemPrice}>{formatPrice(price, 3)}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default ArticleListItem;
