import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterButton: {
    position:'absolute', 
    left:0, 
    bottom:0,
  },
  filterMenu: {
    position:'absolute', 
    left: 0,
    bottom: 0,
  },
  imgContainer:{
    flex:5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  squareButton: {
    resizeMode:'contain',
    flex:1,
  },
});

export default styles;