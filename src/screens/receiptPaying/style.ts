import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';
import {Fonts} from '../../constants/Constants';

const style = StyleSheet.create({
  payingRoot: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flex: 1,
  },
  firstPart: {
    flex: 1,
    paddingVertical: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderStyle: 'solid',
    paddingBottom: 5,
    borderColor: Colors.PALETTE.GRAY._400,
  },
  totalPreviewContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 9,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 2,
  },
  paymentTypesRoot: {
    paddingVertical: 0,
  },
  keyboardContainer: {
    flex: 2,
    minHeight: '45%',
    maxHeight: '50%',
    marginTop: 10,
    borderRadius: 10,
    height: '90%',
    width: '100%',
  },
  keyboardHeader: {
    borderRadius: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    backgroundColor: Colors.PALETTE.GRAY._100,
    minHeight: 25,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.PALETTE.GRAY._300,
  },
  keyboardClearButtonIcon: {
    fontSize: 22,
  },
  keyboardHeaderPreviewCell: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  keyboardHeaderPreview: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 15,
    fontFamily: Fonts.CONDENSED,
  },
  keyboardHeaderHelpPreview: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 12,
    fontFamily: Fonts.CONDENSED,
  },
  keyboardInputPreview: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardInputText: {
    fontSize: 20,
    fontFamily: Fonts.CONDENSED,
  },
  keyboardRoot: {
    flex: 1,
    paddingHorizontal: 0,
  },
  keyboardKeyRoot: {
    minHeight: 40,
    minWidth: 40,
  },
  paymentsRoot: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 0,
    minHeight: 130,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  paymentButton: {
    borderRadius: 100,
    minHeight: 40,
    maxWidth: 150,
    minWidth: 100,
  },
  paymentButtonTitle: {
    fontSize: 13,
  },
  paymentOtherPopoverRoot: {
    width: 120,
    justifyContent: 'space-between',
  },
  paymentOtherButtons: {
    marginBottom: 10,
  },
  finishReceiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: Colors.PALETTE.GRAY._500,
  },
  finishReceiptHeaderRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  finishReceiptHeaderHelpText: {
    fontSize: 15,
    color: Colors.PALETTE.GRAY._700,
    fontWeight: '600',
    paddingTop: 3,
  },
  finishReceiptHeaderText: {
    fontSize: 16,
    color: Colors.BLACK,
    fontWeight: 'bold',
  },
  finishReceiptContainer: {
    flex: 3,
    paddingTop: 5,
    paddingHorizontal: 5,
  },
  finishReceiptClientContainer: {
    marginVertical: 10,
    flex: 2,
  },
  finishReceiptBuyerOpacity: {
    opacity: 0.5,
  },
  finishReceiptClientContainerHeader: {
    fontSize: 15,
    color: Colors.PALETTE.GRAY._600,
    fontWeight: '700',
  },
  finishReceiptClientContainerText: {
    fontSize: 13,
    color: Colors.PALETTE.GRAY._800,
    fontWeight: '300',
  },
  finishReceiptClientContainerHelpText: {
    fontSize: 13,
    color: Colors.PALETTE.GRAY._900,
  },
  finishReceiptPartContainerCell: {
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  advanceFinishButton: {
    width: 80,
    borderColor: Colors.PALETTE.BLUE._700,
    borderRadius: 20,
    height: 35,
  },
  advanceFinishButtonLabel: {
    fontSize: 13,
  },
  submitButtonRoot: {
    width: 140,
    borderColor: Colors.PALETTE.BLUE._700,
    borderRadius: 20,
    height: 60,
    marginTop: 10,
  },
  cancelButtonRoot: {
    width: 140,
    borderColor: Colors.PALETTE.RED._800,
    borderRadius: 20,
    height: 60,
    marginTop: 10,
  },
  buttonTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  receiptFooterRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 2,
  },
  receiptHeaderRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 2,
  },
  receiptHeaderTextRoot: {
    flex: 2,
  },
  headerText: {
    fontSize: 15,
    color: Colors.PALETTE.GRAY._700,
    fontWeight: '600',
    width: '100%',
    textAlign: 'right',
  },
  finishReceiptIconRoot: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  finishReceiptIcon: {
    fontSize: 80,
    color: Colors.PALETTE.GRAY._600,
    opacity: 0.6,
    paddingVertical: 25,
  },
});

export default style;
