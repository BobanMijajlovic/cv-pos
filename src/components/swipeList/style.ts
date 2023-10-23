import {Dimensions, StyleSheet} from 'react-native';
import {Fonts} from '../../constants/Constants';
import {Colors} from '../../constants/Colors';
import {transparentize} from 'polished';

const style = StyleSheet.create({
  styleListRoot: {
    flex: 2,
    width: '100%',
    paddingVertical: 5,
  },
  emptyListContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  emptyIcon: {
    fontSize: 80,
    color: Colors.PALETTE.GRAY._600,
    opacity: 0.6,
    paddingVertical: 10,
  },
  emptyListText: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: Fonts.CONDENSED,
    color: Colors.PALETTE.GRAY._600,
  },
  listItemRoot: {
    position: 'relative',
  },
  itemLeftSwipe: {
    position: 'absolute',
    height: '100%',
    left: 0,
    width: 2,
    backgroundColor: transparentize(0.4, Colors.PALETTE.BLUE._900),
    zIndex: 1,
  },
  itemRightSwipe: {
    position: 'absolute',
    right: 0,
    height: '100%',
    width: 2,
    backgroundColor: transparentize(0.4, Colors.PALETTE.RED._900),
    zIndex: 1,
  },
  iconKeyboardRoot: {
     width: 80,
     height: 60,
     marginTop: 25
  },

  iconKeyboardIcon: {
    fontSize: 40
  }
});

export default style;
