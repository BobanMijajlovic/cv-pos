import {TVats} from 'src/store/Fiscal/d';
import {TInvoiceType, TTransactionType} from 'src/store/lpfr/d';

export type TArticleModal = {
  id?: number;
  barcode: string;
  description: string;
  price: number;
  vat: string;
  vat1?: string;
  vat2?: string;
  vat3?: string;
  mes?: number;
};

export type TUserModel = {
  id?: number;
  fullName: string;
  nickname: string;
  pin: string;
  priority: UserPriority;
};

export type TLikeProps = {
  field: string[];
  value: string | number;
};

export enum UserPriority {
  CASHIER = 1,
  SUB_ADMIN = 2,
  ADMIN = 3,
}

export type TSelectProps = {
  offset?: number;
  limit?: number;
  like?: TLikeProps;
};

export type TTableDefinitionColumn = {
  type: string;
  name: string;
  notnull: number;
};

export type TDailyReportModel = {
  id?: number;
  date: number;
  invoiceType: TInvoiceType;
  transactionType: TTransactionType;
  counter: number;
  uid: number;
  vats: TDailyVatsModel[];
};

export type TReceiptTypes = {
  transactionType: number;
  invoiceType: number;
};

export enum DailyReportReceiptType {
  SALE = 1,
  REFUND = 2,
}

export enum TPaymentType {
  OTHER,
  CASH,
  CARD,
  CHECK,
  WIRE_TRANSFER,
  VOUCHER,
  MOBILE_MONEY,
}

export type TDailyVatsProps = {
  vat: TVats;
  finance: number;
  name: string;
};

export type TDailyVatsModel = {
  id?: number;
  date?: number;
  label: string;
  name: string;
  rate: number;
  finance: number;
  uid: number;
};

export type TDailyPaymentModel = {
  id?: number;
  date?: number;
  invoiceType: TInvoiceType;
  transactionType: TTransactionType;
  paymentType: TPaymentType;
  finance: number;
  uid: number;
};

export type TClientModel = {
  id?: number;
  name: string;
  tin: string;
  uniqueCompanyNumber: string;
  city: string;
  street: string;
  zipCode: string;
};

export type TPaymentReport = {
  payments: TDailyPaymentModel[];
  total: number;
};

export type TVatModelReport = {
  total: number;
} & Partial<TDailyVatsModel>;

export type TVatReport = {
  vats: TVatModelReport[];
  total: number;
  totalTax: number;
};

export type TDailyXReport = {
  [key in TTransactionType]: {
    [key in TInvoiceType]: {
      counter: number;
      vats: TVatReport;
      payments: TPaymentReport;
    };
  };
} & {
  date: string;
  uid: string;
};

export type TDailyInvoiceTypePartReport = {
  [key in TInvoiceType]: {
    counter: number;
    vats: TVatReport;
    payments: TPaymentReport;
  };
};
