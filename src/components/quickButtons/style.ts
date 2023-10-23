import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';

const style = StyleSheet.create({
  root: {
    padding: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  keyboardRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  quickButton: {
    flex: 1,
    minHeight: 40,
    maxHeight: 75,
    maxWidth: 75,
    minWidth: 40,
    margin: 5,
    borderRadius: 20,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderColor: Colors.PALETTE.BLUE._600,
    borderWidth: 2,
  },
  quickButtonRound: {
    borderRadius: 100,
  },
  quickButtonDisabled: {
    backgroundColor: Colors.PALETTE.GRAY._100,
    borderColor: Colors.PALETTE.GRAY._700,
  },
  quickButtonCounter: {
    position: 'absolute',
    top: 2,
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 10,
    color: Colors.PALETTE.BLUE_GRAY._800,
  },
  quickButtonIcon: {
    fontSize: 20,
    position: 'absolute',
    top: 0,
    right: 2,
  },
  quickButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.PALETTE.GRAY._800,
  },
  quickButtonTextDisabled: {
    color: Colors.PALETTE.GRAY._500,
    opacity: 0.9,
  },
});

export default style;
