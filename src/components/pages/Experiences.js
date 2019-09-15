import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
  } from 'react-native';
import styles from "../../assets/styles/pages/experiences";

const btn_literature = require('../../../images/icons/Vivencias/11.vivencias-02.png');
const btn_narratives = require('../../../images/icons/Vivencias/11.vivencias-04.png');
const btn_characters = require('../../../images/icons/Vivencias/11.vivencias-06.png');
const btn_activities = require('../../../images/icons/Vivencias/11.vivencias-08.png');
const btn_secrets = require('../../../images/icons/Vivencias/11.vivencias-12.png');

export default class Experiences extends Component {
    constructor(props) {
        super(props);
    }

    render() { 
        return( 
            <View style={styles.container}>
                <View style={styles.buttonsRow}>
                    <TouchableOpacity>
                        <Image source={btn_literature}/>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Image source={btn_narratives}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonsRow}>
                    <TouchableOpacity>
                        <Image source={btn_characters}/>
                    </TouchableOpacity>
                    
                    <TouchableOpacity>
                        <Image source={btn_activities}/>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.buttonsRow}>
                    <TouchableOpacity>
                        <Image source={btn_secrets}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

module.exports = Experiences;