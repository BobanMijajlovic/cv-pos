import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';
import {TSelectProps, TTableDefinitionColumn} from 'src/database/d';

// @ts-ignore
export const DataBase = {
  tables: {} as Record<string, TTableDefinitionColumn>,
};

SQLite.enablePromise(true);
//SQLite.DEBUG(true);
let dataBase: SQLiteDatabase;

export const init = async () => {
  // await dropDataBase();
};

export const tablePragmaInfo = async (table: string) => {
  const data = await executeSQL(`PRAGMA table_info(${table})`);
  const rowsLen = data[0].rows.length;
  const columns = Array.from(Array(rowsLen).keys()).map(i =>
    data[0].rows.item(i),
  );
  DataBase.tables = {
    ...DataBase.tables,
    [table]: columns,
  } as any;
};

export const getTableInfo = async (table: string) => {
  if (!DataBase.tables[table]) {
    await tablePragmaInfo(table);
  }
  return DataBase.tables[table];
};

export const getDataBase = async () => {
  if (dataBase) {
    return dataBase;
  }
  dataBase = await SQLite.openDatabase({
    name: 'hwt_pos.sqlite',
    location: 'default',
  });
  console.log('database ', dataBase)

  return dataBase;
};

export const executeSQL = async (sql: string) => {
  const dataBase = await getDataBase();
  // console.log('sql ', sql);
  return dataBase.executeSql(sql);
};

export const dropDataBase = async () => {
  const dataBase = await getDataBase();
  try {
    await dataBase.executeSql('DROP DATABASE hwt_pos.sqlite');
  } catch (e) {}
};

export const selectById = (table: string) => async (id: number) => {
  const sql = `SELECT * from ${table} where id = ${id}`;
  const data = await executeSQL(sql);
  return data[0].rows.item(0);
};

export const insertRecord = (table: string) => async (record: any) => {
  const fields = Object.keys(record).filter(x => x !== 'id');

  const values = fields.map((x: string) => {
    const value = record[x];
    return `"${value}"`;
  });

  const sql = `INSERT INTO ${table} (${fields.join(',')}) VALUES(${values.join(
    ',',
  )})`;
  const data = await executeSQL(sql);
  return await selectById(table)(data[0].insertId);
};

export const updateRecord =
  (table: string) => async (recordNew: any, id: number) => {
    const current = await selectById(table)(id);
    if (!current) {
      return null;
    }
    const __record = {
      ...current,
      ...recordNew,
    };

    const updateStr = Object.keys(__record)
      .reduce((acc: string[], key: string) => {
        return key === 'id' ? acc : [...acc, `${key} = "${__record[key]}"`];
      }, [])
      .join(',');

    const sql = `UPDATE ${table} SET ${updateStr} WHERE id=${id}`;
    const data = await executeSQL(sql);
    return data[0].rows.item(0);
  };

export const deleteRecord = (table: string) => async (id: number) => {
  const current = await selectById(table)(id);
  if (!current) {
    return null;
  }
  const sql = `DELETE FROM ${table} WHERE id=${id}`;
  const data = await executeSQL(sql);
  return true;
};

export const selectAllRecords =
  (table: string) =>
  async ({offset, limit, like}: TSelectProps = {offset: 0, limit: 25}) => {
    let sql = `SELECT * from ${table}`;
    if (like) {
      sql = `${sql} WHERE`;
      like.field.forEach((field, index) => {
        sql = `${sql} ${
          index !== 0 ? ' OR ' : ''
        }${field} LIKE ${`'%${like.value}%'`} `;
      });
    }
    return selectAllCount({offset, limit, sql});
  };

export const selectAllCount = async ({
  offset = 0,
  limit = 25,
  sql,
}: TSelectProps & {sql: string}) => {
  const sql2 = sql.replace(/^.*(from.*$)/, 'SELECT count(id) as total $1');
  sql = sql + ` LIMIT ${limit} OFFSET ${offset}`;
  const data = await executeSQL(sql);
  const len = data[0].rows.length;
  const rows = Array.from(Array(len).keys()).map(i => data[0].rows.item(i));
  const dataCount = await executeSQL(sql2);
  const numTotal = dataCount[0].rows.item(0);
  return {
    rows,
    ...numTotal,
    offset,
    limit,
  };
};
