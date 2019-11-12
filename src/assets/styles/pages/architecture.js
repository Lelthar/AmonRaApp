import { StyleSheet,PixelRatio } from "react-native";

const imageRatio = PixelRatio.getPixelSizeForLayoutSize(80);

const styles = StyleSheet.create({

  container:{
    flex:1,
    flexDirection:'row',
    alignItems: 'center',
  },
  image:{
    flex: 1,
    backgroundColor: 'black',
    resizeMode: "stretch",
  },
  list_item:{
    height: imageRatio,
    width: "50%",
    padding: "2%",
    backgroundColor:"#ffffff",
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
