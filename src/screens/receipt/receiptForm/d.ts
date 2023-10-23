import {ClientType, OptionalClientData} from 'src/store/Receipt/d';
import {TypeUseValidation} from 'src/hooks/validation/useValidation';

export type TReceiptFormModel = {
  clientType?: ClientType;
  clientValue?: string | number;
  valueTin?: string;
  valueID?: string;
  valueJMBG?: string;
  valueOther?: string;
  clientOptionType?: OptionalClientData;
  clientOptionValue?: string | number;
  isAdvance?: boolean;
  advanceNumber?: string | number;
  referentNumber?: string;
  dateTime?: string;
};

export type TReceiptSettings = {
  buyerInfoType: string | number;
  buyerInfoData: string;
  buyerInfoTypeAdditional: string;
  buyerInfoDataAdditional: string;
  refundReceiptNumber: string;
  refundReceiptDate: string;
  advanceReceiptNumber: string;
  advanceReceiptFinance: string;
};

const ValidationType = () => TypeUseValidation<TReceiptSettings>();

export type TValidationType = ReturnType<typeof ValidationType>;

export type TBuyerInfoProps = {
  isAdditional?: boolean;
  validation: TValidationType;
  isUsed?: boolean;
  toggleUsed?: () => void;
};

export type TBuyerType = {
  label: string;
  value: string;
  isNumericType?: boolean;
  labelInput?: string;
  maxLength?: number;
  validation?: (value: string) => boolean | string;
  iconLeft: any;
};
