import {useDispatch, useSelector} from 'react-redux';
import {_selectorLPFRConnectionData} from '../../store/lpfr/helpers';
import {useCallback, useMemo} from 'react';
import {
  LPFRactionSetEnvironment,
  LPFRactionSetIsAlive,
  LPFRactionSetIsPinVerified,
  LPFRactionSetStatus,
  LPFRactionSetStatusCriticError,
  LPFRactionSetStatusInfo,
  LPFRactionSetStatusPayer,
  LPFRactionSetStatusSettings,
  LPFRactionThrowError,
  LPFRactionThrowErrorClear,
  LPFRactionVerifyPing,
} from '../../store/lpfr/action';
import {METHODS, TRequestParams} from './d';
import axios from 'axios';
import {DEVICE_IP} from '../../config';

const DEFAULT_REQUEST_ID = '8939750258jfga87h4t8ijffs8ik34f89';

const __requestToLpfr = async ({
  host = `http://${DEVICE_IP}`,
  port = '5555',
  endPoint = 'notify-status',
  method = METHODS.GET,
  headers = {},
  data,
}: Partial<TRequestParams>) => {
  const url = `${host}:${port}/api/v3/${endPoint}`;
  return axios({
    url,
    method,
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Allow: '*',
      ...headers,
    },
    data,
  } as any);
};

const REQUEST_POINTS = {
  verifyPin: {
    method: METHODS.POST,
    endPoint: 'pin',
  },
  statusInfo: {
    method: METHODS.GET,
    endPoint: 'status/info',
  },
  statusPayer: {
    method: METHODS.GET,
    endPoint: 'status/payer',
  },
  statusCritic: {
    method: METHODS.GET,
    endPoint: 'status/critic',
  },
  statusErrors: {
    method: METHODS.GET,
    endPoint: 'status/error',
  },
  statusSettings: {
    method: METHODS.GET,
    endPoint: 'status/settings',
  },
  auditProof: {
    method: METHODS.PUT,
    endPoint: 'audits-send-proof',
  },
  auditSend: {
    method: METHODS.PUT,
    endPoint: 'audits-send',
  },
  statusBasic: {
    method: METHODS.GET,
    endPoint: 'status',
  },
  attentionPing: {
    method: METHODS.GET,
    endPoint: 'attention/payer',
  },
  environment: {
    method: METHODS.GET,
    endPoint: 'environment-parameters',
  },
  getSystemDirectoryData: {
    method: METHODS.GET,
    endPoint: 'get-system-directory-data',
  },
  getLastInvoice: {
    method: METHODS.GET,
    endPoint: 'invoices',
  },
  getLastProof: {
    method: METHODS.GET,
    endPoint: 'audits-last-proof',
  },
  notifyStatus: {
    method: METHODS.GET,
    endPoint: 'notify-status',
  },
  usbSyncFiles: {
    method: METHODS.POST,
    endPoint: 'usb-sync-files',
  },
  invoices: {
    method: METHODS.POST,
    endPoint: 'invoices',
  },
};

