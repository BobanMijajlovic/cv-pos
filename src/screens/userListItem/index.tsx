import React, {useCallback, useMemo} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import {TUserModel} from 'src/database/d';
import style from 'src/screens/userListItem/style';
import {convertPriority} from 'src/util/utils';
import {useNavigation} from '@react-navigation/native';
import {UserDefinitionNavName} from 'src/navigation/d';
import {UserPriorityTypes} from 'src/constants/UserTypes';
import {__get} from 'src/util/lodash';

const UserListItem = ({
  id,
  fullName,
  nickname,
  priority,
  index,
}: {index: number} & TUserModel) => {
  const {navigate} = useNavigation();
  const handlerOnEdit = useCallback(() => {
    id &&
      navigate(UserDefinitionNavName, {
        id,
      });
  }, [id, navigate]);

  const priorityStr = useMemo(
    () =>
      __get(
        UserPriorityTypes.find(x => +x.value === +priority),
        'label',
        '#######',
      ),
    [priority],
  );

  return (
    <TouchableHighlight onPress={handlerOnEdit}>
      <View style={[style.root, index % 2 !== 0 && style.itemOdd]}>
        <View style={style.fullNameContainer}>
          <Text style={style.nickNameLabel}>{nickname}</Text>
          <View style={style.itemDescSecondLine}>
            <Text style={style.itemFullName}>{fullName}</Text>
            <Text style={style.itemPriority}>{priorityStr}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default UserListItem;
