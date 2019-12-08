import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import localStyles from "../../assets/styles/partials/pointSheetView";

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
          <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>                
              <View style={localStyles.dataSheet}>
                <TouchableOpacity onPress={() => this.props.handlePressDataSheet()}>
                  <Image source={CLOSE_BTN}  style={localStyles.closeButton}/>
                </TouchableOpacity>
              
                <View style={localStyles.containerImages}>
                  <Image style={{width:"105%",height:"100%", resizeMode: "stretch",}} source={{uri:this.state.data.image_url}} />
                </View>
                
              </View>
              
          </View>
        );
    }
}

module.exports = PointSheet;
