import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro';


//----------Backend--------------
import { 
  TIME_LINE_URL,
  USER_DATA,
} from '../../constants/constants';

import {
  makeBackendRequest,
} from '../../helpers/helpers'

//-------------------------------

var sharedProps = {
  apiKey:"30EA748C-7956-4E0E-87A3-0EB2B0CBE931",
}

const view_normal = require('../../images/icons/virtualVisit/normal.png');
const view_vr = require('../../images/icons/virtualVisit/vr.png');

// Sets the default scene you want for AR and VR
var InitialARScene = require('./js/AR_Scene');
var InitialVRScene = require('./js/VR_Scene');
var Initial3DScene = require('./js/3D_Scene');

var NAVIGATOR_TYPE_VR = "VR";
var NAVIGATOR_TYPE_AR = "AR";
var NAVIGATOR_TYPE_3D = "3D";

var exampleText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel lacus molestie, blandit ante sit amet, sagittis risus.  ";
var infoText = "Perteneciente a la familia Quesada López-Calleja posee influencia colonial donde prevalece su fachada sencilla compuesta por una puerta y dos ventanas laterales; construida en ladrillo sobre la acera (Quesada, 2001).";



export default class ViromediaController extends Component {

  constructor(props) {

    super(props);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getVRNavigator = this._getVRNavigator.bind(this);
    this.showInformationMenu = this.showInformationMenu.bind(this);
    this.showDataSheet = this.showDataSheet.bind(this);
    this.toggleDataSheet = this.toggleDataSheet.bind(this);
    this.toggleBriefDescripcion = this.toggleBriefDescripcion.bind(this);
    
    this.state = {
      sharedProps : sharedProps, 
      navigatorType : this.props.navigation.state.params.do,
      viroAppProps: {setInformation: this.toggleBriefDescripcion},
      vrMode : null,
      content: this.props.navigation.state.params.filename,

      informationText : "Sin datos",
      informationVisible : false,
      dataSheetVisible : false,
      descriptionVisible : true,
    }
  }   

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() { 
    if (this.state.navigatorType == NAVIGATOR_TYPE_AR){
      return this._getARNavigator();
    } else if (this.state.navigatorType == NAVIGATOR_TYPE_VR) {
      if (this.state.vrMode == null) {
        return this._getSelectionButtons();
      } else {
        return this._getVRNavigator();
      }
    } else if (this.state.navigatorType == NAVIGATOR_TYPE_3D) {
      return this._get3DNavigator();
    }
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    return (
      <View style={{flex:1}}>

        <ViroARSceneNavigator {...this.state.sharedProps}
            initialScene={{scene: InitialARScene}} onExitViro={this._exitViro} viroAppProps={this.state.viroAppProps}/>

        {this.state.informationVisible
          ? this.showInformationMenu()
          : null
        }

        {this.state.dataSheetVisible // Ficha técnica
          ? this.showDataSheet()
          : null
        }
      </View>
    );
  }

  showDataSheet(){
    return( 
      <View style={{alignItems: 'center'}}>
        
        <View style={localStyles.dataSheet}>
          <TouchableOpacity onPress={() => this.toggleDataSheet()}>
          
              {//<Image source={require('../../images/icons/RA/close.png')}  style={localStyles.closeButton}/>
              }

          <Text style={localStyles.title}> Casa Saborío González (Casa Verde) {'\n'}</Text>
        
          <Text style={localStyles.title}> Motivos de la declaratoria: 
           <Text style={localStyles.text}> El inmueble fue construido a principios del sigio XX. Durante la época del auge en los mercados mundiales de la exportación del café de Costa Rica por lo que presenta importantes valores históricos, culturales y contextuales {'\n'}</Text>
          </Text>
          
          <Text style={localStyles.title}> Año de construcción: 
            <Text style={localStyles.text}> 1913-1915 {'\n'}</Text>
          </Text> 
        
          <Text style={localStyles.title}> Influencia: 
            <Text style={localStyles.text}> Estilo Victoriano{'\n'}</Text>
          </Text> 
          
          <Text style={localStyles.title}> Propietario actual: 
            <Text style={localStyles.text}> Instituto Tecnológico de Costa Rica{'\n'}</Text>
          </Text> 

          <Text style={localStyles.title}> Fecha de la declaratoria: 
            <Text style={localStyles.text}> 14/Dic/2017{'\n'}</Text>
          </Text> 
          
          <Text style={localStyles.title}> Decreto N:
            <Text style={localStyles.text}> 40662-C. La Gaceta N 232{'\n'}</Text>
          </Text> 
          </TouchableOpacity>
        </View>
        
      </View>
    );
  }

