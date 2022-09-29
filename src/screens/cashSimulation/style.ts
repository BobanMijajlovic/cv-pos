import {
  StyleSheet,
  Dimensions
} from "react-native";
import { Colors } from "src/constants/Colors";

const style = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: 30,
    width: Dimensions.get("screen").width *98/100,
    marginLeft: Dimensions.get("screen").width *1/100,
    borderTopColor: Colors.PALETTE.GRAY._400,
    borderTopWidth: 1,
    backgroundColor: Colors.PALETTE.GRAY._50,
    padding: 4,
    height: 0
  },

  rootVisible : {
    height: Dimensions.get("screen").height / 2,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: -0.5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 4,
    bottom: 40,
  },

  displayRoot: {
    borderWidth: 1,
    borderColor: Colors.PALETTE.BLUE._100,
    borderRadius: 4,
    marginBottom: 2,
    backgroundColor: Colors.PALETTE.BLUE._50,
  },
  displayLine: {
    color: Colors.PALETTE.GRAY._800,
    fontSize: 26,
    fontWeight: "500",
    textAlign: "right",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 3,
    paddingBottom: 3,

  },
  displayFirstLine: {
    color: Colors.PALETTE.GRAY._700,
    fontSize: 15,
    fontWeight: "700",
    textAlign: "left",
    paddingBottom: 0,
  },
  displayError: {
    color: Colors.PALETTE.RED._900,
    textAlign: "center"
  },
})

export default style;

