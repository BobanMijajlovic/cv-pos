import {
  TStateApplication,
  TActionEvent,
  TProgress,
  TAboutSoftware,
} from 'src/store/Application/d';
import {
  APPLICATION_SET_PROGRESS,
  APPLICATION_OPEN_CLOSE_DRAWER,
  APPLICATION_SET_USER,
  APPLICATION_RESET_USER,
  APPLICATION_SET_CARD_PIN,
  APPLICATION_SET_ABOUT_SOFTWARE,
  APPLICATION_OPEN_KEYBOARD_SIMULATION,
  APPLICATION_TOGGLE_KEYBOARD_SIMULATION,
} from 'src/store/Application/types';
import { TUserModel } from 'src/database/d';
import { Translate } from 'src/translate/data';

const init = {
  progress: {
    isProgress: true,
    timer: 1000,
    text: 'Sacekajte...',
  },
  user: {
    id: 1,
    nickname: 'bobi',
    fullName: 'Boban Mijajlovic',
    priority: 3,
    pin: '1111',
  },
  aboutSoftware: {
    manufacturer: 'HWT',
    serialNumber: '0.0.0.1',
    softwareVersion: '0.0.0.1',
  },
  cardPin: '',
  isKeyboardSimulationOpen: false,
} as TStateApplication;

export default (
  state: TStateApplication = init,
  action: TActionEvent = {} as TActionEvent,
) => {
  switch (action.type) {
    case APPLICATION_OPEN_KEYBOARD_SIMULATION:
      return {
        ...state,
        isKeyboardSimulationOpen: !!action.payload
      }
    case APPLICATION_TOGGLE_KEYBOARD_SIMULATION:
      return {
        ...state,
        isKeyboardSimulationOpen: !state.isKeyboardSimulationOpen
      }
    case APPLICATION_SET_PROGRESS: {
      const {isProgress, timer, text} = action.payload as TProgress;
      return {
        ...state,
        progress: {
          isProgress,
          timer: timer ? Number(timer) : void 0,
          text: text ? text : `${Translate.TR_PLEASE_WAIT_TEXT}...`,
        },
      };
    }
    case APPLICATION_OPEN_CLOSE_DRAWER: {
      return {
        ...state,
        isDrawerOpen: !state.isDrawerOpen,
      };
    }

    case APPLICATION_SET_USER: {
      const user = action.payload as TUserModel;

      return {
        ...state,
        user,
      };
    }

    case APPLICATION_SET_ABOUT_SOFTWARE: {
      const aboutSoftware = action.payload as TAboutSoftware;

      return {
        ...state,
        aboutSoftware,
      };
    }

    case APPLICATION_RESET_USER: {
      return {
        ...state,
        user: undefined,
      };
    }

    case APPLICATION_SET_CARD_PIN: {
      return {
        ...state,
        cardPin: action.payload,
      };
    }

    default:
      return state;
  }
};
