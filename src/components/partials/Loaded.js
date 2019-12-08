import React, { Component } from 'react';
import {
    View,
    Image,
  } from 'react-native';

const LOADING_GIF = require('../../assets/images/virtualReality/gif_carga.gif');

export default class Loaded extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
      return (
        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
          <Image style={{width:75,height:75}} source={LOADING_GIF}/>
        </View>           
      );
    }
}

module.exports = Loaded;
