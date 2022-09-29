import {TStateFiscal, TActionEvent} from './d';
import {ReceiptPayingType} from '../Receipt/d';
import {Translate} from 'src/translate/data';
import {
  iconFontAwesomeMoneyBill,
  iconFontAwesomeCreditCard,
  iconFontAwesomeMoneyCheckAlt,
  iconFontAwesomeTicketAlt,
  iconFontAwesomeWireTransfer,
  iconFontAwesomeMobileMoney,
  iconFontAwesomeCoins,
} from 'src/icon';

const init = {
  vats: [
    {
      label: 'A',
      value: 0,
    },
    {
      label: 'B',
      value: 10,
    },
    {
      label: 'C',
      value: 20,
    },
  ],
  newVats: {
    currentTaxRates: {
      validFrom: '2021-07-22T09:55:24',
      groupId: 2,
      taxCategories: [
        {
          name: 'ECAL',
          categoryType: 'TaxOnNet',
          taxRates: [{rate: 11, label: 'F'}],
          orderId: 1,
        },
        {
          name: 'N-TAX',
          categoryType: 'TaxOnNet',
          taxRates: [{rate: 0, label: 'N'}],
          orderId: 2,
        },
        {
          name: 'PBL',
          categoryType: 'AmountPerQuantity',
          taxRates: [{rate: 0.5, label: 'P'}],
          orderId: 3,
        },
        {
          name: 'STT',
          categoryType: 'TaxOnNet',
          taxRates: [{rate: 6, label: 'E'}],
          orderId: 4,
        },
        {
          name: 'TOTL',
          categoryType: 'TaxOnTotal',
          taxRates: [{rate: 2, label: 'T'}],
          orderId: 5,
        },
        {
          name: 'VAT',
          categoryType: 'TaxOnNet',
          taxRates: [
            {rate: 9, label: 'A'},
            {rate: 0, label: 'B'},
          ],
          orderId: 6,
        },
        {
          name: 'VAT-EXCL',
          categoryType: 'TaxOnNet',
          taxRates: [{rate: 0, label: 'C'}],
          orderId: 7,
        },
      ],
    },
    allTaxRates: [
      {
        validFrom: '2021-07-22T09:55:24',
        groupId: 2,
        taxCategories: [
          {
            name: 'ECAL',
            categoryType: 'TaxOnNet',
            taxRates: [{rate: 11, label: 'F'}],
            orderId: 1,
          },
          {
            name: 'N-TAX',
            categoryType: 'TaxOnNet',
            taxRates: [{rate: 0, label: 'N'}],
            orderId: 2,
          },
          {
            name: 'PBL',
            categoryType: 'AmountPerQuantity',
            taxRates: [{rate: 0.5, label: 'P'}],
            orderId: 3,
          },
          {
            name: 'STT',
            categoryType: 'TaxOnNet',
            taxRates: [{rate: 6, label: 'E'}],
            orderId: 4,
          },
          {
            name: 'TOTL',
            categoryType: 'TaxOnTotal',
            taxRates: [{rate: 2, label: 'T'}],
            orderId: 5,
          },
          {
            name: 'VAT',
            categoryType: 'TaxOnNet',
            taxRates: [
              {rate: 9, label: 'A'},
              {rate: 0, label: 'B'},
            ],
            orderId: 6,
          },
          {
            name: 'VAT-EXCL',
            categoryType: 'TaxOnNet',
            taxRates: [{rate: 0, label: 'C'}],
            orderId: 7,
          },
        ],
      },
      {
        validFrom: '2021-07-15T23:08:09',
        groupId: 1,
        taxCategories: [
          {
            name: 'ECAL',
            categoryType: 'TaxOnNet',
            taxRates: [{rate: 10, label: 'F'}],
            orderId: 1,
          },
          {
            name: 'N-TAX',
            categoryType: 'TaxOnNet',
            taxRates: [{rate: 0, label: 'N'}],
            orderId: 2,
          },
          {
            name: 'PBL',
            categoryType: 'AmountPerQuantity',
            taxRates: [{rate: 0.5, label: 'P'}],
            orderId: 3,
          },
          {
            name: 'STT',
            categoryType: 'TaxOnNet',
            taxRates: [{rate: 6, label: 'E'}],
            orderId: 4,
          },
          {
            name: 'TOTL',
            categoryType: 'TaxOnTotal',
            taxRates: [{rate: 2, label: 'T'}],
            orderId: 5,
          },
          {
            name: 'VAT',
            categoryType: 'TaxOnNet',
            taxRates: [
              {rate: 9, label: 'A'},
              {rate: 0, label: 'B'},
            ],
            orderId: 6,
          },
          {
            name: 'VAT-EXCL',
            categoryType: 'TaxOnNet',
            taxRates: [{rate: 0, label: 'C'}],
            orderId: 7,
          },
        ],
      },
    ],
  },
  measures: [
    {
      label: '/pcs',
      value: '',
    },
    {
      label: '/kg',
      value: '/kg',
    },
    {
      label: '/g',
      value: '/g',
    },
    {
      label: '/l',
      value: '/l',
    },
  ],
  payments: [
    {
      label: Translate.TR_PAYING_BY_TYPE_LABEL_CASH_BUTTON,
      type: ReceiptPayingType.CASH,
      icon: iconFontAwesomeMoneyBill,
    },
    {
      label: Translate.TR_PAYING_BY_TYPE_LABEL_CARD_BUTTON,
      type: ReceiptPayingType.CARD,
      icon: iconFontAwesomeCreditCard,
    },
    {
      label: Translate.TR_PAYING_BY_TYPE_LABEL_CHECK_BUTTON,
      type: ReceiptPayingType.CHECK,
      icon: iconFontAwesomeMoneyCheckAlt,
    },
    {
      label: Translate.TR_PAYING_BY_TYPE_LABEL_VOUCHER_BUTTON,
      type: ReceiptPayingType.VOUCHER,
      icon: iconFontAwesomeTicketAlt,
    },
    {
      label: Translate.TR_PAYING_BY_TYPE_LABEL_WIRE_TRANSFER_BUTTON,
      type: ReceiptPayingType.WIRE_TRANSFER,
      icon: iconFontAwesomeWireTransfer,
    },
    {
      label: Translate.TR_PAYING_BY_TYPE_LABEL_MOBILE_MONEY_BUTTON,
      type: ReceiptPayingType.MOBILE_MONEY,
      icon: iconFontAwesomeMobileMoney,
    },
    {
      label: Translate.TR_PAYING_BY_TYPE_LABEL_OTHER_BUTTON,
      type: ReceiptPayingType.OTHER,
      icon: iconFontAwesomeCoins,
    },
  ],
};

export default (
  state: TStateFiscal = init,
  action: TActionEvent = {} as TActionEvent,
) => {
  switch (action.type) {
    default:
      return state;
  }
};
