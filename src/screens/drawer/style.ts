import {StyleSheet} from 'react-native';
import {Colors} from 'src/constants/Colors';

const style = StyleSheet.create({
  drawerRoot: {
    backgroundColor: Colors.PALETTE.GRAY._100,
    flex: 1,
  },
  drawerContainer: {
    width: '100%',
    height: '100%',
  },
  iconStyle: {
    fontSize: 24,
    color: Colors.WHITE,
  },
});

export default style;
