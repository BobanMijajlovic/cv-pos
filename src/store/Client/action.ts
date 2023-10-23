import {TClient, TActionEvent} from 'src/store/Client/d';
import {CLIENT_SET_SELECTED, CLIENT_REMOVE} from 'src/store/Client/types';

export const _actionClientSetSelected = (client: TClient): TActionEvent => ({
  type: CLIENT_SET_SELECTED,
  payload: client,
});

export const _actionClientRemove = (): TActionEvent => ({
  type: CLIENT_REMOVE,
});
