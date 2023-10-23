import {StyleSheet} from 'react-native';
import {Colors} from 'src/constants/Colors';

const style = StyleSheet.create({
  root: {
    height: '100%',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  confirmButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonConfirm: {
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  buttonConfirmText: {
    fontSize: 20,
    fontWeight: 'bold',
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
    maxWidth: 250,
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
    marginHorizontal: 5,
    borderRadius: 100,
    width: 25,
    height: 25,
    fontWeight: 'normal',
    fontSize: 15,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: Colors.PALETTE.GRAY._600,
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.PALETTE.GRAY._400,
  },
  pinValueVisibilityText: {
    color: Colors.WHITE,
    fontSize: 15,
    display: 'flex',
  },
  pinValueText: {
    display: 'none',
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
  visibilityIcon: {
    fontSize: 20,
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
