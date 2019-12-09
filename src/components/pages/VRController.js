import React, { Component } from 'react';
import {
  View,
} from 'react-native'; 

import {
  ViroVRSceneNavigator,
} from 'react-viro';

import VRSelectionMode from "../partials/VRSelectionMode";
import Loaded from "../partials/Loaded";

const VR_SCENE = require('./VRScene');

export class VRController extends Component {

  constructor(props) {
    super(props);

    this._getVRNavigator = this._getVRNavigator.bind(this);
    this._getSelectionButtons = this._getSelectionButtons.bind(this);
    this.setVRMode = this.setVRMode.bind(this);
    this.showLoadedContent = this.showLoadedContent.bind(this);

    this.state = {
      sharedProps : this.props.sharedProps, 
      content: this.props.content,
      vrMode : null,
      loadedVisible: true,
    }
  }   
  
  render() { 
    return (
      this.state.vrMode == null
      ? this._getSelectionButtons()
      : this._getVRNavigator()
    )
  }

  // Returns the ViroSceneNavigator which will start the VR experience
  _getVRNavigator() {
    return (
      <View style={{flex:1}}>
        <ViroVRSceneNavigator 
          {...this.state.sharedProps}
          initialScene={{scene: VR_SCENE}} 
          onExitViro={this._exitViro} 
          vrModeEnabled={this.state.vrMode} 
          viroAppProps={{data: this.state.content, stopLoading: this.showLoadedContent}}/>

        {this.state.loadedVisible && (<Loaded />)}
          
      </View>
    );
  }

  _getSelectionButtons() {
    return (
      <VRSelectionMode handleOptionClick={this.setVRMode}/>
    );
  }
  
  setVRMode(vrMode) {
    this.setState({
        vrMode : vrMode,
    });
  }

  showLoadedContent(){
    this.setState({
      loadedVisible : false,
    });
  }
}

export default VRController;
