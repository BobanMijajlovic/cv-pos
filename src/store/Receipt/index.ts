import {
  LAST_ACTIONS,
  TActionEvent,
  TAdvanceProps,
  TBuyerInfo,
  TReceiptChangeQuantity,
  TReceiptItem,
  TReceiptPaying,
  TReceiptState,
  TRefundProps,
} from './d';
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
  RECEIPT_RESET_STATE,
  RECEIPT_SET_ADVANCE,
  RECEIPT_SET_BUYER,
  RECEIPT_SET_DISCOUNT,
  RECEIPT_SET_INVOICE_TYPE,
  RECEIPT_SET_REFUND_PROPS,
  RECEIPT_SET_TRANSACTION_TYPE,
} from './types';
import {__add, __omit, __round} from 'src/util/lodash';
import {guid} from '../../util/utils';
import {TInvoiceType, TTransactionType} from 'src/store/lpfr/d';

const init = {
  training: false,
  buyer: undefined,
  refundProps: undefined,
  advanceProps: undefined,
  invoiceType: TInvoiceType.Normal,
  transactionType: TTransactionType.Sale,
  items: [
    /* {
          article: {
            mes: 3,
            description: 'Article Test 4',
            vat: 'A',
            price: 5,
            barcode: '1349380',
            id: 4,
          },
          quantity: 4,
          guid: '57878-31010',
        },
        {
          article: {
            mes: 2,
            description: 'Article Test 3',
            vat: 'B',
            price: 3.75,
            barcode: '1237035',
            id: 3,
          },
          quantity: 1,
          guid: '28894-50005',
        },
        {
          guid: '75012-87385',
          article: {
            mes: 7,
            description: 'Article Test 8',
            vat: 'B',
            price: 10,
            barcode: '1798760',
            id: 8,
          },
          quantity: 6,
        },
        {
          article: {
            mes: 9,
            description: 'Article Test 10',
            vat: 'A',
            price: 12.5,
            barcode: '19123450',
            id: 10,
          },
          quantity: 1,
          guid: '33266-87919',
        },*/
  ],
  paying: [],
  needChangeQty: {guid: ''},
} as TReceiptState;

