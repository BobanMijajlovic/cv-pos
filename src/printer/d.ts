export enum ItemTemps {
  DESCRIPTION = '_DESC_',
  rQUANTITY6 = '__q6.###',
  lPRICE = '_Pl##.##',
  TOTAL = '_To##.##',
  NewLINE = '__#nL#__',
  SpaceToFILL = '_[$b*#]_',
  VatBeforePrice = '_VAT#2_',
}

export enum SeparatorLine {
  none,
  single,
  double,
}

export enum VatTemps {
  VatFormat = '_V_',
  VatName = '_Name#.##',
  VatTax = '__Tax#.##',
  VatNet = '__Net#.##',
  VatHeaderFormat = '__VAT#',
  VatHeaderName = '____Name',
  VatHeaderNet = '______Net',
  VatHeaderTax = '______Tax',
}

export enum PayingTemps {
  DESCRIPTION = '[__DESC__]',
  QUANTITY = '_Q#.###',
}

export enum OptionsTemps {
  RECEIPT_DESCRIPTION = '[_DESCRIPTION_]',
}

export enum PrintSpaceBetween {
  LABEL = '[_RLABEL_]',
  VALUE = '_########',
}

export type TReceiptNumDate = {
  receiptNum: string;
  receiptDate?: Date;
};

export type TVatsProps = {
  using: boolean;
  maxLenNumbers: number;
  maxLenChars: number;
};

export type TTemplateItem = {
  name: string;
  header?: string;
  temp: string;
};

export type TTemplateVat = {
  name: string;
  header?: string;
  temp: string;
};

export type TVatsData = {
  tax: any;
  financeTax: number;
};

export type TVatsHeader = {
  format: string;
  name: string;
  taxValue: string;
  net: string;
};

export type TItemHeader = {
  name: string;
  price: string;
  total: string;
  quantity: string;
};

export type TReceiptOptionsData = {
  cashierLabel?: string;
  cashierName?: string;
};

export const TEMPLATE = [
  {
    name: 'basic',
    header: `${ItemTemps.DESCRIPTION}${ItemTemps.lPRICE} ${ItemTemps.SpaceToFILL}${ItemTemps.rQUANTITY6}${ItemTemps.SpaceToFILL}${ItemTemps.TOTAL}`,
    temp: `${ItemTemps.DESCRIPTION}${ItemTemps.SpaceToFILL} ${ItemTemps.NewLINE}${ItemTemps.SpaceToFILL}${ItemTemps.lPRICE}${ItemTemps.SpaceToFILL}${ItemTemps.rQUANTITY6}${ItemTemps.SpaceToFILL}${ItemTemps.TOTAL}`,
  },
] as TTemplateItem[];

export const TEMPLATE_VATS = [
  {
    name: 'basic',
    header: `${VatTemps.VatHeaderFormat}${ItemTemps.SpaceToFILL}${VatTemps.VatHeaderName}${ItemTemps.SpaceToFILL}${VatTemps.VatHeaderTax}${ItemTemps.SpaceToFILL}${VatTemps.VatHeaderNet}`,
    temp: `${VatTemps.VatFormat}${ItemTemps.SpaceToFILL}${VatTemps.VatName}${ItemTemps.SpaceToFILL}${VatTemps.VatTax}${ItemTemps.SpaceToFILL}${VatTemps.VatNet}`,
  },
] as TTemplateVat[];

export const TEMPLATE_PAYING = [
  {
    name: 'basic',
    temp: `${PayingTemps.DESCRIPTION}${ItemTemps.SpaceToFILL}${ItemTemps.NewLINE}${ItemTemps.SpaceToFILL}${PayingTemps.QUANTITY}`,
  },
];

export const TEMPLATE_PRINT_SPACE_BETWEEN = {
  name: 'space-between',
  temp: `${PrintSpaceBetween.LABEL}${ItemTemps.SpaceToFILL}${PrintSpaceBetween.VALUE}`,
};

export const TEMPLATE_PRINT_CENTER = {
  name: 'center',
  temp: `${ItemTemps.SpaceToFILL} ${OptionsTemps.RECEIPT_DESCRIPTION} ${ItemTemps.SpaceToFILL}`,
};

export type TPrintSpaceBetween = {
  label: string;
  value: string | number;
};

