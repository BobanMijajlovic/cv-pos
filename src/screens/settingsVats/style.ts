import {StyleSheet} from 'react-native';
import {Colors} from 'src/constants/Colors';

const style = StyleSheet.create({
  root: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 10,
  },
  validFormContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: Colors.PALETTE.GRAY._500,
  },
  validFormText: {
    fontSize: 17,
    fontWeight: '900',
    color: Colors.PALETTE.GRAY._700,
  },
  vatItemContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderStyle: 'solid',
    borderBottomColor: Colors.PALETTE.GRAY._400,
    borderBottomWidth: 1,
  },
  vatItemOddContainer: {
    backgroundColor: Colors.PALETTE.BLUE_GRAY._100,
  },
  vatItemLabelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vatItemLabelBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.PALETTE.GRAY._500,
    backgroundColor: Colors.PALETTE.BLUE._200,
    minHeight: 30,
    minWidth: 30,
  },
  vatItemLabelText: {
    fontSize: 18,
    color: Colors.WHITE,
  },
  vatItemsNameAndValueContainer: {
    flex: 2,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  vatItemsNameText: {
    flex: 1,
    fontSize: 12,
    color: Colors.PALETTE.GRAY._700,
    textAlign: 'center',
  },
  vatItemsValueText: {
    flex: 1,
    fontSize: 14,
    color: Colors.PALETTE.GRAY._800,
    textAlign: 'right',
    fontWeight: 'bold',
    paddingRight: 20,
  },
});

export default style;
