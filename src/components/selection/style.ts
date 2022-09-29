import {Platform, StyleSheet} from 'react-native';
import {Colors} from 'src/constants/Colors';

const isIOS = Platform.OS === 'ios';

const style = StyleSheet.create({
  root: {
    padding: 2,
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    /** */
    paddingBottom: 2,
    //transform: [{scale: 0.9}],
    fontSize: 12,
    //fontFamily: Fonts.CONDENSED
  },
  selectionContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selection: {
    borderWidth: 1,
    borderColor: isIOS ? '#e1e1e1' : Colors.PALETTE.BLUE._500,
    padding: isIOS ? 10 : 8,
    borderRadius: isIOS ? 12 : 4,
  },
  error: {
    minHeight: 20,
    paddingTop: 1,
    transform: [{scale: 0.85}],
    color: Colors.PALETTE.RED._800,
  },
  pickerStyle: {
    height: 46,
    borderWidth: 1,
    borderColor: Colors.PALETTE.GRAY._300,
    borderRadius: isIOS ? 12 : 4,
    color: Colors.PALETTE.GRAY._900,
    backgroundColor: Colors.WHITE,
  },
  pickerContainerStyle: {
    flex: 1,
  },
  pickerTextInputStyle: {
    fontSize: 13,
    paddingLeft: isIOS ? 10 : 8,
    paddingRight: 35,
    color: Colors.PALETTE.GRAY._900,
    textAlign: 'center',
    // fontFamily: Fonts.CONDENSED
  },
  iconRight: {
    position: 'absolute',
    opacity: 0.75,
    right: 10,
    color: Colors.PALETTE.GRAY._700,
  },
});

export default style;
