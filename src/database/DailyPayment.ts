import {executeSQL} from 'src/database/db';
import {TDailyPaymentModel} from 'src/database/d';
import {__round, __add} from 'src/util/lodash';

const tableName = 'daily_payments';

class DailyPayment {
  createTable = async () => {
    const fields = [
      'id INTEGER PRIMARY KEY AUTOINCREMENT',
      'date INTEGER NOT NULL',
      'invoice_type INTEGER NOT NULL',
      'transaction_type INTEGER NOT NULL',
      'payment_type INTEGER NOT NULL',
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

  /** we assume that all values are prepared , finance is already multiplied with 100 */
  insertNewData = async (payments: TDailyPaymentModel) =>
    executeSQL(
      `INSERT INTO ${tableName} (date, invoice_type, transaction_type, payment_type, finance, uid) VALUES( ${payments.date}, ${payments.invoiceType}, ${payments.transactionType}, ${payments.paymentType}, ${payments.finance}, ${payments.uid})`,
    );

  getPrevRecord = async (
    payments: TDailyPaymentModel,
  ): Promise<TDailyPaymentModel> => {
    const sql = `SELECT id,  finance from ${tableName} WHERE uid = ${payments.uid} AND  invoice_type= ${payments.invoiceType} AND transaction_type = ${payments.transactionType} AND date=${payments.date} AND payment_type=${payments.paymentType}`;
    const data = await executeSQL(sql);
    const result: TDailyPaymentModel = data?.[0]?.rows?.item(0);
    return result;
  };

  processNewPayment = async (payment: TDailyPaymentModel) => {
    const oldInstance = await this.getPrevRecord(payment);
    if (oldInstance) {
      const finance = __round(__add(oldInstance.finance, payment.finance), 2);
      const sql = `UPDATE ${tableName} SET finance = ${finance}  WHERE id=${oldInstance.id}`;
      const data = await executeSQL(sql);
      return data[0].rows.item(0);
    }
    const data = await this.insertNewData(payment);
    return data[0].rows.item(0);
  };

  getInstanceByDateUid  = async (date: number, uidId:  number) => {
    const data = await executeSQL(
      `SELECT * FROM ${tableName} WHERE date = ${date} and uid = ${uidId}`,
    );
    return  data?.[0]?.rows?.raw();
  }
}

const instance = new DailyPayment();
export default instance;
