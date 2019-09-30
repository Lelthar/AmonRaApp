import React, { Component } from 'react';
import {
  View,
} from 'react-native'; 

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator,
} from 'react-viro';

import DataSheet from "./js/AR_Components/DataSheet";
import InfoMenu from "./js/AR_Components/InfoMenu";
import MenuImages from "./js/D3_Components/MenuImages";
import VRSelectionMode from "./js/VR_Components/VRSelectionMode";


const sharedProps = {
  apiKey:"30EA748C-7956-4E0E-87A3-0EB2B0CBE931",
}

const InitialARScene = require('./js/ARScene');
const InitialVRScene = require('./js/VR_Scene');
const Initial3DScene = require('./js/3D_Scene');

const NAVIGATOR_TYPE_VR = "VR";
const NAVIGATOR_TYPE_AR = "AR";
const NAVIGATOR_TYPE_3D = "3D";

export class ViromediaController extends Component {

  constructor(props) {
    super(props);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getVRNavigator = this._getVRNavigator.bind(this);
    this.toggleDataSheet = this.toggleDataSheet.bind(this);
    this.showInfoMenu = this.showInfoMenu.bind(this);
    this.setVRMode = this.setVRMode.bind(this);
    
    this.state = {
      sharedProps : sharedProps, 
      navigatorType : this.props.navigation.state.params.do,
      vrMode : null,
      content: this.props.navigation.state.params.filename,

      // AR Components Props
      viroAppProps: {setInformation: this.showInfoMenu},
      infoMenuVisible : false,
      dataSheetVisible : false,
      descriptionVisible : true,
      houseArPressed: null,

      // VR Components Props
      informationImage3D: true,
    }
  }   

  render() { 
    if (this.state.navigatorType == NAVIGATOR_TYPE_AR){
      return this._getARNavigator();
    } else if (this.state.navigatorType == NAVIGATOR_TYPE_VR) {
      if (this.state.vrMode == null) {
        return this._getSelectionButtons();
      } else {
        return this._getVRNavigator();
      }
    } else if (this.state.navigatorType == NAVIGATOR_TYPE_3D) {
      return this._get3DNavigator();
    }
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() { 
    return (
      <View style={{flex:1}}>
        <ViroARSceneNavigator 
          {...this.state.sharedProps}
          initialScene={{scene: InitialARScene}} 
          onExitViro={this._exitViro} 
          viroAppProps={this.state.viroAppProps} />
                                
        {
          this.state.infoMenuVisible // Menu
          ? <InfoMenu handlePressDataSheet={this.toggleDataSheet} 
                      descriptionVisible={this.state.descriptionVisible} 
                      houseArPressed={this.state.houseArPressed} />
          : null
        }

        {
          this.state.dataSheetVisible // Ficha técnica
          ? <DataSheet handlePressDataSheet={this.toggleDataSheet} 
                       houseArPressed={this.state.houseArPressed} />
          : null
        }
      </View>
    );
  }

  // Returns the ViroSceneNavigator which will start the VR experience
  _getVRNavigator() {
    return (
      <ViroVRSceneNavigator 
        {...this.state.sharedProps}
        initialScene={{scene: InitialVRScene}} 
        onExitViro={this._exitViro} 
        vrModeEnabled={this.state.vrMode} 
        viroAppProps={{data:this.state.content}}/>
    );
  }

  // Returns the ViroSceneNavigator which will start the 3D experience
  _get3DNavigator() {
    return (
      <View style={{flex:1}}>
        <ViroVRSceneNavigator 
          {...this.state.sharedProps}
          initialScene={{scene: Initial3DScene}} 
          onExitViro={this._exitViro} 
          vrModeEnabled={false}/>

        {this.state.informationImage3D
          ? <MenuImages houseArPressed={this.state.houseArPressed} />
          : null
        }
      </View>
    );
  }

  _getSelectionButtons() {
    return (
      <VRSelectionMode handleOptionClick={this.setVRMode}/>
    );
  }
  
  // Enable or Disable DataSheet
  toggleDataSheet(){
    this.setState({
      dataSheetVisible : !this.state.dataSheetVisible,
      descriptionVisible : !this.state.descriptionVisible,
    });
  }

  // Show extra information of a building.
  showInfoMenu(place){ 
    this.setState({
      infoMenuVisible : true,
      houseArPressed: place,
    });
  }

   // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      navigatorType : "UNSET",
    })
  }

  setVRMode(vrMode) {
    this.setState({
        vrMode : vrMode,
    });
  }
}


export default ViromediaController;