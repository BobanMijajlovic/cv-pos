import {StyleSheet} from 'react-native';
import {Colors} from 'src/constants/Colors';
import {rgba, transparentize} from 'polished';

const style = StyleSheet.create({
  root: {
    flexDirection: 'row',
    minHeight: 60,
    width: '90%',
    borderRadius: 6,
    backgroundColor: Colors.WHITE,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start', // in case of rtl the text will start from the right
  },
  borderLeft: {
    borderLeftWidth: 5,
    borderLeftColor: Colors.PALETTE.CYAN._300,
  },
  messageContainer: {
    justifyContent: 'center',
  },
  titleContainer: {
    paddingVertical: 2,
  },
  titleText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
    color: transparentize(0.8, Colors.PALETTE.RED._900),
  },
  messageText: {
    fontSize: 10,
    color: transparentize(0.2, Colors.PALETTE.RED._900),
  },
  leadingIconContainer: {
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leadingIcon: {
    fontSize: 17,
    color: Colors.PALETTE.GRAY._400,
  },
  closeIconContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 25,
  },
  error: {
    color: Colors.PALETTE.RED._900,
  },
  success: {
    color: Colors.PALETTE.GREEN._900,
  },
  info: {
    color: Colors.PALETTE.LIGHT_BLUE._400,
  },
});

export default style;
