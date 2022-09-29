import {executeSQL} from 'src/database/db';
import {TDailyVatsModel, TReceiptTypes} from 'src/database/d';
import {__round, __add} from 'src/util/lodash';

export const tableName = 'user_finance';

class UserFinance {
  createTable = async () => {
    const fields = [
      'id INTEGER PRIMARY KEY AUTOINCREMENT',
      'date INTEGER NOT NULL',
      'user_id INTEGER NOT NULL',
      'invoice_type INTEGER NOT NULL',
      'transaction_type INTEGER NOT NULL',
      'uid INTEGER NOT NULL',
      'finance REAL NOT NULL',
    ];
    const createFields = fields.join(',');
    const sql =
      'CREATE TABLE IF NOT EXISTS ' + tableName + ' (' + createFields + ')';
    return executeSQL(sql);
  };

  dropTable = async () => {
    await executeSQL(`DROP TABLE IF EXISTS ${tableName}`);
  };

  getPrevRecord = async (
    types: TReceiptTypes,
    _date: number,
    uidId: number,
    userId: number,
  ): Promise<TDailyVatsModel> => {
    const sql = `SELECT id, finance from ${tableName} WHERE uid=${uidId} AND invoice_type= ${types.invoiceType} AND transaction_type = ${types.transactionType} AND date=${_date} AND user_id='${userId}'`;
    const data = await executeSQL(sql);
    return data?.[0]?.rows?.item(0);
  };

  processNewReceipt = async (
    date: number,
    userId: number,
    finance: number,
    types: TReceiptTypes,
    uidId: number,
  ) => {
    const oldInstance = await this.getPrevRecord(types, date, uidId, userId);
    const _finance = __round(finance, 4);
    if (oldInstance) {
      const finance = __round(__add(oldInstance.finance, _finance), 4);
      const sql = `UPDATE ${tableName} SET finance = ${finance}  WHERE id=${oldInstance.id}`;
      const data = await executeSQL(sql);
      return data[0].rows.item(0);
    }
    const {invoiceType, transactionType} = types;
    const strQ = `INSERT INTO ${tableName} (date, user_id, invoice_type, transaction_type, uid, finance) VALUES( ${date}, ${userId}, ${invoiceType}, ${transactionType}, ${uidId}, ${_finance})`;
    const data = await executeSQL(strQ);
    return data[0].rows.item(0);
  };

  getInstanceByDateUid = async (date: number, uidId: number) => {
    const data = await executeSQL(
      `SELECT * FROM ${tableName} WHERE date = ${date} and uid = ${uidId}`,
    );
    return data?.[0]?.rows?.raw();
  };
}

const instance = new UserFinance();
export default instance;
