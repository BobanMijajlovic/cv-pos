import {ReceiptPayingType} from '../Receipt/d';

export type TVats = {
  label: string;
  value: number;
};

export type TMeasure = {
  label: string;
  value: string;
};

export type TPayment = {
  label: string;
  type: ReceiptPayingType;
  icon?: string;
};

export type TTaxRate = {
  rate: number;
  label: string;
};

export type TTaxCategory = {
  name: string;
  categoryType: string;
  taxRates: TTaxRate[];
  orderId: number;
};

type TCurrentTaxRates = {
  validFrom: string | Date;
  groupId: number;
  taxCategories: TTaxCategory[];
};

export type TVsdcVats = {
  currentTaxRates: TCurrentTaxRates;
  allTaxRates: TCurrentTaxRates[];
};

export type TStateFiscal = {
  vats: TVats[];
  measures: TMeasure[];
  payments: TPayment[];
  newVats: TVsdcVats;
};

export type TActionEvent = any;
