import {Translate} from 'src/translate/data';

export const checkPib = (value: string) => {
  if (!value || value.length < 9) {
    return Translate.TR_VALIDATION_PIB_NOT_VALID;
  }
  return false;
};

export const checkUniqCompanyNumber = (value?: string) => {
  if (value && value?.length < 8) {
    return Translate.TR_VALIDATION_UNIQUE_COMPANY_NUMBER_NOT_VALID;
  }
  return false;
};

export const checkZipCode = (value?: string) => {
  if (value && (value?.length < 5 || value?.length > 7)) {
    return Translate.TR_VALIDATION_ZIP_CODE_NOT_VALID;
  }
  return false;
};
