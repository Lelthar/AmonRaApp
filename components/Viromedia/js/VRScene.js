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
    return (
      <ViroScene>
        <ViroCamera active={true}>
          <Viro360Image source={{uri:this.props.sceneNavigator.viroAppProps.data}} />
          <VRHeadset />
        </ViroCamera>
      </ViroScene>
    );
  }

}

module.exports = VRScene;
