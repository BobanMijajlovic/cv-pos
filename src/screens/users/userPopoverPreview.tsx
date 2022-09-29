import {TUserModel} from 'src/database/d';
import {View, Text} from 'react-native';
import {convertPriority} from 'src/util/utils';
import style from './style';
import * as React from 'react';
import {useCallback} from 'react';
import {_actionApplicationResetUser} from 'src/store/Application/action';
import {useDispatch} from 'react-redux';
import ButtonIcon from 'src/components/button/ButtonIcon';
import {ButtonFill} from 'src/components/button/d';
import {Colors} from 'src/constants/Colors';
import {iconFontAwesomeLogOut} from 'src/icon';
import {Translate} from 'src/translate/data';
import ComponentRender from 'src/components/componentRender';
import {ComponentDirection} from 'src/components/componentRender/d';

const UserPopoverPreview = ({nickname, fullName, priority}: TUserModel) => {
  const dispatch = useDispatch();
  const logOutUser = useCallback(() => {
    dispatch(_actionApplicationResetUser());
  }, [dispatch]);

  return (
    <View>
      <View style={style.previewHeaderContainer}>
        <Text style={style.previewHeaderText}>
          {Translate.TR_USER_POPOVER_PREVIEW_DATA}
        </Text>
      </View>
      <View style={style.previewContentContainer}>
        <ComponentRender
          label={Translate.TR_USER_POPOVER_PREVIEW_USER_NAME_LABEL}
          labelStyle={style.previewLabelText}
          value={nickname}
          valueStyle={style.previewTextStyle}
          direction={ComponentDirection.COLUMN}
        />

        <ComponentRender
          label={Translate.TR_USER_POPOVER_PREVIEW_NAME_AND_LAST_NAME_LABEL}
          labelStyle={style.previewLabelText}
          value={fullName}
          valueStyle={style.previewTextStyle}
          direction={ComponentDirection.COLUMN}
        />

        <ComponentRender
          label={Translate.TR_USER_POPOVER_PREVIEW_TYPE}
          labelStyle={style.previewLabelText}
          value={convertPriority(priority)}
          valueStyle={style.previewTextStyle}
          direction={ComponentDirection.COLUMN}
        />
      </View>
      <View style={style.logoutIconRoot}>
        <ButtonIcon
          fill={ButtonFill.CLEAR}
          color={Colors.PALETTE.BLUE._700}
          icon={iconFontAwesomeLogOut}
          onPress={logOutUser}
          iconStyle={style.logoutIcon}
        />
      </View>
    </View>
  );
};

export default UserPopoverPreview;
