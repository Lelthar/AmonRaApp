import React from 'react';
import Orientation from 'react-native-orientation-locker';
import {
  ImageBackground,
  Image,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {createStackNavigator,createAppContainer,} from 'react-navigation';
import EmailRegister from './EmailRegister';
import MainApp from '../../../MainApp';
import UseGuide from './UseVideoGuide';
import styles from "../../assets/styles/pages/registerMain";

const LOGO = require('../../assets/images/amonraBrand/marca-02-smaller.png');
const BACKGROUND_IMAGE = require('../../assets/images/amonraBrand/casa-verde-I.png');
const FACEBOOK_BTN = require('../../assets/images/register/regfacebook.jpg');

class RegisterMain extends React.Component {
  constructor (props) {
    super(props);

    this.state = {};
  }

  componentDidMount(){
    Orientation.lockToPortrait();
  }

  render (){
    return(
      <ImageBackground 
        style={{flex:1}}  
        source={BACKGROUND_IMAGE}>

        <View style={{flex:1}}>
          <View style={styles.LogoContainer}>
            <Image style={styles.LogoRegisterScreen}
                   source={LOGO} />
          </View>

          <View style={{flex:1}}>
            <TouchableOpacity 
              style={styles.ButtonRegister} 
              onPress={() => {this.props.navigation.navigate("EmailRegister")}}>

              <Text style={styles.RegisterButtonText}> Registrarse </Text>

            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.FacebookStyle} 
              activeOpacity={0.5}>

              <Image 
                source={FACEBOOK_BTN} 
                style={styles.ImageIconStyle}/>

            </TouchableOpacity>
          </View>

        </View>
      </ImageBackground>
    );
  }
}

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
