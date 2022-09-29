import {
  SeparatorLine,
  SERBIAN_LABELS,
  TEMPLATE,
  TEMPLATE_PAYING,
  TReceiptStringData,
} from './d';
import {
  formatDateString,
  formatFooterPrintString,
  formatHeaderItemPrintString,
  formatHeaderPrintString,
  formatItemPrintString,
  formatPayingString,
  formatPrintTextCenter,
  formatSeparatorLine,
  formatTotalReceipt,
  formatTotalTaxReceipt,
  formatVatsHeaderPrintString,
  formatVatsPrintString,
} from './helpers';
import {__add, __flatten, __pick, __round} from '../util/lodash';
import {DEVICE_NEXGO} from 'src/config';
import {useSunmiPrinter} from 'src/hooks/sunmi/useSunmiPrinter';
import {NativeModules} from 'react-native';

const dateFormat = {
  local: 'fr-FR',
  useHours24: false,
  showDate: true,
  showTime: true,
  timeFormatSS: true,
  fullYearFormat: true,
};

export const receiptStringPrint = (
  data: TReceiptStringData,
  printerChars = 32,
) => {
  const {
    Items: items,
    totalAmount,
    Payment: payment,
    taxItems,
    sdcDateTime,
    invoiceNumber,
    invoiceCounter,
  } = data;

  const vatsProps = {
    using: true,
    maxLenNumbers: 1,
    maxLenChars: 1,
  };

  const startFiscalReceiptString = formatPrintTextCenter(
    SERBIAN_LABELS.FISCAL_RECEIPT,
    SeparatorLine.double,
    printerChars,
  );
  const header = formatHeaderPrintString(
    __pick(data, [
      'tin',
      'locationName',
      'businessName',
      'address',
      'district',
    ]),
    printerChars,
  );
  const stringInvoiceType = formatPrintTextCenter(
    SERBIAN_LABELS.TRAFFIC_SALE,
    SeparatorLine.single,
    printerChars,
  );
  const itemsTitle = formatPrintTextCenter(
    SERBIAN_LABELS.ARTICLES,
    SeparatorLine.none,
    printerChars,
  );
  const itemsSeparatorLine = formatSeparatorLine(
    SeparatorLine.double,
    printerChars,
  );
  const itemsHeader = formatHeaderItemPrintString(
    TEMPLATE[0].header,
    {
      name: SERBIAN_LABELS.ITEM_NAME,
      total: SERBIAN_LABELS.TOTAL,
      price: SERBIAN_LABELS.PRICE,
      quantity: SERBIAN_LABELS.QTY,
    },
    printerChars,
  );
  const _items = __flatten(
    items.map(i =>
      formatItemPrintString(TEMPLATE[0].temp, i, printerChars, vatsProps),
    ),
  );
  const itemsAfterSeparator = formatSeparatorLine(
    SeparatorLine.single,
    printerChars,
  );
  const totalPrint = formatTotalReceipt(totalAmount, printerChars);
  const payments = __flatten(
    payment.map(p =>
      formatPayingString(
        TEMPLATE_PAYING[0].temp,
        p.Amount,
        p.PaymentType,
        printerChars,
      ),
    ),
  );
  const paymentSeparator = formatSeparatorLine(
    SeparatorLine.double,
    printerChars,
  );

  const vatsHeader = formatVatsHeaderPrintString(
    {
      format: SERBIAN_LABELS.MARK,
      name: SERBIAN_LABELS.TAX_NAME,
      taxValue: SERBIAN_LABELS.TAX_VALUE,
      net: SERBIAN_LABELS.TAX_FINANCE,
    },
    printerChars,
    vatsProps,
  );
  const vats = __flatten(
    taxItems.map(vat => formatVatsPrintString(vat, printerChars, vatsProps)),
  );
  const vatsSeparator = formatSeparatorLine(SeparatorLine.single, printerChars);
  const totalTaxItemsRate = __round(
    taxItems.reduce((acc: any, x) => __add(acc, x.amount), 0),
    2,
  );
  const totalTaxFinancePrint = formatTotalTaxReceipt(
    totalTaxItemsRate,
    printerChars,
  );
  const totalTaxSeparator = formatSeparatorLine(
    SeparatorLine.double,
    printerChars,
  );
  const footerPrint = formatFooterPrintString(
    {
      pfrDateTime: formatDateString(dateFormat, new Date(sdcDateTime)),
      pfrReceiptNumber: invoiceNumber,
      receiptNumber: invoiceCounter,
    },
    printerChars,
  );
  const footerSeparator = formatSeparatorLine(
    SeparatorLine.double,
    printerChars,
  );

  /** * QR CODE PART */

  const endFiscalReceiptString = formatPrintTextCenter(
    SERBIAN_LABELS.END_FISCAL_RECEIPT,
    SeparatorLine.double,
    printerChars,
  );

  return {
    printStringArray: [
      ...startFiscalReceiptString,
      ...header,
      ...stringInvoiceType,
      ...itemsTitle,
      itemsSeparatorLine,
      ...itemsHeader,
      ..._items,
      itemsAfterSeparator,
      ...totalPrint,
      ...payments,
      paymentSeparator,
      ...vatsHeader,
      ...vats,
      vatsSeparator,
      ...totalTaxFinancePrint,
      totalTaxSeparator,
      ...footerPrint,
      footerSeparator,
      //...endFiscalReceiptString,
    ],
    endReceiptString: endFiscalReceiptString,
  };
};

