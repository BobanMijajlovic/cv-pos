import {ReceiptPayingType} from '../../store/Receipt/d';
import {TButtonEvent} from '../../components/keyboard/d';

export type TPayingTypeProps = {
  type: ReceiptPayingType;
  value: number;
  label: string;
  icon?: string;
};

export type TAdvancePart = {
  isAdvance: boolean;
};

export type TPayingInternContext = {
  isMoney: boolean;
  showMoneyKeyboard: () => void;
  handlerAdvance: (d: boolean) => void;
  payValue: string;
  handlerPayValue: ({key}: TButtonEvent) => void;
  reset: () => void;
  addMoney: ({key}: TButtonEvent) => void;
  moneyPaying: TQuickMoneyPaying[];
  moneyPayingTotal: number;
  canFinish: boolean;
  advance?: TAdvancePart;
  change?: number;
  isAdvanceReceipt?: boolean;
  receiptTotal: number;
  financePayed: number;
};

export type TQuickMoneyPaying = {
  value: number;
  counter: number;
  finance: number;
};
