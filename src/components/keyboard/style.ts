import {StyleSheet} from 'react-native';
import {Colors} from 'src/constants/Colors';

const style = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    width: '100%',
    paddingVertical: 2,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    flex: 1,
    minHeight: 40,
    minWidth: 40,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderColor: Colors.PALETTE.BLUE._600,
    borderWidth: 2,
    borderRadius: 100,
  },
  buttonRound: {
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.PALETTE.BLUE_DARK._700,
  },
  disabled: {
    backgroundColor: Colors.PALETTE.GRAY._100,
    borderColor: Colors.PALETTE.GRAY._700,
  },
  disabledText: {
    color: Colors.PALETTE.GRAY._500,
    opacity: 0.9,
  },
  notVisible: {
    zIndex: -1,
    borderColor: 'transparent',
  },

  cButton: {
    borderColor: Colors.PALETTE.RED._900,
    borderWidth: 3,
  },

  cButtonText: {
    color: Colors.PALETTE.RED._900,
    fontSize: 32,
  },

  pButton: {
    borderColor: Colors.PALETTE.GREEN._900,
    borderWidth: 3,
  },

  pButtonText: {
    color: Colors.PALETTE.GREEN._900,
    fontSize: 32,
  },
});

export default style;
