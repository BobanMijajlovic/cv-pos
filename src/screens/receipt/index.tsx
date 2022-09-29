import React from 'react';
import { View } from 'react-native';
import style from 'src/screens/receipt/style';
import { TReceiptItem } from 'src/store/Receipt/d';
import { useSelector } from 'react-redux';
import { _selectorReceiptItems, } from 'src/store/Receipt/helpers';
import SwipeList from '../../components/swipeList';
import ReceiptListItem from './receiptList/ReceiptListItem';
import ReceiptItemAction from './receiptList/ReceiptItemAction';
import ReceiptHeader from './ReceiptHeader';
import ReceiptFooter from 'src/screens/receipt/ReceiptFooter';
import { iconFontAwesomeCartArrowDown } from 'src/icon';
import { Translate } from 'src/translate/data';
import CashSimulation from "src/screens/cashSimulation/CashSimulation";
import { EmptyTypes } from "src/components/swipeList/d";

const Receipt = () => {
  const items = useSelector(_selectorReceiptItems);

  return (
    <View style={style.root}>
      <ReceiptHeader />
      <View style={style.body}>
        <SwipeList<TReceiptItem>
          data={items}
          emptyProps={{
            emptyTitle: Translate.TR_RECEIPT_LIST_EMPTY_LABEL,
            emptyIcon: iconFontAwesomeCartArrowDown,
            type: EmptyTypes.receipt
          }}
          renderItemComponent={ReceiptListItem}
          renderHiddenItemComponent={ReceiptItemAction}
        />
        <CashSimulation />
      </View>
      <ReceiptFooter />
    </View>
  );
};

export default Receipt;
