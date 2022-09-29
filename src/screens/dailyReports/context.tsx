import React, {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {useProgress} from 'src/hooks/progress/useProgress';
import DailyReportTable from 'src/database/DailyReport';
import {
  TDailyReportContext,
  TDailyReportContextState,
} from 'src/screens/dailyReports/d';
import {useFocusEffect} from '@react-navigation/native';
import {TDailyReportModel} from 'src/database/d';
import {
  __add,
  __divide,
  __multiply,
  __pick,
  __round,
  __subtract,
} from 'src/util/lodash';
import {TTransactionType} from 'src/store/lpfr/d';
import {useSelector} from 'react-redux';
import {_selectorLPFRTaxUid} from 'src/store/lpfr/helpers';

const createDailyObject = (data: TDailyReportModel) => {
  if (
    ![TTransactionType.Sale, TTransactionType.Refund].includes(
      data.transactionType,
    )
  ) {
    return {};
  }
  const refVats = data.vats.map(x => {
    const finance = __round(x.finance, 2);
    const rate = __round(__divide(x.rate, 100), 2);
    return {
      label: x.label,
      rate: __round(rate, 2),
      value: __round(
        __subtract(
          finance,
          __round(__divide(__multiply(finance, 100), __add(100, rate)), 2),
        ),
        2,
      ),
      name: x.name,
    };
  });
  const refFinance = data.vats.map(x => ({
    label: x.label,
    value: __round(x.finance, 2),
  }));
  return {
    ...__pick(data, ['date', 'transactionType', 'counter', 'prevCount']),
    vats: [
      ...refVats,
      {
        label: 'Total',
        isSummary: true,
        value: __round(
          refVats.reduce((acc, x) => __add(acc, x.value), 0),
          2,
        ),
        name: 'Total',
      },
    ],
    finances: [
      ...refFinance,
      {
        label: 'Total',
        isSummary: true,
        value: __round(
          refFinance.reduce((acc, x) => __add(acc, x.value), 0),
          2,
        ),
        name: 'Total',
      },
    ],
  };
};

export const DailyReportContext = createContext({} as TDailyReportContext);

const DailyReportContextContainer = ({children}: {children: ReactNode}) => {
  const [state, setState] = useState<TDailyReportContextState>({
    dateStart: new Date(),
  } as TDailyReportContextState);

  const uid = useSelector(_selectorLPFRTaxUid);

  const {setProgress, endProgress} = useProgress();
  const {dateStart, report} = state;

  const changeState = useCallback(
    (field: string, data: any) => {
      setState(v => {
        return {
          ...v,
          [field]: data,
        };
      });
    },
    [setState],
  );

  const setStartDate = useCallback(
    (date: Date) => changeState('dateStart', date),
    [changeState],
  );

  const fetchAll = useCallback(async () => {
    if (!dateStart) {
      return;
    }
    setProgress();
    try {
      const r = await DailyReportTable.getDailyReportForOneDay(dateStart, uid);
      changeState('report', r);
    } catch (e) {
      console.log(e);
    } finally {
      endProgress();
    }
  }, [dateStart, setProgress, changeState, endProgress]);

  useFocusEffect(
    useCallback(() => {
      fetchAll().then();
    }, [fetchAll]),
  );

  const _report = useMemo(() => {
    return report;
    /*if (
      !report ||
      !report.find(x =>
        [TTransactionType.Sale, TTransactionType.Refund].includes(
          x.transactionType,
        ),
      )
    ) {
      return [];
    }
    return [...report]
      .sort()
      .reverse()
      .map(x => createDailyObject(x)) as TReportResult[];*/
  }, [report]);

  const data = useMemo(
    () => ({
      dateStart,
      report: _report || undefined,
      setStartDate,
    }),
    [setStartDate, dateStart, _report],
  );

  return (
    <DailyReportContext.Provider value={data}>
      {children}
    </DailyReportContext.Provider>
  );
};

export default DailyReportContextContainer;
