import {StyleSheet} from 'react-native';
import {Colors} from 'src/constants/Colors';

const style = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
  },
  articleVatContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderStyle: 'solid',
    borderBottomColor: Colors.PALETTE.GRAY._400,
    borderBottomWidth: 1,
  },
  disabled: {
    opacity: 0.8,
  },
  articleVatDef: {
    flex: 5,
  },
  articleVatCheck: {
    flex: 1,
  },
});

export default style;
