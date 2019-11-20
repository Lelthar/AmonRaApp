import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
  } from 'react-native';

  
const NORMAL_VIEW = require('../../assets/images/virtualReality/normal.png');
const VR_VIEW = require('../../assets/images/virtualReality/vr.png');

export default class VRSelectionMode extends Component {
    constructor(props) {
        super(props);
    }

    render() { 
        return( 
            <View style={localStyles.outer} >
            <View style={localStyles.inner} >
    
            <TouchableOpacity style={{marginBottom:"20%"}}
                onPress={() => this.props.handleOptionClick(true)}>
    
                <Image source={ VR_VIEW }/>
              </TouchableOpacity>
    
              <TouchableOpacity style={{marginTop:"20%"}}
                onPress={() => this.props.handleOptionClick(false)}>
    
                <Image source={ NORMAL_VIEW }/>
              </TouchableOpacity>
            </View>
          </View>
        );
    }

}


var localStyles = StyleSheet.create({
    outer : {
      flex : 1,
      flexDirection: 'row',
      alignItems:'center',
      backgroundColor: "#08545c",
    },
    inner: {
      flex : 1,
      flexDirection: 'column',
      alignItems:'center',
      backgroundColor: "#08545c",
    },
});

  module.exports = VRSelectionMode;