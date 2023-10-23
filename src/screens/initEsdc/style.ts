import {StyleSheet} from 'react-native';
import {Colors} from 'src/constants/Colors';
import {Fonts} from 'src/constants/Constants';

const style = StyleSheet.create({
  root: {
    height: '100%',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  listContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    flex: undefined,
  },
  icon: {
    fontSize: 80,
    color: Colors.PALETTE.GRAY._600,
    opacity: 0.6,
    paddingVertical: 25,
  },
  containerText: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: Fonts.CONDENSED,
    color: Colors.PALETTE.GRAY._600,
  },
  confirmButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttonConfirm: {
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  buttonConfirmText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconSuccess: {
    color: Colors.PALETTE.GREEN._700,
  },
  iconDanger: {
    color: Colors.PALETTE.RED._800,
  },
  iconInit: {
    color: Colors.PALETTE.BLUE._700,
  },
});

export default style;
