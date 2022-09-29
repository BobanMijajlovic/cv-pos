// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Translate} from 'src/translate/data';
import {checkRequired} from 'src/hooks/validation/validators';
import {TBuyerType} from 'src/screens/receipt/receiptForm/d';
import {ClientType, OptionalClientData} from 'src/store/Receipt/d';
import {iconFontAwesomeSearch} from 'src/icon';
import {ClientSearchNavName} from 'src/navigation/d';
import {TTransactionType, TInvoiceType} from 'src/store/lpfr/d';

const _createObjectLabelType = (label: string, num: number) => {
  return {
    label: `${label} - ${num}`,
    value: `${num}`,
  };
};

export const ReceiptBuyerInfo = [
  {
    label: `PIB - ${ClientType.PIB}`,
    value: `${ClientType.PIB}`,
    isNumericType: true,
    labelInput: Translate.TR_RECEIPT_CLIENT_FORM_TIN_LABEL,
    maxLength: 10,
    validation: (value: string) => {
      if (!value || value.length < 9) {
        return Translate.TR_VALIDATION_PIB_NOT_VALID;
      }
      return false;
    },
    iconLeft: {
      icon: iconFontAwesomeSearch,
      onPress: (navigate: any) => {
        navigate(ClientSearchNavName);
      },
    },
  },
  {
    label: `JMBG - ${ClientType.JMBG}`,
    value: `${ClientType.JMBG}`,
    isNumericType: true,
    maxLength: 13,
    validation: (value: string) => {
      if (!value || value.length < 13) {
        return Translate.TR_VALIDATION_JMBG_NOT_VALID;
      }
      return false;
    },
  },
  {
    label: `BR LIČNE KARTE - ${ClientType.BRLK}`,
    value: `${ClientType.BRLK}`,
    validation: checkRequired,
  },
  {
    label: `BROJ IZBEGLICKE LEGITIMACIJE - ${ClientType.BRIL}`,
    value: `${ClientType.BRIL}`,
    validation: checkRequired,
  },
  {
    label: `EBS - ${ClientType.EBS}`,
    value: `${ClientType.EBS}`,
    validation: checkRequired,
  },
  {
    label: `BROJ PASOŠA DOMAĆE LICE - ${ClientType.BRPD}`,
    value: `${ClientType.BRPD}`,
    validation: checkRequired,
  },
  {
    label: `BROJ PASOŠA STRANO LICE - ${ClientType.BRPS}`,
    value: `${ClientType.BRPS}`,
    validation: checkRequired,
  },
  {
    label: `BROJ DIPLOMATSKE LEGITIMACIJE - ${ClientType.BRDL}`,
    value: `${ClientType.BRDL}`,
    validation: checkRequired,
  },
  {
    label: `BR LIČNE KARTE ( MKD ) - ${ClientType.BRLKMKD}`,
    value: `${ClientType.BRLKMKD}`,
    validation: checkRequired,
  },
  {
    label: `BR LIČNE KARTE ( MNE ) - ${ClientType.BRLKMNE}`,
    value: `${ClientType.BRLKMNE}`,
    validation: checkRequired,
  },
  {
    label: `BR LIČNE KARTE ( ALB ) - ${ClientType.BRLKALB}`,
    value: `${ClientType.BRLKALB}`,
    validation: checkRequired,
  },
  {
    label: `BR LIČNE KARTE ( BIH ) - ${ClientType.BRLKBIH}`,
    value: `${ClientType.BRLKBIH}`,
    validation: checkRequired,
  },
  {
    label: `PORESKI ID STRANE ZEMLJE - ${ClientType.TIN}`,
    value: `${ClientType.TIN}`,
    validation: checkRequired,
  },
] as TBuyerType[];

export const ReceiptBuyerInfoAdditional = [
  {
    ..._createObjectLabelType('ZPPPDV', OptionalClientData.ZPPPDV),
    validation: checkRequired,
  },
  {
    ..._createObjectLabelType('BROOR', OptionalClientData.BROOR),
    validation: checkRequired,
  },
  {
    ..._createObjectLabelType('BROJ SNPDV', OptionalClientData.SNPDV),
    validation: checkRequired,
  },
  {
    ..._createObjectLabelType('BROJ LNPDV', OptionalClientData.LNPDV),
    validation: checkRequired,
  },
  {
    ..._createObjectLabelType('PPOPDV', OptionalClientData.PPOPDV),
    validation: checkRequired,
  },
  {
    ..._createObjectLabelType('ZPPOPDV', OptionalClientData.ZPPOPDV),
    validation: checkRequired,
  },
  {
    ..._createObjectLabelType('MPPOPDV', OptionalClientData.MPPOPDV),
    validation: checkRequired,
  },
  {
    ..._createObjectLabelType('IPPOPDV', OptionalClientData.IPPOPDV),
    validation: checkRequired,
  },
  {
    ..._createObjectLabelType('BRV', OptionalClientData.BRV),
    validation: checkRequired,
  },
] as TBuyerType[];

