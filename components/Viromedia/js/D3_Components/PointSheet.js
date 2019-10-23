import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    WebView,
  } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

//----------Backend--------------
import { 
  INFORMATION_HOUSES,
  USER_DATA,
} from '../../../../constants/constants';

import {
  makeBackendRequest,
} from '../../../../helpers/helpers';

//-------------------------------

import Orientation from 'react-native-orientation-locker';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';  
  
export default class PointSheet extends Component {
    constructor(props) {
        super(props);

        this.state ={
          data :  this.props.dataPoint.data,
        }
    }

    _onOrientationDidChange = (orientation) => {
        //console.log("Puto el que lo lea: "+orientation)
        if (orientation == 'LANDSCAPE-LEFT') {
          //do something with landscape left layout
        } else {
          //do something with portrait layout
        }
      };
    
    componentDidMount() {
      
      Orientation.getAutoRotateState((rotationLock) => this.setState({rotationLock}));
      //this allows to check if the system autolock is enabled or not.
  
      Orientation.lockToPortrait(); //this will lock the view to Portrait

      Orientation.addOrientationListener(this._onOrientationDidChange);
    }

    render() { 
        return( 
          <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>                
              <View style={localStyles.dataSheet}>
                <TouchableOpacity onPress={() => this.props.handlePressDataSheet()}>
                  <Image source={require('../../../../images/icons/RA/close.png')}  style={localStyles.closeButton}/>
                </TouchableOpacity>

                <View style={localStyles.containerImages}>
                  <Image style={{width:200,height:150}} source={{uri:this.state.data.image_url}} />
                </View>
                <Text style={localStyles.title}> {this.state.data.title} {'\n'}</Text>

                <Text style={localStyles.text}> {this.state.data.description} {'\n'}</Text>

              </View>
              
          </View>
        );
    }
}


var localStyles = StyleSheet.create({
    dataSheet : {
      flex:1,
      position: 'absolute', 
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      width: wp('85%'),
      paddingHorizontal: 15,
      paddingTop: 15,
      borderWidth: 1,
      borderRadius: 2,
      borderColor: '#ddd',
      borderBottomWidth: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,
    },
    containerImages: {
      flexDirection: 'row', 
      alignItems: 'center',
      marginBottom: "2.5%",
      justifyContent: 'space-around'
    },
    title: {
      fontSize: 15,
      fontFamily: "Barlow-Regular",
      color: "#0C5B60",
      fontWeight: 'bold',
      textAlign: "center",
    },
    text: {
      textAlign: "justify",
      color: '#6D6F70',
      fontSize: 13,
      fontFamily: "Barlow-Regular",
    },
    closeButton: {
      justifyContent: 'flex-end',
      alignSelf: 'flex-end',
      width: 20,
      height:20,
    },
});

module.exports = PointSheet;