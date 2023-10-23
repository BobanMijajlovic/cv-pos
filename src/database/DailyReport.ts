import {executeSQL, tablePragmaInfo} from './db';
import {
  TDailyPaymentModel,
  TDailyReportModel,
  TReceiptTypes,
  TDailyXReport,
  TPaymentReport,
  TVatReport,
} from 'src/database/d';
import {dateInDays} from 'src/util/utils';
import {isNumber} from 'lodash';
import {
  TAuditRequest,
  TInvoiceResponse,
  TTransactionType,
} from 'src/store/lpfr/d';
import DailyPayment from 'src/database/DailyPayment';
import DailyVat from 'src/database/DailyVat';
import TaxUser from 'src/database/TaxUser';
import {
  __omit,
  __orderBy,
  __add,
  __round,
  __multiply,
  __divide,
  __debounce,
} from 'src/util/lodash';
import UserFinance from 'src/database/UserFinance';

const tableName = 'daily_report';

class DailyReport {
  createTable = async () => {
    const fields = [
      'id INTEGER PRIMARY KEY AUTOINCREMENT',
      'date INTEGER NOT NULL',
      'invoice_type INTEGER NOT NULL',
      'transaction_type INTEGER NOT NULL',
      'uid INTEGER NOT NULL',
      'counter INTEGER DEFAULT 1',
    ];
    const createFields = fields.join(',');
    const sql =
      'CREATE TABLE IF NOT EXISTS ' + tableName + ' (' + createFields + ')';
    return executeSQL(sql);
  };

  tableInfo = async () => {
    return tablePragmaInfo(tableName);
  };

  dropTable = async () => {
    await executeSQL(`DROP TABLE IF EXISTS ${tableName}`);
  };

  getPrevRecord = async (
    dData: TDailyReportModel,
  ): Promise<TDailyReportModel> => {
    const sql = `SELECT id, counter from ${tableName} WHERE  invoice_type= ${dData.invoiceType} AND transaction_type = ${dData.transactionType}  AND date=${dData.date} AND uid=${dData.uid}`;
    const data = await executeSQL(sql);
    const result: TDailyReportModel = data?.[0]?.rows?.item(0);
    return result;
  };

  insertReceipt = async (
    date: Date,
    data: TAuditRequest & TInvoiceResponse,
    userId: number,
  ) => {
    try {
      const dateInt = dateInDays(date);
      const uid = data.requestedBy;

      const taxUserId = await TaxUser.getIdRecordValid(uid);
      const {transactionType, invoiceType} = data;
      const prevRecord = await this.getPrevRecord({
        transactionType,
        invoiceType,
        date: dateInt,
        uid: taxUserId,
      } as TDailyReportModel);

      if (prevRecord) {
        const cnt = prevRecord.counter + 1;
        const sql = `UPDATE ${tableName} SET counter = ${cnt}  WHERE id=${prevRecord.id}`;
        await executeSQL(sql);
      } else {
        const cnt = 1;
        await executeSQL(
          `INSERT INTO ${tableName} (date, invoice_type, transaction_type, uid, counter) VALUES( ${dateInt}, ${invoiceType}, ${transactionType}, ${taxUserId}, ${cnt})`,
        );
      }

      const taxs = data.taxItems || [];

      const receiptTypes = {transactionType, invoiceType};

      for (let i = 0; i < taxs.length; i++) {
        const t = taxs[i];
        await DailyVat.processNewVat(t, dateInt, receiptTypes, taxUserId);
      }

      const payments = data.payment;

      await UserFinance.processNewReceipt(
        dateInt,
        userId,
        data.totalAmount,
        receiptTypes,
        taxUserId,
      );

      for (let i = 0; i < payments.length; i++) {
        const pp = payments[i];
        const dd = {
          finance: pp.amount,
          paymentType: pp.paymentType,
          date: dateInt,
          ...receiptTypes,
          uid: taxUserId,
        } as TDailyPaymentModel;
        await DailyPayment.processNewPayment(dd);
      }
    } catch (e) {
      console.log('e', e);
    }
  };

  getInstanceByDateUid = async (date: number, uidId: number) => {
    const data = await executeSQL(
      `SELECT * FROM ${tableName} WHERE date = ${date} and uid = ${uidId}`,
    );
    return data?.[0]?.rows?.raw();
  };

