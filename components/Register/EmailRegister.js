import React, { Component } from 'react';
import {StackActions, NavigationActions} from 'react-navigation';
import { Dropdown } from 'react-native-material-dropdown';

import { 
  REGISTRATION_URL,
  USER_DATA,
} from '../../constants/constants';

import {
  Alert,
  ImageBackground,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

import styles from "../../src/assets/styles/pages/email_register";

import * as countries from '../../data/countries';
import ConfidencialityAlertModal from '../ConfidencialityAlertModal/ConfidencialityAlertModal';
import CheckBox from 'react-native-check-box';

const logo = '../../images/marca-02.png';
const background = '../../resources/img/casa-verde-I.png';
let anho = [];
const paises = [];

class RegisterMain extends Component {

  constructor (props) {
    super(props);
    this.state = {
      name: '',
      lastName: '',
      email: '',
      country: '',
      gender: '',
      date: '',
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

get_registration_values() {
  return {
    email: this.state.email,
    password: this.state.email,
    password_confirmation: this.state.email,
    name: this.state.name,
    lastname: this.state.lastName,
    country: this.state.country,
    year_birth: this.state.date,
    gender: this.state.gender
  };
}

get_user_data(header_data,response_data) {
  return {
    'access-token': header_data['access-token'],
    client: header_data.client,
    uid: header_data.uid,
    email: response_data.data.email
  };
}

isSuccessful(response) {
  return response.status === 'success';
}

setUserDataStorage(response,header) {
  if (this.isSuccessful(response)) {
    const userData = this.get_user_data(header,response);
    AsyncStorage.setItem(USER_DATA, JSON.stringify(userData));

    this._showConfidencialityAlert();
    
  } else {
    alert(response.errors.full_messages[0]);
    this.changeButtonToAbled();
  }
}

async _emailRegister(){
  const response = await fetch(REGISTRATION_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(this.get_registration_values()),
  }).catch((error) => {
      console.error(error);
    });
  const responseJson = await response.json();
  const headersJson = await response.headers.map;
  
  this.setUserDataStorage(responseJson,headersJson);
}


isNoTextInputEmpty() {

  const name = this.state.name;
  const lastName = this.state.lastName;
  const email = this.state.email;
  const date = this.state.date;

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

render() {
  return (

    <ImageBackground source={require(background)} style={styles.body} >
      {this.renderModal()}
      {!this.state.isConfidencialityAlertVisible &&
      <View style={styles.body}>
        <View style={styles.logoContainer}>
        <View style={{flex:1,position: 'absolute',left:10,top:10}}>
          <TouchableOpacity onPress = {this._goToBackApp.bind(this)}>
            <Image source={require('../../images/icons/PantallaPrincipal/flechaatras.png')} style={styles.backArrow} />
          </TouchableOpacity>
          </View>
          <View style={{flex:2,marginTop:70,marginBottom:20}}>
            <Image source={require(logo)} style={styles.logoRegisterScreen}/>
          </View>
        </View>
        <View style={{flex:6}}>
          <View style={styles.inputsContainer}>
            <View style={styles.inputData}>
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
            <View style={styles.inputData}>
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
            <View style={styles.inputData}>
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
            <View style={styles.inputData}>
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
            <View style={styles.inputData}>
              <Text style={styles.generoInput}>Género:</Text>
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
            <View style={styles.inputDataYears}>
              <Text style={styles.anhoInput}>Año de nacimiento:</Text>
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
            <View style={styles.submitButtonContainer}>
              <TouchableOpacity 
                style={styles.submitButton}
                disabled={this.state.buttonDisabled}
                onPress = {this.pre_register.bind(this)}
              >
                <Text style={styles.acceptButtonText}>ACEPTAR</Text>
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

export default RegisterMain;