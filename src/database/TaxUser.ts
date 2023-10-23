import {executeSQL} from 'src/database/db';

export const tableName = 'tax_user';

class TaxUser {
  createTable = async () => {
    const fields = [
      'id INTEGER PRIMARY KEY AUTOINCREMENT',
      'uid TEXT NOT NULL',
    ];
    const createFields = fields.join(',');
    const sql =
      'CREATE TABLE IF NOT EXISTS ' + tableName + ' (' + createFields + ')';
    return executeSQL(sql);
  };

  dropTable = async () => {
    await executeSQL(`DROP TABLE IF EXISTS ${tableName}`);
  };

  getRecord = async (uid: string) => {
    const sql = `SELECT id, uid from ${tableName} WHERE uid= '${uid}'`;
    const data = await executeSQL(sql);
    return data?.[0]?.rows?.item(0);
  };

  getIdRecordValid = async (uid: string) => {
    let instance = await this.getRecord(uid);
    if (instance) {
      return instance.id;
    }
    await executeSQL(`INSERT INTO ${tableName} (uid) VALUES( '${uid}')`);
    instance = await this.getRecord(uid);
    return instance.id;
  };
}

const instance = new TaxUser();
export default instance;
