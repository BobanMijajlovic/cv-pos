import {
  executeSQL,
  tablePragmaInfo,
  insertRecord,
  updateRecord,
  deleteRecord,
  selectById,
  selectAllRecords,
} from 'src/database/db';
import {TClientModel, TSelectProps} from 'src/database/d';
import {
  ERROR_CLIENT_TIN_NOT_VALID,
  ERROR_CLIENT_TIN_ALREADY_USED,
} from 'src/constants/Errors';

export const tableName = 'clients';

export const createTable = async () => {
  const fields = [
    'id INTEGER PRIMARY KEY AUTOINCREMENT',
    'name TEXT NOT NULL',
    'tin TEXT NOT NULL',
    'uniqueCompanyNumber TEXT',
    'city TEXT',
    'street TEXT',
    'zipCode TEXT',
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

export const checkClientValid = (client: TClientModel) => {
  const tin = client.tin;
  if (tin.length > 10) {
    throw ERROR_CLIENT_TIN_NOT_VALID;
  }
};

export const getByTin = async (tin: string) => {
  const sql = `SELECT * FROM ${tableName} where tin = ${tin}`;
  const data = await executeSQL(sql);
  return data ? data[0].rows.item(0) : false;
};

export const insert = async (client: TClientModel) => {
  checkClientValid(client);
  const isTinExists = await getByTin(client.tin);
  if (isTinExists) {
    throw ERROR_CLIENT_TIN_ALREADY_USED;
  }
  return insertRecord(tableName)(client);
};

export const update = async (client: TClientModel, id?: number) => {
  return updateRecord(tableName)(client, id || client.id || 0);
};

export const deleteOne = async (id?: number) => {
  return deleteRecord(tableName)(id || 0);
};

export const getById = async (id: number) => selectById(tableName)(id);

export const selectAll = (data: TSelectProps) =>
  selectAllRecords(tableName)(data);
