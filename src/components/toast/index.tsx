import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {
  ToastPosition,
  ToastType,
  TToastModal,
  TToastProps,
} from 'src/components/toast/d';
import Toast from 'react-native-toast-message';
import {Translate} from 'src/translate/data';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {
  iconFontAwesomeCheck,
  iconFontAwesomeTimes,
  iconFontAwesomeTimesCircle,
} from 'src/icon';
import {Colors} from 'src/constants/Colors';

export const openToast = (toast: TToastModal) => {
  Toast.show({
    type: toast.type,
    text1: toast.title,
    text2: toast.message,
    autoHide: !!toast.autoHide || false,
    visibilityTime: toast.visibilityTime || 2000,
    topOffset: toast.topOffset || 15,
    position: toast?.position || ToastPosition.top,
    bottomOffset: toast.bottomOffset || 40,
    props: toast.props,
  });
};

export const HwtToast = ({
  title,
  message,
  icon,
  closeIcon,
  rootStyle,
  contentStyle,
  messageStyle,
  titleStyle,
  closeIconStyle,
  iconStyle,
  type = ToastType.success,
}: TToastProps) => {
  const isError = !!(type === ToastType.error);
  const isInfo = !!(type === ToastType.info);
  const isSuccess = !!(type === ToastType.success);

  return (
    <TouchableOpacity
      testID={'toastRoot'}
      style={[
        styles.root,
        styles.borderLeft,
        isError && {borderLeftColor: Colors.PALETTE.RED._900},
        isInfo && {borderLeftColor: Colors.PALETTE.LIGHT_BLUE._400},
        isSuccess && {borderLeftColor: Colors.PALETTE.LIGHT_BLUE._400},
        rootStyle,
      ]}
      //onPress={onPress}
    >
      {icon && (
        <TouchableOpacity
          testID="leadingIcon"
          style={[styles.leadingIconContainer, iconStyle]}
          //onPress={onLeadingIconPress}
          //activeOpacity={onLeadingIconPress ? activeOpacity : 1}
        >
          <FontAwesome5Icon
            style={[
              styles.leadingIcon,
              isError && styles.error,
              isInfo && styles.info,
              isSuccess && styles.success,
            ]}
            name={icon}
          />
        </TouchableOpacity>
      )}
      <View
        testID={'toast-content-container'}
        style={[styles.contentContainer, contentStyle]}>
        {title?.length && (
          <View style={styles.titleContainer}>
            <Text
              testID="title-text"
              style={[
                styles.titleText,
                isError && styles.error,
                isInfo && styles.info,
                isSuccess && styles.success,
                titleStyle,
              ]}>
              {title}
            </Text>
          </View>
        )}
        {message?.length && (
          <View style={styles.messageContainer}>
            <Text
              testID="message-text"
              style={[styles.messageText, messageStyle]}>
              {message}
            </Text>
          </View>
        )}
      </View>
      {closeIcon && (
        <TouchableOpacity
          testID="trailingIcon"
          style={[styles.closeIconContainer, closeIconStyle]}>
          <FontAwesome5Icon
            style={styles.leadingIcon}
            name={iconFontAwesomeTimes}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export const ToastDefinition = () => {
  const toastConfig = {
    success: ({text2, ...rest}: any) => (
      <HwtToast
        {...rest}
        title={Translate.TR_TOAST_SUCCESS_TITLE}
        message={text2}
        icon={iconFontAwesomeCheck}
      />
    ),

    error: ({text2, autoHide, ...rest}: any) => (
      <HwtToast
        {...rest}
        title={Translate.TR_TOAST_ERROR_TITLE}
        message={text2}
        icon={iconFontAwesomeTimesCircle}
        closeIcon={!!autoHide}
      />
    ),

    custom: ({Component, ...rest}: any) => <Component {...rest} />,
  };

  return <Toast config={toastConfig} ref={ref => Toast.setRef(ref)} />;
};

export default ToastDefinition;

export const errorToast = (message: string, visibilityTime = 3000) =>
  openToast({
    type: ToastType.error,
    message,
    autoHide: true,
    visibilityTime,
  });
