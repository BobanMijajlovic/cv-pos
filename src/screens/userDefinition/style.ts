import {StyleSheet} from 'react-native';
import {Colors} from 'src/constants/Colors';

const style = StyleSheet.create({
  labelMain: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 22,
    textTransform: 'uppercase',
    marginBottom: 35,
    color: Colors.PALETTE.BLUE._900,
  },
  labels: {
    color: Colors.PALETTE.BLUE._900,
    marginLeft: 10,
    paddingLeft: 0,
  },
  scrollView: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  viewRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  buttonConfirmText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  buttonConfirmRoot: {
    minWidth: 100,
  },
  usersDefinitionBackgroundIcon: {
    color: Colors.PALETTE.BLUE._700,
    opacity: 0.07,
    fontSize: 50,
    zIndex: -1,
  },
});

export default style;
