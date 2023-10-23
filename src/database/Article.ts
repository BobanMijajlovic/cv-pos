import {
  deleteRecord,
  executeSQL,
  insertRecord,
  selectAllRecords,
  selectById,
  tablePragmaInfo,
  updateRecord,
} from './db';
import {TArticleModal, TSelectProps} from 'src/database/d';
import {
  ERROR_ARTICLE_BAR_CODE_NOT_VALID,
  ERROR_ARTICLE_DESC_NOT_VALID,
  ERROR_ARTICLE_MEASURE_NOT_VALID,
  ERROR_ARTICLE_PRICE_NOT_VALID,
  ERROR_ARTICLE_VAT_NOT_VALID,
} from 'src/constants/Errors';

export const tableName = 'article';

export const createTable = async () => {
  const fields = [
    'id INTEGER PRIMARY KEY AUTOINCREMENT',
    'barcode TEXT NOT NULL',
    'description TEXT NOT NULL',
    'price INTEGER NOT NULL',
    'vat CHARACTER(1) NULL',
    'vat1 CHARACTER(1) NULL',
    'vat2 CHARACTER(1) NULL',
    'vat3 CHARACTER(1) NULL',
    'mes INTEGER DEFAULT 0',
  ];
  const createFields = fields.join(',');
  const sql =
    'CREATE TABLE IF NOT EXISTS ' + tableName + ' (' + createFields + ')';
  return executeSQL(sql);
};

export const tableInfo = async () => {
  return tablePragmaInfo(tableName);
};

export const dropTable = async () => {
  await executeSQL(`DROP TABLE IF EXISTS ${tableName}`);
};

const isValidEANLen = (len: number) =>
  len === 18 || len === 14 || len === 13 || len === 8 || len === 5;

const calcCheckSum = (barcode: string) => {
  let sum = 0;
  for (let i = barcode.length - 1; i >= 0; i--) {
    sum += (+barcode.charAt(i) * (1 + 2 * (i % 2))) | 0;
  }
  sum = (10 - (sum % 10)) % 10;
  return sum;
};

const isBarCodeValid = (barcode: string) => {
  if (!/^\d+$/.test(barcode) || !isValidEANLen(barcode.length)) {
    return false;
  }
  const lastDigit = +barcode.substring(barcode.length - 1);
  const checkSum = calcCheckSum(barcode.slice(0, -1));
  return lastDigit === checkSum;
};

const getBarCodeWithChecksum = (barcode: string) => {
  const len = barcode.length + 1;
  if (!isValidEANLen(len)) {
    return barcode;
  }
  return `${barcode}${calcCheckSum(barcode)}`;
};

export const getValidBarCode = (barcode: string) => {
  return barcode;
};

export const checkArticleValid = (article: TArticleModal) => {
  const price = article.price;
  if (isNaN(price) || price < 0.01) {
    throw ERROR_ARTICLE_PRICE_NOT_VALID;
  }
  const vat = article.vat;
  if (!vat) {
    throw ERROR_ARTICLE_VAT_NOT_VALID;
  }

  const mes = article.mes || 0;
  if (isNaN(mes) || mes < 0 || mes > 20 || !Number.isInteger(mes)) {
    throw ERROR_ARTICLE_MEASURE_NOT_VALID;
  }

  const desc = article.description.trim();
  if (!desc || desc.length < 3) {
    throw ERROR_ARTICLE_DESC_NOT_VALID;
  }

  const barcode = article.barcode;
  if (!barcode || /[^0-9]/.exec(barcode)) {
    throw ERROR_ARTICLE_BAR_CODE_NOT_VALID;
  }
};

export const insert = async (article: TArticleModal) => {
  checkArticleValid(article);
  const record = await getByBarCode(article.barcode);
  if (record) {
    return update(
      {
        ...record,
        ...article,
      },
      record.id,
    );
  }
  return insertRecord(tableName)(article);
};

export const update = async (article: TArticleModal, id?: number) => {
  return updateRecord(tableName)(article, id || article.id || 0);
};

export const deleteOne = async (id?: number) => {
  return deleteRecord(tableName)(id || 0);
};

export const getById = async (id: number) => selectById(tableName)(id);

/** try to find exact barcode... if barcode is valid then maybe is stored without checksum...
 *  then maybe barcode is stored with checksum and read without
 * @param barCode
 */
export const getByBarCode = async (barCode: string) => {
  let sql = `SELECT * from ${tableName} where barcode = ${barCode}`;
  let data = await executeSQL(sql);
  if (data[0].rows.length !== 0) {
    return data[0].rows.item(0);
  }

  if (isBarCodeValid(barCode)) {
    /** check maybe is without checksum */
    sql = `SELECT * from ${tableName} where barcode = ${barCode.slice(0, -1)}`;
    data = await executeSQL(sql);
    if (data[0].rows.length !== 0) {
      return data[0].rows.item(0);
    }
    return null;
  }

  const _barCode = getBarCodeWithChecksum(barCode);
  if (_barCode === barCode) {
    return null;
  }
  sql = `SELECT * from ${tableName} where barcode = ${_barCode}`;
  data = await executeSQL(sql);
  if (data[0].rows.length !== 0) {
    return data[0].rows.item(0);
  }
  return null;
};

export const selectAll = (data: TSelectProps) =>
  selectAllRecords(tableName)(data);