export type THeaderType = {
  tin: string | number;
  businessName: string;
  locationName: string;
  address: string;
  district: string;
  cashier?: string;
};

export type TFooterType = {
  pfrDateTime: string | Date;
  pfrReceiptNumber: string;
  receiptNumber: string;
};

export enum SERBIAN_LABELS {
  FISCAL_RECEIPT = 'ФИСКАЛНИ РАЧУН',
  TIN = 'ПИБ:',
  BUSINESS_NAME = 'Предузеће:',
  LOCATION_NAME = 'Место продаје:',
  ADDRESS = 'Адреса:',
  DISTRICT = 'Општина:',
  CASHIER = 'Касир:',
  TRAFFIC_SALE = 'ПРОМЕТ ПРОДАЈА',
  ARTICLES = 'Артикли',
  ITEM_NAME = 'Назив',
  PRICE = 'Цена',
  QTY = 'Кол.',
  TOTAL = 'Укупно',
  TOTAL_COSTS = 'Укупан износ:',
  CASH = 'Готовина:',
  CARD = 'Картица:',
  CHEQUE = '',
  MARK = 'Ознака',
  TAX_NAME = 'Име',
  TAX_VALUE = 'Стопа',
  TAX_FINANCE = 'Порез',
  TAX_FINANCE_TOTAL = 'Укупан износ пореза:',
  PFR_DATETIME = 'ПФР време:',
  PFR_RECEIPT_NUMBER = 'ПФР број рачуна:',
  RECEIPT_NUMBER = 'Бројач рачуна:',
  END_FISCAL_RECEIPT = 'КРАЈ ФИСКАЛНОГ РАЧУНА',
}

export type TReceiptStringData = TSufInvoiceRequestBody &
  TSufSignInvoiceResponse;

export type TSufInvoiceResponseTaxItems = {
  categoryType: number;
  label: string;
  amount: number;
  rate: number;
  categoryName: string;
};

export enum TInvoiceType {
  NORMAL = 'Normal',
  PROFORMA = 'ProForma',
  COPY = 'Copy',
  TRAINING = 'Training',
  ADVANCE = 'Advance',
}

export enum TTransactionType {
  SALE = 'Sale',
  REFUND = 'Refund',
}

export enum TPaymentType {
  OTHER = 'Other',
  CASH = 'Cash',
  CARD = 'Card',
  CHECK = 'Check',
  WIRE_TRANSFER = 'WireTransfer',
  VOUCHER = 'Voucher',
  MOBILE_MONEY = 'MobileMoney',
}

export type TPaymentData = {
  Amount: number;
  PaymentType: TPaymentType;
};

export type TInvoiceRequestOptions = {
  OmitTextualRepresentation: number;
  OmitQRCodeGen: number;
};

export type TInvoiceRequestItems = {
  GTIN: string;
  Name: string;
  Quantity?: number;
  Discount?: number;
  UnitPrice?: number;
  Labels: string[];
  TotalAmount?: number;
};

export type TSufInvoiceRequestBody = {
  DateAndTimeOfIssue?: Date | string;
  Cashier?: string;
  BuyerId?: string | number | null; //
  BuyerCostCenterId?: string | null; //
  Payment: TPaymentData[];
  InvoiceNumber?: string;
  ReferentDocumentDT?: Date | string; // pfr vreme
  ReferentDocumentNumber?: string | null; // pfr broj ( broj racuna )
  Options?: TInvoiceRequestOptions; // opcije vezano za qrCode
  Items: TInvoiceRequestItems[];
};

export type TSufSignInvoiceResponse = {
  requestedBy: string;
  sdcDateTime: Date;
  invoiceCounter: string;
  invoiceCounterExtension: string;
  invoiceNumber: string;
  taxItems: TSufInvoiceResponseTaxItems[];
  verificationUrl: string; // this is url for preview receipt on the web
  verificationQRCode: string;
  journal: string;
  messages: string;
  signedBy: string;
  encryptedInternalData: string;
  signature: string;
  totalCounter: number;
  transactionTypeCounter: number;
  totalAmount: number;
  taxGroupRevision: number;
  businessName: string;
  tin: string;
  locationName: string;
  address: string;
  district: string;
  mrc: string;
};
