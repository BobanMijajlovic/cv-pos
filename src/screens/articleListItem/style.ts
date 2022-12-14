import {StyleSheet} from 'react-native';
import {Colors} from 'src/constants/Colors';
import {Fonts} from '../../constants/Constants';
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.PALETTE.GRAY._200,
    borderStyle: 'solid',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    position: 'relative',
  },
  itemOdd: {
    backgroundColor: Colors.PALETTE.LIGHT_BLUE._50,
  },
  descriptionContainer: {
    flexDirection: 'column',
    flex: 1,
    height: '100%',
  },
  descriptionLabel: {
    flex: 2,
    fontSize: 16,
    lineHeight: 24,
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  itemBarcode: {
    fontWeight: '300',
    fontSize: 11,
    color: Colors.PALETTE.GRAY._500,
  },
  itemPrice: {
    fontWeight: '700',
    fontSize: 15,
  },
  itemTaxContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 2,
  },
  itemTax: {
    width: 20,
    height: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 2,
  },
  itemTaxText: {
    fontWeight: '500',
    fontSize: 12,
    padding: 1,
    textAlign: 'center',
    color: Colors.WHITE,
    fontFamily: Fonts.CONDENSED,
  },
  itemActionRoot: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.WHITE,
    paddingVertical: 5,
    paddingHorizontal: 10,
    shadowColor: Colors.PALETTE.GRAY._500,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    minHeight: 70,
    maxHeight: 70,
    borderBottomWidth: 1,
    borderBottomColor: Colors.PALETTE.GRAY._200,
    borderStyle: 'solid',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  itemActionRightBtn: {
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
  itemActionLeftBtn: {
    overlayColor: transparentize(0.7, Colors.PALETTE.BLUE._700),
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    backgroundColor: Colors.PALETTE.BLUE._700,
    minWidth: 75,
    height: 'auto',
    left: 0,
  },
  buttonTextWhite: {
    color: Colors.WHITE,
  },
  icon: {
    fontSize: 20,
    color: Colors.WHITE,
  },
});

export default style;
