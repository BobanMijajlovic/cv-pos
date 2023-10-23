import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {
  _selectorLPFRisAlive,
  _selectorLPFRPin,
  _selectorLPFRPStatusPayer,
  _selectorLPFRIsPinVerified,
} from '../../store/lpfr/helpers';

const useLPFRState = () => {
  const isAlive = useSelector(_selectorLPFRisAlive);
  const PIN = useSelector(_selectorLPFRPin);
  const taxPayer = useSelector(_selectorLPFRPStatusPayer);
  const isPinVerified = useSelector(_selectorLPFRIsPinVerified);

  const objToReturn = useMemo(() => {
    return {
      pin: PIN,
      isAlive,
      taxPayer,
      isPinVerified,
    };
  }, [isAlive, PIN, taxPayer, isPinVerified]);

  return objToReturn;
};

export default useLPFRState;
