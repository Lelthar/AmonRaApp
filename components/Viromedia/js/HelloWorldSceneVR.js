'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroScene,
  ViroText,
  Viro360Image,
} from 'react-viro';

export default class HelloWorldSceneVR extends Component {

  constructor() {
    super();

    this.state = {} // Set initial state here
  }

  render() {
    return (
      <ViroScene>
        <Viro360Image source={require('./res/Casa_González_Feo_1.jpg')} />
        <ViroText text="Hello World!" width={2} height={2} position={[0, 0, -2]} style={styles.helloWorldTextStyle} />
      </ViroScene>
    );
  }

}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 60,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

module.exports = HelloWorldSceneVR;
