import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Text, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  _selectorReceiptGetItemByGuid,
  _selectorReceiptNeedChangeDiscount,
} from 'src/store/Receipt/helpers';
import {useReceipt} from 'src/hooks/receipt/useReceipt';
import {useNumericKeyboard} from 'src/hooks/keyboard/useKeyboard';
import {TButtonEvent} from 'src/components/keyboard/d';
import {useKeyboardInternal} from 'src/components/keyboard/context';
import {_selectorFiscalGetVats} from 'src/store/Fiscal/helpers';
import {__omit} from 'src/util/lodash';
import {formatCurrencyQty, formatPrice, toNumberFixed} from 'src/util/utils';
import {ReceiptNavName} from 'src/navigation/d';
import style from 'src/screens/receiptChangeDiscount/style';
import ButtonIcon from 'src/components/button/ButtonIcon';
import {ButtonFill} from 'src/components/button/d';
import {Colors} from 'src/constants/Colors';
import {iconFontAwesomeMinus, iconFontAwesomePlus} from 'src/icon';
import Button from 'src/components/button';
import {Translate} from 'src/translate/data';
import NumericKeyboard from 'src/components/keyboard/NumericKeyboard';
import ArticleItemVats from 'src/components/articleItemVats';

const ReceiptChangeDiscount = () => {
  const {navigate} = useNavigation();
  const {params} = useRoute();
  const {article} = params || ({} as any);
  // @ts-ignore
  const {guid} = useSelector(_selectorReceiptNeedChangeDiscount) as any;
  const _art = useSelector(_selectorReceiptGetItemByGuid(guid));
  const {addDiscount} = useReceipt();
  const {processKeyboard} = useNumericKeyboard();
  const [value, setValue] = useState<string>('0.00');

  const handlerKeyboard = useCallback(
    ({key}: TButtonEvent) => {
      setValue(v => {
        return processKeyboard(key, v, 2, 99.99);
      });
    },
    [processKeyboard, setValue],
  );

  useKeyboardInternal(handlerKeyboard);

  const vats = useSelector(_selectorFiscalGetVats);

  const _article = useMemo(
    () => (article ? article : __omit(_art?.article, ['id'])) || ({} as any),
    [article, _art],
  );

  const {vat, description, barcode, price} = _article;
  const vatStr = useMemo(
    () => (vats && vat && vats[vat] ? vats[vat].label : vats[0].label),
    [vats, vat],
  );

  const handlerSub = useCallback(
    () =>
      setValue(v => {
        const arr = v.split('.');
        let val = toNumberFixed(arr[0] || 0);
        if (val === 0) {
          return v;
        }
        val -= 1;
        return formatCurrencyQty(arr[1] ? `${val}.${arr[1]}` : `${val}.00`, 2);
      }),
    [setValue],
  );

  const handlerAdd = useCallback(
    () =>
      setValue(v => {
        const arr = v.split('.');
        let val = toNumberFixed(arr[0] || 0) + 1;
        if (val > 99) {
          val = 99;
        }
        return formatCurrencyQty(arr[1] ? `${val}.${arr[1]}` : `${val}.00`, 2);
      }),
    [setValue],
  );

  const handlerSaleItem = useCallback(() => {
    let val = toNumberFixed(value);
    if (val > 99.99) {
      val = 99.99;
    }
    addDiscount(guid, val);
    navigate(ReceiptNavName);
  }, [addDiscount, value, navigate, guid]);

  useEffect(() => {
    if (!_art) {
      return;
    }
    setValue(formatPrice(_art?.discount || 0));
  }, [_art, setValue]);

  return (
    <View style={style.root}>
      <View style={style.quantityChangeContainer}>
        <View style={style.articlePart}>
          <View style={style.row}>
            <Text style={style.articleDescription}>{description}&nbsp;</Text>
            {/*
            <Text style={style.articleTax}>{vatStr}&nbsp;</Text>*/}
            <ArticleItemVats article={_article} />
          </View>
          <View style={style.row}>
            <Text style={style.articleBarCodeText}>{barcode}</Text>
            <Text style={style.articlePriceText}>{formatPrice(price)}</Text>
          </View>
        </View>
        <View style={style.changeQtyContainer}>
          <ButtonIcon
            rootStyle={style.changeQtyButton}
            fill={ButtonFill.OUTLINE}
            onPress={handlerSub}
            color={Colors.PALETTE.RED._800}
            icon={iconFontAwesomeMinus}
          />
          <View style={style.changeQtyInputWrapper}>
            <Text style={style.changeQtyText}>
              {formatCurrencyQty(value, 2)}%
            </Text>
          </View>
          <ButtonIcon
            rootStyle={style.changeQtyButton}
            iconStyle={style.changeQtyButtonIcon}
            fill={ButtonFill.OUTLINE}
            onPress={handlerAdd}
            color={Colors.PALETTE.BLUE._700}
            icon={iconFontAwesomePlus}
          />
        </View>
        <View style={style.confirmButtonContainer}>
          <Button
            title={Translate.TR_RECEIPT_CHANGE_QTY_BUTTON_LABEL}
            fill={ButtonFill.OUTLINE}
            color={Colors.PALETTE.BLUE._700}
            onPress={handlerSaleItem}
            titleStyle={style.buttonConfirmText}
            rootStyle={style.buttonConfirmRoot}
          />
        </View>
      </View>
      <View style={style.keyboardContainer}>
        <NumericKeyboard />
      </View>
    </View>
  );
};

export default ReceiptChangeDiscount;
