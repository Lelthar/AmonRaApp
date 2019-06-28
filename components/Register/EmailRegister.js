import React from 'react';
import {StackActions, NavigationActions} from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Dropdown } from 'react-native-material-dropdown';

import { 
  REGISTRATION_URL,
  USER_DATA,
} from '../../constants/constants';


import {
  Alert,
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Picker,
  AsyncStorage,
} from 'react-native';

import * as countries from '../../data/countries';
import ConfidencialityAlertModal from '../ConfidencialityAlertModal/ConfidencialityAlertModal';
import CheckBox from 'react-native-check-box'

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} = FBSDK;

const logo = '../../images/marca-02.png';
const background = '../../resources/img/casa-verde-I.png';
let anho = [];
const paises = [];

export default class RegisterMain extends React.Component {

  static navigationOptions = {
    title: 'Email Register',
  }

  constructor (props) {
    super(props);
    this.state = {
      name: '',
      lastName: '',
      email: '',
      country: '',
      gender: '',
      date: '',
      method: 'email',
      validated: false,
      one: false,
      two: false,
      isConfidencialityAlertVisible: false,
      checkedH:false,
      checkedM:false,
      buttonDisabled: false,
      titulo_pais: "País",
      titulo_anhos: "Año"
    }
    for(let i = 1900; i < 2020; i++){
      anho.push({value:i.toString()});
    }
    anho = anho.reverse();
    for(let i = 0; i < countries.countries.length; i++) {
      paises.push({value:countries.countries[i]});
    }
  };

_showConfidencialityAlert(){
  this.setState({ isConfidencialityAlertVisible: !this.state.isConfidencialityAlertVisible });
}

_goToMainApp(){
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'MainApp' })],
  });
  this.props.navigation.dispatch(resetAction);
}

_goToBackApp(){
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'RegisterMain' })],
  });
  this.props.navigation.dispatch(resetAction);
}

changeButtonToDisabled(){
  this.setState(
    {buttonDisabled: true}
  );
}

changeButtonToAbled(){
  this.setState(
    {buttonDisabled: false}
  );
}

async _emailRegister(){
  const response = await fetch(REGISTRATION_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: this.state.email,
      password: this.state.email,
      password_confirmation: this.state.email,
      name: this.state.name,
      lastname: this.state.lastName,
      country: this.state.country,
      year_birth: this.state.date,
      gender: this.state.gender
    }),
  }).catch((error) => {
      console.error(error);
    });
  const responseJson = await response.json();
  const headersJson = await response.headers.map;
  
  if (responseJson.status === 'success') {

    const userData = {
      'access-token': headersJson['access-token'],
      client: headersJson.client,
      uid: headersJson.uid,
      email: responseJson.data.email
    };
    AsyncStorage.setItem(USER_DATA, JSON.stringify(userData));

    this._showConfidencialityAlert();
    
  } else {
    alert(responseJson.errors.full_messages[0]);
    this.changeButtonToAbled();
  }
}


isNoTextInputEmpty() {

  const name = this.state.name;
  const lastName = this.state.lastName;
  const email = this.state.email;
  const date = this.state.date;
  const country = this.state.country;

  let message = "";

  if(name == '') {
    message += "El nombre es obligatorio.\n";
    this.setState({name});
  }
  if(lastName == '') {
    message += "El apellido es obligatorio.\n";
    this.setState({lastName})
  } 
  if(email == '') {
    message += "El correo es obligatorio.\n";
    this.setState({email})
  }
  if(date == '') {
    message += "El año de nacimiento es obligatorio.\n";
    this.setState({date})
  }

  if (message == "") {
    return true;
  } else {
    Alert.alert(message);
    return false;
  }

}

hasEmailGoodFormat(email) {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(email);
}


pre_register( ){

  if (this.isNoTextInputEmpty()) {
    const email = this.state.email;

    if (this.hasEmailGoodFormat(email)) {
      this.setState({email});
      this.changeButtonToDisabled();
      this._emailRegister();
    } else {
      Alert.alert("El email no es válido");
      this.setState({email});
    }
  }
}

renderModal(){
  return(
    <ConfidencialityAlertModal isVisible={this.state.isConfidencialityAlertVisible} okAction={this._goToMainApp.bind(this)}/>
  );
}

