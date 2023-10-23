import {dateInDays} from 'src/util/utils';
import {
  getDailyReportByDateAndType,
  //insertReceipt,
} from 'src/database/DailyReport';
import {
  createDailyInsertObj,
  getPrevDailyOurData,
  compareData,
} from 'src/database/test/helpers/daily';

const createLabelVal = (value: number) => {
  switch (value) {
    case 1:
    case 4: {
      return {label: 'A', value: 10};
    }
    case 2:
    case 5: {
      return {label: 'B', value: 20};
    }
    default: {
      return {label: 'C', value: 30};
    }
  }
};
const doTest = async (daysCount = 5, receiptCount = 10) => {
  const date = new Date();
  const startDate = new Date(date.setDate(new Date().getDate() - daysCount));

  let dateInt = dateInDays(startDate);

  try {
    for (let i = 0; i < daysCount; i++) {
      for (let r = 0; r < receiptCount; r++) {
        /** create insert obj */
        const insertObj = await createDailyInsertObj(dateInt);
        /** get preview daily data */
        const prevDaily = await getPrevDailyOurData(dateInt, insertObj);
        /** insert new receipt */
       // await insertReceipt(insertObj.date, insertObj.type, insertObj.vats);
        /** get new daily data */
        const newDaily = await getDailyReportByDateAndType(
          dateInt,
          insertObj.type,
        );
        /** compare prev and new data */
        await compareData(prevDaily, newDaily);
        console.log('done');
      }
      /** increment dateInt */
      dateInt = dateInt + 1;
    }
    console.log('Test completed');
  } catch (e) {
    console.log(e);
  }
};

export {doTest, createLabelVal};
