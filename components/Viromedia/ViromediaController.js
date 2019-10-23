import React, { Component } from 'react';
import {
  View,
} from 'react-native'; 

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator,
} from 'react-viro';

import DataSheet from "./js/AR_Components/DataSheet";
import InfoMenu from "./js/AR_Components/InfoMenu";
import MenuImages from "./js/D3_Components/MenuImages";
import VRSelectionMode from "./js/VR_Components/VRSelectionMode";
import PointSheet from "./js/D3_Components/PointSheet";
import SwitchButtom from "./js/D3_Components/SwitchButton";
import dataJson from './js/D3_Components/data3D.json';

const sharedProps = {
  apiKey:"30EA748C-7956-4E0E-87A3-0EB2B0CBE931",
}

const InitialARScene = require('./js/ARScene');
const InitialVRScene = require('./js/VR_Scene');
const Initial3DScene = require('./js/3D_Scene');

const NAVIGATOR_TYPE_VR = "VR";
const NAVIGATOR_TYPE_AR = "AR";
const NAVIGATOR_TYPE_3D = "3D";

export class ViromediaController extends Component {

  constructor(props) {
    super(props);

    this._getARNavigator = this._getARNavigator.bind(this);
    this._getVRNavigator = this._getVRNavigator.bind(this);
    this.toggleDataSheet = this.toggleDataSheet.bind(this);
    this.showInfoMenu = this.showInfoMenu.bind(this);
    this.setVRMode = this.setVRMode.bind(this);
    this.closeDataPoint = this.closeDataPoint.bind(this);
    this.showDataPoint = this.showDataPoint.bind(this);
    this.changeMenuImage = this.changeMenuImage.bind(this);

    this.state = {
      sharedProps : sharedProps, 
      navigatorType : this.props.navigation.state.params.do,
      vrMode : null,
      content: this.props.navigation.state.params.filename,

      // AR Components Props
      viroAppProps: {setInformation: this.showInfoMenu},
      infoMenuVisible : false,
      dataSheetVisible : false,
      descriptionVisible : true,
      houseArPressed: null,

      // VR Components Props
      menuViews: true,
      viro3dProps: {setInformation: this.closeDataPoint,
        id: this.props.navigation.state.params.filename, 
      },
      dataPointVisible: false,
    }
  }   

  componentWillUnmount(){
    this.setState({
      navigatorType : "UNSET",
    })
  }

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
        <ViroARSceneNavigator 
          {...this.state.sharedProps}
          initialScene={{scene: InitialARScene}} 
          onExitViro={this._exitViro} 
          viroAppProps={this.state.viroAppProps} />
                                
        {this.state.infoMenuVisible && (
          <InfoMenu 
            handlePressDataSheet={this.toggleDataSheet} 
            descriptionVisible={this.state.descriptionVisible} 
            houseArPressed={this.state.houseArPressedID} 
            navigation={this.props.navigation}/> 
        )}

        {this.state.dataSheetVisible && (
          <DataSheet 
            handlePressDataSheet={this.toggleDataSheet} 
            houseArPressedID={this.state.houseArPressedID} 
            houseArPressedName={this.state.houseArPressedName} 
            showErrorToast={this.showToast}/>
        )}

        {this.state.toastVisible && (
          <Toast visible={this.state.toastVisible} message={this.state.toastMessage}/>
        )}
      </View>
    );
  }

  // Returns the ViroSceneNavigator which will start the VR experience
  _getVRNavigator() {
    return (
      <ViroVRSceneNavigator 
        {...this.state.sharedProps}
        initialScene={{scene: InitialVRScene}} 
        onExitViro={this._exitViro} 
        vrModeEnabled={this.state.vrMode} 
        viroAppProps={{data:this.state.content}}/>
    );
  }

  // Returns the ViroSceneNavigator which will start the 3D experience
  _get3DNavigator() {
    return (
      <View style={{flex:1}}>
        <ViroVRSceneNavigator 
          {...this.state.sharedProps}
          initialScene={{scene: Initial3DScene}} 
          onExitViro={this._exitViro} 
          vrModeEnabled={false}
          viroAppProps={this.state.viro3dProps}/>

        {this.state.menuViews //Show normal images
          ? <MenuImages dataImages={{images:this._views3dSelect(this.state.viro3dProps.id)}} handleClickMenuImage={this.showDataPoint} />
          : null
        }

        {!this.state.menuViews //Show point images
          ? <MenuImages dataImages={{images:this._points3dSelect(256)}} handleClickMenuImage={this.showDataPoint} />
          : null
        }

        {this.state.dataPointVisible //PointSheet
          ? <PointSheet  handlePressDataSheet={this.closeDataPoint}/>
          : null
        }
        
        {<SwitchButtom 
          handleSwitchClick={this.changeMenuImage} />}

      </View>
    );
  }

  _getSelectionButtons() {
    return (
      <VRSelectionMode handleOptionClick={this.setVRMode}/>
    );
  }
  
  // Enable or Disable DataSheet
  toggleDataSheet(){
    this.setState({
      dataSheetVisible : !this.state.dataSheetVisible,
      descriptionVisible : !this.state.descriptionVisible,
    });
  }

  // Show extra information of a building.
  showInfoMenu(place){ 
    this.setState({
      infoMenuVisible : true,
      houseArPressed: place,
    });
  }

   // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    console.log("on exit viro ")
    this.setState({
      navigatorType : "UNSET",
    })
  }

  setVRMode(vrMode) {
    this.setState({
        vrMode : vrMode,
    });
  }

  changeMenuImage(type){
    this.setState({
      menuViews : type,
      dataPointVisible: false,
    });
  }

  // Enable or Disable DataSheet
  closeDataPoint(){
    this.setState({
      dataPointVisible : !this.state.dataPointVisible,
    });
  }

  // Enable or Disable DataSheet
  showDataPoint(position){
    if(!this.state.menuViews){
      console.log(position)
      this.setState({
        dataPointVisible : !this.state.dataPointVisible,
      });
    }
  }

  _views3dSelect(objectName){
    const objects = {
      250 : dataJson.houses.GonzalesFeo.views,
      251 : dataJson.houses.CentroCine.views,
      252 : dataJson.houses.CasaVerde.views,
      254 : dataJson.houses.AlianzaFrancesa.views,
      256 : dataJson.houses.CastilloMoro.views,
      261 : dataJson.houses.QuesadaAvendano.views,
      262 : dataJson.houses.SerranoBonilla.views,
    };
    return objects[objectName];
  }

  _points3dSelect(objectName){
    const objects = {
      250 : dataJson.houses.GonzalesFeo.views,
      251 : dataJson.houses.CentroCine.views,
      252 : dataJson.houses.CasaVerde.views,
      254 : dataJson.houses.AlianzaFrancesa.views,
      256 : dataJson.houses.CastilloMoro.points,
      261 : dataJson.houses.QuesadaAvendano.views,
      262 : dataJson.houses.SerranoBonilla.views,
    };
    return objects[objectName];
  }

}

export default ViromediaController;

