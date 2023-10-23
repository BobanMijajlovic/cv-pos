import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ButtonFill, ButtonType, TButton} from './d';
import {styles} from './styles';
import {Colors} from 'src/constants/Colors';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const Button = ({
  type,
  title,
  onPress,
  fill = ButtonFill.SOLID,
  upperCase,
  bold,
  color,
  rootStyle = {},
  titleStyle = {},
  children,
  disabled,
  round = true,
  forwardedRef,
  icon,
  iconStyle,
}: Partial<TButton>) => {
  const isOutline = fill === ButtonFill.OUTLINE;
  const isSolid = fill === ButtonFill.SOLID;
  const isColorDefined = !!color;

  return (
    <TouchableOpacity ref={forwardedRef} onPress={onPress} disabled={disabled}>
      <View
        testID={'button-test'}
        style={[
          styles.root,
          type && styles[type || ButtonType.primary],
          fill && styles[fill || ButtonFill.SOLID],
          isColorDefined && isOutline && {borderColor: color},
          isColorDefined && isSolid && {backgroundColor: color},
          disabled && styles.disabled,
          round && styles.round,
          rootStyle,
        ]}>
        {icon && (
          <FontAwesome5Icon
            name={icon}
            style={[styles.iconButton, iconStyle]}
          />
        )}
        <Text
          testID={'button-title-test'}
          style={[
            styles.textPart,
            upperCase && {textTransform: 'uppercase'},
            bold && {fontWeight: 'bold'},
            isSolid && {color: Colors.WHITE},
            isColorDefined && !isSolid && {color: color},
            !!titleStyle && titleStyle,
          ]}>
          {children ? children : title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.forwardRef(
  (
    props: Pick<Partial<TButton>, Exclude<keyof TButton, 'forwardedRef '>>,
    ref,
  ) => {
    return <Button {...props} forwardedRef={ref} />;
  },
);
