import {TClientModel} from "src/database/d";

export type TClientDefinitionForm = {
  name: string;
  tin: string;
  uniqueCompanyNumber: string;
  city: string;
  street: string;
  zipCode: string;
};

export type TClientDefinitionProps = {
  id?: number;
};
