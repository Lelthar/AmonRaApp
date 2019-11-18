import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#00A2B5",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#00A2B5",
    padding: 20,
  },
  nameText: {
    color: "white",
    fontSize: 20,
  },
  tagName: {
    marginTop: 10,
    color: "white",
    fontSize: 16,
  },
  emptyResults: {
    fontSize: 16,
    textAlign: "center",
  },
  emptyResultsContainer: {
    flex: 1,
    justifyContent: "center",
  },
});

export default styles;
