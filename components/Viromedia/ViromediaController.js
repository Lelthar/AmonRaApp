/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro';

var sharedProps = {
  apiKey:"30EA748C-7956-4E0E-87A3-0EB2B0CBE931",
}

// Sets the default scene you want for AR and VR
var InitialARScene = require('./js/HelloWorldSceneAR');
var InitialVRScene = require('./js/HelloWorldSceneVR');
var Initial3DScene = require('./js/HelloWorldScene3D');

var VR_NAVIGATOR_TYPE = "VR";
var AR_NAVIGATOR_TYPE = "AR";
var D3_NAVIGATOR_TYPE = "3D";


export default class ViromediaController extends Component {


  constructor(props) {

    super(props);

    this._getARNavigator = this._getARNavigator.bind(this);
    this._getVRNavigator = this._getVRNavigator.bind(this);
    this.showInformation = this.showInformation.bind(this);

    this.state = {
      sharedProps : sharedProps,
      navigatorType : this.props.navigation.state.params.do,
      viroAppProps: {showInformation: this.showInformation},
      informationVisible: false,
      informationText: "Sin datos",      
      vrMode : null,
      dataSheetVisible: false,
    }
  }   

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {  // this.props.screenProps.getNavigationProp(this.props.navigation)
    if (this.state.navigatorType == VR_NAVIGATOR_TYPE) {
      if (this.state.vrMode == null) {
        return this._getSelectionButtons();
      } else {
        return this._getVRNavigator();
      }
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
      return this._getARNavigator();
    }else if (this.state.navigatorType == D3_NAVIGATOR_TYPE) {
      console.log("FALSE 3D");
      return this._get3DNavigator();
    }/*else{
      return this._getExperienceSelector();
    }*/
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    return (
      <View style={{flex: 1}}>
        <ViroARSceneNavigator {...this.state.sharedProps}
          initialScene={{scene: InitialARScene}} onExitViro={this._exitViro} viroAppProps={this.state.viroAppProps}/>

        {this.state.informationVisible
          ?   <View style={localStyles.infoContainer}>
                <Text style={{color:'white',fontSize: 16, marginBottom: 15}}> {this.state.informationText} </Text>

                <TouchableOpacity style={localStyles.infoButton}>
                  <Image source={require('../../images/icons/RA/ficha-tecnica.png')} />
                  <Text style={{color:"##1a606b",fontSize: 14}}> Ficha técnica</Text>
                </TouchableOpacity>

                <TouchableOpacity style={localStyles.infoButton}>
                  <Image source={require('../../images/icons/RA/vivenciass.png')} />
                  <Text style={{color:"##1a606b",fontSize: 14}}> Vivencias</Text>
                </TouchableOpacity>

                <TouchableOpacity style={localStyles.infoButton}>
                  <Image  source={require('../../images/icons/RA/mas-info.png')} />
                  <Text style={{color:"##1a606b",fontSize: 14}}> Info</Text>
                </TouchableOpacity>
              </View>
          : null
        }

        {this.state.dataSheetVisible // Ficha técnica
          ? <View style={localStyles.infoContainer}>
            </View>
          : null
        }
      </View>
    );
  }

  // Show extra information of a building.
  showInformation(){
    console.log("Activando información ");
    this.setState({
      informationVisible: true,
      informationText: "Perteneciente a la familia Quesada López-Calleja posee influencia colonial donde prevalece su fachada sencilla compuesta por una puerta y dos ventanas laterales; construida en ladrillo sobre la acera (Quesada, 2001)."
    });
  }

  // Returns the ViroSceneNavigator which will start the VR experience
  _getVRNavigator() {
    return (
      <ViroVRSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: InitialVRScene}} onExitViro={this._exitViro} vrModeEnabled={this.state.vrMode}/>
    );
  }

  // Returns the ViroSceneNavigator which will start the 3D experience
  _get3DNavigator() {
    return (
      <ViroVRSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: Initial3DScene}} onExitViro={this._exitViro} vrModeEnabled={false}/>
    );
  }

   // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      navigatorType : "UNSET"
    })
  }

  _getOnClick(vrMode) {
    return () => {
      this.setState({
        vrMode : vrMode
      })
    }
  }

  _getSelectionButtons() {
    return (
      <View style={localStyles.outer} >
        <View style={localStyles.inner} >

          <Text style={localStyles.titleText}>
            Do you have a VR headset?
          </Text>

          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getOnClick(true)}
            underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText}>YES</Text>
          </TouchableHighlight>

          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getOnClick(false)}
            underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText}>NO</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

}

var localStyles = StyleSheet.create({
  viroContainer :{
    flex : 1,
    backgroundColor: "black",
  },
  outer : {
    flex : 1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: "black",
  },
  inner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "black",
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 25
  },
  buttonText: {
    color:'#fff',
    textAlign:'center',
    fontSize : 20
  },
  buttons : {
    height: 80,
    width: 150,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  exitButton : {
    height: 50,
    width: 100,
    paddingTop:10,
    paddingBottom:10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  infoContainer : {
    flex:14, 
    flexDirection: 'row', 
    padding:15, 
    bottom: 68,
    position:"absolute",
    backgroundColor:'rgba(54, 145, 160, 0.8)',
    width: Dimensions.get('window').width,
    flexWrap: 'wrap',
    justifyContent:'space-around',
  },
  infoButton: {
    flexDirection: 'row', 
  }

});

module.exports = ViromediaController
