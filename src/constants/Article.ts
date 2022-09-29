import {Translate} from 'src/translate/data';

export const ArticleMeasureValues = [
  {
    label: '/kom',
    value: '1',
  },
  {
    label: '/kg',
    value: '2',
  },
  {
    label: '/gr',
    value: '3',
  },
  {
    label: '/l',
    value: '4',
  },
  {
    label: '/m',
    value: '5',
  },
  {
    label: '/cm',
    value: '6',
  },
];

export const ArticleVatsArray = [
  {
    model: 'vat',
  },
  {
    model: 'vat1',
  },
  {
    model: 'vat2',
  },
  {
    model: 'vat3',
  },
];

export const checkVats = (value?: any[]) => {
  if (!value?.length) {
    return Translate.TR_VALIDATION_ARTICLE_VATS;
  }
  const arr = [...value].filter(x => x.value);
  if (!arr.length) {
    return Translate.TR_VALIDATION_ARTICLE_VATS;
  }
  return false;
};
