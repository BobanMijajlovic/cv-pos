import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from 'src/constants/Colors';

const style = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 10,
    backgroundColor: Colors.PALETTE.GRAY._100,
  },
  dashboardContainer: {
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    flex: 1,
  },
  dashboardButtonContainer: {
    marginVertical: 10,
    marginHorizontal: '2%',
    width: '40%',
    height: 100,
    backgroundColor: Colors.WHITE,
    borderStyle: 'solid',
    borderColor: Colors.PALETTE.BLUE._600,
    borderWidth: 2,
    borderRadius: 20,
    shadowColor: Colors.PALETTE.GRAY._950,
    shadowOffset: {
      width: 5,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.5,
    elevation: 5,
  },
  dashboardButtonRoot: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  dashboardButtonIcon: {
    textAlign: 'center',
    fontSize: 35,
    marginBottom: 12,
    color: Colors.PALETTE.BLUE._700,
  },
  dashboardButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.PALETTE.GRAY._800,
    textAlign: 'center',
    // fontFamily: Fonts.CONDENSED,
  },
  drawerRoot: {
    zIndex: 100,
    backgroundColor: Colors.PALETTE.GRAY._200,
    maxWidth: Dimensions.get('window').width,
    flex: 1,
    maxHeight: Dimensions.get('window').height,
  },
  drawerContainer: {
    width: '100%',
    height: '100%',
  },
  drawerContent: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerOpen: {
    left: 0,
  },
  drawerCloseIcon: {
    fontSize: 24,
  },
});

export default style;
