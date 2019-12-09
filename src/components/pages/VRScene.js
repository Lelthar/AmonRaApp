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

  render() {
    const IMAGE_URL = this.props.sceneNavigator.viroAppProps.data;

    return (
      <ViroScene>
        <ViroCamera active={true}>
          <Viro360Image source={{uri:IMAGE_URL}} onLoadEnd={this.imageLoaded} />
          <VRHeadset />
        </ViroCamera>
      </ViroScene>
    );
  }

  imageLoaded = () => {
    this.props.sceneNavigator.viroAppProps.stopLoading();
  }

}

module.exports = VRScene;
