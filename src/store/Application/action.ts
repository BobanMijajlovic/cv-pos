import {
  TProgress,
  TActionEvent
} from 'src/store/Application/d';
import {
  APPLICATION_SET_PROGRESS,
  APPLICATION_OPEN_CLOSE_DRAWER,
  APPLICATION_SET_USER,
  APPLICATION_RESET_USER,
  APPLICATION_SET_CARD_PIN,
  APPLICATION_OPEN_KEYBOARD_SIMULATION,
  APPLICATION_TOGGLE_KEYBOARD_SIMULATION,
} from 'src/store/Application/types';
import { TUserModel } from 'src/database/d';

export const _actionApplicationSetProgress = (
  progress: TProgress,
): TActionEvent => ({
  type: APPLICATION_SET_PROGRESS,
  payload: progress,
});

export const _actionApplicationOpenCloseDrawer = (): TActionEvent => ({
  type: APPLICATION_OPEN_CLOSE_DRAWER,
});

export const _actionApplicationToggleKeyboardSimulation = (): TActionEvent => ({
  type: APPLICATION_TOGGLE_KEYBOARD_SIMULATION
})

export const _actionApplicationOpenKeyboardSimulation = (payload: boolean): TActionEvent => ({
  type: APPLICATION_OPEN_KEYBOARD_SIMULATION,
  payload
})

export const _actionApplicationSetUser = (user: TUserModel): TActionEvent => ({
  type: APPLICATION_SET_USER,
  payload: user,
});

export const _actionApplicationResetUser = (): TActionEvent => ({
  type: APPLICATION_RESET_USER,
});

export const _actionApplicationSetCard = (pin: string): TActionEvent => ({
  type: APPLICATION_SET_CARD_PIN,
  payload: pin,
});
