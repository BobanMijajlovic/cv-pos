import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';
import {Fonts} from '../../constants/Constants';
import {transparentize} from 'polished';

const style = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  quantityChangeContainer: {
    maxWidth: '100%',
  },
  keyboardContainer: {
    flex: 1,
    width: '100%',
  },
  title: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
    textTransform: 'uppercase',
    marginBottom: 10,
    fontFamily: Fonts.CONDENSED,
    color: Colors.PALETTE.BLUE._700,
  },
  articlePart: {
    height: 70,
    maxWidth: '100%',
    paddingHorizontal: 10,
    marginVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: transparentize(0.95, Colors.PALETTE.GRAY._500),
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.PALETTE.GRAY._300,
    borderRadius: 5,
    shadowColor: Colors.PALETTE.GRAY._200,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  row: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  articleDescription: {
    fontSize: 17,
    fontWeight: 'bold',
    lineHeight: 20,
    fontFamily: Fonts.CONDENSED,
  },
  articleTax: {
    fontSize: 16,
    padding: 1,
    textAlign: 'center',
    color: Colors.PALETTE.GRAY._500,
    fontFamily: Fonts.CONDENSED,
  },
  articleBarCodeText: {
    fontSize: 15,
    color: Colors.PALETTE.GRAY._600,
    fontFamily: Fonts.CONDENSED,
  },
  articlePriceText: {
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: Fonts.CONDENSED,
  },
  changeQtyContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
    height: 60,
  },
  changeQtyInputWrapper: {
    height: '100%',
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeQtyText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.PALETTE.GRAY._800,
  },
  changeQtyButton: {
    height: '100%',
    width: 60,
    padding: 0,
    borderRadius: 10,
  },
  changeQtyButtonIcon: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  confirmButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  buttonConfirmRoot: {
    minWidth: 180,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  buttonConfirmText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default style;
