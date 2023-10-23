import {createSelector} from 'reselect';
import {TReduxState} from 'src/store/d';

export const _selectorProgress = createSelector(
  (state: TReduxState) => state.application,
  application => application.progress,
);

export const _selectorIsDrawerOpen = createSelector(
  (state: TReduxState) => state.application,
  application => application.isDrawerOpen,
);

export const _selectorApplicationUser = createSelector(
  (state: TReduxState) => state.application,
  application => application.user,
);

export const _selectorApplicationCardPin = createSelector(
  (state: TReduxState) => state.application,
  application => application.cardPin,
);

export const _selectorApplicationAboutSoftware = createSelector(
  (state: TReduxState) => state.application,
  application => application.aboutSoftware,
);

export const _selectorApplicationIsKeyboardSimulation = createSelector(
  (state: TReduxState) => state.application,
  application => application.isKeyboardSimulationOpen,
)
