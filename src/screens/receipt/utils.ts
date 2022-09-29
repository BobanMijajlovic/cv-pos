import {TReceiptItem} from 'src/store/Receipt/d';
import {__divide, __multiply, __round, __subtract} from 'src/util/lodash';

export const calculateItemPrice = (item: TReceiptItem) => {
  let price = __round(item.article.price, 2);
  if (item.discount) {
    price = __round(
      __divide(__multiply(price, __subtract(100, item.discount)), 100),
      2,
    );
  }
  return price;
};
