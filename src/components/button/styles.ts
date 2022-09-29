import {StyleSheet} from 'react-native';
import {Colors} from 'src/constants/Colors';

export const styles = StyleSheet.create({
  root: {
    minWidth: 80,
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: Colors.PALETTE.GRAY._200,
    borderWidth: 1,
    borderColor: Colors.PALETTE.GRAY._500,
    borderRadius: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  primary: {
    backgroundColor: Colors.PALETTE.BLUE._300,
    color: Colors.WHITE,
  },
  secondary: {},
  link: {},
  textPart: {
    textAlign: 'center',
    // fontFamily: Fonts.CONDENSED,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  clear: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  solid: {
    borderWidth: 1,
  },
  iconButtonRoot: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: Colors.PALETTE.GRAY._200,
    borderWidth: 1,
    borderColor: Colors.PALETTE.GRAY._500,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 30,
    minHeight: 30,
  },
  iconButtonIcon: {
    color: Colors.PALETTE.GRAY._800,
  },
  buttonRound: {
    borderRadius: 50,
  },
  disabled: {
    opacity: 0.6,
  },
  round: {
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 5,
  },
  iconButton: {
    fontSize: 13,
    color: Colors.WHITE,
    marginRight: 5,
  },
});
