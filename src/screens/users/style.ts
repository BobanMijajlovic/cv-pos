import {StyleSheet} from 'react-native';
import {Colors} from 'src/constants/Colors';

const style = StyleSheet.create({
  root: {
    justifyContent: 'center',
    flex: 1,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 7,
    height: 55,
    paddingHorizontal: 10,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderStyle: 'solid',
    borderColor: Colors.PALETTE.GRAY._400,
  },
  inputSearchContainer: {
    flex: 2,
    alignItems: 'center',
    height: '100%',
  },
  inputSearchRoot: {
    width: '100%',
  },
  defineNewButtonRoot: {
    fontSize: 20,
    borderRadius: 10,
    marginTop: 7,
    marginLeft: 10,
    color: Colors.PALETTE.WHITE._50,
    alignItems: 'center',
  },
  previewTextStyle: {
    color: Colors.PALETTE.GRAY._500,
    fontSize: 15,
  },
  previewHeaderText: {
    color: Colors.PALETTE.GRAY._700,
    fontSize: 17,
    fontWeight: 'bold',
  },
  previewLabelText: {
    color: Colors.PALETTE.GRAY._600,
    fontSize: 16,
    fontWeight: '700',
  },
  previewHeaderContainer: {
    borderStyle: 'solid',
    borderBottomColor: Colors.PALETTE.GRAY._950,
    borderBottomWidth: 2,
    paddingVertical: 5,
  },
  previewContentContainer: {
    paddingVertical: 5,
    borderStyle: 'solid',
    borderBottomColor: Colors.PALETTE.GRAY._700,
    borderBottomWidth: 1,
  },
  defineButtonRoot: {
    minWidth: 85,
    borderColor: Colors.PALETTE.BLUE._700,
    borderRadius: 10,
    marginLeft: 10,
    paddingVertical: 7,
    paddingHorizontal: 5,
  },
  defineButtonText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  logoutIconRoot: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
  },
  logoutIcon: {
    fontSize: 20,
    color: Colors.BLACK,
  },
});

export default style;
