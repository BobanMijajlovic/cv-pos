import {createSelector} from 'reselect';
import {TReduxState} from 'src/store/d';
import {TClientState} from 'src/store/Client/d';

export const _selectorClientGetSelected = createSelector(
  (state: TReduxState): TClientState => state.client,
  client => client?.selected,
);
