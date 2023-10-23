import React, {useCallback} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {UserDefinitionNavName} from 'src/navigation/d';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {iconFontAwesomeTrash, iconFontAwesomePencil} from 'src/icon';
import style from 'src/screens/userListItem/style';
import {TSwipeListItemActionsProps} from 'src/components/swipeList/d';

export const ItemActions = <T extends {}>({
  onDelete,
  data,
  rowMap,
}: TSwipeListItemActionsProps<T>) => {
  const {navigate} = useNavigation();

  const {item} = data;
  const _item = item as any;

  const closeRow = useCallback(() => {
    rowMap[_item.id]?.closeRow();
  }, [rowMap, _item]);

  const handlerOnEdit = useCallback(() => {
    _item &&
      _item?.id &&
      navigate(UserDefinitionNavName, {
        id: Number(_item.id),
      });
    closeRow();
  }, [_item, closeRow, navigate]);

  const handlerOnDelete = useCallback(() => {
    _item && _item?.id && onDelete && onDelete(Number(_item.id));
    closeRow();
  }, [_item, onDelete, closeRow]);

  return (
    <View style={style.swipeRowBackRoot}>
      <TouchableOpacity
        style={style.swipeBackRightBtn}
        onPress={handlerOnDelete}>
        <FontAwesome5Icon
          style={style.buttonIcon}
          name={iconFontAwesomeTrash}
        />
      </TouchableOpacity>
      <TouchableOpacity style={style.swipeBackLeftBtn} onPress={handlerOnEdit}>
        <FontAwesome5Icon
          style={style.buttonIcon}
          name={iconFontAwesomePencil}
        />
      </TouchableOpacity>
    </View>
  );
};
