import {useSunmiPrinter} from 'src/hooks/sunmi/useSunmiPrinter';
import {DEVICE_NEXGO} from 'src/config';
import {TReceiptStringData} from 'src/printer/d';
import {NativeModules} from 'react-native';

export const usePrinter = () => {
  const {
    printReceipt: _printReceipt,
    lineWrap,
    printQRCode,
  } = useSunmiPrinter();
  if (!DEVICE_NEXGO) {
    const printReceipt = async (result: TReceiptStringData) => {
      const useQRCode = false;
      const printStringArray = result.journal.split('\r\n');
      await _printReceipt(printStringArray);
      useQRCode && (await printQRCode(result.verificationUrl));
      await lineWrap(3);
    };
    return {
      printReceipt,
    };
  } else {
    const {PrinterModule} = NativeModules;
    const fontSize = 20;
    const printReceipt = async (result: TReceiptStringData) => {
      try {
        //const verificationUrl = result.verificationUrl;
        let printStringArray = result.journal.split('\r\n');

        PrinterModule.hwtPrintLines(
          printStringArray.slice(0, 10),
          fontSize,
          'LEFT',
          false,
        );

        PrinterModule.hwtPrintLines(
          printStringArray.slice(11, -1),
          fontSize,
          'LEFT',
          false,
        );

        if (result.verificationUrl) {
          PrinterModule.hwtPrintQRCode(
            result.verificationUrl,
            384,
            22,
            2,
            'CENTER',
          );
        }
        PrinterModule.hwtPrintLines(
          printStringArray.slice(-1),
          fontSize,
          'LEFT',
          false,
        );
        PrinterModule.hwtStartPrint();
      } catch (e) {
        console.log('error nexgo print ', e);
      }
    };

    return {
      printReceipt,
    };
  }
};
