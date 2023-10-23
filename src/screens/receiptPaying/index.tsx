import React from 'react';
import {View} from 'react-native';
import style from 'src/screens/receiptPaying/style';
import PayingKeyboard from './PayingKeyboard';
import PayingContextContainer from './context';
import PayingByType from 'src/screens/receiptPaying/PayingByType';
import PayingHeader from 'src/screens/receiptPaying/PayingHeader';

const ReceiptPaying = () => {
  return (
    <PayingContextContainer>
      <View style={style.payingRoot}>
        <View style={style.firstPart}>
          <PayingHeader />
          <PayingByType />
        </View>
        <PayingKeyboard />
      </View>
    </PayingContextContainer>
  );
};

export default ReceiptPaying;
