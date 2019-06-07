import React from 'react';
import {StackActions, NavigationActions} from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MainApp from '../../MainApp';

import { 
  REGISTRATION_URL,
  USER_DATA,
} from '../../constants/constants';


import {
  Alert,
  StyleSheet,
  ImageBackground,
  Image,
  Button,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Picker,
  Icon,
  ScrollView,
  AsyncStorage,
  KeyboardAvoidingView,
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
const background = '../../resources/img/casa-verde-I.jpg';
const nombre = '../../resources/img/user.png';
const backgroundColor = '../../resources/img/pantalla de inicio.png';
const anho = [];

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

    }
    for(let i = 1900; i < 2100; i++){
      anho.push(i.toString());
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
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      contentContainerStyle={{flexGrow: 1}}
      style = {{flex: 1}}
    >
    <ImageBackground source={require(background)} style={styles.body} >
      {this.renderModal()}
      {!this.state.isConfidencialityAlertVisible &&
      <View style={styles.body}>
        {/* Espaciador vertical */}
        <View style={{flex:1}}/>
        <TouchableOpacity style={styles.buttonback} onPress = {this._goToBackApp.bind(this)}>
          <Image source={require('../../images/icons/PantallaPrincipal/atras.png')} style={styles.checkImage} />
        </TouchableOpacity>
        <View style={{flex:1}}/>
        <Image source={require(logo)} style={styles.logoRegisterScreen}/>
        <View style={{flex:1}}/>
        <View style={styles.horizontalContainer}>
          {/* Espaciador horizontal */}
          <View style={{flex:1}}/>
          <View style={styles.InputsContainer}>
            <View style={styles.InputGroup}>
              {/* Nombre */}
              <View style={styles.TextComponentContainer}>
                <Image style={styles.imgButton} source={require('../../images/icons/nombre.png')} />
                <TextInput
                  style={styles.inputBox}
                  placeholder ="Nombre"
                  underlineColorAndroid="transparent"
                  autoCapitalize = "words"
                  onChangeText={(name) => this.setState({name})}
                  value = {this.state.name}
                  onSubmitEditing= {()=> this.lastName.focus()}
                  //onFocus= {() => this.setState({one: true})}
                />
              </View>
              {/* Línea divisoria */}
              <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
              }}/>
              {/* Apellido */}
              <View style={styles.TextComponentContainer}>
                <Image style={styles.imgButton}/>
                <TextInput style={styles.inputBox2} placeholder ="Apellido"
                  underlineColorAndroid={'transparent'}
                  //onChangeText={(lastName) => this.CheckTextInputIsEmptyOrNot(lastName)}
                  onChangeText={(lastName) => this.setState({lastName})}
                  value = {this.state.lastName}
                  ref= {(input) => this.lastName = input}
                  onSubmitEditing= {()=> this.email.focus()}
                />
              </View>
            </View>
            {/* Espaciador vertical */}
            <View style={{flex:0.5}}/>
            <View style={styles.InputGroup}>
              {/* Correo */}
              <View style={styles.TextComponentContainer}>
                <Image style={styles.imgButton} source={require('../../images/correo.png')} />
                <TextInput style={styles.inputBox}
                  placeholder ="Correo electrónico"
                  underlineColorAndroid={'transparent'}
                  keyboardType= "email-address"
                  onChangeText={(email)=> this.setState({email})}
                  value = {this.state.email}
                  ref= {(input) => this.email = input}
                  //onFocus= {() => this.setState({two: true})}
                />
              </View>
              <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
              }}/>
              {/* País */}
              <View style={styles.TextComponentContainer}>
                <Image style={styles.imgButton} source={require('../../images/pais.png')} />
                <Picker
                  selectedValue={this.state.country}
                  style={styles.pickerBox}
                  mode="dropdown"
                  onValueChange={(itemValue, itemIndex) => this.setState({country: itemValue})}>
                  <Picker.Item label="País" value="País" />
                  {countries.countries.map((l, i) => {return <Picker.Item value={l} label={l} key={i}  /> })}
                </Picker>
              </View>
            </View>
            {/* Espaciador vertical */}
            <View style={{flex:0.5}}/>
            <View style={styles.InputGroup}>
              {/* Género */}
              <View style={styles.TextComponentContainer}>
                <TextInput style={styles.inputBox} placeholder ="Género:"
                  editable={false}
                  selectTextOnFocus={false}
                  underlineColorAndroid={'transparent'}
                />
                <CheckBox style={styles.checkbox}
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
              <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
              }}/>
              {/* Fecha de nacimiento */}
              <View style={styles.TextComponentContainer}>
                <Image style={styles.imgButton}/>
                <TextInput
                  style={styles.inputBox}
                  placeholder ="Año de nacimiento: "
                  underlineColorAndroid={'transparent'}
                  editable={false}
                  selectTextOnFocus={false}
                />
                <Picker
                  selectedValue={this.state.date}
                  style={styles.pickerBox}
                  mode="dropdown"
                  onValueChange={(itemValue, itemIndex) => this.setState({date: itemValue})}>
                  <Picker.Item label="Año" value="Año" />
                  {anho.map((l, i) => {return <Picker.Item value={l} label={l} key={i}  /> })}
                </Picker>
              </View>
            </View>
            {/* Espaciador vertical */}
            <View style={{flex:0.5}}/>
            <View style={styles.containerbotonaceptar}>
              <TouchableOpacity style={styles.button}
                disabled={this.state.buttonDisabled}
                onPress = {this.pre_register.bind(this)}>
                <Text style={styles.btntext}>ACEPTAR</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex:1}}/>
          {/* Fin del contenedor Horizontal */}
        </View>
        {/* Espaciador vertical */}
        <View style={[{flex:1}, this.state.one && styles.bottomSpace1, this.state.two && styles.bottomSpace2]}/>
      </View>
      }
    </ImageBackground>
    </KeyboardAwareScrollView>
  );
}
}


  const styles = StyleSheet.create({
    body: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
    horizontalContainer:{
      flex:10,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    imgButton:{
        width: 20,
        height: 20,
        alignSelf: 'center',
        marginRight: 10,
    },
    logoRegisterScreen: {
      width : 200,
      height : 100,
      resizeMode: 'contain',
      flex:1,
      alignSelf: 'center'
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
    btntext: {
      color: 'white',
      fontWeight: 'bold'
    },

    inputBox: {
      flex:1,
      backgroundColor: 'white',
      borderRadius: 25,
      fontSize: 16,
      color: '#000000',
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
    InputsContainer:{
      flex: 6
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
      marginRight: 350,
    },
    containerbotonaceptar:{
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 105
    }

  });
