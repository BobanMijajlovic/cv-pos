import React, {useCallback, useMemo} from 'react';
import {TouchableOpacity, View} from 'react-native';
import style from './style';
import {useReceipt} from 'src/hooks/receipt/useReceipt';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {
  iconFontAwesomePercentage,
  iconFontAwesomeTrash,
  iconFontAwesomeTrashSolid,
} from 'src/icon';
import {TSwipeListItemActionsProps} from 'src/components/swipeList/d';

const ReceiptItemAction = <T extends {}>({
  data,
  rowMap,
}: TSwipeListItemActionsProps<T>) => {
  const {removeItem, clearDiscount} = useReceipt();

  const {index, item} = data;

  const closeRow = useCallback(() => {
    rowMap[index]?.closeRow();
  }, [rowMap, index]);

  const handlerOnDelete = useCallback(() => {
    closeRow();
    removeItem(Number(index));
  }, [index, removeItem, closeRow]);

  const handlerClearDiscount = useCallback(() => {
    closeRow();
    (item as any)?.guid && clearDiscount((item as any)?.guid);
  }, [item, clearDiscount, closeRow]);

  const disabled = useMemo(() => !(item as any)?.discount, [item]);

  return (
    <View style={style.swipeRowBackRoot}>
      <TouchableOpacity
        style={[style.swipeBackLeftBtn, disabled && style.disabled]}
        onPress={handlerClearDiscount}
        disabled={disabled}>
        <View style={style.iconsView}>
          <FontAwesome5Icon
            style={[style.iconPercent, disabled && style.disabled]}
            name={iconFontAwesomePercentage}
          />
          <FontAwesome5Icon
            style={style.iconPercentClear}
            name={iconFontAwesomeTrashSolid}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={style.swipeBackRightBtn}
        onPress={handlerOnDelete}>
        <FontAwesome5Icon style={style.icon} name={iconFontAwesomeTrash} />
      </TouchableOpacity>
    </View>
  );
};

export default ReceiptItemAction;
