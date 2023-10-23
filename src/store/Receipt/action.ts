import {
  ReceiptPayingType,
  TActionEvent,
  TAdvanceProps,
  TBuyerInfo,
  TReceiptChangeQuantity,
  TReceiptItem,
  TReceiptPaying,
  TRefundProps,
} from 'src/store/Receipt/d';
import {
  RECEIPT_ADD_ITEM,
  RECEIPT_ADD_PAYING,
  RECEIPT_CHANGE_QUANTITY,
  RECEIPT_CLEAR_DISCOUNT,
  RECEIPT_ITEM_NEED_CHANGE_DISCOUNT,
  RECEIPT_ITEM_NEED_CHANGE_QTY,
  RECEIPT_REMOVE_ITEM,
  RECEIPT_REMOVE_PAYING,
  RECEIPT_RESET_ADVANCE,
  RECEIPT_RESET_PAYING,
  RECEIPT_RESET_REFUND_TOGGLE,
  RECEIPT_RESET_STATE,
  RECEIPT_SET_ADVANCE,
  RECEIPT_SET_BUYER,
  RECEIPT_SET_DISCOUNT,
  RECEIPT_SET_INVOICE_TYPE,
  RECEIPT_SET_REFUND_PROPS,
  RECEIPT_SET_TRANSACTION_TYPE,
} from 'src/store/Receipt/types';
import {TInvoiceType, TTransactionType} from 'src/store/lpfr/d';

export const _actionReceiptResetState = (): TActionEvent => ({
  type: RECEIPT_RESET_STATE,
});

export const _actionReceiptSetBuyer = (
  buyer: Partial<TBuyerInfo>,
): TActionEvent => ({
  type: RECEIPT_SET_BUYER,
  payload: buyer,
});

export const _actionReceiptAddItem = (item: TReceiptItem): TActionEvent => ({
  type: RECEIPT_ADD_ITEM,
  payload: item,
});

export const _actionReceiptRemoveItem = (index: number): TActionEvent => ({
  type: RECEIPT_REMOVE_ITEM,
  payload: index,
});

export const _actionReceiptRemovePaying = (
  type: ReceiptPayingType,
): TActionEvent => ({
  type: RECEIPT_REMOVE_PAYING,
  payload: type,
});

export const _actionReceiptAddPaying = (
  paying: TReceiptPaying,
): TActionEvent => ({
  type: RECEIPT_ADD_PAYING,
  payload: paying,
});

export const _actionReceiptChangeQuantity = (
  receiptQty: TReceiptChangeQuantity,
): TActionEvent => ({
  type: RECEIPT_CHANGE_QUANTITY,
  payload: receiptQty,
});

export const _actionReceiptNeedChangeQty = (guid: string): TActionEvent => ({
  type: RECEIPT_ITEM_NEED_CHANGE_QTY,
  payload: guid,
});

export const _actionReceiptNeedChangeDiscount = (
  guid: string,
): TActionEvent => ({
  type: RECEIPT_ITEM_NEED_CHANGE_DISCOUNT,
  payload: guid,
});

export const _actionReceiptSetRefundProps = (
  payload: TRefundProps,
): TActionEvent => ({
  type: RECEIPT_SET_REFUND_PROPS,
  payload,
});

export const _actionReceiptResetRefund = (): TActionEvent => ({
  type: RECEIPT_RESET_REFUND_TOGGLE,
});

export const _actionReceiptResetPaying = (): TActionEvent => ({
  type: RECEIPT_RESET_PAYING,
});

export const _actionReceiptSetAdvanceProps = (
  payload: TAdvanceProps,
): TActionEvent => ({
  type: RECEIPT_SET_ADVANCE,
  payload,
});

export const _actionReceiptResetAdvance = (): TActionEvent => ({
  type: RECEIPT_RESET_ADVANCE,
});

export const _actionReceiptSetInvoiceType = (
  payload: TInvoiceType | undefined,
) => ({
  type: RECEIPT_SET_INVOICE_TYPE,
  payload,
});

export const _actionReceiptSetTransactionType = (
  payload: TTransactionType,
) => ({
  type: RECEIPT_SET_TRANSACTION_TYPE,
  payload,
});

export const _actionReceiptAddDiscount = (guid: string, discount: number) => ({
  type: RECEIPT_SET_DISCOUNT,
  payload: {
    guid,
    discount,
  },
});

export const _actionReceiptClearDiscount = (guid: string) => ({
  type: RECEIPT_CLEAR_DISCOUNT,
  payload: guid,
});
