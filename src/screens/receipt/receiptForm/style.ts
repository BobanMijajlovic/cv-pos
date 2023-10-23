import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from 'src/constants/Colors';
import {isIOS} from 'react-native-woodpicker/dist/helpers/iphone';

const style = StyleSheet.create({
  root: {
    paddingHorizontal: 5,
    alignItems: 'stretch',
    width: '100%',
    zIndex: -1,
    justifyContent: 'center',
  },
  rootRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    //paddingVertical: 7,
  },
  receiptTypeHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 7,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: Colors.PALETTE.GRAY._50,
    position: 'absolute',
    top: 4,
    left: 2,
    width: '100%',
  },
  receiptTypeHeaderText: {
    textAlign: 'left',
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.PALETTE.GRAY._500,
  },
  partHeader: {
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.PALETTE.GRAY._500,
  },
  optionalDataRoot: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 8,
  },
  optionalDataRootIcon: {
    fontSize: 25,
    color: Colors.PALETTE.BLUE._700,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  receiptInfoDefinitionBackgroundIcon: {
    color: Colors.PALETTE.BLUE._700,
    opacity: 0.07,
    position: 'absolute',
    fontSize: 50,
    zIndex: -1,
    bottom: 10,
    right: 10,
  },
  labels: {
    color: Colors.PALETTE.BLUE._900,
    marginLeft: 10,
    paddingLeft: 0,
    fontSize: 13,
  },
  selectionStyle: {
    borderColor: Colors.PALETTE.BLUE._700,
  },
  selectionRoot: {
    flex: 1,
  },
  inputIcon: {
    alignItems: 'center',
    fontSize: 20,
  },
  inputIconDisabled: {
    color: Colors.PALETTE.GRAY._400,
  },
  labelSection: {
    textAlign: 'right',
    fontSize: 11,
    fontWeight: 'bold',
    color: Colors.PALETTE.GRAY._700,
    position: 'absolute',
    top: 4,
    right: 40,
  },
  labelWithCheck: {
    position: 'relative',
    right: 'auto',
    top: 'auto',
    paddingRight: 10,
  },
  rootSection: {
    position: 'relative',
    paddingHorizontal: 6,
    marginTop: 4,
  },

  rootSectionGray: {
    backgroundColor: Colors.PALETTE.GRAY._50,
  },

  labelWithCheckRoot: {
    position: 'absolute',
    right: 1,
    top: 4,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bodyDataPart: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flex: 2,
    paddingTop: 30,
    minHeight: (Dimensions.get('window').height * 70) / 100,
  },
  refundInputRoot: {
    flex: 1,
    marginRight: 2,
  },
  dateTimeInputLabel: {
    borderColor: Colors.PALETTE.BLUE._800,
    borderRadius: 5,
  },
  dateTimeInputText: {
    color: Colors.PALETTE.BLUE._800,
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: isIOS ? 10 : 8,
  },
  dateTimeInputRoot: {
    flex: 1,
    marginLeft: 2,
  },
});

export default style;
