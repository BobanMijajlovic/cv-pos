import {
  LPFR_PIN_VERIFIED,
  LPFR_SET_STATUS_INFO,
  LPFR_SET_IS_ALIVE,
  LPFR_CLEAR_ALL,
  LPFR_SET_STATUS_PAYER,
  LPFR_SET_STATUS_CRITIC_ERROR,
  LPFR_SET_STATUS_SETTINGS,
  LPFR_SET_STATUS_BASIC,
  LPFR_SET_IS_PIN_VERIFIED,
  LPFR_SET_THROW_ERROR_CLEAR,
  LPFR_SET_THROW_ERROR,
  LPFR_SET_ENVIRONMENT,
} from './types';

export type TAction = {
  type:
    | typeof LPFR_CLEAR_ALL
    | typeof LPFR_SET_STATUS_PAYER
    | typeof LPFR_SET_IS_ALIVE
    | typeof LPFR_PIN_VERIFIED
    | typeof LPFR_SET_STATUS_INFO
    | typeof LPFR_SET_STATUS_CRITIC_ERROR
    | typeof LPFR_SET_STATUS_SETTINGS
    | typeof LPFR_SET_STATUS_BASIC
    | typeof LPFR_SET_IS_PIN_VERIFIED
    | typeof LPFR_SET_THROW_ERROR_CLEAR
    | typeof LPFR_SET_THROW_ERROR
    | typeof LPFR_SET_ENVIRONMENT;
  payload?:
    | string
    | boolean
    | TLPFRReqError
    | TLPFRStatusInfo
    | TLPFRStatusPayer
    | TLPFRStatusCriticErrors
    | TLPFRStatusSettings
    | TLPFRStatus
    | TLPFREnvironment;
};

export const enum INFO {
  auditSent = 'auditSent',
  proofDone = 'proofDone',
  proofStart = 'proofStart',
  proofFailed = 'proofFailed',
  firstLog = 'firstLog',
  lastReceipt = 'lastReceipt',
  ntpDiff = 'ntpDiff',
  limits = 'limits',
}

export type TInfoLog = {
  type: INFO;
  time: Date;
  // eslint-disable-next-line @typescript-eslint/ban-types
  data?: string | object;
};

export type TLPFRConnection = {
  port: string;
  host: string;
};

export type TAuditItemRequest = {
  gtin?: string;
  name: string;
  quantity: number;
  unitPrice: number;
  labels: string[];
  totalAmount: number;
};

export type TAuditPayments = {
  amount: number;
  paymentType: number;
};

export type TAuditRequest = {
  dateAndTimeOfIssue?: Date | string;
  cashier?: string;
  buyerId?: string | number | null; //
  buyerCostCenterId?: string | null; //
  payment: TAuditPayments[];
  invoiceNumber?: string;
  referentDocumentDT?: Date | string; // document referent date time for refund invoice
  referentDocumentNumber?: string | null; // pfr broj ( broj racuna )
  items: TAuditItemRequest[];
  invoiceType: TInvoiceType;
  transactionType: TTransactionType;
};

export type TInvoiceResponse = {
  requestedBy: string; // means UID
  sdcDateTime: Date | string;
  invoiceCounter: string; // 4/27NS example ( transactionTypeCounter/totalCounter/extension )
  invoiceCounterExtension: string; // NS - Normal Sale , NR - Normal Refund
  invoiceNumber: string; // requestedBy-signedBy-totalCounter
  taxItems: TTaxItemResponse[]; // calculated tax
  verificationUrl: string; // this is url for preview receipt on the web
  verificationQRCode?: string; // qrCode base64
  journal: string; // string for journal
  messages: string; // Success
  signedBy: string; // UID of card
  encryptedInternalData: string; // internal data from smartcard
  signature: string; // signature data from smartcard
  totalCounter: number; // total invoice counter
  transactionTypeCounter: number; // transaction type counter
  totalAmount: number; // invoice finance
  taxGroupRevision: number; //
  businessName: string;
  tin: string;
  locationName: string;
  address: string;
  district: string;
  mrc: string;
};

