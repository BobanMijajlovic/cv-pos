import {StyleSheet} from 'react-native';
import {Colors} from 'src/constants/Colors';

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    height: 90,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
    borderStyle: 'solid',
    borderBottomColor: Colors.PALETTE.GRAY._600,
    borderBottomWidth: 2,
    paddingHorizontal: 10,
    backgroundColor: Colors.PALETTE.BLUE_GRAY._50,
  },
  labels: {
    color: Colors.PALETTE.BLUE._900,
    marginLeft: 10,
    paddingLeft: 0,
  },
  submitButtonRoot: {
    width: 120,
    borderColor: Colors.PALETTE.BLUE._700,
    borderRadius: 10,
    marginLeft: 10,
    height: 40,
  },
  submitButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default style;