export const InvoiceTypeValues = [
  {
    label: Translate.TR_INVOICE_TYPE_COPY,
    value: TInvoiceType.Copy,
  },
  {
    label: Translate.TR_INVOICE_TYPE_NORMAL,
    value: TInvoiceType.Normal,
  },
  {
    label: Translate.TR_INVOICE_TYPE_ADVANCE,
    value: TInvoiceType.Advance,
  },
  {
    label: Translate.TR_INVOICE_TYPE_PROFORMA,
    value: TInvoiceType.Proforma,
  },
  {
    label: Translate.TR_INVOICE_TYPE_TRAINING,
    value: TInvoiceType.Training,
  },
];

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

export const ClientTypeValues = [
  {
    label: Translate.TR_CLIENT_TYPE_LABEL_PIB,
    value: ClientType.PIB,
  },
  {
    label: Translate.TR_CLIENT_TYPE_LABEL_JMBG,
    value: ClientType.JMBG,
  },
  {
    label: Translate.TR_CLIENT_TYPE_LABEL_BRLK,
    value: ClientType.BRLK,
  },
  {
    label: Translate.TR_CLIENT_TYPE_LABEL_BRIL,
    value: ClientType.BRIL,
  },
  {
    label: Translate.TR_CLIENT_TYPE_LABEL_EBS,
    value: ClientType.EBS,
  },
  {
    label: Translate.TR_CLIENT_TYPE_LABEL_BRPD,
    value: ClientType.BRPD,
  },
  {
    label: Translate.TR_CLIENT_TYPE_LABEL_BRDL,
    value: ClientType.BRPS,
  },
  {
    label: Translate.TR_CLIENT_TYPE_LABEL_BRDL,
    value: ClientType.BRDL,
  },
  {
    label: Translate.TR_CLIENT_TYPE_LABEL_BRLKMNE,
    value: ClientType.BRLKMKD,
  },
  {
    label: Translate.TR_CLIENT_TYPE_LABEL_BRLKALB,
    value: ClientType.BRLKALB,
  },
  {
    label: Translate.TR_CLIENT_TYPE_LABEL_BRLKBIH,
    value: ClientType.BRLKALB,
  },
  {
    label: Translate.TR_CLIENT_TYPE_LABEL_BRLKBIH,
    value: ClientType.BRLKBIH,
  },
  {
    label: Translate.TR_CLIENT_TYPE_LABEL_TIN,
    value: ClientType.TIN,
  },
];

export const OptionalClientDataTypeValues = [
  {
    label: Translate.TR_CLIENT_OPTIONAL_DATA_TYPE_LABEL_ZPPPDV,
    value: OptionalClientData.ZPPPDV,
  },
  {
    label: Translate.TR_CLIENT_OPTIONAL_DATA_TYPE_LABEL_BROOR,
    value: OptionalClientData.BROOR,
  },
  {
    label: Translate.TR_CLIENT_OPTIONAL_DATA_TYPE_LABEL_SNPDV,
    value: OptionalClientData.SNPDV,
  },
  {
    label: Translate.TR_CLIENT_OPTIONAL_DATA_TYPE_LABEL_LNPDV,
    value: OptionalClientData.LNPDV,
  },
  {
    label: Translate.TR_CLIENT_OPTIONAL_DATA_TYPE_LABEL_PPOPDV,
    value: OptionalClientData.PPOPDV,
  },
  {
    label: Translate.TR_CLIENT_OPTIONAL_DATA_TYPE_LABEL_ZPPOPDV,
    value: OptionalClientData.ZPPOPDV,
  },
  {
    label: Translate.TR_CLIENT_OPTIONAL_DATA_TYPE_LABEL_MPPOPDV,
    value: OptionalClientData.MPPOPDV,
  },
  {
    label: Translate.TR_CLIENT_OPTIONAL_DATA_TYPE_LABEL_IPPOPDV,
    value: OptionalClientData.IPPOPDV,
  },
  {
    label: Translate.TR_CLIENT_OPTIONAL_DATA_TYPE_LABEL_BRV,
    value: OptionalClientData.BRV,
  },
];
