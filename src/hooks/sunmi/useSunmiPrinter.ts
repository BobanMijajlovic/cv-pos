// @ts-ignore
import SunmiInnerPrinter from 'react-native-sunmi-inner-printer';
import {SunmiTextAlign, TSunmiPrintText} from './d';
import {useNavigation} from '@react-navigation/native';
import {processError} from 'src/util/error';

export const useSunmiPrinter = () => {
  const sendBytes = async (data: any) => {
    await SunmiInnerPrinter.sendRAWData(data);
  };

  const resetAlignFont = async () => {
    await SunmiInnerPrinter.setAlignment(SunmiTextAlign.LEFT);
    //fontSize && (await SunmiInnerPrinter.setFont(36));
  };

  const printTextMy = async (data: TSunmiPrintText) => {
    const {text, align, fontSize, isOriginal} = data;
    align && (await SunmiInnerPrinter.setAlignment(align));
    //fontSize && (await SunmiInnerPrinter.setFont(fontSize));
    isOriginal
      ? await SunmiInnerPrinter.printOriginalText(text)
      : await SunmiInnerPrinter.printText(text);
    await resetAlignFont();
  };

  const printReceipt = async (data: string[]) => {
    try {
      await SunmiInnerPrinter.setFontSize(24);
      for (let i = 0; i < data.length; i++) {
        await SunmiInnerPrinter.printString(data[i]);
      }
      /*await SunmiInnerPrinter.printColumnsText(
        data,
        [...data.keys()].fill(1),
        [...data.keys()].fill(0),
      );*/
    } catch (error) {
      processError({
        error,
      });
    }
  };
  const lineWrap = async (wrap = 2) => {
    await SunmiInnerPrinter.lineWrap(wrap);
  };
  const printQRCode = async (string: string) => {
    await lineWrap(1);
    await SunmiInnerPrinter.setAlignment(SunmiTextAlign.LEFT);
    await SunmiInnerPrinter.printQRCode(string, 4, 3);
    await lineWrap(1);
    await resetAlignFont();
  };

  return {
    printReceipt,
    sendBytes,
    printTextMy,
    lineWrap,
    printQRCode,
  };
};
