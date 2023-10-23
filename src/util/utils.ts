import {__divide, __multiply, __random, __round, __toNumber} from './lodash';
import {Translate} from 'src/translate/data';
import {ReceiptPayingType} from '../store/Receipt/d';
import {Colors} from 'src/constants/Colors';
import {UserPriority} from 'src/database/d';
import {TServerEnv, TServerProtocol} from 'src/screens/server/sdcForm/d';
import {DateModes} from 'src/components/dateTimePicker/d';

export const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

export const guid = () => {
  return `${__random(1000, 100000)}-${__random(1000, 100000)}`;
};

export const sleep = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time));

export const toNumberFixed = (value: string | number) => {
  if (!value) {
    return 0;
  }
  if (typeof value === 'number') {
    value = value.toString();
  }
  while (/,/g.test(value)) {
    value = value.replace(',', '');
  }
  return __toNumber(value);
};

export const formatPrice = (value: number | string, maxDecimal = 2): string => {
  const valNumber = typeof value === 'number' ? value : Number(value);
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: maxDecimal,
  });
  return formatter.format(valNumber);
};

export const formatQuantity = (
  value: number | string,
  minimumFractionDigits = 3,
): string => {
  const valNumber = typeof value === 'number' ? value : Number(value);
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits,
    maximumFractionDigits: 3,
  });
  return formatter.format(valNumber);
};

export const formatTax = (
  value: number | string,
  minimumFractionDigits = 0,
  maximumFractionDigits = 2,
): string => {
  const valNumber = typeof value === 'number' ? value : Number(value);
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits,
    maximumFractionDigits,
  });
  return formatter.format(valNumber);
};

export const formatTotal = (quantity: number, price: number) => {
  return formatPrice(__round(__multiply(price, quantity), 3));
};

/** get data for select of enum */

export const getSelectOptionsOfEnum = (data: any, upperCase?: boolean) => {
  return Object.keys(data)
    .filter(k => isNaN(Number(k)))
    .map((x: any) => {
      let label = upperCase
        ? x
        : x
            .split(/(?=[A-Z])/)
            .join(' ')
            .toLowerCase();
      if (!upperCase) {
        label = `${label.charAt(0).toUpperCase()}${label.slice(1)}`;
      }
      if (upperCase) {
        label = label.split('_').join(' ');
      }
      return {
        label: label,
        value: data[x],
      };
    });
};

/** Convert priority to text  **/

export const convertPriority = (priority: UserPriority | undefined) => {
  switch (priority) {
    case 1:
      return Translate.TR_USER_PRIORITY_CASHIER_LABEL;
    case 2:
      return Translate.TR_USER_PRIORITY_ADMIN_LABEL;
    default:
      return Translate.TR_USER_PRIORITY_SUPER_ADMIN_LABEL;
  }
};

export const formatDateLong = (value: string, locale?: string) => {
  if (!value || value === '') {
    value = new Date().toString();
  }
  return new Date(value).toLocaleString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  } as any);
  // return new Date(value).toLocaleDateString(void(0), {day: '2-digit', month: '2-digit', year: 'numeric'} as any)
};

export const getPaymentByType = (payment: ReceiptPayingType) => {
  switch (payment) {
    case ReceiptPayingType.CARD:
      return 'Kartica';
    case ReceiptPayingType.CHECK:
      return 'Cek';
    case ReceiptPayingType.VOUCHER:
      return 'Vaucher';
    default:
      return 'Gotovina';
  }
};

/** input string price/quantity format */

export const formatCurrencyQty = (str: string, decimal = 2) => {
  let value = str.replace(/[^0-9\.]/g, '');
  value = value.replace(/^0{2,}/, '0');
  value = value.replace(/^\./, '0.');
  value = value.replace(/^0([^\.])/, '0.$1');
  const array = value.split('.');
  let val = array[0].split(/(?=(?:\d{3})+(?:$))/g).join(',');
  if (array.length > 1) {
    val = `${val}.${array[array.length - 1].substring(0, decimal)}`;
  }
  return val;
};

/** input date convert to number */

export const dateInDays = (date: Date) => {
  const time = date.getTime();
  const days = Math.floor(__divide(time, MILLISECONDS_PER_DAY));
  return days;
};

export type TDateFormat = {
  local: string;
  useHours24?: boolean;
  showDate: boolean;
  showTime?: boolean;
  timeFormatSS?: boolean;
  fullYearFormat?: boolean;
};

/** */

