import {Platform, StyleSheet} from 'react-native';

import {Colors} from 'src/constants/Colors';

const isIOS = Platform.OS === 'ios';

const style = StyleSheet.create({
  root: {
    flex: 1,
    padding: 0,
    marginHorizontal: 5,
    // fontFamily: Fonts.CONDENSED,
  },
  label: {
    /** */
    paddingBottom: 2,
    //transform: [{scale: 0.9}],
    fontSize: 12,
    color: Colors.PALETTE.BLUE._900,
    //fontFamily: Fonts.CONDENSED,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: isIOS ? '#e1e1e1' : Colors.PALETTE.BLUE._700,
    paddingVertical: isIOS ? 10 : 8,
    paddingHorizontal: isIOS ? 10 : 8,
    borderRadius: isIOS ? 12 : 4,
    color: Colors.PALETTE.GRAY._700,
    backgroundColor: Colors.WHITE,
  },
  labelDisabled: {
    color: isIOS ? Colors.PALETTE.GRAY._400 : Colors.PALETTE.GRAY._400,
  },
  inputDisabled: {
    borderColor: isIOS ? Colors.PALETTE.GRAY._400 : Colors.PALETTE.GRAY._400,
    color: isIOS ? Colors.PALETTE.GRAY._400 : Colors.PALETTE.GRAY._500,
  },
  error: {
    minHeight: 20,
    padding: 1,
    //transform: [{scale: 0.85}],
    fontSize: 11,
    color: Colors.PALETTE.RED._900,
    // fontFamily: Fonts.CONDENSED,
  },
  iconLeft: {
    position: 'absolute',
    left: 8,
    height: '100%',
    zIndex: 1,
  },
  iconLeftInputPadding: {
    paddingLeft: 34,
  },
  iconRight: {
    position: 'absolute',
    right: 8,
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconRightInputPadding: {
    paddingRight: 34,
  },
  inputSearchIconRoot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputSearchIcon: {
    fontSize: 18,
    color: Colors.PALETTE.GRAY._300,
  },
  inputSearchIconActive: {
    color: Colors.PALETTE.GRAY._800,
  },
});

export default style;
