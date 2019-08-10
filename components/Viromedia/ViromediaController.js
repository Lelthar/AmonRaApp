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

var sharedProps = {
  apiKey:"30EA748C-7956-4E0E-87A3-0EB2B0CBE931",
}

// Sets the default scene you want for AR and VR
var InitialARScene = require('./js/AR_Scene');
var InitialVRScene = require('./js/VR_Scene');
var Initial3DScene = require('./js/3D_Scene');

var VR_NAVIGATOR_TYPE = "VR";
var AR_NAVIGATOR_TYPE = "AR";
var D3_NAVIGATOR_TYPE = "3D";

export default class ViromediaController extends Component {

  constructor(props) {

    super(props);
    
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getVRNavigator = this._getVRNavigator.bind(this);
    this.showInformationMenu = this.showInformationMenu.bind(this);
    this.showDataSheet = this.showDataSheet.bind(this);
    this.setInformation = this.setInformation.bind(this);
    this.toggleDataSheet = this.toggleDataSheet.bind(this);

    this.state = {
      sharedProps : sharedProps,
      navigatorType : this.props.navigation.state.params.do,
      viroAppProps: {setInformation: this.setInformation},
      vrMode : null,

      informationText : "Sin datos",
      informationVisible : false,
      dataSheetVisible : false,
      descriptionVisible : true,
    }
  }   

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() { 
    if (this.state.navigatorType == VR_NAVIGATOR_TYPE) {
      if (this.state.vrMode == null) {
        return this._getSelectionButtons();
      } else {
        return this._getVRNavigator();
      }
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
      return this._getARNavigator();
    }else if (this.state.navigatorType == D3_NAVIGATOR_TYPE) {
      console.log("FALSE 3D");
      return this._get3DNavigator();
    }/*else{
      return this._getExperienceSelector();
    }*/
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

        <TouchableOpacity style={localStyles.infoButton}>
          <Image  source={require('../../images/icons/RA/mas-info.png')} />
          <Text style={{color:"#1a606b",fontSize: 14}}> Info</Text>
        </TouchableOpacity>
      </View>
    );
  }

  toggleDataSheet(){
    this.setState({
      dataSheetVisible : !this.state.dataSheetVisible,
      descriptionVisible : !this.state.descriptionVisible
    });
  }

  // Show extra information of a building.
  setInformation(place){
    console.log(place);
    this.setState({
      informationText: "Perteneciente a la familia Quesada López-Calleja posee influencia colonial donde prevalece su fachada sencilla compuesta por una puerta y dos ventanas laterales; construida en ladrillo sobre la acera (Quesada, 2001).",
      informationVisible : true
    });
  }

  // Returns the ViroSceneNavigator which will start the VR experience
  _getVRNavigator() {
    return (
      <ViroVRSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: InitialVRScene}} onExitViro={this._exitViro} vrModeEnabled={this.state.vrMode}/>
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
    this.setState({
      navigatorType : "UNSET"
    })
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

          <Text style={localStyles.titleText}>
            Do you have a VR headset?
          </Text>

          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getOnClick(true)}
            underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText}>YES</Text>
          </TouchableHighlight>

          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getOnClick(false)}
            underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText}>NO</Text>
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
    backgroundColor: "black",
  },
  inner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "black",
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
    bottom: 68,
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
    bottom: (Dimensions.get('window').height)/2 * 0.4,
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
