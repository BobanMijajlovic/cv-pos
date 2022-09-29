import {CLIENT_SET_SELECTED, CLIENT_REMOVE} from 'src/store/Client/types';

export type TClient = {
  id?: number;
  name: string;
  tin: string;
  uniqueCompanyNumber?: string;
  city?: string;
  street?: string;
  zipCode?: string;
};

export type TClientState = {
  selected?: TClient;
};

export type TActionEvent = {
  type: typeof CLIENT_SET_SELECTED | typeof CLIENT_REMOVE;
  payload?: undefined | TClient | number;
};
