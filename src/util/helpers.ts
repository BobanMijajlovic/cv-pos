import {
  ReceiptBuyerInfoAdditional,
  ReceiptBuyerInfo,
} from 'src/constants/ReceiptTypes';

export const getReceiptOptionalBuyerData = (type: string | number) => {
  const numType = +type;
  return ReceiptBuyerInfoAdditional.find(x => +x.value === numType);
};

export const getReceiptBuyerData = (type: string | number) => {
  const numType = +type;
  return ReceiptBuyerInfo.find(x => +x.value === numType);
};


