import {Platform, StyleSheet} from 'react-native';
import {Colors} from '../constants/Colors';

const isOS = Platform.OS;

const style = StyleSheet.create({
  navigationRoot: {
    backgroundColor: Colors.PALETTE.BLUE._700,
  },
  navigationLeftRoot: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    flex: 1,
  },
  navigationBackTitle: {
    fontSize: 11,
    paddingLeft: 4,
    color: Colors.WHITE,
  },
  navigationBackIcon: {
    fontSize: 12,
    color: Colors.WHITE,
  },
  navigationTin: {
    fontSize: 20,
    color: Colors.WHITE,
  },
  navigationTitle: {
    color: Colors.WHITE,
    fontSize: 18,
  },
  navigateIconsContainer: {
    flexDirection: 'row',
  },
  navigateUserIcon: {
    paddingRight: 5,
  },
  userPopoverContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
});

export default style;
