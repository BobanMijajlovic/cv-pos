import {
  TAction,
  TLPFRStore,
  TLPFRStatusInfo,
  TLPFRStatusPayer,
  TLPFRStatusCriticErrors,
  TLPFRStatusSettings,
  TLPFRStatus,
  TLPFRReqError,
  TLPFREnvironment,
} from './d';
import {
  LPFR_PIN_VERIFIED,
  LPFR_SET_STATUS_INFO,
  LPFR_SET_IS_ALIVE,
  LPFR_CLEAR_ALL,
  LPFR_SET_STATUS_PAYER,
  LPFR_SET_STATUS_CRITIC_ERROR,
  LPFR_SET_STATUS_SETTINGS,
  LPFR_SET_STATUS_BASIC,
  LPFR_SET_IS_PIN_VERIFIED,
  LPFR_SET_THROW_ERROR_CLEAR,
  LPFR_SET_THROW_ERROR,
  LPFR_SET_ENVIRONMENT,
} from './types';
import {DEVICE_IP} from '../../config';

export const ONE_MIN = 60 * 1000;
export const ONE_HOUR = 60 * ONE_MIN;

const initial = {
  connection: {
    port: '5555',
    host: `http://${DEVICE_IP}`,
  },
  pin: '',
  isPinVerified: false,
  isAlive: false,
  statusInfo: [],
  statusCriticErrors: [],
  status: {
    uid: '',
    allTaxRates: [],
  },
  taxUid: '',
  error: {
    modelState: [],
  },
  statusSettings: {
    PORT: '',
    defaultInit: 'YES',
    NUM_PRINTER_CHARS: 40,
    TIME_AUDIT_SEND: 2 * ONE_HOUR,
    TIME_PROOF_SEND: 8 * ONE_HOUR,
    LPFR: {
      protocolVersion: '',
      hardwareVersion: '',
      softwareVersion: '',
      deviceSerialNumber: '',
      make: '',
      model: '',
      mrcPrefix: '',
    },
  },
  statusPayer: {
    countryName: '',
    stateOrProvinceName: '',
    localityName: '',
    streetAddress: '',
    organizationName: '',
    organizationalUnitName: '',
    serialName: '',
    commonName: '',
    taxCoreUrl: '',
    taxPayerId: '',
  },
  environment: {
    organizationName: '',
    serverTimeZone: '',
    street: '',
    city: '',
    country: '',
    endpoints: {
      taxpayerAdminPortal: '',
      taxCoreApi: '',
      vsdc: '',
      root: '',
    },
    environmentName: '',
    logo: '',
    ntpServer: '',
    supportedLanguages: [],
  },
} as TLPFRStore;

export default (state = initial, action: TAction): TLPFRStore => {
  switch (action.type) {
    case LPFR_SET_THROW_ERROR_CLEAR:
      if (!state.error.modelState.length) {
        return state;
      }
      return {
        ...state,
        error: {
          modelState: [],
        },
      };

    case LPFR_SET_THROW_ERROR:
      return {
        ...state,
        error: action.payload as TLPFRReqError,
      };

    case LPFR_SET_IS_ALIVE: {
      const isAlive = !!action.payload;
      if (state.isAlive === isAlive) {
        if (isAlive) {
          if (!state.taxUid) {
            return {
              ...state,
              isAlive,
              taxUid: action.payload as string,
            };
          }

          if (state.taxUid !== action.payload) {
            return {
              ...initial,
              isAlive,
              taxUid: action.payload as string,
              connection: state.connection,
            };
          }
        }

        return state;
      }
      return {
        ...state,
        isAlive,
      };
    }

    case LPFR_CLEAR_ALL: {
      return {
        ...initial,
        connection: state.connection,
      };
    }

    case LPFR_SET_IS_PIN_VERIFIED: {
      if (state.isPinVerified === !!action.payload) {
        return state;
      }
      return {
        ...state,
        isPinVerified: !!action.payload,
      };
    }

    case LPFR_PIN_VERIFIED:
      /** reset all state */
      return {
        ...initial,
        pin: action.payload as string,
        connection: state.connection,
      };

    case LPFR_SET_STATUS_PAYER: {
      return {
        ...state,
        statusPayer: action.payload as TLPFRStatusPayer,
      };
    }

    case LPFR_SET_STATUS_CRITIC_ERROR: {
      return {
        ...state,
        statusCriticErrors: action.payload as TLPFRStatusCriticErrors,
      };
    }

    case LPFR_SET_STATUS_SETTINGS: {
      return {
        ...state,
        statusSettings: action.payload as TLPFRStatusSettings,
      };
    }

    case LPFR_SET_STATUS_BASIC: {
      return {
        ...state,
        status: action.payload as TLPFRStatus,
      };
    }

    case LPFR_SET_STATUS_INFO:
      return {
        ...state,
        statusInfo: [...(action.payload as TLPFRStatusInfo)],
      };

    case LPFR_SET_ENVIRONMENT:
      return {
        ...state,
        environment: action.payload as TLPFREnvironment,
      };

    default:
      return state;
  }
};
