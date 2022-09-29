import {Translate} from 'src/translate/data';
import {TTransactionType, TInvoiceType} from 'src/store/lpfr/d';
import { TPaymentType } from "src/database/d";

export const TransactionTypeValues = [
  {
    label: Translate.TR_TRANSACTION_TYPE_SALE,
    value: TTransactionType.Sale,
  },
  {
    label: Translate.TR_TRANSACTION_TYPE_REFUND,
    value: TTransactionType.Refund,
  },
];

export const InvoiceTypeValues = [
  {
    label: Translate.TR_INVOICE_TYPE_NORMAL,
    value: TInvoiceType.Normal,
  },
  {
    label: Translate.TR_INVOICE_TYPE_PROFORMA,
    value: TInvoiceType.Proforma,
  },
  {
    label: Translate.TR_INVOICE_TYPE_COPY,
    value: TInvoiceType.Copy,
  },
  {
    label: Translate.TR_INVOICE_TYPE_TRAINING,
    value: TInvoiceType.Training,
  },
  {
    label: Translate.TR_INVOICE_TYPE_ADVANCE,
    value: TInvoiceType.Advance,
  },
];

export const PaymentTypeValues = [
  {
    label: Translate.TR_PAYING_BY_TYPE_LABEL_OTHER_BUTTON,
    value: TPaymentType.OTHER,
  },
  {
    label: Translate.TR_PAYING_BY_TYPE_LABEL_CASH_BUTTON,
    value: TPaymentType.CASH,
  },
  {
    label: Translate.TR_PAYING_BY_TYPE_LABEL_CARD_BUTTON,
    value: TPaymentType.CARD,
  },
  {
    label: Translate.TR_PAYING_BY_TYPE_LABEL_CHECK_BUTTON,
    value: TPaymentType.CHECK,
  },
  {
    label: Translate.TR_PAYING_BY_TYPE_LABEL_WIRE_TRANSFER_BUTTON,
    value: TPaymentType.WIRE_TRANSFER,
  },
  {
    label: Translate.TR_PAYING_BY_TYPE_LABEL_VOUCHER_BUTTON,
    value: TPaymentType.VOUCHER,
  },
  {
    label: Translate.TR_PAYING_BY_TYPE_LABEL_MOBILE_MONEY_BUTTON,
    value: TPaymentType.MOBILE_MONEY,
  },
];
