import React from 'react';
import {SwipeListView} from 'react-native-swipe-list-view';
import {TSwipeListProps} from './d';
import {ListRenderItemInfo, View} from 'react-native';
import {__random} from '../../util/lodash';
import EmptyComponent from './EmptyComponent';
import style from 'src/components/swipeList/style';

const SwipeList = <ItemT extends {}>({
  listName,
  data,
  renderItemComponent: ListItem,
  renderHiddenItemComponent: HiddenComponent,
  renderItemProps,
  renderHiddenItemProps,
  emptyProps,
  ...rest
}: TSwipeListProps<ItemT>) => {
  const _renderItem = (
    item: ListRenderItemInfo<ItemT>,
  ): React.ReactElement | null => {
    return (
      <View style={style.listItemRoot}>
        <View style={style.itemLeftSwipe} />
        <View style={style.itemRightSwipe} />
        <ListItem
          {...(item as any).item}
          index={item.index}
          {...renderItemProps}
        />
      </View>
    );
  };

  const _renderHiddenItems = (data: any, rowMap: any) => {
    return (
      <HiddenComponent<ItemT>
        data={data}
        rowMap={rowMap}
        {...renderHiddenItemProps}
      />
    );
  };

  return (
    <View style={style.styleListRoot}>
      {!data.length ? (
        <EmptyComponent {...emptyProps} />
      ) : (
        <SwipeListView<ItemT>
          data={data}
          renderItem={_renderItem}
          renderHiddenItem={_renderHiddenItems}
          keyExtractor={(item: any, index) =>
            `${listName ? listName : `swipe-list-key${__random(0, 9999)}`}-${
              item ? item.id : index
            }`
          }
          leftOpenValue={75}
          rightOpenValue={-75}
          {...rest}
        />
      )}
    </View>
  );
};

export default SwipeList;
