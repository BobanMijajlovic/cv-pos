export type TTaxCategory = {
  name: string;
  value: number;
  label: string;
};

export type TCurrentTaxRates = {
  validFrom: string;
  groupId: number;
  taxCategories: TTaxCategory[];
};
