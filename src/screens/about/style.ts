import {StyleSheet} from 'react-native';
import {Colors} from 'src/constants/Colors';

const style = StyleSheet.create({
  aboutContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 3,
    paddingLeft: 5,
  },
  aboutHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.PALETTE.GRAY._800,
    marginBottom: 5,
    marginTop: 3,
  },
  aboutText: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.BLACK,
  },
  aboutHelpText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.BLACK,
  },
});

export default style;
