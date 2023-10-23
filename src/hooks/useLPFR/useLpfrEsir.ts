import useLPFRFunctions from '../../hooks/useLPFR/useLPFRFunctions';
import {useSelector} from 'react-redux';
import {_selectorLPFRValidTaxes} from '../../store/lpfr/helpers';
import {useMemo} from 'react';
import {TTaxDefinition, TTaxCategory, TTaxRateEsir} from '../../store/lpfr/d';
import {__orderBy} from '../../util/lodash';

const useLpfrEsir = () => {
  const {getLastInvoice} = useLPFRFunctions();

  const _tax = useSelector(_selectorLPFRValidTaxes) as TTaxDefinition;

  const tax = useMemo(() => {
    const tt = _tax.taxCategories.reduce(
      (acc: TTaxRateEsir[], t: TTaxCategory) => {
        const cRates = t.taxRates.map(m => ({
          ...m,
          value: m.rate,
          name: t.name,
        }));
        return [...acc, ...cRates];
      },
      [],
    );

    return __orderBy(tt, 'label');
  }, [_tax]);

  const returnObj = useMemo(() => {
    return {
      getLastInvoice,
      tax,
    };
  }, [getLastInvoice, tax]);

  return returnObj;
};

export default useLpfrEsir;
