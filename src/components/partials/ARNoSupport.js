import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import localStyles from "../../assets/styles/partials/ARNoSupport";

const txt_msg1 = "¡Lo sentimos!";
const txt_msg2 = "Tu dispositivo no soporta la experiencia RA";

export default class VRSelectionMode extends Component {
    constructor(props) {
        super(props);
    }

    render() { 
        return( 
            <View style={localStyles.outer} >
            <View style={localStyles.inner} >

            <Text style={localStyles.title}> {txt_msg1} {'\n'}</Text>
            <Text style={localStyles.title}> {txt_msg2} {'\n'}</Text>

            </View>
          </View>
        );
    }

}

module.exports = VRSelectionMode;
