import React, {useCallback, useRef, useState} from 'react';
import {View} from 'react-native';
import style from './style';
import {useProgress} from 'src/hooks/progress/useProgress';
import * as ArticleTable from 'src/database/Article';
import {TArticleModal} from 'src/database/d';
import {InputSearch} from 'src/components/input/InputSearch';
import {ArticleDefinitionNavName} from 'src/navigation/d';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {ButtonFill} from '../../components/button/d';
import {Colors} from '../../constants/Colors';
import SwipeList from '../../components/swipeList';
import {ItemActions} from 'src/screens/articleListItem/ItemActions';
import ArticleListItem from '../articleListItem';
import Button from 'src/components/button';
import {Translate} from 'src/translate/data';

const Articles = () => {
  const [articles, setArticles] = useState<TArticleModal[]>(
    [] as TArticleModal[],
  );

  const {setProgress, endProgress} = useProgress();
  const {navigate} = useNavigation();

  const searchValue = useRef('');

  const handlerDefine = useCallback(
    () => navigate(ArticleDefinitionNavName),
    [navigate],
  );

  const fetchAll = useCallback(async () => {
    setProgress();
    const data = searchValue.current.length
      ? {
          like: {
            field: ['barcode', 'description'],
            value: searchValue.current,
          },
        }
      : {};

    try {
      const r = await ArticleTable.selectAll(data);
      console.log(r.rows);
      setArticles(r.rows);
    } catch (e) {}
    endProgress();
  }, [searchValue, setProgress, setArticles, endProgress]);

  const handlerRemoveItem = useCallback(
    async (id: number) => {
      setProgress();
      try {
        await ArticleTable.deleteOne(id);
        await fetchAll();
      } catch (e) {}
    },
    [fetchAll, setProgress],
  );

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
      <SwipeList<TArticleModal>
        data={articles}
        renderItemComponent={ArticleListItem}
        renderHiddenItemComponent={ItemActions}
        renderHiddenItemProps={{onDelete: handlerRemoveItem}}
      />
    </View>
  );
};

export default Articles;
