import {TReceiptItem, TBuyerInfoData, TRefundProps} from 'src/store/Receipt/d';

export type TReceiptListItemProps = {
  index: number;
} & TReceiptItem;

export type TReceiptClientDefinitionForm = {
  clientType: string;
  optionalData: string;
  clientTypeInfo: string;
  optionalDataInfo: string;
};

export type TReceiptClientTypeForm = {
  type: string | number;
  value: string;
  valueTin?: string;
  valueID?: string;
  valueJMBG?: string;
  valueOther?: string;
};

export type TReceiptClientDefinitionProps = {
  id?: number;
};

export type TClientSingleFormProps = {
  clientData?: TBuyerInfoData;
  onSubmit?: (data: TBuyerInfoData) => void;
  validation: any;
  fieldParentName?: string;
  isOptional?: boolean;
  usingAction?: boolean;
  disabled?: boolean;
};

export type TRefundForm = {
  referentReceipt: string;
  dateTime: string;
  type: string | number;
  valueTin?: string;
  valueID?: string;
  valueJMBG?: string;
  valueOther?: string;
};
