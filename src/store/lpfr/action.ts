import {
  TAction,
  TLPFRStatusInfo,
  TLPFRStatusPayer,
  TLPFRStatusCriticErrors,
  TLPFRStatusSettings,
  TLPFRStatus,
  TLPFRReqError,
  TLPFREnvironment,
} from './d';
import {
  LPFR_PIN_VERIFIED,
  LPFR_SET_STATUS_INFO,
  LPFR_SET_IS_ALIVE,
  LPFR_CLEAR_ALL,
  LPFR_SET_STATUS_PAYER,
  LPFR_SET_STATUS_CRITIC_ERROR,
  LPFR_SET_STATUS_SETTINGS,
  LPFR_SET_STATUS_BASIC,
  LPFR_SET_IS_PIN_VERIFIED,
  LPFR_SET_THROW_ERROR,
  LPFR_SET_THROW_ERROR_CLEAR,
  LPFR_SET_ENVIRONMENT,
} from './types';

export const LPFRactionVerifyPing = (payload: string): TAction => ({
  type: LPFR_PIN_VERIFIED,
  payload,
});

export const LPFRactionSetStatusInfo = (payload: TLPFRStatusInfo) => ({
  type: LPFR_SET_STATUS_INFO,
  payload,
});

export const LPFRactionSetStatusPayer = (payload: TLPFRStatusPayer) => ({
  type: LPFR_SET_STATUS_PAYER,
  payload,
});

export const LPFRactionSetStatusCriticError = (
  payload: TLPFRStatusCriticErrors,
) => ({
  type: LPFR_SET_STATUS_CRITIC_ERROR,
  payload,
});

export const LPFRactionSetStatusSettings = (payload: TLPFRStatusSettings) => ({
  type: LPFR_SET_STATUS_SETTINGS,
  payload,
});

export const LPFRactionSetIsPinVerified = (payload: boolean) => ({
  type: LPFR_SET_IS_PIN_VERIFIED,
  payload,
});

export const LPFRactionSetStatus = (payload: TLPFRStatus) => ({
  type: LPFR_SET_STATUS_BASIC,
  payload,
});

export const LPFRactionSetIsAlive = (payload: string) => ({
  type: LPFR_SET_IS_ALIVE,
  payload,
});

export const LPFRactionThrowError = (payload: TLPFRReqError) => ({
  type: LPFR_SET_THROW_ERROR,
  payload,
});

export const LPFRactionThrowErrorClear = () => ({
  type: LPFR_SET_THROW_ERROR_CLEAR,
});

export const LPFRactionClearAll = (): TAction => ({
  type: LPFR_CLEAR_ALL,
});

/** ADDED ACTION */
export const LPFRactionSetEnvironment = (payload: TLPFREnvironment) => ({
  type: LPFR_SET_ENVIRONMENT,
  payload,
});
