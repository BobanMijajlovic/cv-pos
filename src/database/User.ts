import {
  deleteRecord,
  executeSQL,
  insertRecord,
  selectById,
  tablePragmaInfo,
  updateRecord,
  selectAllRecords,
} from './db';
import {TSelectProps, TUserModel} from './d';
import {
  ERROR_USER_PIN_ALREADY_USED,
  ERROR_USER_PIN_NOT_VALID,
} from '../constants/Errors';

export const tableName = 'user';

export const createTable = async () => {
  const fields = [
    'id INTEGER PRIMARY KEY AUTOINCREMENT',
    'fullName TEXT NOT NULL',
    'nickname TEXT NOT NULL',
    'pin TEXT NOT NULL UNIQUE',
    'priority INTEGER DEFAULT 1',
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

export const checkUserValid = (user: TUserModel) => {
  const pin = user.pin;
  if (pin.length > 4) {
    throw ERROR_USER_PIN_NOT_VALID;
  }
};

export const getByPin = async (pin: string) => {
  const sql = `SELECT * FROM ${tableName} where pin = ${pin}`;
  const data = await executeSQL(sql);
  return data ? data[0].rows.item(0) : false;
};

export const insert = async (user: TUserModel) => {
  checkUserValid(user);
  const isPinExists = await getByPin(user.pin);
  if (isPinExists) {
    throw ERROR_USER_PIN_ALREADY_USED;
  }
  return insertRecord(tableName)(user);
};

export const update = async (user: TUserModel, id?: number) => {
  return updateRecord(tableName)(user, id || user.id || 0);
};

export const deleteOne = async (id?: number) => {
  return deleteRecord(tableName)(id || 0);
};

export const getById = async (id: number) => selectById(tableName)(id);

export const selectAll = (data: TSelectProps) =>
  selectAllRecords(tableName)(data);
