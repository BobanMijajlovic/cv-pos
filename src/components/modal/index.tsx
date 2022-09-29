import React, {useState, useEffect, useCallback} from 'react';
// @ts-ignore
import {Modal, View} from 'react-native';
import style from 'src/components/modal/style';
import {TModal} from 'src/components/modal/d';
import ButtonIcon from 'src/components/button/ButtonIcon';
import {ButtonFill} from 'src/components/button/d';
import {Colors} from 'src/constants/Colors';
import {iconFontAwesomeTimes} from 'src/icon';

const HWTModal = ({
  rootStyle,
  component: Component,
  visible = false,
  hideCloseIcon = false,
}: TModal) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setModalVisible(visible);
  }, [setModalVisible, visible]);

  const closeModal = useCallback(() => {
    setModalVisible(!visible);
  }, [setModalVisible, visible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={style.centeredView}>
        <View style={rootStyle || style.modalView}>
          {!hideCloseIcon && (
            <View style={style.modalCloseButtonRoot}>
              <ButtonIcon
                fill={ButtonFill.CLEAR}
                color={Colors.PALETTE.BLUE._700}
                icon={iconFontAwesomeTimes}
                onPress={closeModal}
                iconStyle={style.modalCloseIcon}
              />
            </View>
          )}
          <Component closeDialog={closeModal} />
        </View>
      </View>
    </Modal>
  );
};

export default HWTModal;
