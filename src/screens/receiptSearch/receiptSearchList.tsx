import React from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';
import ReceiptSearchItem from './ReceiptSearchItem';

const ReceiptSearchList = <ItemT extends {}>({data}: any) => {
  const _renderItem = (
    item: ListRenderItemInfo<ItemT>,
  ): React.ReactElement | null => {
    return <ReceiptSearchItem article={item.item as any} index={item.index} />;
  };

  return (
    <FlatList<ItemT>
      data={data}
      renderItem={_renderItem}
      keyExtractor={(item: any, index) => (item ? item.id : index)}
    />
  );
};

export default ReceiptSearchList;
