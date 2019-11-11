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

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';  
  
export default class PointSheet extends Component {
    constructor(props) {
        super(props);

        this.state ={
          data :  this.props.dataPoint.data,
        }
    }

    render() { 
        return( 
          <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>                
              <View style={localStyles.dataSheet}>
                <TouchableOpacity onPress={() => this.props.handlePressDataSheet()}>
                  <Image source={require('../../../../images/icons/RA/close.png')}  style={localStyles.closeButton}/>
                </TouchableOpacity>
                

                <View style={localStyles.containerImages}>
                  <Image style={{width:"105%",height:"100%", resizeMode: "stretch",}} source={{uri:this.state.data.image_url}} />
                </View>
                
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
      marginTop: "2%",
      marginBottom: "5%",
      height:hp('25%'),
      justifyContent: 'space-around',
    },
    closeButton: {
      justifyContent: 'flex-end',
      alignSelf: 'flex-end',
      width: 20,
      height:20,
    },
});

module.exports = PointSheet;
