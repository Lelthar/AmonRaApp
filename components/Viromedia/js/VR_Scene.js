'use strict';

import React, { Component } from 'react';
import {
  ViroScene,
  Viro360Image,
} from 'react-viro';

export default class VR_Scene extends Component {

  constructor() {
    super();

    this.state = {} 
  }

  render() {
    return (
      <ViroScene>
        <Viro360Image source={{uri:this.props.sceneNavigator.viroAppProps.data}} />
      </ViroScene>
    );
  }

}

module.exports = VR_Scene;
