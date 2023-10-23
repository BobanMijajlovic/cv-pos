import {createSelector} from 'reselect';
import {TReduxState} from 'src/store/d';
import {__flatten} from 'src/util/lodash';

export const _selectorFiscalGetVats = createSelector(
  (state: TReduxState) => state.fiscal,
  fiscal => fiscal.vats,
);
export const _selectorFiscalGetMeasures = createSelector(
  (state: TReduxState) => state.fiscal,
  fiscal => fiscal.measures,
);

export const _selectorFiscalGetPayments = createSelector(
  (state: TReduxState) => state.fiscal,
  fiscal => fiscal.payments,
);

export const _selectorCurrentVats = createSelector(
  (state: TReduxState) => state.fiscal.newVats.currentTaxRates,
  currentTaxRates => ({
    ...currentTaxRates,
    taxCategories: __flatten(
      currentTaxRates.taxCategories.map(x =>
        x.taxRates.map(v => ({
          label: v.label,
          value: v.rate,
          name: x.name,
        })),
      ),
    ).sort((a, b) => (a.label < b.label ? -1 : 1)),
  }),
);
