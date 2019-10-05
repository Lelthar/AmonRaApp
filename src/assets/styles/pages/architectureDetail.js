import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container:{
    flex:1,
  },
  imageContainer:{
  	flex: 0.25
  },
  informationContainer:{

  	flex:0.75
  },
  image:{
    width: '100%',
    height: '100%',
    backgroundColor: 'black'

  },
  textTitle:{
  	color: '#00A2B5',
  	textAlign: "center", 
  	fontSize:25,
  	marginTop:'5%',
    marginLeft: '5%',
    marginRight: '5%'
  },
  scroll:{
    marginTop:'5%',
    marginBottom:'5%'
  }
  
});

export default styles;