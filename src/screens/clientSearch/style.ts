import {StyleSheet} from 'react-native';
import {Colors} from 'src/constants/Colors';

const style = StyleSheet.create({
  root: {
    flex: 1,
    paddingVertical: 10,
  },
  header: {
    height: 48,
    marginBottom: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInputContainer: {
    height: '100%',
    width: '90%',
    maxWidth: '95%',
    alignItems: 'center',
  },
  headerInputRoot: {
    width: '100%',
  },
  content: {
    flex: 2,
  },
  itemRoot: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.WHITE,
    //borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    shadowColor: Colors.PALETTE.GRAY._500,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    minHeight: 95,
    maxHeight: 110,
    borderBottomWidth: 2,
    borderBottomColor: Colors.PALETTE.GRAY._400,
    borderStyle: 'solid',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    position: 'relative',
  },
  itemOdd: {
    backgroundColor: Colors.PALETTE.LIGHT_BLUE._50,
  },
  contentContainer: {
    flexDirection: 'column',
    flex: 1,
    height: '100%',
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameLabel: {
    flex: 2,
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
  },
  pibAndMbText: {
    textAlign: 'right',
    color: Colors.PALETTE.GRAY._700,
    fontSize: 14,
  },
  addressContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
  },
  addressText: {
    fontWeight: '600',
    fontSize: 15,
    color: Colors.PALETTE.GRAY._600,
  },
  dataContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default style;
