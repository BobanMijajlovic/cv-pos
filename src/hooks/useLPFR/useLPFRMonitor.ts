import useLPFRFunctions from './useLPFRFunctions';
import {useEffect, useRef, useCallback, useMemo} from 'react';
import useLPFRState from './index';
import {useSelector} from 'react-redux';
import {
  _selectorLPFRPStatusSettingsIsCorrect,
  _selectorLPFRisAlive,
  _selectorLPFRPStatusIsTaxPayer,
  _selectorLPFRIsEnvironment,
} from '../../store/lpfr/helpers';

const MONITOR = {
  threadStatus: 0,
  threadPing: 0,
  pin: null,
  isAlive: false,
  workingMonitor: false,
} as any;

const TIME_PING = 5000;
const TIME_STATUS = 25000;

export const useLPFRMonitor = () => {
  const {pin: PIN} = useLPFRState();
  const {
    attentionPing,
    setStatusInfo,
    setStatusPayer,
    setStatusCritic,
    setStatusSettings,
    setStatus,
    setEnvironment,
  } = useLPFRFunctions();

  const isStatusSettingsCorrect = useSelector(
    _selectorLPFRPStatusSettingsIsCorrect,
  );
  const isSystemAlive = useSelector(_selectorLPFRisAlive);
  const isTaxPayerSet = useSelector(_selectorLPFRPStatusIsTaxPayer);
  const isEnvironmentSet = useSelector(_selectorLPFRIsEnvironment);

  MONITOR.isAlive = isSystemAlive;
  MONITOR.pin = PIN;

  const refFunction = useRef({
    setStatusInfo,
    setStatusCritic,
  });

  useEffect(() => {
    refFunction.current = {
      setStatusInfo,
      setStatusCritic,
    };
  }, [refFunction, setStatusInfo, setStatusCritic]);

  useEffect(() => {
    if (!isSystemAlive || isStatusSettingsCorrect) {
      return;
    }
    setStatusSettings().then();
  }, [isSystemAlive, isStatusSettingsCorrect, setStatusSettings]);

  useEffect(() => {
    if (!isSystemAlive || isTaxPayerSet) {
      return;
    }
    setStatusPayer().then();
  }, [isSystemAlive, isTaxPayerSet, setStatusPayer]);

  useEffect(() => {
    if (!isSystemAlive) {
      return;
    }
    setStatus().then();
  }, [isSystemAlive, setStatus]);

  useEffect(() => {
    if (!isSystemAlive || isEnvironmentSet) {
      return;
    }
    setEnvironment().then();
  }, [isSystemAlive, isEnvironmentSet, setEnvironment]);

  const refMonitorFunction = useRef(async () => {
    /** */
  });
  const refMonitorPing = useRef(async () => {
    /** */
  });
  const refPingFun = useRef(attentionPing);
  refPingFun.current = attentionPing;

  const monitorLPFR = useCallback(async () => {
    if (MONITOR.workingMonitor || !MONITOR.isAlive) {
      clearTimeout(MONITOR.thread);
      MONITOR.thread = setTimeout(async () => {
        await refMonitorFunction.current();
      }, TIME_STATUS);
      return;
    }
    MONITOR.workingMonitor = true;
    try {
      clearTimeout(MONITOR.thread);
      const fns = Object.values(refFunction.current);
      for (let i = 0; i < fns.length; i++) {
        await fns[i]();
      }
    } catch (e) {}
    MONITOR.workingMonitor = false;
    MONITOR.thread = setTimeout(async () => {
      await refMonitorFunction.current();
    }, TIME_STATUS);
  }, [refFunction, refMonitorFunction]);

  useEffect(() => {
    refMonitorFunction.current = monitorLPFR;
  }, [refMonitorFunction, monitorLPFR]);

  const monitorPing = useCallback(async () => {
    clearTimeout(MONITOR.threadPing);
    await refPingFun.current();
    MONITOR.threadPing = setTimeout(async () => {
      await refMonitorPing.current();
    }, TIME_PING);
  }, [refMonitorPing, refPingFun]);

  useEffect(() => {
    refMonitorPing.current = monitorPing;
  }, [refMonitorPing, monitorPing]);

  useEffect(() => {
    monitorPing().then();
  }, [monitorPing]);

  useEffect(() => {
    if (!isSystemAlive) {
      return;
    }
    monitorLPFR().then();
  }, [monitorLPFR, isSystemAlive]);

  const objToReturn = useMemo(() => {
    return {
      monitorLPFR,
    };
  }, [monitorLPFR]);

  return objToReturn;
};

export default useLPFRMonitor;
