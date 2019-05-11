import React from 'react';
import firebase from 'react-native-firebase';
import {StackActions, NavigationActions} from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
//import GoogleSignIn from 'react-native-google-sign-in';
import {saveDataFirebase} from '../../firebase/functions';
import MainApp from '../../MainApp';

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
    checkedM:false

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

async _emailRegister(){

  //if (this.validate() == true)
  //{
      const user = this.state;
      //la variable new user se utiliza para guardar los mismos datos que user
      //así, en el formulario no se concatenará el nombre con el apellido, sino que sucederá solo "por debajo"
      var newUser = user;
      if (user.lastName != null && user.lastName != '') {
        //newUser.name += " " + newUser.lastName;  //comentar esto para que no se copie el apellido al nombre
      }
      await firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(user.email, user.email).then (async (result) =>{
        //Se creó el usuario
        newUser.id = result.user.uid;
        saveDataFirebase(newUser);
        alert(JSON.stringify(newUser))
        //this._showConfidencialityAlert();
      }, async (err) => {
        if (err.code == "auth/email-already-in-use"){
          console.log ("AmónRA: Se ha registrado un correo ya en uso.");
          //Iniciar sesión para obtener el id
          await firebase.auth().signInAndRetrieveDataWithEmailAndPassword(user.email, user.email).then(async (existingUser) => {
            //alert(existingUser.user.uid);
            newUser.id = existingUser.user.uid
            saveDataFirebase(newUser);
            this._showConfidencialityAlert();
          }, function (err) {
            alert("Mensaje de desarrollo:\nFirebase error: \n" + JSON.stringify(err, null, '  '));
        });

        }
        else if (err.code == "auth/wrong-password"){
          console.log("Un usuario se ha intentado registrar con un correo ya utilizado por otro método");
        }
        else if (err.code == "auth/unknown"){
          console.log("Error desconocido/no hay internet");
          Alert.alert(
            'Ups! Algo salió mal',
            'No se ha completado el registro, verifique su conexión a internet o utilice otro método',
          );
          alert(JSON.stringify(err))
        }
        else{
          alert("Ha ocurrido un error \n" + err.code);
        }

      });

  //
  //}
}


CheckTextInputIsEmptyOrNot(){

 const { name }  = this.state ;
 const { lastName }  = this.state ;
 const { email }  = this.state ;
 const { date }  = this.state ;
 const { country }  = this.state ;

  if(name == '')
      {
        Alert.alert("El nombre es obligatorio");
        this.setState({name})
      }
    else if(lastName == ''  )
      {
        Alert.alert("El apellido es obligatorio");
        this.setState({lastName})
      }
    else if(email == ''  )
      {
        Alert.alert("El correo es obligatorio");
        this.setState({email})
      }
    else if(date == '' )
      {
        Alert.alert("El año de nacimiento es obligatorio");
        this.setState({date})
      }

    else
      {
        return true;
      }

}


// Valida que el correo ingresado sea válido
validate( ){

  if (this.CheckTextInputIsEmptyOrNot() == true)
  {
    const { email }  = this.state ;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(reg.test(email) == false )
        {
        Alert.alert("El email no es válido");
        this.setState({email})
        return false;
        }
        else
        {
          this.setState({email})
          this._emailRegister()
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
                onPress = {this.validate.bind(this)}>
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
