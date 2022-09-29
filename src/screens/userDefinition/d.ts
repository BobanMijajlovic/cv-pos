import {UserPriority} from 'src/database/d';

export type TUserDefinitionForm = {
  fullName: string;
  nickname: string;
  pin: number | string;
  priority?: UserPriority;
};

export type TUserDefinitionProps = {
  id?: number;
};
