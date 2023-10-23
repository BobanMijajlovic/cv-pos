import {StyleSheet} from 'react-native';
import {Fonts} from '../../../constants/Constants';
import {Colors} from '../../../constants/Colors';
import {transparentize} from 'polished';

const style = StyleSheet.create({
  paymentTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.PALETTE.GRAY._400,
    minHeight: 40,
    flex: 1,
    backgroundColor: Colors.WHITE,
    position: 'relative',
  },
  paymentTypeDisabled: {
    backgroundColor: Colors.PALETTE.GRAY._100,
  },
  disabled: {
    color: Colors.PALETTE.GRAY._400,
  },
  paymentLabelButton: {
    flex: 2,
  },
  paymentLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 2,
    position: 'relative',
    paddingHorizontal: 0,
    //backgroundColor: transparentize(0.75, Colors.PALETTE.GRAY._200),
  },
  deleteButton: {
    fontSize: 20,
  },
  paymentLabel: {
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: '500',
    color: Colors.PALETTE.BLUE_DARK._700,
    fontFamily: Fonts.CONDENSED,
    minWidth: 60,
  },
  shortcutButton: {
    fontSize: 26,
  },
  paymentInputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 3,
    minWidth: 120,
  },
  paymentIcon: {
    fontSize: 18,
  },
  paymentInputButtonShortcut: {
    marginRight: 5,
  },
  paymentInputText: {
    fontSize: 18,
    fontFamily: Fonts.CONDENSED,
    fontWeight: '600',
    color: Colors.PALETTE.BLUE_DARK._700,
  },
  rightBorder: {
    backgroundColor: Colors.PALETTE.RED._400,
    width: 4,
    position: 'absolute',
    right: 0,
  },
});

export default style;
