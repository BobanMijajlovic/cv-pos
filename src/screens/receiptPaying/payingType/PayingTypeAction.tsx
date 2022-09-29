import React, {useCallback} from 'react';
import {TouchableOpacity, View} from 'react-native';
import style from '../../receipt/receiptList/style';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {iconFontAwesomeTrash} from 'src/icon';
import {useReceipt} from 'src/hooks/receipt/useReceipt';
import {TSwipeListItemActionsProps} from 'src/components/swipeList/d';

const PayingTypeAction = <T extends {}>({
  data,
  rowMap,
}: TSwipeListItemActionsProps<T>) => {
  const {removePayment} = useReceipt();

  const {index, item} = data;

  const closeRow = useCallback(() => {
    rowMap[index]?.closeRow();
  }, [rowMap, index]);

  const handlerOnDelete = useCallback(() => {
    closeRow();
    item && removePayment((item as any).type);
  }, [item, removePayment, closeRow]);

  return (
    <View style={style.swipeRowBackRoot}>
      <TouchableOpacity
        style={style.swipeBackRightBtn}
        onPress={handlerOnDelete}>
        <FontAwesome5Icon style={style.icon} name={iconFontAwesomeTrash} />
      </TouchableOpacity>
    </View>
  );
};

export default PayingTypeAction;
