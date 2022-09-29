import {createSelector} from 'reselect';
import {TReduxState as TReduxStore} from '../d';
import {
  INFO,
  TLPFRStatusInfo,
  TInfoLog,
  TLPFRConnection,
  TLPFRStore,
  TLPFRStatusPayer,
  TLPFRStatusSettings,
  TLPFRStatusCriticErrors,
  TLPFRStatus,
  TLPFRReqError,
  TLPFREnvironment,
} from './d';
import {__orderBy} from '../../util/lodash';

export type TTypeOrUndefined<T> = T | undefined;

export const _selectorLPFRStatusInfoByType1 = (type: INFO) =>
  createSelector(
    (state: TReduxStore) => state.lpfr.statusInfo,
    statusInfo => statusInfo.find(f => f.type === type),
  );

export const _selectorLPFRStatusInfoByType = createSelector(
  [state => state.lpfr.statusInfo, (state: TReduxStore, type: INFO) => type],
  (statusInfo: TLPFRStatusInfo, type): TTypeOrUndefined<TInfoLog> => {
    return statusInfo.find(f => f.type === type);
  },
);

export const _selectorLPFRConnectionData = createSelector(
  (state: TReduxStore): TLPFRConnection => state.lpfr.connection,
  connection => connection,
);

export const _selectorLPFRisAlive = createSelector(
  (state: TReduxStore): TLPFRStore => state.lpfr,
  lpfr => !!lpfr.isAlive,
);

export const _selectorLPFRPin = createSelector(
  (state: TReduxStore): TLPFRStore => state.lpfr,
  lpfr => lpfr.pin,
);

export const _selectorLPFRPStatusPayer = createSelector(
  (state: TReduxStore): TLPFRStatusPayer => state.lpfr.statusPayer,
  status => status,
);

export const _selectorLPFRPStatusSettings = createSelector(
  (state: TReduxStore): TLPFRStatusSettings => state.lpfr.statusSettings,
  status => status,
);

export const _selectorLPFRPStatusSettingsIsCorrect = createSelector(
  (state: TReduxStore): TLPFRStatusSettings => state.lpfr.statusSettings,
  status => status?.defaultInit !== 'YES',
);

export const _selectorLPFRPStatusIsCriticError = createSelector(
  (state: TReduxStore): TLPFRStatusCriticErrors =>
    state.lpfr.statusCriticErrors,
  status => !!status.length,
);

export const _selectorLPFRPStatusIsTaxPayer = createSelector(
  (state: TReduxStore): TLPFRStatusPayer => state.lpfr.statusPayer,
  status => !!status?.serialName,
);

export const _selectorLPFRPStatusIsSet = createSelector(
  (state: TReduxStore): Partial<TLPFRStatus> => state.lpfr.status,
  status => !!status?.uid,
);

export const _selectorLPFRIsPinVerified = createSelector(
  (state: TReduxStore): TLPFRStore => state.lpfr,
  lpfr => !!lpfr.isPinVerified,
);

export const _selectorLPFRIsPinRequired = createSelector(
  (state: TReduxStore): TLPFRStore => state.lpfr,
  lpfr => !!lpfr.status.isPinRequired,
);

export const _selectorLPFRIsError = createSelector(
  (state: TReduxStore): TLPFRReqError => state.lpfr.error,
  data => !!data?.modelState?.length,
);

export const _selectorLPFRIsEnvironment = createSelector(
  (state: TReduxStore): TLPFREnvironment => state.lpfr.environment,
  data => !!data?.organizationName,
);

/** * MINE SELECTOR **/
export const _selectorLPFRStatus = createSelector(
  (state: TReduxStore): Partial<TLPFRStatus> => state.lpfr.status,
  status => status,
);

export const _selectorLPFRCurrentTaxes = createSelector(
  (state: TReduxStore): Partial<TLPFRStatus> => state.lpfr.status,
  status => status.currentTaxRates,
);

export const _selectorLPFRPayer = createSelector(
  (state: TReduxStore): TLPFRStatusPayer => state.lpfr.statusPayer,
  status => status,
);

export const _selectorLPFRStatusCriticError = createSelector(
  (state: TReduxStore): TLPFRStatusCriticErrors =>
    state.lpfr.statusCriticErrors,
  status => status,
);

export const _selectorLPFRStatusInfo = createSelector(
  (state: TReduxStore): TLPFRStatusInfo => state.lpfr.statusInfo,
  status => status,
);

export const _selectorLPFREnvironment = createSelector(
  (state: TReduxStore): TLPFREnvironment => state.lpfr.environment,
  data => data,
);

export const _selectorLPFRError = createSelector(
  (state: TReduxStore): TLPFRReqError => state.lpfr.error,
  data => data,
);

export const _selectorLPFRValidTaxes = createSelector(
  (state: TReduxStore): Partial<TLPFRStatus> => state.lpfr.status,
  status => {
    const currentTime = new Date().getTime();
    const allTax = __orderBy(
      (status?.allTaxRates || [])
        .map(x => ({
          ...x,
          time: new Date(x.validFrom).getTime(),
        }))
        .filter(x => x.time <= currentTime),
      'time',
    );

    const tx = allTax.length
      ? allTax[allTax.length - 1]
      : status.currentTaxRates;
    return tx || {taxCategories: []};
  },
);

export const _selectorLPFRTaxUid = createSelector(
  (state: TReduxStore): string => state.lpfr.taxUid,
  data => data,
);
