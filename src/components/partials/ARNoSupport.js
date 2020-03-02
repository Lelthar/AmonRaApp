import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';

import styles from "../../assets/styles/partials/ARNoSupport";

const DEFAULT_MSG = "Necesitás el servicio ARCore de Google para activar la Realidad Aumentada";
const DOWNLOAD_MSG = "Descargalo aquí:";
const AR_CORE_LOGO = require('../../assets/images/augmentedReality/arcore-logo.png');
const BRAND_IMAGE = require("../../assets/images/amonraBrand/marca-02-smaller.png");

export default class VRSelectionMode extends Component {
    constructor(props) {
        super(props);
    }

    goToPlayStoreARCoreLink = () => {
      Linking.openURL("market://details?id=com.google.ar.core");
    }

    render() { 
      return( 
        <View style={styles.mainContainer} >
          <View style={styles.logoContainer}>
            <Image style={styles.brandImage} source={BRAND_IMAGE} />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.message}> {DEFAULT_MSG} {'\n'}</Text>
            <Text style={[styles.message, styles.bold]}> {DOWNLOAD_MSG} {'\n'}</Text>
          </View>
          
          <TouchableOpacity onPress={this.goToPlayStoreARCoreLink} style={styles.button}>
            <Image style={styles.arCoreImage} source={AR_CORE_LOGO}/> 
          </TouchableOpacity>
        </View>
      );
    }

}

module.exports = VRSelectionMode;
