import {executeSQL} from 'src/database/db';
import {TDailyVatsModel, TReceiptTypes} from 'src/database/d';
import {__round, __add, __multiply} from 'src/util/lodash';
import {TTaxItemResponse, TTransactionType} from 'src/store/lpfr/d';

export const tableName = 'daily_vats';

class DailyVats {
  createTable = async () => {
    const fields = [
      'id INTEGER PRIMARY KEY AUTOINCREMENT',
      'date INTEGER NOT NULL',
      'invoice_type INTEGER NOT NULL',
      'transaction_type INTEGER NOT NULL',
      'label TEXT NOT NULL',
      'name TEXT NOT NULL',
      'rate INTEGER NOT NULL',
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

  /**
   *
   * @param type
   * @param date
   * @return array of vats for this type and date
   */
  getDailyVatsByTypeAndDate = async (type: TTransactionType, date: number) => {
    const data = await executeSQL(
      `SELECT * FROM ${tableName} WHERE transaction_type = '${type}' AND date = ${date}`,
    );
    return data?.[0]?.rows?.raw();
  };

  selectVatsPeriodDetail = async (startDateInt: number, endDateInt: number) => {
    const data = await executeSQL(
      `SELECT * FROM ${tableName} WHERE date >= ${startDateInt} and date <=${endDateInt}`,
    );
    return data?.[0].rows?.raw();
  };

  getPrevRecord = async (
    vat: TTaxItemResponse,
    types: TReceiptTypes,
    _date: number,
    uidId: number,
  ): Promise<TDailyVatsModel> => {
    const sql = `SELECT id, finance from ${tableName} WHERE uid=${uidId} AND invoice_type= ${types.invoiceType} AND transaction_type = ${types.transactionType} AND date=${_date} AND label='${vat.label}' AND rate=${vat.rate} AND name ='${vat.categoryName}'`;
    const data = await executeSQL(sql);
    return data?.[0]?.rows?.item(0);
  };

  processNewVat = async (
    tax: TTaxItemResponse,
    date: number,
    types: TReceiptTypes,
    uidId: number,
  ) => {
    tax = {
      ...tax,
      rate: __round(__multiply(tax.rate, 100)),
    };

    const oldInstance = await this.getPrevRecord(tax, types, date, uidId);
    const _finance = __round(tax.amount, 4);
    if (oldInstance) {
      const finance = __round(__add(oldInstance.finance, _finance), 4);
      const sql = `UPDATE ${tableName} SET finance = ${finance}  WHERE id=${oldInstance.id}`;
      const data = await executeSQL(sql);
      return data[0].rows.item(0);
    }
    const {invoiceType, transactionType} = types;
    const strQ = `INSERT INTO ${tableName} (date, invoice_type, transaction_type,label, rate, finance, name, uid) VALUES( ${date}, ${invoiceType}, ${transactionType}, '${tax.label}', ${tax.rate}, ${_finance}, '${tax.categoryName}', ${uidId})`;
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

const instance = new DailyVats();
export default instance;
