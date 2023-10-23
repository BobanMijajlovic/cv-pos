import React, {useRef, useCallback, useState} from 'react';
import {View} from 'react-native';
import {TClientModel} from 'src/database/d';
import {useProgress} from 'src/hooks/progress/useProgress';
import * as ClientTable from '../../database/clients';
import {useFocusEffect} from '@react-navigation/native';
import style from './style';
import {InputSearch} from 'src/components/input/InputSearch';
import ClientSearchList from 'src/screens/clientSearch/ClientSearchList';

const ClientSearch = () => {
  const [clients, setClients] = useState<TClientModel[]>([] as TClientModel[]);

  const {setProgress, endProgress} = useProgress();

  const searchValue = useRef('');

  const fetchAll = useCallback(async () => {
    setProgress();
    const data = searchValue.current.length
      ? {
          like: {
            field: ['name', 'pib'],
            value: searchValue.current,
          },
        }
      : {};
    try {
      const r = await ClientTable.selectAll(data);
      setClients(r.rows);
    } catch (e) {
      console.log(e);
    } finally {
      endProgress();
    }
  }, [searchValue, endProgress, setProgress, setClients]);

  const handlerSearch = useCallback(
    (_value: string) => {
      searchValue.current = _value;
      fetchAll().then();
    },
    [fetchAll, searchValue],
  );

  useFocusEffect(
    useCallback(() => {
      fetchAll().then();
    }, [fetchAll]),
  );

  return (
    <View style={style.root}>
      <View style={style.header}>
        <View style={style.headerInputContainer}>
          <InputSearch
            rootStyle={style.headerInputRoot}
            onChangeText={handlerSearch}
          />
        </View>
      </View>
      <View style={style.content}>
        <ClientSearchList<TClientModel> data={clients} />
      </View>
    </View>
  );
};

export default ClientSearch;
