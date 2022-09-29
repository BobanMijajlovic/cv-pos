import React from 'react';
import ReceiptListItem from 'src/screens/receipt/receiptList/ReceiptListItem';
import ReceiptItemAction from 'src/screens/receipt/receiptList/ReceiptItemAction';
import SwipeList from '../../../components/swipeList';

const ReceiptList = <ItemT extends {}>({data}: any) => {
  return (
    <SwipeList<ItemT>
      data={data}
      renderItemComponent={ReceiptListItem}
      renderHiddenItemComponent={ReceiptItemAction}
      disableRightSwipe
    />
  );
};

export default ReceiptList;
