import React, {useMemo} from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import style from 'src/screens/receiptPaying/payingType/style';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from '../../../constants/Colors';
import {formatPrice} from '../../../util/utils';
import {TPayingTypeProps} from '../d';
import {ReceiptPayingType} from '../../../store/Receipt/d';
import {
  iconFontAwesomeCreditCard,
  iconFontAwesomeMoneyBill,
  iconFontAwesomeMoneyCheckAlt,
  iconFontAwesomeTicketAlt,
  iconFontAwesomeWireTransfer,
  iconFontAwesomeMobileMoney,
} from '../../../icon';

const PayingType = ({value, type, label}: TPayingTypeProps) => {
  return (
    <View style={[style.paymentTypeContainer]}>
      <TouchableHighlight
        style={style.paymentLabelButton}
        underlayColor={Colors.PALETTE.BLUE_GRAY._100}>
        <View style={style.paymentLabelContainer}>
          <PaymentIcon type={type} />
          <Text style={[style.paymentLabel]}>{label}</Text>
        </View>
      </TouchableHighlight>
      <View style={style.paymentInputContainer}>
        <Text style={[style.paymentInputText]}>{formatPrice(value)}</Text>
      </View>
      <View style={style.rightBorder} />
    </View>
  );
};

export default PayingType;

const PaymentIcon = ({type}: {type: ReceiptPayingType}) => {
  const icon = useMemo(() => {
    switch (type) {
      case ReceiptPayingType.CARD:
        return iconFontAwesomeCreditCard;
      case ReceiptPayingType.WIRE_TRANSFER:
        return iconFontAwesomeWireTransfer;
      case ReceiptPayingType.MOBILE_MONEY:
        return iconFontAwesomeMobileMoney;
      case ReceiptPayingType.CHECK:
        return iconFontAwesomeMoneyCheckAlt;
      case ReceiptPayingType.VOUCHER:
        return iconFontAwesomeTicketAlt;
      default:
        return iconFontAwesomeMoneyBill;
    }
  }, [type]);
  return <FontAwesome5Icon name={icon} style={style.paymentIcon} />;
};
