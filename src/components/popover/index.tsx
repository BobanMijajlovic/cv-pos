import React, {useCallback} from 'react';
import styles from './style';
//@ts-ignore
import {Popover, usePopover} from 'react-native-modal-popover';
import {TPopover} from 'src/components/popover/d';
const HwtPopover = ({
  contentStyle,
  arrowStyle,
  backgroundStyle,
  placement,
  component: Component,
  componentRenderProps,
  onClose,
  children,
}: TPopover) => {
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

  const handlerClosePopover = useCallback(() => {
    onClose && onClose();
    closePopover();
  }, [onClose, closePopover]);

  return (
    <>
      {children(handlerOpenPopover, touchableRef)}
      <Popover
        placement={placement || 'bottom'}
        contentStyle={contentStyle || styles.content}
        arrowStyle={arrowStyle || styles.arrow}
        backgroundStyle={backgroundStyle || styles.background}
        visible={popoverVisible as boolean}
        onClose={handlerClosePopover}
        fromRect={popoverAnchorRect}
        supportedOrientations={['portrait', 'landscape']}>
        <Component closePopover={closePopover} {...componentRenderProps} />
      </Popover>
    </>
  );
};

export default HwtPopover;
