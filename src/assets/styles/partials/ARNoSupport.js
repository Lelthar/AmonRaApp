import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  outer : {
    flex : 1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: "#08545c",
  },
  inner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "#08545c",
  },
  title: {
    fontSize: 15,
    fontFamily: "Barlow-Regular",
    color: "#ffffff",
    fontWeight: 'bold',
    textAlign: "center",
  },
});

export default Styles;