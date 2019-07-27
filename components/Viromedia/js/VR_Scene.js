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
        <Viro360Image source={require('./res/Casa_González_Feo_1.jpg')} />
      </ViroScene>
    );
  }

}

module.exports = VR_Scene;
