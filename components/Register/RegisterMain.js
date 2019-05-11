import React from 'react';
import firebase from 'react-native-firebase';
import * as constants from '../../data/constants'
import * as colors from '../../data/colors'

import {
  StyleSheet,
  ImageBackground,
  Image,
  Button,
  AsyncStorage,
  TouchableOpacity,
  View,
  Text,
  Alert,
  PixelRatio,
} from 'react-native';

import {StackNavigator, StackActions, NavigationActions} from 'react-navigation';
import EmailRegister from './EmailRegister';
import MainApp from '../../MainApp';
import {saveDataFirebase} from '../../firebase/functions';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

import ConfidencialityAlertModal from '../ConfidencialityAlertModal/ConfidencialityAlertModal';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} = FBSDK;



const logo = '../../images/marca-02-smaller.png';
const background = '../../resources/img/casa-verde-I.jpg';


class RegisterMain extends React.Component {

_normalizeGoogleData(data){
  var dict = {
    id: data['id'],
    method: 'google',
    name: data['name'],
    birthday: null,
    email: data['email']
  }
  return dict;
}

_normalizeDataEmail(data){
  data.method = "email";
  var lastname = data['lastname'];
  if (lastname != null && lastname != ''){
    data.name += " " + lastname;
  }
  return data;
}

_normalizeFacebookData(data){
  data.method = 'facebook';
  return data;
}

componentDidMount(){

  try {
    GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true }).then(()=> {
      GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/user.birthday.read', 'profile'], // what API you want to access on behalf of the user, default is email and profile
        iosClientId: '631107559689-dnkqauuocilfe395gavs0pcp9de0m028.apps.googleusercontent.com', // only for iOS
        webClientId: '631107559689-s7vpc43dbgmhddhnfafpv2lm5jbsrnjr.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        forceConsentPrompt: true // [Android] if you want to show the authorization prompt at each login
      })
    });
  } catch (err) {
    alert("Play services error" + JSON.stringify(err));
  }
 }

async _gAuth() {

  GoogleSignin.signIn()
    .then((user) => {
      //alert(JSON.stringify(user));
      user = this._normalizeGoogleData(user);
      saveDataFirebase(user);
      this._showConfidencialityAlert();
    })
      .catch((err) => {
        alert('Mensaje de desarrollo:\n Error de GoogleSignin:\n' + JSON.stringify(err));
    })
    .done();

}

async _fbAuth() {
    LoginManager.logOut();
    LoginManager.logInWithReadPermissions(["public_profile", "email", "user_birthday", ""]).then(
    async (result)  => {
      if (result.isCancelled) {
        //alert('Login cancelled');
      } else {
        AccessToken.getCurrentAccessToken().then(
          async (data) => {
            let accessToken = data.accessToken

            const responseInfoCallback = async (error, result) => {
              if (error) {
                console.log(error)

              } else {

                //FB Firease Authentication starts
                const credential = firebase.auth.FacebookAuthProvider.credential(accessToken);
                const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
                //alert(JSON.stringify(currentUser.user.toJSON()));
                //DB Firease Authentication ends

                result = this._normalizeFacebookData(result);
                saveDataFirebase(result);
                this._showConfidencialityAlert();
              }
            }

            //Solicitud de datos
            const infoRequest = new GraphRequest(
              '/me', //me se refiere al usuario quien inició sesión
              {
                accessToken: accessToken,
                parameters: {
                  fields: {
                    string: 'name, last_name, middle_name, email, location, birthday'
                  }
                }
              },
              responseInfoCallback
            );

            new GraphRequestManager().addRequest(infoRequest).start();

          }
        )
      }
    },
    function(error) {
      alert('Ha ocurrido un error con el incio de sesión: \n' + error);
    }
  );
}

constructor (props) {
  super(props);
  this.state= {
    isConfidencialityAlertVisible: false,
  }
  //alert(firebase.database().app.name); // '[DEFAULT]'
}

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


renderModal(){
  return(
    <ConfidencialityAlertModal isVisible={this.state.isConfidencialityAlertVisible} okAction={this._goToMainApp.bind(this)}/>
  );
}


  render (){
    return(

      <ImageBackground source={require(background)}  style={{flex:1}}>
      {this.renderModal()}
      {!this.state.isConfidencialityAlertVisible &&
        <View style={styles.body}>

            <View style={{flex:2}}/>
            <View style={styles.logoContainer}>
              <View style={{flex:1}}/>
              <Image source={require(logo)} style={styles.logoRegisterScreen}/>
              <View style={{flex:1}}/>
            </View>
            <View style={{flex:4}}/>

            <View style={{flex:4, flexDirection:'row'}}>

              <View style={{flex:1.5}}/>

              <View style={{flex:5}}>
                  <TouchableOpacity style={styles.registerButton} onPress={() => {this.props.navigation.navigate("EmailRegister")}}>
                      <Text style={styles.RegisterButtonText}> Registrarse </Text>
                  </TouchableOpacity>

                  <View style={{flex:0.5}}/>

                  <TouchableOpacity style={styles.FbButton} onPress={this._fbAuth.bind(this)}>
                      <View style={styles.imgContainer}>
                        <View style ={{flex:0.5}}/>
                        <Image style={styles.imgButton} source={require('../../images/icons/social/fb.png')} />
                        <View style ={{flex:0.5}}/>
                      </View>
                      <Text style={styles.ButtonText}> Registrarse con Facebook </Text>
                  </TouchableOpacity>

                  <View style={{flex:0.5}}/>

                  <TouchableOpacity style={styles.GPlusButton} onPress={this._gAuth.bind(this)}>
                  <View style={styles.imgContainer}>
                    <View style ={{flex:0.5}}/>
                    <Image style={styles.imgButton} source={require('../../images/icons/social/gp.png')} />
                    <View style ={{flex:0.5}}/>
                  </View>
                      <Text style={styles.ButtonText}> Registrarse con Google+ </Text>
                  </TouchableOpacity>
              </View>

              <View style={{flex:1.5}}/>
          </View>


          <View style={{flex:2.5}}/>
      </View>
      }

    </ImageBackground>
  );}

}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer:{
    flex:1.5,
    flexDirection:'row'
  },
  logoRegisterScreen: {
    resizeMode: 'center',
    flex:2
  },
  ButtonsContainer:{

  },
  imgContainer:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
},
  imgButton:{
    flex:1,
    resizeMode:'center',
  },
  ButtonText:{
    flex: 4,
    color: '#FFFFFF',
    fontFamily: 'Barlow-Regular',
    fontSize: constants.FONT_SIZE,
    alignSelf: 'center',
  },
  RegisterButtonText:{
    color: '#000000',
    fontFamily: 'Barlow-Regular',
    fontSize: constants.FONT_SIZE,
    alignSelf: 'center',

  },
  FbButton:{
    flex:1,
    flexDirection: 'row',
    backgroundColor: '#3B5998',

  },
  GPlusButton:{
    flex:1,
    flexDirection: 'row',
    alignItems:'stretch',
    justifyContent: 'center',
    backgroundColor: '#dc4b3e',

  },
  registerButton:{
    flex:1,
    flexDirection: 'row',
    alignItems:'stretch',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',

  },

});

const navigationOptions = {
    title: 'Register Main',
    headerMode: 'none'
}


const RegisterNavigator = StackNavigator (
    {
        RegisterMain: {screen: RegisterMain},
        EmailRegister: {screen: EmailRegister},
        MainApp: {screen: MainApp},
    },
    navigationOptions
);


export default RegisterNavigator;
