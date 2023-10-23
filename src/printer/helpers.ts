import {
  ItemTemps,
  OptionsTemps,
  PayingTemps,
  PrintSpaceBetween,
  SeparatorLine,
  SERBIAN_LABELS,
  TEMPLATE,
  TEMPLATE_PAYING,
  TEMPLATE_PRINT_CENTER,
  TEMPLATE_PRINT_SPACE_BETWEEN,
  TEMPLATE_VATS,
  TFooterType,
  THeaderType,
  TInvoiceRequestItems,
  TItemHeader,
  TPrintSpaceBetween,
  TSufInvoiceResponseTaxItems,
  TVatsHeader,
  TVatsProps,
  VatTemps,
} from './d';
import {formatPrice, formatQuantity} from '../util/utils';
import {__isString} from '../util/lodash';

/** this is from app ionic receipt item type */
export type TItemReceipt = {
  guid: number | string;
  item: any; // TItem
  quantity: number;
  price: number;
};

/**
 *  this is type from store in app-ionic
 */

export type TSettingsDateFormat = {
  local: string;
  useHours24?: boolean;
  showDate: boolean;
  showTime: boolean;
  timeFormatSS?: boolean;
  fullYearFormat?: boolean;
};

/**  */

export const isExistsTemplate = (temp: string, part: string) => {
  return temp.indexOf(part) !== -1;
};

export const emptyString = (len: number) => {
  return new Array(len + 1).join(' ');
};

export const replaceTemplate = (
  temp: string,
  part: string,
  value: string,
): string => {
  return temp.replace(part.trim(), value);
};
export const removeFromTemplate = (temp: string, part: string): string => {
  return temp.replace(part, '');
};

export const replaceSpaceToFill = (
  value: string,
  numChars: number,
  separator?: SeparatorLine,
) => {
  const arr = value.split(ItemTemps.SpaceToFILL).filter(x => x.length);
  const lenArr = (array: string[]) =>
    array.reduce((acc, x) => acc + x.length, 0);
  let pos = 0;
  const lenT = lenArr.length;
  let _separator = ' ';
  switch (separator) {
    case SeparatorLine.single:
      _separator = '-';
      break;
    case SeparatorLine.double:
      _separator = '=';
      break;
    default:
      _separator = ' ';
      break;
  }
  while (lenArr(arr) < numChars) {
    let str = `${arr[pos]}${_separator}`;
    if (separator !== undefined) {
      str = `${_separator}${arr[pos]}${_separator}`;
      if (str.length > numChars) {
        str = str.substring(0, str.length - 1);
      }
    }
    arr[pos] = str;
    pos++;
    pos %= lenT;
  }
  return arr.join('');
};

export const fixLenTemplatePart = (
  part: string,
  value: string,
  right?: boolean,
): string => {
  const _value = `${value}`;
  const len = part.trim().length;
  const valLen = value.length;
  if (len <= valLen) {
    return value;
  }
  const adder = '                                    ';
  if (right) {
    return (_value + adder).substring(0, len);
  }
  return [adder.substring(0, len - valLen), value].join('');
};

const splitPrintLines = (arr: string[], numChars: number): string[] => {
  const line = arr[arr.length - 1];
  const lineNoNewLine = line.split(ItemTemps.NewLINE).join('');
  const array = lineNoNewLine
    .split(ItemTemps.SpaceToFILL)
    .filter(x => x.length !== 0);
  const totalLen = array.reduce((acc, x) => acc + x.length, 0);
  if (totalLen <= numChars) {
    arr[arr.length - 1] = lineNoNewLine;
    return [...arr];
  }
  const arrn = line.split(ItemTemps.NewLINE);
  /** if size 1 then no newLine - error */
  if (arrn.length === 1) {
    return arr;
  }
  const arrx = [...arr];
  arrx[arr.length - 1] = arrn[0];
  arrn.shift();
  arrx.push(arrn.join(ItemTemps.NewLINE));
  return splitPrintLines(arrx, numChars);
};

