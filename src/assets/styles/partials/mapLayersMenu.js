import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  capasMenu: {
    flex: 1,
    flexDirection:"column",
    backgroundColor:"white",
  },
  imageStyles: {
    height: "100%",
    width: "100%",
  },
  imgContainerStyle:{
    marginTop: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainerBarrioAmon:{
    marginTop: 5,
    marginBottom: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareButton: {
    resizeMode:'contain',
    flex: 1,
  },
});

export default styles;