import {TClientState, TActionEvent} from 'src/store/Client/d';
import {CLIENT_SET_SELECTED, CLIENT_REMOVE} from 'src/store/Client/types';

const init = {} as TClientState;

export default (
  state: TClientState = init,
  action: TActionEvent = {} as TActionEvent,
) => {
  switch (action.type) {
    case CLIENT_SET_SELECTED: {
      return {
        ...state,
        selected: action.payload,
      };
    }
    case CLIENT_REMOVE: {
      return {
        ...state,
        selected: undefined,
      };
    }
    default:
      return state;
  }
};
