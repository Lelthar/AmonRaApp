import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  imageOr: {
    width: "100%",
    height: 250,
  },
  titleOr: {
    textAlign: "center", fontSize:20,
    fontFamily: "vincHand",
    color: "#0C5B60",
    padding:20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  descriptionOr: {
    textAlign: "left", fontSize:18,
    color: "#0C5B60",
    paddingLeft:20,
    paddingRight:20,
  },
  directionOr:{
    textAlign: "center", fontSize:15,
    color: "grey",
    marginLeft: 20, 
    marginRight: 50,
    marginTop: 50,
    textAlign: 'left',
  },
  phoneOr:{
    textAlign: "center", fontSize: 15,
    color: "grey",
    marginLeft: 20, 
    marginRight: 20,
    textAlign: 'left',
  },
  facebookOr:{
    textAlign: "center", fontSize: 15,
    color: "grey",
    marginLeft: 20, 
    marginRight: 20,
    marginBottom: 150,
    textAlign: 'left',
  },
  container: {
    flex:1,
    backgroundColor: 'white',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#111111',
  },
});

export default styles;
