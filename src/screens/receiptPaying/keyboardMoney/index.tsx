import React, {useContext, useMemo} from 'react';
import {PayingContext} from '../context';
import QuickButtons from '../../../components/quickButtons';
import {QuickMoneyButtons} from '../../../components/quickButtons/d';
import {Colors} from 'src/constants/Colors';

const MoneyKeyboard = ({isNeedToPay}: {isNeedToPay: boolean}) => {
  const {moneyPaying} = useContext(PayingContext);

  const buttonsValues = useMemo(() => {
    return [...QuickMoneyButtons].map(x => {
      const money = moneyPaying.find(m => m.value === x);
      return Object.assign(
        {
          value: x,
        },
        money ? {counter: (money as any).counter as number} : {},
      );
    });
  }, [moneyPaying]);

  return (
    <QuickButtons
      isDisabled={!isNeedToPay}
      values={buttonsValues}
      keyRootStyle={{
        backgroundColor: Colors.PALETTE.GREEN._600,
        borderColor: Colors.PALETTE.GREEN._900,
      }}
      keyTextStyle={{color: Colors.WHITE}}
    />
  );
};

export default MoneyKeyboard;
