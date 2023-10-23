import fs from 'fs';
import dataObject from './data';

export const PREFIX = '';

const generateFile = () => {
  const array = Object.keys(dataObject).map((key: string) => {
    return `export const ${key} = {\n  translate: '${PREFIX}${key}',\n  defaultValue: '${dataObject[key]}'\n}`;
  });
  fs.writeFileSync('translate/dd.ts', array.join('\n\n'));
};

generateFile();

const generateFileJson = () => {
  const array = Object.keys(dataObject).map((key: string) => {
    return `{\n  "key": "${PREFIX}${key}",\n  "translation": "${dataObject[key]}"\n},`;
  });
  fs.writeFileSync(
    'src/appionic/translate/rs_translate.json',
    `[\n${array.join('\n')}\n]`,
  );
};
