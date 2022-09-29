import {StyleSheet} from 'react-native';
import {Colors} from 'src/constants/Colors';

const style = StyleSheet.create({
  root: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderStyle: 'solid',
    borderBottomColor: Colors.PALETTE.GRAY._400,
    borderBottomWidth: 2,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  headerText: {
    color: Colors.PALETTE.GRAY._700,
    fontWeight: 'bold',
  },
  valueText: {
    color: Colors.PALETTE.GRAY._500,
  },
  partHeaderText: {
    color: Colors.PALETTE.BLUE._700,
    fontWeight: 'bold',
    flex: 1,
  },
  labels: {
    color: Colors.PALETTE.BLUE._900,
    fontSize: 12,
    marginLeft: 10,
    paddingLeft: 0,
  },
  input: {
    marginTop: 5,
    paddingVertical: 1,
    paddingHorizontal: 7,
  },
  inputPortRoot: {
    flex: 1,
  },
  submitButtonRoot: {
    width: 120,
    borderColor: Colors.PALETTE.BLUE._700,
    borderRadius: 10,
    marginLeft: 10,
    height: 35,
  },
  submitButtonTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  serverHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.PALETTE.GRAY._800,
  },
  serverHeaderContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});

export default style;
