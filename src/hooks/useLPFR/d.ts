export enum METHODS {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
}

export type TRequestParams = {
  host: string;
  port: string;
  endPoint: string;
  method: METHODS;
  headers: any;
  data: any;
};
