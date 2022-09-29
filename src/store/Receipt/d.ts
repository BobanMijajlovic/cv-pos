import {TArticleModal} from 'src/database/d';
import {
  RECEIPT_ADD_ITEM,
  RECEIPT_ADD_PAYING,
  RECEIPT_CHANGE_QUANTITY,
  RECEIPT_ITEM_NEED_CHANGE_QTY,
  RECEIPT_REMOVE_ITEM,
  RECEIPT_REMOVE_PAYING,
  RECEIPT_RESET_STATE,
  RECEIPT_SET_BUYER,
  RECEIPT_SET_REFUND_PROPS,
  RECEIPT_RESET_REFUND_TOGGLE,
  RECEIPT_RESET_PAYING,
  RECEIPT_SET_ADVANCE,
  RECEIPT_RESET_ADVANCE,
  RECEIPT_SET_INVOICE_TYPE,
  RECEIPT_SET_TRANSACTION_TYPE,
  RECEIPT_SET_DISCOUNT,
  RECEIPT_ITEM_NEED_CHANGE_DISCOUNT,
  RECEIPT_CLEAR_DISCOUNT,
} from 'src/store/Receipt/types';
import {TInvoiceType, TTransactionType} from 'src/store/lpfr/d';

export enum ReceiptPayingType {
  OTHER,
  CASH,
  CARD,
  CHECK,
  WIRE_TRANSFER,
  VOUCHER,
  MOBILE_MONEY,
}

export enum ClientType {
  PIB = 10,
  JMBG = 11,
  BRLK = 20, //BROJ LIČNE KARTE
  BRIL = 21, //BROJ IZBEGLICKE LEGITIMACIJE
  EBS = 22,
  BRPD = 23, //BROJ PASOSA DOMACE LICE
  BRPS = 30, //BROJ PASOSA STRANO LICE
  BRDL = 31, //BROJ DIPLOMATSKE LEGITIMACIJE
  BRLKMKD = 32, //BROJ LICNE KARTE MAKEDONIJA
  BRLKMNE = 33, //BROJ LICNE KARTE CRNA GORA
  BRLKALB = 34, //BROJ LICNE KARTE ALBANIJA
  BRLKBIH = 35, //BROJ LICNE KARTE BOSNA I HERCEGOVINA
  TIN = 40, //PORESKI ID STRANE ZEMLJE
}

export enum OptionalClientData {
  ZPPPDV = 10,
  BROOR = 11, //BROJ OPERATORA ZA REFAKCIJU
  SNPDV = 20,
  LNPDV = 21,
  PPOPDV = 30,
  ZPPOPDV = 31,
  MPPOPDV = 32,
  IPPOPDV = 33,
  BRV = 40, //BROJ VAUCERA
}

export type TReceiptItem = {
  guid?: string;
  quantity: number;
  discount?: number;
  article: TArticleModal;
};

export type TReceiptPaying = {
  value: number;
  type: ReceiptPayingType;
};

export type TReceiptChangeQuantity = {
  guid: string;
  value: number;
};

export enum LAST_ACTIONS {
  addItem = 0,
  addItemQty = 1,
  changeQuantity = 2,
  addDiscount = 3,
  clearDiscount = 4,
}

export type TLastAction = {
  guid?: string;
  action?: LAST_ACTIONS;
};

export type TBuyerInfoData = {
  type: string | number;
  value: number | string;
};

export type TBuyerInfo = {
  buyerInfoBasic: TBuyerInfoData;
  buyerInfoAdditional?: TBuyerInfoData | null;
};

export type TRefundProps = {
  referentReceipt: string;
  dateTime: string;
};

export type TAdvanceProps = {
  advanceReceipt: string;
  advanceFinance: number;
};

export type TReceiptState = {
  buyer?: TBuyerInfo;
  training: boolean;
  refundProps?: TRefundProps;
  advanceProps?: TAdvanceProps;
  invoiceType: TInvoiceType;
  transactionType: TTransactionType;
  items: TReceiptItem[];
  paying: TReceiptPaying[];
  lastAction?: TLastAction;
  needChangeQty?: Record<'guid', string>;
  needChangeDiscount?: Record<'guid', string>;
};

export type TActionEvent = {
  type:
    | typeof RECEIPT_ADD_ITEM
    | typeof RECEIPT_RESET_STATE
    | typeof RECEIPT_CHANGE_QUANTITY
    | typeof RECEIPT_REMOVE_ITEM
    | typeof RECEIPT_SET_BUYER
    | typeof RECEIPT_REMOVE_PAYING
    | typeof RECEIPT_ADD_PAYING
    | typeof RECEIPT_ITEM_NEED_CHANGE_QTY
    | typeof RECEIPT_SET_REFUND_PROPS
    | typeof RECEIPT_RESET_REFUND_TOGGLE
    | typeof RECEIPT_RESET_PAYING
    | typeof RECEIPT_SET_ADVANCE
    | typeof RECEIPT_RESET_ADVANCE
    | typeof RECEIPT_SET_INVOICE_TYPE
    | typeof RECEIPT_SET_TRANSACTION_TYPE
    | typeof RECEIPT_ITEM_NEED_CHANGE_DISCOUNT
    | typeof RECEIPT_CLEAR_DISCOUNT
    | typeof RECEIPT_SET_DISCOUNT;
  payload?:
    | string
    | boolean
    | TInvoiceType
    | TTransactionType
    | TReceiptItem
    | TReceiptPaying
    | TReceiptChangeQuantity
    | ReceiptPayingType
    | Partial<TBuyerInfo>
    | TRefundProps
    | TAdvanceProps
    | number;
};
