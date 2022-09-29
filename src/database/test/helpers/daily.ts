import {
  __random,
  __round,
  __multiply,
  __chain,
  __flatten,
  __reduce,
} from 'src/util/lodash';
import * as _ from 'lodash';
import {createLabelVal} from 'src/database/test/dailReport';
import {MILLISECONDS_PER_DAY} from 'src/util/utils';
import {
  getDailyReportByDateAndType,
  getPrevDailyByTypeCounter,
} from 'src/database/DailyReport';

export const createDailyInsertObj = async (date: number) => {
  return {
    date: new Date(Math.round(date * MILLISECONDS_PER_DAY)),
    type: __random(1, 2),
    vats: [...Array(__random(1, 3)).keys()].map(x => ({
      vat: createLabelVal(x),
      name: (Math.random() + 1).toString(36).substring(7),
      finance: __round(__random(100, 250), 2),
    })),
  };
};

export const getPrevDailyOurData = async (date: number, insertObject: any) => {
  const daily = await getDailyReportByDateAndType(date, insertObject.type);
  const counter =
    (daily ? await getPrevDailyByTypeCounter(insertObject.type) : 0) + 1;

  const newVats = insertObject.vats.map((x: any) => ({
    date,
    type: insertObject.type,
    finance: __round(__multiply(x.finance, 100)),
    label: x.vat.label,
    name: x.name,
    vat: __round(__multiply(x.vat.value, 100)),
  }));

  if (!daily) {
    return {
      counter,
      date,
      type: insertObject.type,
      vats: newVats,
    };
  }

  const vats = __flatten(
    __chain([...daily.vats, ...newVats])
      .groupBy(['label', 'vat', 'name'])
      .map(value =>
        __reduce(
          value,
          (result: any, currentObject: any) => {
            const index = result.findIndex(
              (x: any) => x.label === currentObject.label,
            );
            if (index === -1) {
              return [
                ...result,
                {
                  ...currentObject,
                  finance: currentObject.finance,
                },
              ];
            }
            const arr = [...result];
            const prevObj = {
              ...arr[index],
              finance: _.add(arr[index].finance, currentObject.finance),
            };
            arr.splice(index, 1, prevObj);
            return arr;
          },
          [],
        ),
      )
      .value(),
  );

  return {
    date,
    type: insertObject.type,
    counter,
    vats,
  };
};

export const compareData = async (prevData: any, newData: any) => {
  if (prevData.counter !== newData.counter) {
    console.log(prevData, newData);
    throw Error('Counter not same');
  }

  if (prevData.type !== newData.type) {
    console.log(prevData, newData);
    throw Error('Type of receipt not same');
  }

  if (prevData.date !== newData.date) {
    console.log(prevData, newData);
    throw Error('Dates not same');
  }

  prevData.vats.forEach((v: any, key: number) => {
    const newV = newData.vats.find(
      (vN: any) => vN.label === v.label && vN.vat === v.vat,
    );
    if (!newV) {
      console.log(prevData, newData);
      throw Error('Vats not same length');
    }
    if (newV.vat !== v.vat) {
      console.log(prevData, newData);
      throw Error(`Vats not same in - key ${key}     -  ${JSON.stringify(v)}`);
    }

    if (newV.finance !== v.finance) {
      console.log(prevData, newData);
      throw Error(
        `Vats finance not same in - key ${key}     -  ${JSON.stringify(v)}`,
      );
    }

    if (newV.name !== v.name) {
      throw Error(
        `Vats name not same in - key ${key}     -  ${JSON.stringify(v)}`,
      );
    }
  });
};
