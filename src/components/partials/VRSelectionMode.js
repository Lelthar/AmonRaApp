import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
  } from 'react-native';

const view_normal = require('../../../images/icons/virtualVisit/normal.png');
const view_vr = require('../../../images/icons/virtualVisit/vr.png');

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
    
                <Image source={ view_vr }/>
              </TouchableOpacity>
    
              <TouchableOpacity style={{marginTop:"20%"}}
                onPress={() => this.props.handleOptionClick(false)}>
    
                <Image source={ view_normal }/>
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