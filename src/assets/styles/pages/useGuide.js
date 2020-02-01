import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex:1, 
    flexDirection:'row', 
    flexWrap:'wrap',
    alignItems:'center',
    justifyContent: 'center',
  },
  button:{
    width: '35%',
    height: '30%',
    marginLeft: '5%',
    marginRight: '5%',
  },
  imageResizeAndFillParent: {
    flex: 1,
    width: null,
    height: null,
  },
});

export default styles;
