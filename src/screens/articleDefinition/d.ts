export type TArticleDefinitionForm = {
  barcode: string;
  description: string;
  price: number | string;
  vats: TArticleVat[];
  mes: string;
  category?: string;
};

export type TArticleDefinitionProps = {
  id?: number;
};

export type TArticleVat = {
  model: string;
  value?: string;
};
