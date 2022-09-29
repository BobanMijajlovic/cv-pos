import EscPosPrinter, {
  getPrinterSeriesByName,
} from 'react-native-esc-pos-printer';

const testPrint = async () => {
  try {
    console.log('pocetak');
    const printers = await EscPosPrinter.discover();

    const printer = printers[0];
    console.log(printers);

    await EscPosPrinter.init({
      target: printer.target,
      seriesName: getPrinterSeriesByName(printer.name),
    });

    const printing = new EscPosPrinter.printing();

    const status = await printing
      .initialize()
      .align('center')
      .initialize()
      .align('center')
      .size(6, 6)
      .line('DUDE!')
      .size(1, 1)
      .text('is that a ')
      .bold()
      .underline()
      .text('printer?')
      .bold()
      .underline()
      .newline(2)
      .align('center')
      .cut()
      .send();
  } catch (e) {
    console.log('Error:', e);
  }
};


export {testPrint};
