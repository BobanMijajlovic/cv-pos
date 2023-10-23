import {StyleSheet} from 'react-native';
import {Colors} from 'src/constants/Colors';
import {rgba} from 'polished';

const style = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: '100%',
    backgroundColor: rgba(238, 238, 238, 0.7),
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.WHITE,
    paddingVertical: 35,
    alignItems: 'center',
    /*  borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,*/
    width: '100%',
    minHeight: 350,
    position: 'relative',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalCloseButtonRoot: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  modalCloseIcon: {
    color: Colors.PALETTE.GRAY._600,
    fontSize: 25,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

export default style;
