import * as React from 'react';
import {View} from 'react-native';
import {TPayment} from 'src/store/Fiscal/d';
import {PaymentButton} from 'src/screens/receiptPaying/PayingByType';
import style from 'src/screens/receiptPaying/style';

type TReceiptPaymentsPopoverProps = {
  buttons: TPayment[];
};

const ReceiptPaymentsPopover = ({buttons}: TReceiptPaymentsPopoverProps) => {
  return (
    <View style={style.paymentOtherPopoverRoot}>
      {buttons.map((button, key) => {
        return (
          <PaymentButton
            {...button}
            key={key}
            rootStyle={[style.paymentButton, style.paymentOtherButtons]}
          />
        );
      })}
    </View>
  );
};
export default ReceiptPaymentsPopover;
