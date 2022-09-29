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
import {TUserModel} from 'src/database/d';

export type TProgress = {
  isProgress: boolean;
  timer?: number;
  text?: string;
};

export type TAboutSoftware = {
  manufacturer: string;
  serialNumber: string;
  softwareVersion: string;
};

export type TStateApplication = {
  progress: TProgress;
  isDrawerOpen: boolean;
  user?: TUserModel;
  aboutSoftware?: TAboutSoftware;
  cardPin?: string;
  isKeyboardSimulationOpen: boolean,
};

export type TActionEvent = {
  type:
    | typeof APPLICATION_SET_PROGRESS
    | typeof APPLICATION_OPEN_CLOSE_DRAWER
    | typeof APPLICATION_SET_USER
    | typeof APPLICATION_RESET_USER
    | typeof APPLICATION_OPEN_KEYBOARD_SIMULATION
    | typeof APPLICATION_TOGGLE_KEYBOARD_SIMULATION
    | typeof APPLICATION_SET_CARD_PIN
    | typeof APPLICATION_SET_ABOUT_SOFTWARE;
  payload?: boolean | number | string | TProgress | TUserModel | TAboutSoftware;
};
