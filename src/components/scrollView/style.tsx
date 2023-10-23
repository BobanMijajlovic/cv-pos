import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from 'src/constants/Colors';

const style = StyleSheet.create({
  root: {
    paddingHorizontal: 5,
    alignItems: 'stretch',
    width: '100%',
    zIndex: -1,
    justifyContent: 'center',
    minHeight: Dimensions.get('window').height - 110,
  },
  scrollViewBackgroundIcon: {
    color: Colors.PALETTE.BLUE._700,
    opacity: 0.07,
    position: 'absolute',
    fontSize: 50,
    zIndex: -1,
    bottom: 10,
    right: 10,
  },
});

export default style;
