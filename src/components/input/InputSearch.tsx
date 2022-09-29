import React, {useEffect, useMemo, useState} from 'react';
import {TInputSearchProps} from 'src/components/input/d';
import Input from 'src/components/input/index';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import style from 'src/components/input/style';
import {View} from 'react-native';
import {iconFontAwesomeSearch, iconFontAwesomeTimesCircle} from 'src/icon';
import {Translate} from '../../translate/data';
import {__debounce} from 'src/util/lodash';

export const InputSearch = ({
  onChangeText,
  timeOutTrigger = 700,
  ...rest
}: TInputSearchProps) => {
  const [value, setValue] = useState<string>('');
  useEffect(() => {
    const data = __debounce(
      () => {
        onChangeText?.(value);
      },
      !value ? 1 : timeOutTrigger,
    );
    data();
    return () => {
      data.cancel();
    };
  }, [value, onChangeText, timeOutTrigger]);

  const onChange = (text: string): void => {
    setValue(text);
  };

  const handlerClear = () => {
    if (!value.length) {
      return;
    }
    setValue('');
  };
  const isActive = useMemo(() => value.length, [value]);
  return (
    <Input
      {...rest}
      value={value}
      onChangeText={onChange}
      iconLeft={
        <View style={[style.inputSearchIconRoot]}>
          <FontAwesome5Icon
            style={[style.inputSearchIcon]}
            name={iconFontAwesomeSearch}
          />
        </View>
      }
      iconRight={
        <View style={[style.inputSearchIconRoot]}>
          <FontAwesome5Icon
            style={[
              style.inputSearchIcon,
              !!isActive && style.inputSearchIconActive,
            ]}
            onPress={handlerClear}
            name={iconFontAwesomeTimesCircle}
          />
        </View>
      }
      placeholder={Translate.TR_INPUT_SEARCH_PLACEHOLDER}
    />
  );
};
