import {useState, useCallback, useEffect} from 'react';
import useLPFRFunctions from './useLPFRFunctions';

const MONIT = {
  listeners: [] as any,
};

const _setData = (data: any) => {
  MONIT.listeners.map((f: any) => {
    f(data);
  });
};

const useLPFRErrors = () => {
  const [state, setState] = useState([]);

  const {getStatusErrors} = useLPFRFunctions();

  const getErrors = useCallback(async () => {
    const _d = await getStatusErrors();
    _setData(_d);
  }, [getStatusErrors]);

  useEffect(() => {
    MONIT.listeners = [...MONIT.listeners, setState];
    return () => {
      MONIT.listeners = MONIT.listeners.filter((f: any) => f !== setState);
    };
  }, [setState]);

  return {
    getErrors,
    errors: state,
  };
};

export default useLPFRErrors;