export default (
  state: TReceiptState = init,
  action: TActionEvent = {} as TActionEvent,
) => {
  switch (action.type) {
    case RECEIPT_RESET_STATE: {
      return {
        ...state,
        ...init,
      };
    }
    case RECEIPT_RESET_PAYING: {
      return {
        ...state,
        paying: [],
      };
    }
    case RECEIPT_SET_BUYER: {
      return {
        ...state,
        buyer: {
          ...state.buyer,
          ...(action.payload as TBuyerInfo),
        },
      };
    }

    case RECEIPT_SET_REFUND_PROPS: {
      const refunds = action.payload as TRefundProps;
      /** maybe should be hard checking with validate data like date time is valid and refRec has valid format */
      if (!refunds?.dateTime || !refunds.referentReceipt) {
        return state;
      }
      return {
        ...state,
        refundProps: {
          ...(action.payload as TRefundProps),
        },
      };
    }
    case RECEIPT_ADD_ITEM: {
      const {article, quantity} = action.payload as TReceiptItem;
      const index = state.items.findIndex(i => i.article.id === article.id);
      if (index === -1) {
        const _guid = guid();
        return {
          ...state,
          lastAction: {
            guid: _guid,
            action: LAST_ACTIONS.addItem,
          },
          needChangeQty: {
            guid: '',
          },
          items: [
            ...state.items,
            {
              article,
              quantity,
              guid: _guid,
            },
          ],
        };
      }
      const oldItem = state.items[index];
      const qt = __add(quantity, oldItem.quantity);

      const array = [...state.items];
      const it = {
        guid: oldItem.guid,
        article,
        quantity: qt,
      } as TReceiptItem;
      array.splice(index, 1, it);
      const _guid = guid();
      return {
        ...state,
        items: array,
        needChangeQty: {
          guid: '',
        },
        lastAction: {
          guid: _guid,
          action: LAST_ACTIONS.addItemQty,
        },
      };
    }

    case RECEIPT_REMOVE_PAYING: {
      const index = state.paying.findIndex(x => x.type === action.payload);
      if (index === -1) {
        return state;
      }
      const paying = [...state.paying];
      paying.splice(index, 1);
      return {
        ...state,
        paying: [...paying],
      };
    }

    case RECEIPT_ADD_PAYING: {
      const {type, value} = action.payload as TReceiptPaying;
      const oldValueIndex = state.paying.findIndex(x => x.type === type);
      if (oldValueIndex === -1) {
        return {
          ...state,
          paying: [...state.paying, action.payload],
        };
      }
      const oldValue = state.paying[oldValueIndex];
      const newValue = {
        ...state.paying[oldValueIndex],
        value: __round(__add(value, oldValue.value), 2),
      };
      const paying = [...state.paying];
      paying.splice(oldValueIndex, 1, newValue);
      return {
        ...state,
        paying: [...paying],
      };
    }

    case RECEIPT_REMOVE_ITEM: {
      const index = action.payload as number;
      if (index < 0 || index >= state.items.length) {
        return state;
      }

      const array = [...state.items];
      array.splice(index, 1);
      return {
        ...state,
        items: [...array],
      };
    }
    case RECEIPT_CHANGE_QUANTITY: {
      const {guid, value} = action.payload as TReceiptChangeQuantity;
      const index = state.items.findIndex(i => i.guid === guid);
      if (index === -1) {
        return state;
      }
      const array = [...state.items];
      array[index] = {
        ...array[index],
        quantity: value,
      };
      return {
        ...state,
        items: [...array],
        needChangeQty: {
          guid: '',
        },
      };
    }
    case RECEIPT_ITEM_NEED_CHANGE_QTY: {
      return {
        ...state,
        needChangeQty: {
          guid: action.payload as string,
        },
      };
    }

    case RECEIPT_SET_ADVANCE: {
      const advance = action.payload as TAdvanceProps;
      /** maybe should be hard checking with validate data like date time is valid and refRec has valid format */

      return {
        ...state,
        advanceProps: {
          ...advance,
        },
      };
    }

    case RECEIPT_RESET_ADVANCE: {
      return {
        ...state,
        advanceProps: {},
      };
    }

    case RECEIPT_SET_INVOICE_TYPE: {
      const invoiceType = action.payload as TInvoiceType;
      if (invoiceType === state.invoiceType) {
        return state;
      }

      const _data = (() => {
        if (state.invoiceType !== TInvoiceType.Advance) {
          return {
            advanceProps: {},
          };
        }
        if (
          invoiceType !== TInvoiceType.Copy &&
          state.transactionType !== TTransactionType.Refund
        ) {
          return {
            refundProps: {},
          };
        }
        return {};
      })();

      return {
        ...state,
        ..._data,
        invoiceType,
      };
    }

    case RECEIPT_SET_TRANSACTION_TYPE: {
      const transactionType = action.payload as TTransactionType;
      if (transactionType === state.transactionType) {
        return state;
      }

      return {
        ...state,
        transactionType: action.payload as TTransactionType,
        refundProps: {},
      };
    }

    case RECEIPT_SET_DISCOUNT: {
      const {guid, discount} = action.payload as Partial<TReceiptItem>;
      const index = state.items.findIndex(i => i.guid === guid);
      if (index === -1) {
        return state;
      }
      const item = state.items[index];
      const items = [...state.items];
      items.splice(index, 1, {
        ...item,
        discount,
      });
      return {
        ...state,
        items,
      };
    }

    case RECEIPT_ITEM_NEED_CHANGE_DISCOUNT: {
      return {
        ...state,
        needChangeDiscount: {
          guid: action.payload as string,
        },
      };
    }

    case RECEIPT_CLEAR_DISCOUNT: {
      const index = state.items.findIndex(
        i => i.guid === (action.payload as string),
      );
      if (index === -1) {
        return state;
      }
      const item = state.items[index];
      const items = [...state.items];
      items.splice(index, 1, {
        ...__omit(item, 'discount'),
      });
      return {
        ...state,
        items,
        needChangeDiscount: {
          guid: '',
        },
      };
    }

    default:
      return state;
  }
};
