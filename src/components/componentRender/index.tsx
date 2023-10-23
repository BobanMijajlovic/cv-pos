import React, {useMemo} from 'react';
import {View, Text, ViewStyle, StyleProp} from 'react-native';
import {
  TComponentRenderProps,
  ComponentJustify,
  ComponentDirection,
} from 'src/components/componentRender/d';
import style from 'src/components/componentRender/style';
import {isNumber} from 'lodash';
import {__isString} from 'src/util/lodash';

const ComponentRender = ({
  label,
  value,
  placeholder,
  direction = ComponentDirection.ROW,
  justify = ComponentJustify.BETWEEN,
  fullWidth = true,
  labelStyle = {},
  valueStyle = {},
}: TComponentRenderProps) => {
  const _justify = useMemo((): StyleProp<ViewStyle> => {
    switch (justify) {
      case ComponentJustify.CENTER:
        return {justifyContent: 'center'};
      case ComponentJustify.BETWEEN:
        return {justifyContent: 'space-between'};
      case ComponentJustify.AROUND:
        return {justifyContent: 'space-around'};
      case ComponentJustify.END:
        return {justifyContent: 'flex-end'};
      default:
        return {justifyContent: 'flex-start'};
    }
  }, [justify]);

  const _direction = useMemo((): StyleProp<ViewStyle> => {
    switch (direction) {
      case ComponentDirection.COLUMN:
        return {flexDirection: 'column'};
      default:
        return {flexDirection: 'row'};
    }
  }, [direction]);

  const isNode = useMemo(() => !isNumber(value) && !__isString(value), [value]);

  return (
    <View style={[style.root, _justify, _direction, fullWidth && {flex: 1}]}>
      <View style={style.labelRoot}>
        <Text style={[style.labelText, labelStyle]}>{label}</Text>
      </View>
      {isNode ? (
        value
      ) : (
        <View style={style.valueRoot}>
          <Text style={valueStyle}>
            {value ? value : placeholder ? placeholder : ''}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ComponentRender;
