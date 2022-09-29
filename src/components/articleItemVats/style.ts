import {StyleSheet} from 'react-native';
import {Colors} from 'src/constants/Colors';
import {Fonts} from '../../constants/Constants';

const style = StyleSheet.create({
  itemTaxContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  itemTax: {
    width: 20,
    height: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 2,
  },
  itemTaxText: {
    fontWeight: '500',
    fontSize: 12,
    padding: 1,
    textAlign: 'center',
    color: Colors.WHITE,
    fontFamily: Fonts.CONDENSED,
  },
});

export default style;
