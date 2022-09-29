import {StyleSheet} from 'react-native';
import {Colors} from 'src/constants/Colors';

const styles = StyleSheet.create({
  app: {
    //...StyleSheet.absoluteFillObject,
  },
  content: {
    padding: 16,
    backgroundColor: Colors.PALETTE.GRAY._100,
    borderRadius: 8,
  },
  arrow: {
    borderTopColor: Colors.PALETTE.GRAY._100,
  },
  background: {
    backgroundColor: 'rgba(0, 0, 255, 0.1)',
  },
});

export default styles;
