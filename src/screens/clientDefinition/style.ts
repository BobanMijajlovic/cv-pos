import {StyleSheet} from 'react-native';
import {Colors} from 'src/constants/Colors';

const style = StyleSheet.create({
  labelMain: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 22,
    textTransform: 'uppercase',
    marginBottom: 35,
    //fontFamily: Fonts.CONDENSED,
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
  buttons: {
    alignItems: 'center',
    marginTop: 15,
  },
  buttonConfirmText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  buttonConfirmRoot: {
    minWidth: 100,
  },
});

export default style;
