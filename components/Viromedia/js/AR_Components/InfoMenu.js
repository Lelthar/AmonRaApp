import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
  } from 'react-native';


const dataSheetIcon = require('../../../../images/icons/RA/ficha-tecnica.png');
const vivenciasIcon = require('../../../../images/icons/RA/vivenciass.png');
const extraInfoIcon = require('../../../../images/icons/RA/mas-info.png');

// TODO: Delete and connect to DB.
var exampleText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel lacus molestie, blandit ante sit amet, sagittis risus.  ";
var infoText = "Perteneciente a la familia Quesada López-Calleja posee influencia colonial donde prevalece su fachada sencilla compuesta por una puerta y dos ventanas laterales; construida en ladrillo sobre la acera (Quesada, 2001).";

export default class InfoMenu extends Component {
    constructor(props) {
        super(props);
        
        this.toggleBriefDescripcion = this.toggleBriefDescripcion.bind(this);
        this.toggleDataSheet = this.toggleDataSheet.bind(this);
        
        this.state = {
            informationText : "Sin datos",
        }
    }

    componentDidMount(){
        this.toggleBriefDescripcion();
    }

    render() { 
        return (
            <View style={localStyles.infoContainer}>
              {this.props.descriptionVisible
                ? <Text style={localStyles.description}> {this.state.informationText} </Text>
                : null
              }
              <TouchableOpacity style={localStyles.infoButton} onPress={() => this.toggleDataSheet()} >
                <Image source={dataSheetIcon} />
                <Text style={localStyles.text}> Ficha técnica</Text>
              </TouchableOpacity>
      
              <TouchableOpacity style={localStyles.infoButton}>
                <Image source={vivenciasIcon} />
                <Text style={localStyles.text}> Vivencias</Text>
              </TouchableOpacity>
      
              <TouchableOpacity style={localStyles.infoButton} onPress={() => this.toggleBriefDescripcion()}>
                <Image  source={extraInfoIcon} />
                <Text style={localStyles.text}> Info</Text>
              </TouchableOpacity>
            </View>
        );
    }

    toggleDataSheet(){
        this.props.handlePressDataSheet();
    }

    // Show extra information of a building.
    toggleBriefDescripcion(){ 
        this.setState({
            informationText: this.state.informationText == infoText ? exampleText : infoText,
        });
    }

}

var localStyles = StyleSheet.create({
    infoContainer : {
        flex:14, 
        flexDirection: 'row', 
        padding:15, 
        bottom: 0,
        position:"absolute",
        backgroundColor:'rgba(54, 145, 160, 0.8)',
        width: Dimensions.get('window').width,
        flexWrap: 'wrap',
        justifyContent:'space-around',
    },
    infoButton: {
        flexDirection: 'row', 
    },
    text:{
        color:"#1a606b",
        fontSize: 14
    },
    description:{
        color:'white',
        fontSize: 16, 
        marginBottom: 15
    },
});

module.exports = InfoMenu;