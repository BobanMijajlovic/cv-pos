import {StyleSheet} from 'react-native';
import {Colors} from 'src/constants/Colors';

const style = StyleSheet.create({
  root: {
    padding: 2,
  },
  dateTimePickerContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  dateLabel: {
    paddingBottom: 2,
    transform: [{scale: 0.9}],
    color: Colors.PALETTE.BLUE._900,
  },
  dateValueContainer: {
    color: Colors.PALETTE.GRAY._800,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.PALETTE.GRAY._800,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  dateValueText: {
    color: Colors.PALETTE.GRAY._800,
    fontSize: 15,
  },
  error: {
    minHeight: 20,
    paddingTop: 1,
    transform: [{scale: 0.85}],
    color: Colors.PALETTE.RED._800,
  },
});

export default style;
