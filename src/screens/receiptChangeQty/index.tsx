import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Text, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import style from './style';
import {Translate} from '../../translate/data';
import {useSelector} from 'react-redux';
import {_selectorFiscalGetVats} from '../../store/Fiscal/helpers';
import {
  formatCurrencyQty,
  formatPrice,
  formatQuantity,
  toNumberFixed,
} from '../../util/utils';
import ButtonIcon from '../../components/button/ButtonIcon';
import {ButtonFill} from '../../components/button/d';
import {Colors} from '../../constants/Colors';
import {iconFontAwesomeMinus, iconFontAwesomePlus} from '../../icon';
import Button from '../../components/button';
import {useReceipt} from '../../hooks/receipt/useReceipt';
import {ReceiptNavName} from '../../navigation/d';
import {
  _selectorReceiptGetItemByGuid,
  _selectorReceiptNeedChangeQty,
} from '../../store/Receipt/helpers';
import {__multiply, __omit, __round} from '../../util/lodash';
import {TButtonEvent} from 'src/components/keyboard/d';
import {useKeyboardInternal} from 'src/components/keyboard/context';
import NumericKeyboard from 'src/components/keyboard/NumericKeyboard';
import {useNumericKeyboard} from 'src/hooks/keyboard/useKeyboard';
import ArticleItemVats from 'src/components/articleItemVats';
import {errorToast} from 'src/components/toast';

const ReceiptChangeQty = () => {
  const {navigate} = useNavigation();
  const {params} = useRoute();
  const {article} = params || ({} as any);
  // @ts-ignore
  const {guid} = useSelector(_selectorReceiptNeedChangeQty) as any;
  const _art = useSelector(_selectorReceiptGetItemByGuid(guid));
  const {addItem, changeQuantity} = useReceipt();
  const {processKeyboard} = useNumericKeyboard();
  const [value, setValue] = useState<string>('1.000');

  const handlerKeyboard = useCallback(
    ({key}: TButtonEvent) => {
      setValue(v => {
        return processKeyboard(key, v, 3);
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

  const {id, vat, description, barcode, price} = _article;

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
        return formatCurrencyQty(arr[1] ? `${val}.${arr[1]}` : `${val}.000`, 3);
      }),
    [setValue],
  );

  const handlerAdd = useCallback(
    () =>
      setValue(v => {
        const arr = v.split('.');
        let val = toNumberFixed(arr[0] || 0) + 1;
        return formatCurrencyQty(arr[1] ? `${val}.${arr[1]}` : `${val}.000`, 3);
      }),
    [setValue],
  );

  const handlerSaleItem = useCallback(() => {
    const val = toNumberFixed(value);
    const finance = __round(__multiply(val, price), 2);
    if (finance < 0.01) {
      errorToast('Kolicina nije validna. Iznos je mani od 0.01', 1000);
      return;
    }
    id ? addItem(id, val) : guid && changeQuantity({guid, value: val});
    navigate(ReceiptNavName);
  }, [addItem, id, value, navigate, guid, changeQuantity]);

  useEffect(() => {
    if (!_art) {
      return;
    }
    setValue(formatQuantity(_art.quantity));
  }, [_art, setValue]);

  return (
    <View style={style.root}>
      <View style={style.quantityChangeContainer}>
        <View style={style.articlePart}>
          <View style={style.row}>
            <Text style={style.articleDescription}>{description}&nbsp;</Text>
            {/* <Text style={style.articleTax}>{vatStr}&nbsp;</Text>*/}
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
              {formatCurrencyQty(value, 3)}
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

export default ReceiptChangeQty;
