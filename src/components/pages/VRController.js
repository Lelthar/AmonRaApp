import React, { Component } from 'react';
import {
  ViroVRSceneNavigator,
} from 'react-viro';

import VRSelectionMode from "../partials/VRSelectionMode";

const InitialVRScene = require('./VRScene');

export class VRController extends Component {

  constructor(props) {
    super(props);

    this._getVRNavigator = this._getVRNavigator.bind(this);
    this._getSelectionButtons = this._getSelectionButtons.bind(this);
    this.setVRMode = this.setVRMode.bind(this);

    this.state = {
      sharedProps : this.props.sharedProps, 
      content: this.props.content,
      vrMode : null,
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
      <ViroVRSceneNavigator 
        {...this.state.sharedProps}
        initialScene={{scene: InitialVRScene}} 
        vrModeEnabled={this.state.vrMode} 
        viroAppProps={{data:this.state.content}}/>
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
}

export default VRController;
