import React, {useCallback, useRef, useState} from 'react';
import {View} from 'react-native';
import style from './style';
import {InputSearch} from 'src/components/input/InputSearch';
import {ButtonFill} from '../../components/button/d';
import {Colors} from '../../constants/Colors';
import {UserDefinitionNavName} from 'src/navigation/d';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {TUserModel} from 'src/database/d';
import {useProgress} from 'src/hooks/progress/useProgress';
import * as UserTable from 'src/database/User';
import SwipeList from 'src/components/swipeList';
import UserListItem from 'src/screens/userListItem';
import {ItemActions} from 'src/screens/userListItem/ItemActions';
import Button from 'src/components/button';
import {Translate} from 'src/translate/data';
import {processError} from 'src/util/error';

const Users = () => {
  const [users, setUsers] = useState<TUserModel[]>([] as TUserModel[]);

  const {setProgress, endProgress} = useProgress();
  const {navigate} = useNavigation();

  const searchValue = useRef('');

  const fetchAll = useCallback(async () => {
    setProgress();
    const data = searchValue.current.length
      ? {
          like: {
            field: ['fullName', 'nickname'],
            value: searchValue.current,
          },
        }
      : {};

    try {
      const r = await UserTable.selectAll(data);
      setUsers(r.rows);
    } catch (e) {}
    endProgress();
  }, [searchValue, endProgress, setProgress, setUsers]);

  const handlerDefine = useCallback(
    () => navigate(UserDefinitionNavName),
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
        await UserTable.deleteOne(id);
        await fetchAll();
      } catch (e) {
        processError({
          error: e,
        });
      }
      endProgress();
    },
    [fetchAll, endProgress, setProgress],
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

      <SwipeList<TUserModel>
        data={users}
        renderItemComponent={UserListItem}
        renderHiddenItemComponent={ItemActions}
        renderHiddenItemProps={{onDelete: handlerRemoveItem}}
      />
    </View>
  );
};

export default Users;
