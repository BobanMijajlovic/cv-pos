import React, {useCallback} from 'react';
import {View} from 'react-native';
import styles from './style';
//@ts-ignore
import {Popover, usePopover} from 'react-native-modal-popover';
import ButtonIcon from 'src/components/button/ButtonIcon';
import {TPopoverIcon} from 'src/components/popover/d';
import style from 'src/navigation/style';

const PopoverIcon = ({
  icon,
  iconStyle,
  contentStyle,
  arrowStyle,
  backgroundStyle,
  component: Component,
  componentRenderProps,
  placement,
}: TPopoverIcon) => {
  const {
    openPopover,
    closePopover,
    popoverVisible,
    touchableRef,
    popoverAnchorRect,
  } = usePopover();

  const handlerOpenPopover = useCallback(() => {
    openPopover();
  }, [openPopover]);

  return (
    <>
      <ButtonIcon
        onPress={handlerOpenPopover}
        icon={icon}
        ref={touchableRef}
        iconStyle={iconStyle || [style.navigationTin, style.navigateUserIcon]}
      />
      <Popover
        placement={placement || 'bottom'}
        contentStyle={contentStyle || styles.content}
        arrowStyle={arrowStyle || styles.arrow}
        backgroundStyle={backgroundStyle || styles.background}
        visible={popoverVisible}
        onClose={closePopover}
        fromRect={popoverAnchorRect}
        supportedOrientations={['portrait', 'landscape']}>
        <Component {...componentRenderProps} closePopover={closePopover} />
      </Popover>
    </>
  );
};

export default PopoverIcon;
