import {formatCurrencyQty, toNumberFixed} from 'src/util/utils';
import {
  useCallback,
  useMemo
} from "react";

export const useNumericKeyboard = () => {
  const processKeyboard = useCallback((
    key: string,
    currentValue: string,
    decimal = 2,
    maxValue?: number,
  ) => {
    let value = currentValue;
    const regex = /(.*)\.(.+)/.exec(currentValue);
    if (regex && regex.length && regex[2].length >= decimal) {
      value = '';
    }
    switch (key) {
      case 'C':
        value = '';
        break;
      default:
        if (!/^[0-9\.]*$/.test(key)) {
          break;
        }
        if (key === '.') {
          value = value.replace(/\./, '');
        }
        value = `${value}${key}`;
        break;
    }
    value = value.replace(/^0+/, '0');
    if (value === '0') {
      value = '0.';
    }

    const arr = value.split('.');
    if (arr.length === 2) {
      arr[1] = arr[1].slice(0, decimal);
      arr[0] = arr[0].replace(/^0+(.*)/, '$1');
      if (!arr[0]) {
        arr[0] = '0';
      }
      value = arr.join('.');
    } else {
      value = value.replace(/^0+(.*)/, '$1');
    }
    if (!value) {
      return '0';
    }
    if (maxValue) {
      const val = toNumberFixed(value);
      if (val > maxValue) {
        return formatCurrencyQty(`${maxValue}`, decimal);
      }
    }
    return value;
  },[]);

  const res = useMemo(()=> {
     return {
       processKeyboard
     }
  },[processKeyboard])

  return res;
};