render (){
  return(

    <ImageBackground source={require(background)} style={styles.body} >
      {this.renderModal()}
      {!this.state.isConfidencialityAlertVisible &&
      <View style={styles.body}>
        <View style={styles.LogoContainer}>
        <View style={{flex:1,position: 'absolute',left:10,top:10}}>
          <TouchableOpacity style={styles.BackButton} onPress = {this._goToBackApp.bind(this)}>
            <Image source={require('../../images/icons/PantallaPrincipal/atras.png')} style={styles.backArrow} />
          </TouchableOpacity>
          </View>
          <View style={{flex:2,marginTop:70,marginBottom:20}}>
            <Image source={require(logo)} style={styles.LogoRegisterScreen}/>
          </View>
        </View>
        <View style={{flex:6}}>
          <View style={styles.InputsContainer}>
            <View style={styles.InputData}>
              <Image style={styles.imgButton} source={require('../../images/icons/register/nombre.png')} />
              <TextInput
                style={styles.inputBox}
                placeholder ="Nombre"
                underlineColorAndroid="transparent"
                autoCapitalize = "words"
                onChangeText={(name) => this.setState({name})}
                value = {this.state.name}
                onSubmitEditing= {()=> this.lastName.focus()}
              />
            </View>
            <View style={styles.InputData}>
              <Image style={styles.imgButton} source={require('../../images/icons/register/blank_background.png')} />
              <TextInput
                style={styles.inputBox} 
                placeholder ="Apellidos"
                underlineColorAndroid={'transparent'}
                onChangeText={(lastName) => this.setState({lastName})}
                value = {this.state.lastName}
                ref= {(input) => this.lastName = input}
                onSubmitEditing= {()=> this.email.focus()}
            />
            </View>
            <View style={styles.InputData}>
              <Image style={styles.imgButton} source={require('../../images/icons/register/correo.png')} />
              <TextInput style={styles.inputBox}
                placeholder ="Correo electrónico"
                underlineColorAndroid={'transparent'}
                keyboardType= "email-address"
                onChangeText={(email)=> this.setState({email})}
                value = {this.state.email}
                ref= {(input) => this.email = input}
              />
            </View>
            <View style={styles.InputData}>
              <Image style={styles.imgButton} source={require('../../images/icons/register/pais.png')} />
              <View style={styles.paisesBox}>
                <Dropdown
                  label={this.state.titulo_pais}
                  data={paises}
                  dropdownPosition={0}
                  value={this.state.country}
                  dropdownOffset={{ top: 17, left: 0 }}
                  onChangeText={(itemValue, itemIndex) => this.setState({country: itemValue, titulo_pais: ""})}
                />
              </View>
            </View>
            <View style={styles.InputData}>
              <Text style={styles.GeneroInput}>Género:</Text>
              <View style={{flex:6, flexDirection:"row"}}>
                <CheckBox 
                  style={styles.checkbox}
                  onClick={()=>{
                      this.setState({
                        checkedM:!this.state.checkedM
                      })
                      this.setState({
                        checkedH:false
                      })
                      if (!this.state.checkedM){
                        this.setState({gender: "Femenino"});
                      }
                      else{
                        this.setState({gender: ''});
                      }
                    }}
                    isChecked={this.state.checkedM}
                    checkedImage={
                      <Image source={require('../../images/icons/registro/check_gris.png')} style={styles.checkImage} />
                    }
                    unCheckedImage={
                      <Image source={require('../../images/icons/registro/check_box_gris.png')} style={styles.checkImage} />
                    }
                  />
                  <TextInput style={styles.inputBox} placeholder ="Femenino"
                    editable={false}
                    selectTextOnFocus={false}
                    underlineColorAndroid={'transparent'}
                  />
                  <CheckBox style={styles.checkbox}
                    onClick={()=>{
                      this.setState({
                        checkedH:!this.state.checkedH
                      })
                      this.setState({
                        checkedM:false
                      })
                      if (!this.state.checkedH){
                        this.setState({gender: "Masculino"});
                      }
                      else {
                        this.setState({gender: ''});
                      }
                    }}
                    isChecked={this.state.checkedH}
                    checkedImage={
                      <Image source={require('../../images/icons/registro/check_gris.png')} style={styles.checkImage} />
                    }
                    unCheckedImage={
                      <Image source={require('../../images/icons/registro/check_box_gris.png')} style={styles.checkImage} />
                    }
                  />
                  <TextInput style={styles.inputBox} placeholder ="Masculino"
                    editable={false}
                    selectTextOnFocus={false}
                    underlineColorAndroid={'transparent'}
                  />
              </View>
            </View>
            <View style={styles.InputDataYears}>
              <Text style={styles.AnhoInput}>Año de nacimiento:</Text>
              <View style={styles.anhosBox}>
                <Dropdown
                  label={this.state.titulo_anhos}
                  data={anho}
                  dropdownPosition={0}
                  value={this.state.date}
                  dropdownOffset={{ top: 17, left: 0 }}
                  onChangeText={(itemValue, itemIndex) => this.setState({date: itemValue, titulo_anhos: ""})}
                />
              </View>
            </View>
            <View style={styles.SubmitButtonContainer}>
              <TouchableOpacity 
                style={styles.SubmitButton}
                disabled={this.state.buttonDisabled}
                onPress = {this.pre_register.bind(this)}
              >
                <Text style={styles.btntext}>ACEPTAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      }
    </ImageBackground>
  );
}
}
  const styles = StyleSheet.create({
    body: {
      flex: 1,
    },
    InputGroup:{
      flex: 2,
      backgroundColor: 'white',
      paddingHorizontal: 10,
    },
    checkbox:{
      alignSelf: 'center'
    },
    TextComponentContainer:{
      flex: 1,
      flexDirection:'row',
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
    horizontalContainer:{
      flex:10,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    imgButton:{
      flex:1,
      width: 20,
      height: 20,
      alignSelf: 'center',
      resizeMode: 'contain'
    },
    GeneroInput: {
      flex:2,
      alignSelf: 'center',
      fontSize: 18,
      color: '#6D6E71',
    },
    AnhoInput: {
      flex:6,
      alignSelf: 'center',
      fontSize: 18,
      color: '#6D6E71',
    },
    logoRegisterScreen: {
      width : 200,
      height : 100,
      resizeMode: 'contain',
      flex:1,
    },
    textinput: {
      flex: 1,
      flexDirection: 'row',
      alignSelf: 'stretch',
      color: '#FF00FF',
      justifyContent: 'center',
    },
    button:{
      alignItems: 'center',
      backgroundColor: '#00A2B5',
      padding: 10,
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
    inputBox2: {
      flex:1,
      backgroundColor: 'white',
      borderRadius: 25,
      fontSize: 16,
      color: '#000000',
      marginLeft: 30,
    },
    pickerBox: {
      flex: 1,
      backgroundColor: 'white',
      borderRadius: 0,
      alignSelf: 'center',
      color: '#A6A8AA',
      marginRight: -80,
    },
    contentContainer: {
      paddingVertical: 20
    },
    KeyboardOn:{
      flex: 1
    },
    bottomSpace1:{
      flex: 1,
      marginBottom: 100
    },
    bottomSpace2:{
      flex: 1,
      marginBottom: 200
    },
    buttonback:{
      
    },
    containerbotonaceptar:{
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 105
    },
    LogoContainer:{
      flex:2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    LogoRegisterScreen: {
      resizeMode: 'center',
      width : 180,
      height : 80,
      marginBottom: 30,
    },
    InputData: {
      flexDirection:"row",
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      marginRight:10,
      marginLeft:10,
    },
    InputDataYears: {
      flexDirection:"row",
      marginRight:10,
      marginLeft:10,
    },
    SubmitButtonContainer: {
      marginRight:10,
      marginLeft:10,
      marginBottom: 20,
      marginTop: 20,
      alignItems: "center",
    },
    SubmitButton: {
      alignItems: 'center',
      backgroundColor: '#00A2B5',
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    InputsContainer: {
      backgroundColor:"#fff",
      marginRight:30,
      marginLeft:30,
      marginTop:20
    },
    btntext: {
      color: 'white',
      fontSize: 18
    },
    BackButton: {
      
    }
  });