export type TTaxItemResponse = {
  categoryType: number;
  label: string;
  amount: number;
  rate: number;
  categoryName: string;
};

export type TLPFRStatusInfo = TInfoLog[];

export type TTaxCoreEndPoints = {
  taxpayerAdminPortal: string;
  taxCoreApi: string;
  vsdc: string;
  root: string;
};

export type TLPFREnvironment = {
  organizationName: string;
  serverTimeZone: string;
  street: string;
  city: string;
  country: string;
  endpoints: TTaxCoreEndPoints;
  environmentName: string;
  logo: string;
  ntpServer: string;
  supportedLanguages: string[];
};

export type TLPFRStore = {
  connection: TLPFRConnection;
  isAlive: boolean;
  pin?: string;
  isPinVerified: boolean;
  taxUid: string;
  error: TLPFRReqError;
  status: Partial<TLPFRStatus>;
  statusInfo: TLPFRStatusInfo;
  statusPayer: TLPFRStatusPayer;
  statusCriticErrors: TLPFRStatusCriticErrors;
  statusSettings: TLPFRStatusSettings;
  environment: TLPFREnvironment;
};

export type TLPFRStatusPayer = {
  countryName: string;
  stateOrProvinceName: string;
  localityName: string;
  streetAddress: string;
  organizationName: string;
  organizationalUnitName: string;
  serialName: string;
  commonName: string;
  taxCoreUrl: string;
  taxPayerId: string;
};

export type TLPFRErr = {
  type: string;
  number: string | number;
  label?: string;
  description?: string;
};

export enum TInvoiceType {
  Normal,
  Proforma,
  Copy,
  Training,
  Advance,
}

export enum TTransactionType {
  Sale,
  Refund,
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

export type TLPFRError = {
  error: TLPFRErr;
  time?: Date | string;
};

export type TLPFRStatusCriticErrors = TLPFRError[];

export type TLPFRStatusSettings = {
  PORT: string | number;
  defaultInit: string;
  NUM_PRINTER_CHARS: number;
  TIME_AUDIT_SEND: number;
  TIME_PROOF_SEND: number;
  LPFR: {
    protocolVersion: string;
    hardwareVersion: string;
    softwareVersion: string;
    deviceSerialNumber: string;
    make: string;
    model: string;
    mrcPrefix: string;
  };
};

export enum TaxCategoryType {
  TaxOnNet = 'TaxOnNet',
  TaxOnTotal = 'TaxOnTotal',
  AmountPerQuantity = 'AmountPerQuantity',
}

export type TTaxCategory = {
  name: string;
  categoryType: TaxCategoryType;
  taxRates: TTaxRate[];
  orderId: number;
};

export type TTaxRateEsir = {
  name: string;
} & TTaxRate;

export type TTaxDefinition = {
  validFrom: string;
  groupId: number;
  taxCategories: TTaxCategory[];
};

export type TTaxRate = {
  rate: number;
  label: string;
};

export type TLPFRStatus = {
  isPinRequired: boolean;
  auditRequired: boolean;
  sdcDateTime: string;
  lastInvoiceNumber: string;
  protocolVersion: string;
  secureElementVersion: string;
  hardwareVersion: string;
  softwareVersion: string;
  deviceSerialNumber: string;
  model: string;
  make: string;
  mssc: number[];
  gsc: number[];
  supportedLanguages: string[];
  uid: string;
  taxCoreApi: string;
  currentTaxRates: TTaxDefinition;
  allTaxRates: TTaxDefinition[];
};

export type TLPFRReqErr = {
  property?: string;
  errors: string[] | number[];
};

export type TLPFRReqError = {
  message?: string;
  modelState: TLPFRReqErr[];
};
