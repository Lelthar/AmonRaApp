import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import localStyles from "../../assets/styles/partials/pointSheet";

const CLOSE_BTN = require('../../assets/images/augmentedReality/close.png');

export default class PointSheet extends Component {
    constructor(props) {
        super(props);

        this.state ={
          data :  this.props.dataPoint.data,
        }
    }

    render() { 
        return( 
          <View style={localStyles.container}>                
              <View style={localStyles.dataSheet}>
                <TouchableOpacity onPress={() => this.props.handlePressDataSheet()}>
                  <Image source={CLOSE_BTN}  style={localStyles.closeButton}/>
                </TouchableOpacity>

                <View style={localStyles.containerImages}>
                  <Image style={localStyles.image} source={{uri:this.state.data.image_url}} />
                </View>
                <Text style={localStyles.title}> {this.state.data.title} {'\n'}</Text>

                <Text style={localStyles.text}> {this.state.data.description} {'\n'}</Text>

                <Text style={localStyles.textInf}> Busca el elemento del glosario en el modelo 3D {'\n'}</Text>

              </View>
              
          </View>
        );
    }
}

module.exports = PointSheet;
