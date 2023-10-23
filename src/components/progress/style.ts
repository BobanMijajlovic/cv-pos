import {Platform, StyleSheet} from 'react-native';
import {transparentize} from 'polished';
import {Colors} from 'src/constants/Colors';

const isIOS = Platform.OS === 'ios';

const style = StyleSheet.create({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 25000,
    backgroundColor: transparentize(0.7, Colors.PALETTE.GRAY._800),
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  loadingTextRoot: {
    marginTop: 10,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.PALETTE.BLUE._700,
  },
});

export default style;
