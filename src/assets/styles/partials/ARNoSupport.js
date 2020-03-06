import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  mainContainer: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: "#10535D",
  },
  logoContainer:{
    height: "15%",
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
    width: '65%',
    bottom: 100,
  },
  brandImage: {
    width: '100%',
    resizeMode: 'contain',
  },
  textContainer: {
    marginBottom: 30,
  },
  message: {
    fontSize: 18,
    fontFamily: "Barlow-Regular",
    color: "#ffffff",
    textAlign: "center",
  },
  bold: {
    fontSize: 22,
    fontWeight: '500',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  button: {
    width: '85%',
    height: "15%",
    backgroundColor: 'white',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 20,
  },
  arCoreImage: {
    width: '100%',
    resizeMode: 'contain',
  },
});

export default Styles;