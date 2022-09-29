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
    marginVertical: 7,
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
    marginLeft: 10,
    color: Colors.PALETTE.WHITE._50,
  },
  defineButtonRoot: {
    marginLeft: 10,
  },
  defineButtonText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default style;
