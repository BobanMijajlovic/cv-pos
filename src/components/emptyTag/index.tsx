import React, {useMemo} from 'react';
import {Text, View} from 'react-native';
import {TEmptyTagProps} from 'src/components/emptyTag/d';
import {__get} from 'src/util/lodash';
import {max} from 'lodash';
import style from 'src/components/emptyTag/style';

export const EmptyTag = ({
  model,
  field,
  placeholder,
  format,
  maxLength,
  textStyle,
  rootStyle,
}: TEmptyTagProps) => {
  const data = useMemo(() => {
    let value = __get(model, field);
    if (!value) {
      return undefined;
    }
    if (format) {
      return format(`${value}`);
    }
    if (maxLength) {
      return `${value}`.substring(0, maxLength);
    }
    return value;
  }, [model, field, format, maxLength]);

  return (
    <View style={rootStyle}>
      {!data && placeholder ? (
        <Text style={[style.placeholderText, textStyle]}>{placeholder}</Text>
      ) : (
        <Text style={textStyle}>{data}</Text>
      )}
    </View>
  );
};

export default EmptyTag;
