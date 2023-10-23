import React, {useCallback, useRef, useState} from 'react';
import {View} from 'react-native';
import style from './style';
import {InputSearch} from '../../components/input/InputSearch';
import {TArticleModal} from '../../database/d';
import ReceiptSearchList from './receiptSearchList';
import {useProgress} from '../../hooks/progress/useProgress';
import {useFocusEffect} from '@react-navigation/native';
import * as ArticleTable from '../../database/Article';

const ReceiptSearch = () => {
  const [articles, setArticles] = useState<TArticleModal[]>(
    [] as TArticleModal[],
  );

  const {setProgress, endProgress} = useProgress();

  const searchValue = useRef('');

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
      setArticles(r.rows);
    } catch (e) {
    } finally {
      endProgress();
    }
  }, [endProgress, searchValue, setProgress, setArticles]);

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
        <ReceiptSearchList<TArticleModal> data={articles} />
      </View>
    </View>
  );
};

export default ReceiptSearch;
