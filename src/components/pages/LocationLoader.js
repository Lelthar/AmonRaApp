import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    AppRegistry,
    Button,
    Dimensions,
    TouchableOpacity,
    Image,
    ImageBackground,
    Geolocation,
} from 'react-native';

//import Spinner from 'react-native-loading-spinner-overlay';

const background = '../../../resources/img/casa-verde-I.jpeg';

export default class LocationLoader extends Component{

  static navigationOptions = {
  title: 'LocationLoader',
  }

 constructor (props) {
   super(props);
   this.state = {}
 };

    // componentDidMount() {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       this.setState({
    //         latitude: position.coords.latitude,
    //         longitude: position.coords.longitude,
    //         locationFound: true,
    //         locationResult: "Lat: " + position.coords.latitude + " Lon: " + position.coords.longitude,
    //       });
    //     },
    //     (error) => this.setState({
    //       locationResult: "Error: " + error.message,
    //     }),
    //     { enableHighAccuracy: false, timeout: 30000, maximumAge: 5000},
    //   );
    // }

    render() {
      return (
        <View style= {styles.container}>
          <Text style={{color: "#FFF"}}>
          hola</Text>
        </View>
      );
    }

  }

const styles = StyleSheet.create({
    container: {
      position:'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: '#000000',
      justifyContent: 'center',
      alignItems: 'center',

  },
});

AppRegistry.registerComponent('LocationLoader', () => LocationLoader);
