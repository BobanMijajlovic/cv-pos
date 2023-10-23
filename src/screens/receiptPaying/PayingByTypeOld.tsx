import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {_selectorFiscalGetPayments} from '../../store/Fiscal/helpers';
import PayingType from './payingType';
import {_selectorReceiptPaying} from '../../store/Receipt/helpers';
import SwipeList from '../../components/swipeList';
import PayingTypeAction from './payingType/PayingTypeAction';

const PayingByType = () => {
  const _payments = useSelector(_selectorFiscalGetPayments);
  const receiptPaying = useSelector(_selectorReceiptPaying);

  const payments = useMemo(() => {
    const arr = [..._payments];
    return arr.reduce((acc: any, x) => {
      const pay = receiptPaying.find(p => p.type === x.type);
      return [
        ...acc,
        {
          icon: x.icon,
          type: x.type,
          label: x.label,
          value: pay?.value || 0,
        },
      ];
    }, []);
  }, [receiptPaying, _payments]);

  return (
    <SwipeList
      data={payments}
      renderItemComponent={PayingType}
      renderHiddenItemComponent={PayingTypeAction}
      disableRightSwipe
    />
  );
};

export default PayingByType;
