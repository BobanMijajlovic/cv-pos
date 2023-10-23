import {TDailyXReport} from 'src/database/d';
import {TTransactionType} from 'src/store/lpfr/d';

export type TReportList = {
  label: string;
  rate: number;
  value: number;
  name?: string;
  isSummary?: boolean;
};

export type TReportResult = {
  id: number;
  date: number;
  transactionType: TTransactionType;
  counter: number;
  vats: TReportList[];
  finances: TReportList[];
  prevCount: {counter: number};
};

export type TDailyReportContext = {
  dateStart?: Date;
  report?: TDailyXReport;
  setStartDate: (date: Date) => void;
};

export type TDailyReportContextState = {
  dateStart?: Date;
  dateEnd?: Date;
  report?: TDailyXReport;
};
