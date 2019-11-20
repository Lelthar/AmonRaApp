import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
  } from 'react-native';

export default class Loaded extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
      return (
        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
          <Image style={{width:75,height:75}} source={require('../../assets/images/gif_carga.gif')}/>
        </View>           
      );
    }
}

var localStyles = StyleSheet.create({
  text: {
    textAlign: "justify",
    color: '#ffffff',
    fontSize: 30,
    fontFamily: "Barlow-Regular",
  },
});

module.exports = Loaded;
