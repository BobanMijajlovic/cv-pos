import React, {useEffect, useMemo, useState} from 'react';
import {Animated, Text, TouchableHighlight, View} from 'react-native';
import style from './style';
import {formatPrice, formatQuantity} from 'src/util/utils';
import {__divide, __multiply, __round, __subtract} from 'src/util/lodash';
import {TReceiptListItemProps} from 'src/screens/receipt/d';
import {useSelector} from 'react-redux';
import {_selectorReceiptGetLastAction} from '../../../store/Receipt/helpers';
import {LAST_ACTIONS} from '../../../store/Receipt/d';
import {Colors} from '../../../constants/Colors';
import ActionSheet from '../../../components/actionSheet';
import {Translate} from '../../../translate/data';
import {useReceipt} from '../../../hooks/receipt/useReceipt';
import {useNavigation} from '@react-navigation/native';
import {
  ReceiptChangeDiscountNavName,
  ReceiptChangeQtyNavName,
} from '../../../navigation/d';
import Shake from 'src/components/animated/Shake';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {
  iconFontAwesomeBalanceScale,
  iconFontAwesomePercentage,
} from '../../../icon';
import ArticleItemVats from '../../../components/articleItemVats';
import {ArticleMeasureValues} from 'src/constants/Article';

const ReceiptListItem = ({
  article,
  quantity,
  discount,
  guid,
  index,
}: TReceiptListItemProps) => {
  const {navigate} = useNavigation();
  const lastAction = useSelector(_selectorReceiptGetLastAction);
  const {needChangeQty, needChangeDiscount} = useReceipt();
  const [lastState, setLastState] = useState<any>('');
  const {description, mes, barcode, price, vat, vat1, vat2, vat3} = article;

  const strDescription = useMemo(() => {
    const mesStr =
      ArticleMeasureValues.find(x => x.value === `${mes}`)?.label || '';
    return `${description}${mesStr}`;
  }, [mes, description]);

  const [priceStr, quantityStr, totalStr, discountStr, priceDiscStr] =
    useMemo(() => {
      let priceDiscount = price;
      let discountValue = 0;
      if (discount) {
        priceDiscount = __round(
          __divide(__multiply(price, __subtract(100, discount)), 100),
          2,
        );
        discountValue = __round(
          __multiply(__subtract(price, priceDiscount), -1),
          2,
        );
      }
      return [
        formatPrice(price),
        formatQuantity(quantity, 0),
        formatPrice(__round(__multiply(priceDiscount, quantity), 3)),
        formatPrice(discountValue),
        formatPrice(priceDiscount),
      ];
    }, [price, quantity, discount]);

  const handlerActionSheetChangeQty = () => {
    guid && needChangeQty(guid);
    navigate(ReceiptChangeQtyNavName);
  };

  const handlerActionSheetChangeDiscount = () => {
    if (guid) {
      needChangeDiscount(guid);
      navigate(ReceiptChangeDiscountNavName);
    }
  };

  useEffect(() => {
    let th = 0;
    if (lastAction.guid === guid) {
      setLastState(lastAction.action);
      th = setTimeout(() => {
        setLastState('');
      }, 2500) as any;
    }
    return () => {
      clearTimeout(th);
    };
  }, [lastAction, guid, setLastState]);

  return (
    <Shake
      start={
        lastState === LAST_ACTIONS.addItem ||
        lastState === LAST_ACTIONS.addItemQty
      }>
      <ActionSheet
        title={Translate.TR_RECEIPT_ACTION_SHEET_TITLE}
        items={[
          {
            label: Translate.TR_RECEIPT_ACTION_SHEET_CHANGE_QTY_LABEL,
            onPress: handlerActionSheetChangeQty,
          },
          {
            label: Translate.TR_RECEIPT_ACTION_SHEET_DISCOUNT_LABEL,
            onPress: handlerActionSheetChangeDiscount,
          },
          {
            label: Translate.TR_RECEIPT_ACTION_SHEET_CANCEL_LABEL,
          },
        ]}
        icons={[
          <FontAwesome5Icon name={iconFontAwesomeBalanceScale} />,
          <FontAwesome5Icon name={iconFontAwesomePercentage} />,
        ]}>
        {showActionSheet => (
          <TouchableHighlight
            onPress={showActionSheet}
            underlayColor={Colors.PALETTE.BLUE._900}>
            <Animated.View
              style={[
                style.root,
                index % 2 !== 0 && style.itemOdd,
                (lastState === LAST_ACTIONS.addItem ||
                  lastState === LAST_ACTIONS.addItemQty) &&
                  style.itemAdded,
                lastState === LAST_ACTIONS.changeQuantity &&
                  style.itemChangeQty,
              ]}>
              <View style={style.flexRow}>
                <Text style={style.itemNumber}>#{index + 1}</Text>
                <Text style={style.descriptionLabel}>{strDescription}</Text>
                <ArticleItemVats article={article} />
              </View>
              <View style={style.itemDescSecondLine}>
                <View style={style.itemBarCode}>
                  <Text style={style.itemBarcodeText} numberOfLines={1}>
                    {barcode}
                  </Text>
                </View>
                <View style={style.itemQtyPriceContainer}>
                  <View style={style.itemQty}>
                    <Text style={style.itemQtyText}>{quantityStr}</Text>
                    <Text style={style.itemQuantityMultiSign}>x</Text>
                  </View>
                  {discount ? (
                    <View style={style.itemDiscountContainer}>
                      <View style={style.itemDiscountRowBorder}>
                        <Text style={style.itemDiscountHelpText}>
                          {priceStr}
                        </Text>
                        <Text style={style.itemDiscountHelpText}>
                          {` - ${formatPrice(discount)} %`}
                        </Text>
                      </View>
                      <View style={style.itemDiscountRow}>
                        <Text style={style.itemDiscountPrice}>
                          {priceDiscStr}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View style={style.itemPrice}>
                      <Text style={style.itemPriceText}>{priceStr}</Text>
                    </View>
                  )}
                </View>
                <View style={style.itemTotal}>
                  <Text style={style.itemTotalText}>{totalStr}</Text>
                </View>
              </View>
            </Animated.View>
          </TouchableHighlight>
        )}
      </ActionSheet>
    </Shake>
  );
};

export default ReceiptListItem;
