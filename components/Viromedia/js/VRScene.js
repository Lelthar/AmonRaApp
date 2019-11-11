'use strict';

import React, { Component } from 'react';
import {
  ViroScene,
  Viro360Image,
  ViroCamera,
} from 'react-viro';
import VRHeadset from './VRHeadset';

export default class VRScene extends Component {
  constructor() {
    super();

    this.state = {} 
  }

  imageLoaded = () => {
    this.props.sceneNavigator.viroAppProps.handleClick();
  }

  render() {
    return (
      <ViroScene>
        <ViroCamera active={true}>
          <Viro360Image source={{uri:this.props.sceneNavigator.viroAppProps.data}} onLoadEnd={this.imageLoaded} />
          <VRHeadset />
        </ViroCamera>
      </ViroScene>
    );
  }

}

module.exports = VRScene;
