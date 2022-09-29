import React, {useCallback, useMemo, useState} from 'react';
import {Text, View} from 'react-native';
import style from 'src/screens/initEsdc/style';
import {
  iconFontAwesomeCheck,
  iconFontAwesomeCogs,
  iconFontAwesomeSearch,
  iconFontAwesomeSpinner,
  iconFontAwesomeTimesCircle,
} from 'src/icon';
import {Translate} from 'src/translate/data';
import {ButtonFill} from 'src/components/button/d';
import {Colors} from 'src/constants/Colors';
import {useProgress} from 'src/hooks/progress/useProgress';
import useLPFRFunctions from 'src/hooks/useLPFR/useLPFRFunctions';
import Button from 'src/components/button';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {LAST_ACTIONS} from 'src/store/Receipt/d';
import Spin from 'src/components/animated/Spin';
import {DashboardNavName} from 'src/navigation/d';
import {useNavigation} from '@react-navigation/native';

enum InitState {
  init = 0,
  progress = 1,
  success = 2,
  error = 3,
}

type TInitEsdc = {
  state: InitState;
  title: string;
};

const InitEsdc = () => {
  const {navigate} = useNavigation();
  const {notifyStatus} = useLPFRFunctions();
  const [state, setState] = useState({
    state: InitState.init,
    title: Translate.TR_INIT_ESDC_TEXT,
  } as TInitEsdc);

  const changeState = useCallback(
    (state: InitState, title?: string) => {
      setState(s => {
        return {
          ...s,
          state,
          title: title ? title : s.title,
        };
      });
    },
    [setState],
  );

  const onPressHandler = useCallback(async () => {
    changeState(InitState.progress);
    try {
      await notifyStatus();
    } catch (e) {
      changeState(InitState.error, Translate.TR_INIT_ESDC_ERROR_TITLE);
    } finally {
      changeState(InitState.success, Translate.TR_INIT_ESDC_SUCCESS_TITLE);
      setTimeout(() => navigate(DashboardNavName), 1000);
    }
  }, [changeState, notifyStatus, navigate]);

  const [icon, iconStyle] = useMemo(() => {
    switch (state.state) {
      case InitState.progress:
        return [iconFontAwesomeSpinner, style.iconInit];
      case InitState.error:
        return [iconFontAwesomeTimesCircle, style.iconDanger];
      case InitState.success:
        return [iconFontAwesomeCheck, style.iconSuccess];
      default:
        return [iconFontAwesomeCogs, style.iconInit];
    }
  }, [state]);

  return (
    <View style={style.root}>
      <View style={style.listContainer}>
        {state.state === InitState.progress ? (
          <Spin
            start={state.state === InitState.progress}
            end={state.state !== InitState.progress}
            style={style.iconContainer}>
            <FontAwesome5Icon name={icon} style={[style.icon, iconStyle]} />
          </Spin>
        ) : (
          <FontAwesome5Icon name={icon} style={[style.icon, iconStyle]} />
        )}
        <Text style={style.containerText}>{state.title}</Text>
      </View>
      <View style={style.confirmButtonContainer}>
        <Button
          title={Translate.TR_INIT_ESDC_BUTTON_LABEL}
          onPress={onPressHandler}
          fill={ButtonFill.OUTLINE}
          disabled={state.state === InitState.progress}
          rootStyle={style.buttonConfirm}
          titleStyle={style.buttonConfirmText}
          color={Colors.PALETTE.BLUE._900}
        />
      </View>
    </View>
  );
};

export default InitEsdc;
