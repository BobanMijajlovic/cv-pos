import {StyleSheet} from 'react-native';
import {Colors} from 'src/constants/Colors';

const style = StyleSheet.create({
  root: {
    height: '100%',
    justifyContent: 'space-between',
    paddingVertical: 30,
  },
  keyboardRoot: {
    flex: 2,
    paddingTop: 10,
  },
  keyboardHeaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardIcon: {
    textAlign: 'center',
    fontSize: 30,
    color: Colors.PALETTE.BLUE._700,
  },
  keyboardHeaderText: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.PALETTE.GRAY._600,
    marginTop: 5,
    textAlign: 'center',
  },
  pinCirclesContainer: {
    width: '40%',
    paddingVertical: 15,
  },
  pinsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  pinValueContainer: {
    borderRadius: 100,
    width: 20,
    height: 20,
    fontWeight: 'normal',
    fontSize: 20,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: Colors.PALETTE.GRAY._600,
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.PALETTE.GRAY._400,
  },
  pinActive: {
    backgroundColor: Colors.PALETTE.GRAY._600,
    color: Colors.PALETTE.BLUE._600,
  },
  pinError: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: Colors.PALETTE.RED._500,
    backgroundColor: Colors.PALETTE.RED._500,
    color: Colors.PALETTE.RED._500,
  },
  helperText: {
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 14,
    color: Colors.PALETTE.RED._500,
  },
  helperTextContainer: {
    minHeight: 20,
  },
  pinCircleText: {
    color: Colors.PALETTE.GRAY._800,
  },
  lockScreenKeyboardKey: {
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: Colors.PALETTE.GRAY._300,
    backgroundColor: Colors.PALETTE.GRAY._200,
  },
});

export default style;
