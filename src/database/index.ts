import * as ArticleTable from './Article';
import * as UserTable from './User';

import * as ClientTable from './clients';
import {init, insertRecord, selectById} from './db';
import {__random} from '../util/lodash';
import {UserPriority} from './d';
import DailyReport from '../database/DailyReport';
import DailyPayment from '../database/DailyPayment';
import DailyVat from 'src/database/DailyVat';
import TaxUser from 'src/database/TaxUser';
import UserFinance from 'src/database/UserFinance';
import {ArticleMeasureValues} from '..//constants/Article';

/** set this to true to reinit the database with 10000 articles, operation last and must wait for */
let reInit = false;

const createTestArticles = async (len = 1000) => {
  const articles = await ArticleTable.selectAll({});
  if (!articles?.rows.length) {
    const array = Array.from(Array(len).keys()).map(x => {
      const mes = Number(
        ArticleMeasureValues[__random(0, ArticleMeasureValues.length - 1)]
          .value,
      );
      return {
        barcode: `1${x}${(12345 * (x + 1)) % 1000000}`,
        description: `Article Test ${x + 1}`,
        price: 1.25 * (x + 1),
        vat: String.fromCharCode(65 + __random(0, 2)),
        mes,
      };
    });
    let arr = [];
    for (let i = 0; i < array.length; i++) {
      const art = array[i];
      try {
        arr.push(insertRecord(ArticleTable.tableName)(art));
        if (arr.length === 25) {
          await Promise.all(arr);
          arr = [];
        }
      } catch (e) {
        console.log(e);
      }
    }
    console.log('Init Base is done');
  }
};

const createTestUser = async () => {
  try {
    const user = await selectById(UserTable.tableName)(1);
    if (!user) {
      await insertRecord(UserTable.tableName)({
        fullName: 'Boban Mijajlovic',
        nickname: 'bobi1',
        pin: '1111',
        priority: UserPriority.ADMIN,
      });
    }
  } catch (e) {}
};

export const initDataBase = () => {
  (async () => {
    await init();
    if (reInit) {
      await ArticleTable.dropTable();
      await UserTable.dropTable();
      await DailyReport.dropTable();
      await DailyPayment.dropTable();
      await DailyVat.dropTable();
      await TaxUser.dropTable();
      await ClientTable.dropTable();
      await UserFinance.dropTable();
    }

    await ArticleTable.createTable();
    await UserTable.createTable();
    await DailyReport.createTable();
    await DailyPayment.createTable();
    await DailyVat.createTable();
    await TaxUser.createTable();
    await ClientTable.createTable();
    await UserFinance.createTable();
    const idTax = await TaxUser.getIdRecordValid('TEST22');
    await createTestUser();
    if (reInit) {
      await createTestArticles(10);
    }
  })();
};