  showInformationMenu(){ 
    return (
      <View style={localStyles.infoContainer}>
        {this.state.descriptionVisible
          ? <Text style={{color:'white',fontSize: 16, marginBottom: 15}}> {this.state.informationText} </Text>
          : null
        }
        <TouchableOpacity style={localStyles.infoButton} onPress={() => this.toggleDataSheet()} >
          <Image source={require('../../images/icons/RA/ficha-tecnica.png')} />
          <Text style={{color:"#1a606b",fontSize: 14}}> Ficha técnica</Text>
        </TouchableOpacity>

        <TouchableOpacity style={localStyles.infoButton}>
          <Image source={require('../../images/icons/RA/vivenciass.png')} />
          <Text style={{color:"#1a606b",fontSize: 14}}> Vivencias</Text>
        </TouchableOpacity>

        <TouchableOpacity style={localStyles.infoButton} onPress={() => this.toggleBriefDescripcion()}>
          <Image  source={require('../../images/icons/RA/mas-info.png')} />
          <Text style={{color:"#1a606b",fontSize: 14}}> Info</Text>
        </TouchableOpacity>
      </View>
    );
  }
  //

  toggleDataSheet(){
    this.setState({
      dataSheetVisible : !this.state.dataSheetVisible,
      descriptionVisible : !this.state.descriptionVisible
    });
  }

  // Show extra information of a building.
  toggleBriefDescripcion(){ 
    this.setState({
      informationText: this.state.informationText == infoText ? exampleText : infoText,
      informationVisible : true,
    });
  }

  // Returns the ViroSceneNavigator which will start the VR experience
  _getVRNavigator() {
    return (
      <ViroVRSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: InitialVRScene}} onExitViro={this._exitViro} vrModeEnabled={this.state.vrMode} viroAppProps={{data:this.state.content}}/>
    );
  }

  // Returns the ViroSceneNavigator which will start the 3D experience
  _get3DNavigator() {
    return (
      <ViroVRSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: Initial3DScene}} onExitViro={this._exitViro} vrModeEnabled={false}/>
    );
  }

   // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    console.log("????");
    this.setState({
      navigatorType : "UNSET",
    })
    this.props.navigation.pop();
  }

  _getOnClick(vrMode) {
    return () => {
      this.setState({
        vrMode : vrMode
      })
    }
  }

  _getSelectionButtons() {
    return (
      <View style={localStyles.outer} >
        <View style={localStyles.inner} >

        <TouchableHighlight style={{marginBottom:"20%"}}
            onPress={this._getOnClick(true)}>

            <Image source={ view_vr }/>
          </TouchableHighlight>

          <TouchableHighlight style={{marginTop:"20%"}}
            onPress={this._getOnClick(false)}>

            <Image source={ view_normal }/>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

var localStyles = StyleSheet.create({
  viroContainer :{
    flex : 1,
    backgroundColor: "black",
  },
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
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 25
  },
  buttonText: {
    color:'#fff',
    textAlign:'center',
    fontSize : 20
  },
  buttons : {
    height: 80,
    width: 150,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  exitButton : {
    height: 50,
    width: 100,
    paddingTop:10,
    paddingBottom:10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
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
  dataSheet : {
    position: 'absolute', 
    justifyContent: 'center',
    backgroundColor: 'white',
    width: (Dimensions.get('window').width) * 0.9,
    height: (Dimensions.get('window').height) * 0.6,
    bottom: (Dimensions.get('window').height)/2 * 0.2,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 15,
    fontFamily: "Barlow-Regular",
    color: "#0C5B60",
    fontWeight: 'bold',
  },
  text: {
    fontWeight: 'normal',
    color: '#6D6F70',
    fontSize: 13,
    fontFamily: "Barlow-Regular",
  },
  closeButton: {
    justifyContent: 'flex-end',
    //position: 'absolute',
    width: 10,
    height: 10,
    left: (Dimensions.get('window').width)*0.8,

  }

});

module.exports = ViromediaController