/** the rule is that we have one/ two or at most 3 rows */
export const formatItemPrintString = (
  _template = TEMPLATE[0].temp,
  receiptItem: TInvoiceRequestItems,
  printerChars = 32,
  vatsProps = {using: true} as Partial<TVatsProps>,
): string[] => {
  const template = `${_template}`;
  const {
    Name,
    UnitPrice: price,
    Quantity: quantity,
    TotalAmount: total,
    Labels,
  } = receiptItem;
  const mark = Labels[0];

  const isVatUsing = vatsProps.using;

  /** replace desc **/

  const needSpaceForTax = (() => {
    if (!isVatUsing) {
      return 0;
    }
    return (vatsProps.maxLenChars || 1) + 2;
  })();

  const taxString = (() => {
    if (!isVatUsing) {
      return '';
    }
    /** not defined then write something else */
    let ss = `(${mark})` || '';
    while (ss.length < needSpaceForTax) {
      ss = ' ' + ss;
    }
    return ss;
  })();

  const _desc = (() => {
    const __desc = Name || '';
    return `${__desc} ${taxString}`;
  })();

  let dataString = `${template}`;
  const priceString = fixLenTemplatePart(
    ItemTemps.lPRICE,
    formatPrice(price as number),
  );
  dataString = replaceTemplate(dataString, ItemTemps.lPRICE, priceString);

  const quantityString = fixLenTemplatePart(
    ItemTemps.rQUANTITY6,
    formatQuantity(quantity as number, 0),
    true,
  );
  dataString = replaceTemplate(
    dataString,
    ItemTemps.rQUANTITY6,
    quantityString,
  );

  const totalString = fixLenTemplatePart(
    ItemTemps.TOTAL,
    formatPrice(total as number),
  );
  dataString = replaceTemplate(dataString, ItemTemps.TOTAL, totalString);

  dataString = replaceTemplate(dataString, ItemTemps.DESCRIPTION, _desc);
  let array = splitPrintLines([dataString], printerChars);
  array = array.map(s => replaceSpaceToFill(s, printerChars));
  return array;
};

/** item header print string */
export const formatHeaderItemPrintString = (
  _template = TEMPLATE[0].header,
  itemHeader: TItemHeader,
  printerChars = 32,
): string[] => {
  const template = `${_template}`;
  const {name, price, quantity, total} = itemHeader;

  let _desc = (name || '').substring(0, printerChars);

  let dataString = `${template}`;

  if (isExistsTemplate(template, ItemTemps.lPRICE)) {
    const priceString = fixLenTemplatePart(ItemTemps.lPRICE, price, true);
    dataString = replaceTemplate(dataString, ItemTemps.lPRICE, priceString);
  }

  if (isExistsTemplate(template, ItemTemps.rQUANTITY6)) {
    const quantityString = fixLenTemplatePart(
      ItemTemps.rQUANTITY6,
      quantity,
      true,
    );
    dataString = replaceTemplate(
      dataString,
      ItemTemps.rQUANTITY6,
      quantityString,
    );
  }

  const totalString = fixLenTemplatePart(ItemTemps.TOTAL, total);
  dataString = replaceTemplate(dataString, ItemTemps.TOTAL, totalString);
  dataString = removeFromTemplate(dataString, ItemTemps.VatBeforePrice);

  _desc = fixLenTemplatePart(ItemTemps.DESCRIPTION, _desc, true);
  dataString = replaceTemplate(dataString, ItemTemps.DESCRIPTION, _desc);
  let array = splitPrintLines([dataString], printerChars);
  array = array.map(s => replaceSpaceToFill(s, printerChars));
  return array;
};