const useLPFRFunctions = () => {
  const dispatch = useDispatch();

  const connection = useSelector(_selectorLPFRConnectionData);
  const {port, host} = connection;
  const requestToLPFR = useCallback(
    async (request: Partial<TRequestParams>) => {
      try {
        const response = await __requestToLpfr({
          port,
          host,
          ...request,
        });
        if (response.status === 200) {
          //dispatch(LPFRactionThrowErrorClear());
          return response?.data;
        }
        //* * set last error to redux  , clear pin if error is pin etc...*/
        return undefined;
      } catch (e) {
        dispatch(LPFRactionSetIsAlive(''));
        if (e?.response?.data?.modelState) {
          dispatch(LPFRactionThrowError(e.response.data));
          return;
        }

        if (e?.response?.data) {
          dispatch(
            LPFRactionThrowError({
              modelState: [
                {
                  property: 'SECURE_ELEMENT',
                  errors: [`${e.response.data}`],
                },
              ],
            }),
          );
          return;
        }

        if (e?.message === 'Network Error') {
          dispatch(
            LPFRactionThrowError({
              modelState: [
                {
                  property: 'NETWORK ERROR',
                  errors: ['12000'],
                },
              ],
            }),
          );
          return;
        }

        dispatch(
          LPFRactionThrowError({
            modelState: [
              {
                property: 'UNKNOWN ERROR',
                errors: ['13000'],
              },
            ],
          }),
        );
      }
      return undefined;
    },
    [port, host, dispatch],
  );

  const attentionPing = useCallback(async () => {
    const data = await requestToLPFR(REQUEST_POINTS.attentionPing);
    dispatch(LPFRactionSetIsAlive(data?.tax || ''));
    dispatch(LPFRactionSetIsPinVerified(!!data?.isPin));
  }, [requestToLPFR, dispatch]);

  const verifyPin = useCallback(
    async (pin: string) => {
      dispatch(LPFRactionThrowErrorClear());
      const data = await requestToLPFR({
        ...REQUEST_POINTS.verifyPin,
        data: pin,
      });
      if (data === '0100') {
        dispatch(LPFRactionVerifyPing(pin));
        dispatch(LPFRactionThrowErrorClear());
        // successToast(Translate.VERIFY_PIN_SUCCESS_MSF)
      } else {
        dispatch(LPFRactionVerifyPing(''));
      }
    },
    [dispatch, requestToLPFR],
  );

  const setStatusPayer = useCallback(async () => {
    const data = await requestToLPFR(REQUEST_POINTS.statusPayer);
    if (!data) {
      return;
    }
    dispatch(LPFRactionSetStatusPayer(data));
  }, [requestToLPFR, dispatch]);

  const setStatusInfo = useCallback(async () => {
    const data = await requestToLPFR(REQUEST_POINTS.statusInfo);
    if (!data) {
      return;
    }
    const _data = (data || []).map((x: any) => ({
      ...x,
      time: new Date(x.time),
    }));
    dispatch(LPFRactionSetStatusInfo(_data));
  }, [dispatch, requestToLPFR]);

  const setStatusCritic = useCallback(async () => {
    const data = await requestToLPFR(REQUEST_POINTS.statusCritic);
    if (!data) {
      return;
    }
    const _data = (data?.critic || []).map((x: any) => ({
      ...x,
      time: new Date(x.time),
    }));
    dispatch(LPFRactionSetStatusCriticError(_data));
  }, [dispatch, requestToLPFR]);

  const setStatusSettings = useCallback(async () => {
    const data = await requestToLPFR(REQUEST_POINTS.statusSettings);
    if (!data) {
      return;
    }
    dispatch(LPFRactionSetStatusSettings(data));
  }, [dispatch, requestToLPFR]);

  const setStatus = useCallback(async () => {
    const data = await requestToLPFR(REQUEST_POINTS.statusBasic);
    if (!data) {
      return;
    }
    dispatch(LPFRactionSetStatus(data));
  }, [dispatch, requestToLPFR]);

  const getStatusErrors = useCallback(async () => {
    const data = await requestToLPFR(REQUEST_POINTS.statusErrors);
    return data?.errors || [];
  }, [requestToLPFR]);

  const sendInvoices = useCallback(
    async (invoice: any) => {
      dispatch(LPFRactionThrowErrorClear());
      const data = await requestToLPFR({
        ...REQUEST_POINTS.invoices,
        data: invoice,
      });
      return data;
    },
    [dispatch, requestToLPFR],
  );

  const sendAuditProof = useCallback(async () => {
    const data = await requestToLPFR(REQUEST_POINTS.auditProof);
    return data;
  }, [requestToLPFR]);

  const setEnvironment = useCallback(async () => {
    const data = await requestToLPFR(REQUEST_POINTS.environment);
    if (!data) {
      return;
    }
    dispatch(LPFRactionSetEnvironment(data));
  }, [dispatch, requestToLPFR]);

  const getDirectoryData = useCallback(
    async (path?: string) =>
      requestToLPFR({
        ...REQUEST_POINTS.getSystemDirectoryData,
        endPoint: `${REQUEST_POINTS.getSystemDirectoryData.endPoint}/${
          path ? `/${path}` : ''
        }`,
      }),
    [requestToLPFR],
  );

  const getLastInvoice = useCallback(
    async (requestId?: string) =>
      requestToLPFR({
        ...REQUEST_POINTS.getLastInvoice,
        endPoint: `${REQUEST_POINTS.getLastInvoice.endPoint}${
          requestId ? `/${requestId}` : ''
        }`,
      }),
    [requestToLPFR],
  );

  /** mine functions **/
  const sendAudit = useCallback(async () => {
    const data = await requestToLPFR(REQUEST_POINTS.auditSend);
    return data;
  }, [requestToLPFR]);

  const notifyStatus = useCallback(async () => {
    const data = await requestToLPFR(REQUEST_POINTS.notifyStatus);
    if (!data) {
      return;
    }
    dispatch(LPFRactionSetStatus(data));
    return data;
  }, [dispatch, requestToLPFR]);

  const usbSyncFile = useCallback(
    async (path: string) => {
      await requestToLPFR({
        ...REQUEST_POINTS.usbSyncFiles,
        data: path,
      });
    },
    [requestToLPFR],
  );

  const objToReturn = useMemo(() => {
    return {
      attentionPing,
      setStatusInfo,
      setStatusPayer,
      verifyPin,
      setStatusCritic,
      setStatusSettings,
      getStatusErrors,
      setStatus,
      sendAuditProof,
      setEnvironment,
      getDirectoryData,
      getLastInvoice,
      sendAudit,
      notifyStatus,
      usbSyncFile,
      sendInvoices,
    };
  }, [
    attentionPing,
    setStatusInfo,
    sendAuditProof,
    setStatusPayer,
    verifyPin,
    setStatusCritic,
    setStatusSettings,
    setStatus,
    getStatusErrors,
    setEnvironment,
    getDirectoryData,
    getLastInvoice,
    sendAudit,
    notifyStatus,
    usbSyncFile,
    sendInvoices,
  ]);

  return objToReturn;
};

export default useLPFRFunctions;
