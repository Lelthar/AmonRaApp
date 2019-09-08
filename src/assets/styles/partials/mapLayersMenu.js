import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  capasMenu: {
    backgroundColor: 'white',
    flex:20,
    flexDirection:'row',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imgContainer:{
    flex:5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareButton: {
    resizeMode:'contain',
    flex:1,
  },
});

export default styles;