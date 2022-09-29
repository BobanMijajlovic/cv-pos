import React, {useCallback, useMemo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import style from './style';
import {TArticleItemType} from '../articleListItem/d';
import {formatPrice} from '../../util/utils';
import {useReceipt} from '../../hooks/receipt/useReceipt';
import {useNavigation} from '@react-navigation/native';
import {ReceiptChangeQtyNavName} from '../../navigation/d';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {
  iconFontAwesomeBalanceScale,
  iconFontAwesomeCashRegister,
} from 'src/icon';
import ArticleItemVats from '../../components/articleItemVats';
import {ArticleMeasureValues} from 'src/constants/Article';

const ReceiptSearchItem = ({
  article,
  index,
}: {
  index: number;
  article: TArticleItemType;
}) => {
  const {id, barcode, description, price, mes} = article;
  const {navigate, goBack} = useNavigation();
  const {addItem} = useReceipt();

  const saleItem = useCallback(() => {
    id && addItem(Number(id));
    goBack();
  }, [addItem, goBack, id]);

  const saleItemQty = useCallback(() => {
    navigate(ReceiptChangeQtyNavName, {
      article,
    });
  }, [navigate, article]);

  const strDescription = useMemo(() => {
    const mesStr =
      ArticleMeasureValues.find(x => x.value === `${mes}`)?.label || '';
    return `${description}${mesStr}`;
  }, [mes, description]);

  return (
    <View
      style={[style.receiptItemRoot, index % 2 !== 0 && style.receiptItemOdd]}>
      <TouchableOpacity style={style.leftPart} onPress={saleItem}>
        <FontAwesome5Icon
          name={iconFontAwesomeCashRegister}
          style={[style.waterMarkIcon, style.sellItemIcon]}
        />
        <View style={style.itemDescTaxPart}>
          <Text style={style.itemDescription}>{strDescription}</Text>
          <ArticleItemVats article={article} />
        </View>
        <View>
          <Text style={style.itemBarCode}>{barcode}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={style.rightPart} onPress={saleItemQty}>
        <FontAwesome5Icon
          name={iconFontAwesomeBalanceScale}
          style={[style.waterMarkIcon, style.quantityItemIcon]}
        />
        <Text style={style.itemMultiplySign}>X</Text>
        <View style={style.itemPriceRoot}>
          <Text style={style.itemPriceText}>{formatPrice(price, 3)}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ReceiptSearchItem;
