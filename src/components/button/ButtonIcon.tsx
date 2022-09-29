import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ButtonFill, ButtonType, TButtonIcon} from './d';
import {styles} from './styles';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from 'src/constants/Colors';

const ButtonIcon = ({
  type,
  onPress,
  fill = ButtonFill.CLEAR,
  color = Colors.PALETTE.BLUE._700,
  rootStyle = {},
  iconStyle = {},
  icon,
  round = true,
  disabled,
  forwardedRef,
}: TButtonIcon) => {
  const isOutline = fill === ButtonFill.OUTLINE;
  const isSolid = fill === ButtonFill.SOLID;
  const isClear = fill === ButtonFill.CLEAR;
  const isColorDefined = !!color;
  const isRound = round;

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View
        ref={forwardedRef}
        testID={'button-icon-test'}
        style={[
          styles.iconButtonRoot,
          isRound && styles.buttonRound,
          type && styles[type || ButtonType.primary],
          fill && styles[fill || ButtonFill.SOLID],
          isColorDefined && isOutline && {borderColor: color},
          isColorDefined && isSolid && {backgroundColor: color},
          disabled && styles.disabled,
          rootStyle,
        ]}>
        <FontAwesome5Icon
          name={icon}
          style={[
            styles.iconButtonIcon,
            isSolid && {color: Colors.WHITE},
            isOutline && {color: color},
            isColorDefined && isClear && {color: color},
            disabled && {color: Colors.PALETTE.GRAY._400},
            iconStyle,
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

export default React.forwardRef(
  (
    props: Pick<TButtonIcon, Exclude<keyof TButtonIcon, 'forwardedRef '>>,
    ref,
  ) => {
    return <ButtonIcon {...props} forwardedRef={ref} />;
  },
);

///8export default ButtonIcon;
