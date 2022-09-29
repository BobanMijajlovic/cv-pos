import React, {useCallback} from 'react';
import {TouchableOpacity, View} from 'react-native';
import style from './style';
import {useNavigation} from '@react-navigation/native';
import {ArticleDefinitionNavName} from 'src/navigation/d';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {iconFontAwesomePencil, iconFontAwesomeTrash} from 'src/icon';
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
      navigate(ArticleDefinitionNavName, {
        id: Number(_item.id),
      });
    closeRow();
  }, [_item, closeRow, navigate]);

  const handlerOnDelete = useCallback(() => {
    _item && _item?.id && onDelete && onDelete(Number(_item.id));
    closeRow();
  }, [_item, onDelete, closeRow]);

  return (
    <View style={style.itemActionRoot}>
      <TouchableOpacity style={style.itemActionLeftBtn} onPress={handlerOnEdit}>
        <FontAwesome5Icon style={style.icon} name={iconFontAwesomePencil} />
      </TouchableOpacity>
      <TouchableOpacity
        style={style.itemActionRightBtn}
        onPress={handlerOnDelete}>
        <FontAwesome5Icon style={style.icon} name={iconFontAwesomeTrash} />
      </TouchableOpacity>
    </View>
  );
};