/** format prinst date string */
export const formatDateString = (
  format: TSettingsDateFormat,
  value = new Date(),
) => {
  const res = [];
  if (format.showDate) {
    let options = {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
    } as any;
    if (format.fullYearFormat) {
      options = {
        ...options,
        year: 'numeric',
      };
    }
    res.push(value.toLocaleDateString(format.local, options));
  }

  if (format.showTime) {
    let options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    } as any;

    if (format.timeFormatSS) {
      options = {
        ...options,
        second: '2-digit',
      };
    }
    if (format.useHours24) {
      options = {
        ...options,
        hour12: true,
      };
    }
    res.push(value.toLocaleTimeString(format.local, options));
  }

  return res.join(' ').toLocaleUpperCase();
};

export const createArray = (length: number, fill?: string | number) =>
  Array.from(Array(length).fill(fill ? fill : null));

export const formatSeparatorLine = (
  type: SeparatorLine,
  printerChars = 32,
): string => {
  switch (type) {
    default:
      return createArray(printerChars, '\x20').join('');
    case SeparatorLine.single:
      return createArray(printerChars, '-').join('');
    case SeparatorLine.double:
      return createArray(printerChars, '=').join('');
  }
};
/** format print vats **/
export const formatVatsPrintString = (
  data: TSufInvoiceResponseTaxItems,
  printerChars = 32,
  vatsProps: TVatsProps,
  _template = TEMPLATE_VATS[0].temp,
): string[] => {
  const template = `${_template}`;
  const {label, amount, rate, categoryName} = data;

  const needSpaceForTax = (vatsProps.maxLenChars || 1) + 2;

  const taxString = (() => {
    let ss = `(${label})` || '';
    while (ss.length < needSpaceForTax) {
      ss = ' ' + ss;
    }
    return ss;
  })();

  let dataString = `${template}`;
  const _taxString = fixLenTemplatePart(VatTemps.VatFormat, taxString);
  const _categoryName = fixLenTemplatePart(VatTemps.VatName, categoryName);
  const taxValue = fixLenTemplatePart(VatTemps.VatTax, `${formatPrice(rate)}%`);
  const taxAmount = fixLenTemplatePart(VatTemps.VatNet, formatPrice(amount));
  dataString = replaceTemplate(dataString, VatTemps.VatFormat, _taxString);
  dataString = replaceTemplate(dataString, VatTemps.VatName, _categoryName);
  dataString = replaceTemplate(dataString, VatTemps.VatTax, taxValue);
  dataString = replaceTemplate(dataString, VatTemps.VatNet, taxAmount);
  let array = splitPrintLines([dataString], printerChars);
  array = array.map(s => replaceSpaceToFill(s, printerChars));
  return array;
};

/** format print vats header string */

export const formatVatsHeaderPrintString = (
  data: TVatsHeader,
  printerChars = 32,
  vatsProps: TVatsProps,
  _template = TEMPLATE_VATS[0].header,
): string[] => {
  const template = `${_template}`;
  const {format, name, taxValue, net} = data;

  const taxString = `${format}` || '';
  let dataString = `${template}`;
  //const _taxString = fixLenTemplatePart(VatTemps.VatHeaderFormat, taxString);
  const _categoryName = fixLenTemplatePart(VatTemps.VatHeaderName, name);
  const _taxValue = fixLenTemplatePart(VatTemps.VatHeaderTax, taxValue);
  const taxAmount = fixLenTemplatePart(VatTemps.VatHeaderNet, net);
  dataString = replaceTemplate(dataString, VatTemps.VatHeaderFormat, taxString);
  dataString = replaceTemplate(
    dataString,
    VatTemps.VatHeaderName,
    _categoryName,
  );
  dataString = replaceTemplate(dataString, VatTemps.VatHeaderTax, _taxValue);
  dataString = replaceTemplate(dataString, VatTemps.VatHeaderNet, taxAmount);
  let array = splitPrintLines([dataString], printerChars);
  array = array.map(s => replaceSpaceToFill(s, printerChars));
  return array;
};

/** payments string */

