import {StyleSheet} from 'react-native';
import {Colors} from 'src/constants/Colors';
import {rgba} from 'polished';

const style = StyleSheet.create({
  root: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '50%',
    zIndex: 1,
    backgroundColor: rgba(117, 117, 117, 0.2),
  },
  toastContainer: {
    width: '65%',
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    borderStyle: 'solid',
    borderLeftColor: Colors.PALETTE.RED._800,
    borderColor: Colors.PALETTE.RED._800,
    borderWidth: 2,
    paddingVertical: 10,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: Colors.WHITE,
    paddingVertical: '3%',
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '3%',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.PALETTE.GRAY._700,
  },
  msgText: {
    color: Colors.PALETTE.GRAY._500,
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  buttonContainer: {
    width: '40%',
    marginTop: 5,
  },
});

export default style;
