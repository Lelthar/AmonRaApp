import React from 'react';
import * as constants from '../../data/constants'
import * as colors from '../../data/colors'

import Orientation from 'react-native-orientation-locker';
//react-native run-android --variant=gvrDebug

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

import {createStackNavigator,createAppContainer, StackActions, NavigationActions} from 'react-navigation';
import EmailRegister from './EmailRegister';
import MainApp from '../../MainApp';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

import ConfidencialityAlertModal from '../ConfidencialityAlertModal/ConfidencialityAlertModal';
import UseGuide from '../UseGuide/UseGuide';

const logo = '../../images/marca-02-smaller.png';
const background = '../../resources/img/casa-verde-I.png';


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

    Orientation.lockToPortrait();

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
      actions: [NavigationActions.navigate({ routeName: 'UseGuide' })],
    });
    this.props.navigation.dispatch(resetAction);
  }


  renderModal(){
    return(
      <ConfidencialityAlertModal isVisible={this.state.isConfidencialityAlertVisible} okAction={this._goToMainApp.bind(this)}/>
      //<UseGuide />
    );
  }

  render (){
    return(

      <ImageBackground source={require(background)}  style={{flex:1}}>
      {this.renderModal()}
      {!this.state.isConfidencialityAlertVisible &&
      <View style={{flex:1}}>
        <View style={styles.LogoContainer}>
          <Image source={require(logo)} style={styles.LogoRegisterScreen}/>
        </View>
        <View style={{flex:1}}>
          <TouchableOpacity style={styles.ButtonRegister} onPress={() => {this.props.navigation.navigate("EmailRegister")}}>
            <Text style={styles.RegisterButtonText}>Registrarse</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5}>
            <Image 
              source={require('../../images/regfacebook.jpg')} 
              style={styles.ImageIconStyle} 
              />
          </TouchableOpacity>

        </View>

      </View>
      }
      </ImageBackground>
  );}

}

const styles = StyleSheet.create({
  ButtonRegister:{
    alignItems:'stretch',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginLeft:50,
    marginRight: 50,
  },
  ButtonText:{
    flex: 4,
    color: '#FFFFFF',
    fontFamily: 'Barlow-Regular',
    fontSize: constants.FONT_SIZE,
    alignSelf: 'center',
  },
  FacebookStyle: {
    backgroundColor: '#485a96',
    marginTop:25,
    marginLeft:50,
    marginRight: 50,
  },
  ImageIconStyle: {
    width: '100%',
    height: 53,
    resizeMode : 'contain',
  },
  LogoContainer:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  LogoRegisterScreen: {
    resizeMode: 'center',
    aspectRatio: 0.72,
    marginTop: 40
  },
  RegisterButtonText:{
    color: "#6D6E71",
    fontFamily: 'Barlow-Regular',
    fontSize: constants.FONT_SIZE,
    padding:15,
    textAlign: 'center'
  },
  TextStyle :{
    color: "#FFF",
    marginBottom : 4,
    marginRight :20,
    fontFamily: 'Barlow-Regular',
    fontSize: constants.FONT_SIZE,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 5
  },
});

const navigationOptions = {
    title: 'Register Main',
    headerMode: 'none'
}

const RegisterNavigator = createStackNavigator (
    {
        RegisterMain: RegisterMain,
        EmailRegister: EmailRegister,
        MainApp: MainApp,
        UseGuide: UseGuide
    },
    navigationOptions
);

export default createAppContainer(RegisterNavigator);
