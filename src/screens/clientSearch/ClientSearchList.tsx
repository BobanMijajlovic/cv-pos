import React from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';
import ClientSearchItem from 'src/screens/clientSearch/ClientSearchItem';

const ClientSearchList = <ItemT extends {}>({data}: any) => {
  const _renderItem = (
    item: ListRenderItemInfo<ItemT>,
  ): React.ReactElement | null => {
    return <ClientSearchItem index={item.index} client={item.item as any} />;
  };

  return (
    <FlatList<ItemT>
      data={data}
      renderItem={_renderItem}
      keyExtractor={(item: any, index) => (item ? item.id : index)}
    />
  );
};

export default ClientSearchList;
