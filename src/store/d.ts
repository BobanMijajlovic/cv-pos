import {Dispatch} from 'redux';
import {TStateFiscal} from './Fiscal/d';
import {TStateApplication} from 'src/store/Application/d';
import {TReceiptState} from 'src/store/Receipt/d';
// @ts-ignore
import {TCardLockState} from 'src/store/CardLock/d';
import {TClientState} from 'src/store/Client/d';
import {TLPFRStore} from 'src/store/lpfr/d';

export type TReduxState = {
  fiscal: TStateFiscal;
  application: TStateApplication;
  receipt: TReceiptState;
  cardLock: TCardLockState;
  client: TClientState;
  lpfr: TLPFRStore;
};

export type TGetState = () => TReduxState;

export type TDispatch = Dispatch<any> | any;
