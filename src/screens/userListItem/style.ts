import {StyleSheet} from 'react-native';
import {Colors} from 'src/constants/Colors';
import {transparentize} from 'polished';

const style = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.WHITE,
    //borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    shadowColor: Colors.PALETTE.GRAY._500,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    minHeight: 70,
    maxHeight: 70,
    borderBottomWidth: 2,
    borderBottomColor: Colors.PALETTE.GRAY._400,
    borderStyle: 'solid',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    position: 'relative',

  },
  itemOdd: {
    backgroundColor: Colors.PALETTE.LIGHT_BLUE._50,
  },
  fullNameContainer: {
    flexDirection: 'column',
    flex: 1,
    height: '100%',
  },
  nickNameLabel: {
    flex: 2,
    fontSize: 16,
    lineHeight: 24,
  },
  itemDescSecondLine: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
  },
  itemFullName: {
    fontWeight: '600',
    fontSize: 15,
    color: Colors.PALETTE.GRAY._500,
  },
  itemPriority: {
    fontWeight: '900',
    fontSize: 15,
  },
  swipeRowBackRoot: {
    alignItems: 'center',
    backgroundColor: Colors.PALETTE.GRAY._400,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    flex: 1,
    width: '100%',
    height: 70,
  },
  swipeBackRightBtn: {
    overlayColor: transparentize(0.7, Colors.PALETTE.RED._800),
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    minWidth: 75,
    flex: 1,
    right: 0,
    backgroundColor: Colors.PALETTE.RED._800,
    color: Colors.WHITE,
  },
  swipeBackLeftBtn: {
    overlayColor: transparentize(0.7, Colors.PALETTE.RED._800),
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    minWidth: 75,
    flex: 1,
    left: 0,
    backgroundColor: Colors.PALETTE.BLUE._700,
    color: Colors.WHITE,
  },
  backTextWhite: {
    color: Colors.WHITE,
  },
  buttonIcon: {
    fontSize: 20,
    color: Colors.WHITE,
  },
});

export default style;
