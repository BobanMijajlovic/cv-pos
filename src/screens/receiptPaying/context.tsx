import React, {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {TAdvancePart, TPayingInternContext, TQuickMoneyPaying} from './d';
import {useNumericKeyboard} from '../../hooks/keyboard/useKeyboard';
import {TButtonEvent} from '../../components/keyboard/d';
import {__add, __multiply, __round, __subtract} from '../../util/lodash';
import {useSelector} from 'react-redux';
import {
  _selectorReceiptAdvanceOption,
  _selectorReceiptIsAdvance,
  _selectorReceiptTotalByReceipt,
  _selectorReceiptTotalPayed,
} from 'src/store/Receipt/helpers';

export const PayingContext = createContext({} as TPayingInternContext);

const PayingContextContainer = ({children}: {children: ReactNode}) => {
  const [isMoney, setIsMoney] = useState<boolean>(false);
  const [advance, setAdvance] = useState<TAdvancePart>({
    isAdvance: false,
  });
  const [moneyPaying, setMoneyPaying] = useState<TQuickMoneyPaying[]>(
    [] as TQuickMoneyPaying[],
  );

  const [value, setValue] = useState<string>('');
  const {processKeyboard} = useNumericKeyboard();

  const isAdvanceReceipt = useSelector(_selectorReceiptIsAdvance);
  const advanceProps = useSelector(_selectorReceiptAdvanceOption);
  const totalToPay = useSelector(_selectorReceiptTotalByReceipt);
  const totalPayed = useSelector(_selectorReceiptTotalPayed);

  const [receiptTotal, needToPay, financePayed, change] = useMemo(() => {
    let financePayed = totalPayed;
    let total = totalToPay;
    if (isAdvanceReceipt) {
      total = __round(__subtract(total, advanceProps.advanceFinance), 2);
    }
    const change = __round(__subtract(total, financePayed), 2);
    const isNeedToPay = change <= 0;
    return [total, isNeedToPay, financePayed, change];
  }, [totalToPay, totalPayed, advanceProps]);

  const canFinish = useMemo(() => {
    return advance.isAdvance || needToPay;
  }, [advance, needToPay]);

  const handlerPayValue = useCallback(
    ({key}: TButtonEvent) => {
      setValue(v => {
        return processKeyboard(key, v, 2);
      });
    },
    [processKeyboard, setValue],
  );

  const showMoneyKeyboard = useCallback(
    () => setIsMoney(v => !v),
    [setIsMoney],
  );

  const handlerAdvance = useCallback(
    (isAdvance: boolean) => {
      setAdvance(v => {
        return {
          ...v,
          isAdvance,
        };
      });
    },
    [setAdvance],
  );

  const addMoney = useCallback(
    ({key}: TButtonEvent) => {
      const value = Number(key);
      setMoneyPaying(money => {
        const index = money.findIndex(m => m.value === value);
        if (index === -1) {
          return [
            ...money,
            {
              value,
              counter: 1,
              finance: value,
            },
          ];
        }
        const arr = [...money];
        const oldObj = arr[index];
        const counter = __add(oldObj.counter, 1);
        const obj = {
          value,
          counter,
          finance: __round(__multiply(value, counter), 2),
        };
        arr.splice(index, 1, obj);
        return arr;
      });
    },
    [setMoneyPaying],
  );

  const reset = useCallback(() => {
    setValue('');
    setMoneyPaying([]);
  }, [setMoneyPaying, setValue]);

  const moneyPayingTotal = useMemo(
    () =>
      __round(
        moneyPaying.reduce((acc, x) => __add(acc, x?.finance || 0), 0),
        2,
      ),
    [moneyPaying],
  );

  const data = useMemo(
    () => ({
      isMoney,
      showMoneyKeyboard,
      payValue: value,
      handlerPayValue,
      reset,
      moneyPaying,
      addMoney,
      moneyPayingTotal,
      canFinish,
      needToPay,
      handlerAdvance,
      advance,
      isAdvanceReceipt,
      change,
      receiptTotal,
      financePayed,
    }),
    [
      value,
      moneyPaying,
      addMoney,
      reset,
      isMoney,
      showMoneyKeyboard,
      handlerPayValue,
      moneyPayingTotal,
      canFinish,
      needToPay,
      handlerAdvance,
      advance,
      change,
      isAdvanceReceipt,
      receiptTotal,
      financePayed,
    ],
  );

  return (
    <PayingContext.Provider value={data}>{children}</PayingContext.Provider>
  );
};

export default PayingContextContainer;
