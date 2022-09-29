import {Translate} from 'src/translate/data';
import {UserPriority} from 'src/database/d';

export const UserPriorityTypes = [
  {
    label: Translate.TR_USER_PRIORITY_CASHIER_LABEL,
    value: UserPriority.CASHIER,
  },
  {
    label: Translate.TR_USER_PRIORITY_SUPER_ADMIN_LABEL,
    value: UserPriority.SUB_ADMIN,
  },
  {
    label: Translate.TR_USER_PRIORITY_ADMIN_LABEL,
    value: UserPriority.ADMIN,
  },
];
