import React, {useCallback, useMemo} from 'react';
import {TActionSheetProps} from './d';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {ActionSheetOptions} from '@expo/react-native-action-sheet/lib/typescript/types';
import {Platform} from 'react-native';

const isIOS = Platform.OS === 'ios';

const ActionSheet = ({
  children,
  items,
  icons,
  cancelButtonIndex,
  destructiveButtonIndex,
  title,
  message,
  anchor,
  tintIcons,
  showSeparators,
  textStyle = {},
  titleTextStyle = {},
  messageTextStyle = {},
  containerStyle = {},
  useModal,
}: {
  children?: (showActionSheet: () => void) => React.ReactNode;
} & TActionSheetProps) => {
  const {showActionSheetWithOptions} = useActionSheet();

  const options = useMemo(() => items.map(i => i.label), [items]);

  const actionSheetOptions = useMemo(
    () =>
      Object.assign(
        {
          options,
          cancelButtonIndex: cancelButtonIndex || items.length - 1,
          destructiveButtonIndex: destructiveButtonIndex,
          title: title || 'Choose An Action',
          message,
          icons,
        },
        !isIOS
          ? {
              tintIcons: tintIcons,
              showSeparators: showSeparators || true,
              textStyle,
              titleTextStyle,
              messageTextStyle,
              containerStyle,
              useModal,
            }
          : {
              anchor,
            },
      ),
    [
      options,
      cancelButtonIndex,
      items,
      icons,
      destructiveButtonIndex,
      title,
      message,
      tintIcons,
      showSeparators,
      textStyle,
      titleTextStyle,
      messageTextStyle,
      containerStyle,
      useModal,
      isIOS,
    ],
  ) as ActionSheetOptions;

  const actionSheetsButtonsCallBacks = useCallback(
    (buttonIndex: number) => {
      const item = items[buttonIndex];
      item && item.onPress && item.onPress();
    },
    [items],
  );

  const showActionSheet = useCallback(() => {
    showActionSheetWithOptions(
      actionSheetOptions,
      actionSheetsButtonsCallBacks,
    );
  }, [
    showActionSheetWithOptions,
    actionSheetsButtonsCallBacks,
    actionSheetOptions,
  ]);

  return <>{children && children(showActionSheet)}</>;
};

export default ActionSheet;
