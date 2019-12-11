import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';

import localStyles from "../../assets/styles/partials/closeButton"; 

const CLOSE_BTN = require('../../assets/images/augmentedReality/close.png');

export default class CloseButton extends Component {
    constructor(props) {
      super(props);

    }
    
    render() {
      return (
        <View style={localStyles.container}>
          <TouchableOpacity onPress={() => this.props.handlePressClose()}>
            <Image source={CLOSE_BTN}  style={localStyles.closeButton}/>
          </TouchableOpacity>
        </View>           
      );
    }
}

module.exports = CloseButton;
