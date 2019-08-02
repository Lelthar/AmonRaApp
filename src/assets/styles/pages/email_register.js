import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  checkbox:{
    alignSelf: 'center'
  },
  checkImage:{
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
  backArrow:{
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  imgButton:{
    flex:1,
    width: 20,
    height: 20,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  generoInput: {
    flex:2,
    alignSelf: 'center',
    fontSize: 18,
    color: '#6D6E71',
  },
  anhoInput: {
    flex:6,
    alignSelf: 'center',
    fontSize: 18,
    color: '#6D6E71',
  },
  inputBox: {
    flex:7,
    backgroundColor: 'white',
    borderRadius: 25,
    fontSize: 16,
    color: '#000000',
  },
  paisesBox: {
    flex:7,
    borderRadius: 25,
  },
  anhosBox: {
    flex:3,
    borderRadius: 25,
    marginLeft:20,
    marginRight:20, 
  },
  logoContainer:{
    flex:2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoRegisterScreen: {
    resizeMode: 'center',
    width : 180,
    height : 80,
    marginBottom: 30,
  },
  inputData: {
    flexDirection:"row",
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginRight:10,
    marginLeft:10,
  },
  inputDataYears: {
    flexDirection:"row",
    marginRight:10,
    marginLeft:10,
  },
  submitButtonContainer: {
    marginRight:10,
    marginLeft:10,
    marginBottom: 20,
    marginTop: 20,
    alignItems: "center",
  },
  submitButton: {
    alignItems: 'center',
    backgroundColor: '#00A2B5',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  inputsContainer: {
    backgroundColor:"#fff",
    marginRight:30,
    marginLeft:30,
    marginTop:20
  },
  acceptButtonText: {
    color: 'white',
    fontSize: 18
  },
});

export default styles;