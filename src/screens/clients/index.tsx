import React, {useCallback, useRef, useState} from 'react';
import {View} from 'react-native';
import {TClientModel} from 'src/database/d';
import {useProgress} from 'src/hooks/progress/useProgress';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import style from 'src/screens/clients/style';
import {InputSearch} from 'src/components/input/InputSearch';
import Button from 'src/components/button';
import {Translate} from 'src/translate/data';
import {ButtonFill} from 'src/components/button/d';
import {Colors} from 'src/constants/Colors';
import SwipeList from 'src/components/swipeList';
import {ItemActions} from 'src/screens/clientListItem/itemActions';
import ClientListItem from 'src/screens/clientListItem';
import * as ClientTable from 'src/database/clients';
import {ClientsDefinitionNavName} from 'src/navigation/d';
import {processError} from 'src/util/error';

const Clients = () => {
  const [clients, setClient] = useState<TClientModel[]>([] as TClientModel[]);

  const {setProgress, endProgress} = useProgress();
  const {navigate} = useNavigation();

  const searchValue = useRef('');

  const fetchAll = useCallback(async () => {
    setProgress();
    const data = searchValue.current.length
      ? {
          like: {
            field: ['name', 'tin'],
            value: searchValue.current,
          },
        }
      : {};
    try {
      const r = await ClientTable.selectAll(data);
      setClient(r.rows);
    } catch (e) {
      processError({
        error: e,
      });
    }
    endProgress();
  }, [searchValue, endProgress, setProgress, setClient]);

  const handlerDefine = useCallback(
    () => navigate(ClientsDefinitionNavName),
    [navigate],
  );

  const handlerSearch = useCallback(
    (_value: string) => {
      searchValue.current = _value;
      fetchAll().then();
    },
    [fetchAll, searchValue],
  );

  const handlerRemoveItem = useCallback(
    async (id: number) => {
      setProgress();
      try {
        await ClientTable.deleteOne(id);
        await fetchAll();
      } catch (e) {}
    },
    [fetchAll, setProgress],
  );

  useFocusEffect(
    useCallback(() => {
      fetchAll().then();
    }, [fetchAll]),
  );

  return (
    <View style={style.root}>
      <View style={style.headerContainer}>
        <View style={style.inputSearchContainer}>
          <InputSearch
            rootStyle={style.inputSearchRoot}
            onChangeText={handlerSearch}
          />
        </View>
        <Button
          onPress={handlerDefine}
          upperCase
          title={Translate.TR_ITEM_LABEL_BUTTON_ADD}
          fill={ButtonFill.OUTLINE}
          color={Colors.PALETTE.BLUE._700}
          titleStyle={style.defineButtonText}
          rootStyle={style.defineButtonRoot}
        />
      </View>
      <SwipeList<TClientModel>
        data={clients}
        renderItemComponent={ClientListItem}
        renderHiddenItemComponent={ItemActions}
        renderHiddenItemProps={{onDelete: handlerRemoveItem}}
      />
    </View>
  );
};

export default Clients;
