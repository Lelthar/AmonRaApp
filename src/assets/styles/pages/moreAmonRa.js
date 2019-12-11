import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 3,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  buttonsSection: {
    backgroundColor:"white",
    flex: 6,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 400,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#111111',
  },
});

export default styles;
