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
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  viewRoot: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vatsList: {
    flex: 1,
    width: '100%',
  },
  buttons: {
    alignItems: 'center',
    marginTop: 20,
  },
  vatsHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderStyle: 'solid',
    borderBottomColor: Colors.PALETTE.BLUE._700,
    borderBottomWidth: 1,
    paddingVertical: '2%',
    paddingHorizontal: '2%',
  },
  vatsHeaderText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.PALETTE.BLUE._900,
  },
  vatErrorText: {
    color: Colors.PALETTE.RED._900,
    fontSize: 12,
  },
  input: {
    paddingVertical: 2,
    paddingHorizontal: 7,
  },
  selectRoot: {
    flex: 0.4,
    width: 50,
  },
  select: {
    height: 35,
    borderColor: Colors.PALETTE.BLUE._700,
  },
  articleDefinitionBackgroundIcon: {
    color: Colors.PALETTE.BLUE._700,
    fontSize: 300,
    opacity: 0.07,
    position: 'absolute',
  },
  inputBarcodeRoot: {
    flex: 1.7,
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
  buttonRoot: {
    paddingVertical: 15,
    justifyContent: 'center',
  },
});

export default style;
