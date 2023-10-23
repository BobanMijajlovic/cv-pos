import {StyleSheet} from 'react-native';
import {Fonts} from '../../constants/Constants';
import {Colors} from '../../constants/Colors';
import {transparentize} from 'polished';

const style = StyleSheet.create({
  root: {
    flex: 1,
    paddingVertical: 10,
  },
  header: {
    height: 48,
    marginBottom: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInputContainer: {
    height: '100%',
    width: '80%',
    maxWidth: '80%',
    alignItems: 'center',
  },
  headerInputRoot: {
    width: '100%',
  },
  content: {
    flex: 2,
  },
  receiptItemRoot: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 60,
    maxHeight: 60,
    borderBottomWidth: 1,
    borderBottomColor: Colors.PALETTE.GRAY._300,
    borderStyle: 'solid',
  },
  receiptItemOdd: {
    backgroundColor: Colors.PALETTE.LIGHT_BLUE._50,
  },
  waterMarkIcon: {
    fontSize: 18,
    bottom: 2,
    position: 'absolute',
    opacity: 0.2,
  },
  sellItemIcon: {
    right: 5,
    color: transparentize(0.2, Colors.PALETTE.BLUE._700),
  },
  quantityItemIcon: {
    left: 5,
    color: transparentize(0.2, Colors.PALETTE.BLUE_DARK._700),
  },
  leftPart: {
    position: 'relative',
    flex: 2,
    height: '100%',
    paddingVertical: 5,
    paddingLeft: 7,
    backgroundColor: Colors.PALETTE.GRAY._100,
  },
  rightPart: {
    position: 'relative',
    flex: 1,
    justifyContent: 'space-between',
    height: '100%',
    borderLeftWidth: 0.5,
    borderColor: Colors.PALETTE.GRAY._300,
    borderStyle: 'solid',
    paddingBottom: 2,
    paddingRight: 5,
    backgroundColor: Colors.PALETTE.GRAY._50,
  },
  itemDescTaxPart: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemDescription: {
    flex: 2,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: Fonts.CONDENSED,
  },
  itemBarCode: {
    fontSize: 8,
    color: Colors.PALETTE.GRAY._500,
    fontFamily: Fonts.CONDENSED,
  },
  itemTaxContainer: {
    width: 25,
    height: 25,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 2,
  },
  itemTax: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
    borderRadius: 200,
    padding: 1,
    textAlign: 'center',
    color: Colors.WHITE,
    fontFamily: Fonts.CONDENSED,
  },
  itemMultiplySign: {
    fontSize: 13,
    fontWeight: '400',
    paddingLeft: 5,
    textAlign: 'right',
    fontFamily: Fonts.CONDENSED,
  },
  itemPriceRoot: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: '100%',
  },
  itemPriceText: {
    fontWeight: '600',
    fontSize: 18,
    fontFamily: Fonts.CONDENSED,
  },
});

export default style;