export const formatDateString = (
  dateMode = DateModes.DATE_TIME,
  value = new Date(),
  local = 'sr-Latn-RS',
) => {
  let options = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  } as any;
  switch (dateMode) {
    case DateModes.DATE_TIME:
      options = {
        ...options,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      break;

    case DateModes.TIME:
      options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      break;
    default:
      break;
  }

  return (
    dateMode === DateModes.TIME
      ? value.toLocaleTimeString(local, options)
      : value.toLocaleDateString(local, options)
  ).toLocaleUpperCase();
};

export const formatDateDayNumberToString = (day: number) => {
  return new Date(day * MILLISECONDS_PER_DAY).toLocaleDateString('fr-CA', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
};

export const descriptionFixString = (value: string) =>
  value.replace(/"/g, "''");

/***/

export const setBackgroundColorByName = (name: any) => {
  const {BLUE, GREEN, CYAN, INDIGO, LIGHT_BLUE} = Colors.PALETTE;

  switch (name) {
    case 'VAT-EXCL':
      return BLUE._400;
    case 'STT':
      return GREEN._600;
    case 'ECAL':
      return INDIGO._700;
    case 'N-TAX':
      return CYAN._500;
    case 'PBL':
      return BLUE._700;
    case 'TOTL':
      return LIGHT_BLUE._800;
    default:
      return GREEN._400;
  }
};

export const setBackgroundColorByTax = (name: any) => {
  const {BLUE, GREEN, CYAN, INDIGO, LIGHT_BLUE} = Colors.PALETTE;

  switch (name) {
    case 'A':
      return BLUE._400;
    case 'B':
      return GREEN._600;
    case 'C':
      return INDIGO._700;
    case 'E':
      return CYAN._500;
    case 'F':
      return BLUE._700;
    case 'N':
      return LIGHT_BLUE._800;
    default:
      return GREEN._400;
  }
};

/** Convert environment to text  **/

export const convertEnv = (env: TServerEnv | undefined) => {
  switch (env) {
    case 1:
      return 'Demo - demo.taxcore.dti.rs';
    case 2:
      return 'Demo1 - demo.taxcore.dti.rs';
    default:
      return 'Demo2 - demo.taxcore.dti.rs';
  }
};

/** Convert protocol to text  **/

export const convertProtocol = (protocol: TServerProtocol | undefined) => {
  switch (protocol) {
    case 1:
      return 'HTTP';
    default:
      return 'HTTPS';
  }
};
/*
/!** Convert receipt type to text **!/

export const convertReceiptType = (type: ReceiptType | undefined) => {
  switch (type) {
    case 1:
      return 'REFUNDACIJA PROMETA';
    case 2:
      return 'AVANSNA PRODAJA';
    case 3:
      return 'REFUNDACIJA AVANSA';
    default:
      return 'PROMET PRODAJA';
  }
};*/

/*/!** Convert client type to text **!/

export const convertClientType = (type: ClientType | undefined) => {
  switch (type) {
    case 11:
      return 'JMBG - 11';
    case 20:
      return 'BR LIČNE KARTE - 20';
    case 21:
      return 'BR IZBEGLIČKE LEGITIMACIJE - 21';
    case 22:
      return 'EBS - 22';
    case 23:
      return 'BR PASOŠA ( DOMAĆE LICE ) - 23';
    case 30:
      return 'BR PASOŠA ( STRANO LICE ) - 30';
    case 31:
      return 'BR DIPLOMATSKE LEGITIMACIJE - 31';
    case 32:
      return 'BR LIČNE KARTE ( MKD ) - 32';
    case 33:
      return 'BR LIČNE KARTE ( CG ) - 33';
    case 34:
      return 'BE LIČNE KARTE ( ALB ) - 34';
    case 35:
      return 'BR LIČNE KARTE ( BIH) - 35';
    case 40:
      return 'PORESKI ID STRANE ZEMLJE ( TIN ) - 40';
    default:
      return 'PIB - 10';
  }
};*/

/*
/!** Convert optional client data to text **!/

export const convertClientOptionalDataType = (type: ClientType | undefined) => {
  switch (type) {
    case 11:
      return 'BROJ OBRASCA OPERATERA ZA REFAKCIJU';
    case 20:
      return 'BROJ SNPDV';
    case 21:
      return 'BROJ LNPDV';
    case 30:
      return 'BROJ PPO-PDV';
    case 31:
      return 'BROJ ZPPO-PDV';
    case 32:
      return 'BROJ MPPO-PDV';
    case 33:
      return 'BROJ IPPO-PDV';
    case 40:
      return 'BROJ JEDINSTVENOG VAUČERA';
    default:
      return 'BROJ ZPPPDV';
  }
};
*/
