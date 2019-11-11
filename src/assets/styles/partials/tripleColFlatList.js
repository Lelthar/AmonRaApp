import { StyleSheet,PixelRatio } from "react-native";

const imageRatio = PixelRatio.getPixelSizeForLayoutSize(60);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"white",
    },
    image: {
      flex: 1,
      resizeMode: "stretch",
    },
    list_item:{
      height: imageRatio,
      width: "33.3%",
      padding: "2%",
      backgroundColor:"white",
    },
    list_style: {
      marginLeft: "4%",
      marginRight: "4%",
      paddingTop: "5%",
      width:"93%",
      justifyContent: "space-evenly",
    }
  });

export default styles;