export const formatPayingString = (
  _template = TEMPLATE_PAYING[0].temp,
  data: number,
  label: string,
  printerChars = 32,
): string[] => {
  let dataString = `${_template}`;
  dataString = replaceTemplate(dataString, PayingTemps.DESCRIPTION, label);
  dataString = replaceTemplate(
    dataString,
    PayingTemps.QUANTITY,
    formatPrice(data),
  );
  let array = splitPrintLines([dataString], printerChars);
  array = array.map(s => replaceSpaceToFill(s, printerChars));
  return array;
};

/** format print total Receipt */
export const formatTotalReceipt = (
  value: string | number,
  printerChars = 32,
) => {
  return formatSpaceBetweenPrintString(
    {label: SERBIAN_LABELS.TOTAL_COSTS, value: formatPrice(value)},
    printerChars,
  );
};

/** format print total tax finance of receipt */
export const formatTotalTaxReceipt = (
  value: string | number,
  printerChars = 32,
) => {
  return formatSpaceBetweenPrintString(
    {label: SERBIAN_LABELS.TAX_FINANCE_TOTAL, value: formatPrice(value)},
    printerChars,
  );
};

/** format receipt header */
export const formatHeaderPrintString = (
  header: THeaderType,
  printerChars = 32,
) => {
  return [
    ...formatSpaceBetweenPrintString(
      {label: SERBIAN_LABELS.TIN, value: header.tin},
      printerChars,
    ),
    ...formatSpaceBetweenPrintString(
      {label: SERBIAN_LABELS.BUSINESS_NAME, value: header.businessName},
      printerChars,
    ),
    ...formatSpaceBetweenPrintString(
      {label: SERBIAN_LABELS.LOCATION_NAME, value: header.locationName},
      printerChars,
    ),
    ...formatSpaceBetweenPrintString(
      {label: SERBIAN_LABELS.ADDRESS, value: header.address},
      printerChars,
    ),
    ...formatSpaceBetweenPrintString(
      {label: SERBIAN_LABELS.DISTRICT, value: header.district},
      printerChars,
    ),
    ...formatSpaceBetweenPrintString(
      {label: SERBIAN_LABELS.CASHIER, value: header.cashier || ''},
      printerChars,
    ),
  ];
};

/** format receipt footer */
export const formatFooterPrintString = (
  footer: TFooterType,
  printerChars = 32,
) => {
  const pfrDate = !__isString(footer.pfrDateTime)
    ? (footer.pfrDateTime as any).toISOString()
    : footer.pfrDateTime;
  return [
    ...formatSpaceBetweenPrintString(
      {label: SERBIAN_LABELS.PFR_DATETIME, value: pfrDate},
      printerChars,
    ),
    ...formatSpaceBetweenPrintString(
      {
        label: SERBIAN_LABELS.PFR_RECEIPT_NUMBER,
        value: footer.pfrReceiptNumber,
      },
      printerChars,
    ),
    ...formatSpaceBetweenPrintString(
      {label: SERBIAN_LABELS.PFR_RECEIPT_NUMBER, value: footer.receiptNumber},
      printerChars,
    ),
  ];
};
/** format print text center with separator */

export const formatPrintTextCenter = (
  text: string,
  separator: SeparatorLine,
  printerChars = 32,
) => {
  let dataString = `${TEMPLATE_PRINT_CENTER.temp}`;
  dataString = replaceTemplate(
    dataString,
    OptionsTemps.RECEIPT_DESCRIPTION,
    text,
  );
  return [dataString].map(s => replaceSpaceToFill(s, printerChars, separator));
};

const formatSpaceBetweenPrintString = (
  data: TPrintSpaceBetween,
  printerChars = 32,
) => {
  let dataString = `${TEMPLATE_PRINT_SPACE_BETWEEN.temp}`;
  dataString = replaceTemplate(dataString, PrintSpaceBetween.LABEL, data.label);
  dataString = replaceTemplate(
    dataString,
    PrintSpaceBetween.VALUE,
    `${data.value}`,
  );
  let array = splitPrintLines([dataString], printerChars);
  array = array.map(s => replaceSpaceToFill(s, printerChars));
  return array;
};