  getDailyReportForOneDay = async (
    date: Date,
    UID: string,
  ): Promise<TDailyXReport> => {
    const dateInt = dateInDays(date);
    const uidId = await TaxUser.getIdRecordValid(UID);
    const [dailys, vats, payments] = await Promise.all([
      this.getInstanceByDateUid(dateInt, uidId),
      DailyVat.getInstanceByDateUid(dateInt, uidId),
      DailyPayment.getInstanceByDateUid(dateInt, uidId),
    ]);

    const paymentsFn = (types: TReceiptTypes): TPaymentReport => {
      const _payments = __orderBy(
        payments.filter(
          v =>
            v.invoice_type === types.invoiceType &&
            v.transaction_type === types.transactionType,
        ),
        'payment_type',
      );
      const total = __round(
        _payments.reduce((acc, x) => {
          return __add(acc, x.finance);
        }, 0),
        2,
      );

      return {
        total,
        payments: _payments,
      };
    };

    const vatsFn = (types: TReceiptTypes): TVatReport => {
      const _vats = __orderBy(
        vats.filter(
          v =>
            v.invoice_type === types.invoiceType &&
            v.transaction_type === types.transactionType,
        ),
        'label',
      ).map(v => ({
        ...v,
        rate: __round(__divide(v.rate, 100), 2),
        total: __round(
          __add(
            v.finance,
            __round(__divide(__multiply(v.finance, 10000), v.rate), 2),
          ),
          2,
        ),
      }));
      const total = __round(
        _vats.reduce((acc, x) => {
          return __add(acc, x.total);
        }, 0),
        2,
      );

      const totalTax = __round(
        _vats.reduce((acc, x) => {
          return __add(acc, x.finance);
        }, 0),
        2,
      );

      return {
        total,
        totalTax,
        vats: _vats,
      };
    };

    const dd = dailys.reduce((acc, daily) => {
      const tType = daily.transaction_type;
      const invType = daily.invoice_type;

      const types = {
        transactionType: tType,
        invoiceType: invType,
      };

      if (!acc[tType]) {
        acc = {
          ...acc,
          [tType]: {},
        };
      }
      acc[tType] = {
        ...acc[tType],
        [invType]: {
          counter: daily.counter,
          vats: vatsFn(types),
          payments: paymentsFn(types),
        },
      };

      return acc;
    }, {});

    return {
      date,
      uid: UID,
      ...dd,
    };
  };
}

const instance = new DailyReport();
export default instance;

/** return daily report with daily vats by type */
export const getDailyReportByDateAndType = async (
  date: number,
  type: TTransactionType,
) => {
  const data = await executeSQL(
    `SELECT * FROM ${tableName} WHERE date = ${date} and transaction_type = ${type}`,
  );
  const resultDaily = data?.[0]?.rows?.item(0);

  if (!resultDaily) {
    return null;
  }

  const vats = await DailyVat.getDailyVatsByTypeAndDate(type, date);
  return {
    ...__omit(resultDaily, ['transaction_type', 'invoice_type']),
    transactionType: resultDaily.transaction_type,
    invoiceType: resultDaily.invoice_type,
    vats,
  };
};

export const updateDailyIdCounter = async (id: number, counter: number) =>
  executeSQL(`UPDATE ${tableName} SET  counter = ${counter} WHERE id = ${id}`);

export const insertDailyByType = async (
  type: TTransactionType,
  counter: number,
  date: number,
) =>
  executeSQL(
    `INSERT INTO ${tableName} (date, transaction_type, counter) VALUES( ${date}, '${type}', ${counter})`,
  );

export const getPrevDailyByTypeCounter = async (type: TTransactionType) => {
  const data = await executeSQL(
    `SELECT counter  FROM ${tableName} WHERE transaction_type = ${type} ORDER BY id DESC LIMIT 1`,
  );
  return data?.[0]?.rows?.item(0).counter || 0;
};

export const getPrevDailyByDateTypeCounter = async (
  type: TTransactionType,
  date: number,
) => {
  const data = await executeSQL(
    `SELECT counter  FROM ${tableName} WHERE transaction_type = ${type} and date < ${date} ORDER BY id DESC LIMIT 1`,
  );
  return data?.[0]?.rows?.item(0) || 0;
};

/**
 *
 * @param date
 * @param type
 * @param vats
 */

export const getDailyReport = async (date: Date) => {
  const dateInt = dateInDays(date);
  const resultCnt = await Promise.all(
    Object.values(TTransactionType)
      .filter(dType => isNumber(dType))
      .map((type: any) => getPrevDailyByDateTypeCounter(type, dateInt)),
  );
  return (
    await Promise.all(
      Object.values(TTransactionType)
        .filter(dType => isNumber(dType))
        .map((type: any) => getDailyReportByDateAndType(dateInt, type)),
    )
  ).map((daily: any, index) => ({
    ...(daily || {}),
    prevCount: resultCnt[index],
  }));
};

/*** functions for reports */

export const getPeriodReportDetails = async (
  startDate: Date,
  endDate?: Date,
) => {
  const startDateInt = dateInDays(startDate);
  const endDateInt = dateInDays(endDate || startDate);

  const dataDaily =
    (
      await executeSQL(
        `SELECT * FROM ${tableName} WHERE date >= ${startDateInt} and date <=${endDateInt} ORDER BY date DESC`,
      )
    )?.[0].rows?.raw() || [];

  const dataVats =
    (await DailyVat.selectVatsPeriodDetail(startDateInt, endDateInt)) || [];

  return dataDaily
    .map(daily => ({
      ...daily,
      vats: dataVats?.filter(
        v =>
          v.transaction_type === daily.transaction_type &&
          v.date === daily.date,
      ),
    }))
    .reduce((acc, d) => {
      return {
        ...acc,
        [d.date]: {
          ...(acc[d.date] || {}),
          [d.transaction_type]: d,
        },
      };
    }, {});
};
