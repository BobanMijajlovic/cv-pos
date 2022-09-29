import React, {useMemo, useState, useCallback} from 'react';
import {TInputProps} from './d';
import Input from './index';
import {TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import style from 'src/components/input/style';
import {Colors} from 'src/constants/Colors';

export const InputPassword = (props: TInputProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisible = useCallback(() => {
    setIsVisible(v => !v);
  }, [setIsVisible]);

  const PasswordIcon = useMemo(() => {
    const iconName = isVisible ? 'eye-off-outline' : 'eye-outline';
    return (
      <TouchableOpacity onPress={toggleVisible}>
        <IonIcon
          name={iconName}
          size={20}
          color={props.error ? Colors.PALETTE.RED._900 : undefined}
        />
      </TouchableOpacity>
    );
  }, [props.error, isVisible, toggleVisible]);

  return (
    <Input {...props} iconRight={PasswordIcon} secureTextEntry={!isVisible} />
  );
};

export default InputPassword;
