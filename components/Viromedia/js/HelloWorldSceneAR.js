'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid
} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroMaterials,
  ViroBox,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroAnimations,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroSphere,
  ViroConstants,
  ViroImage
} from 'react-viro';

import Geolocation from 'react-native-geolocation-service';
import RNSimpleCompass from 'react-native-simple-compass';
export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    this._onInitialized = this._onInitialized.bind(this);
    this._latLongToMerc = this._latLongToMerc.bind(this);
    this._transformPointToAR = this._transformPointToAR.bind(this);
    this._setCompass = this._setCompass.bind(this);
    this.state = {
      latitude: 0,
      longitude: 0,
      objectXPos: 0,
      objectZPos: 0,
      heading: 0,
      coordinateString: "Sin datos",
      coordinateLatLongString: "Sin datos",
      error: null
    };
  }

  render() { 
    return (
        <ViroARScene onTrackingUpdated={this._onInitialized}>
          {/*<ViroText text={this.state.heading+"||"+this.state.coordinateLatLongString + " || " +this.state.coordinateXYZString}
              scale={[.1, .1, .1]} height={5} width={4} position={[0, 0, -.1]} style={styles.helloWorldTextStyle} />
        */}
          <ViroText text={"Casa Verde"}
            scale={[7, 7, 7]} height={7} width={5} position={[this.state.objectXPos, 0, this.state.objectZPos]} style={styles.helloWorldTextStyle} />

          <ViroAmbientLight color={"#aaaaaa"} />
          <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]}
            position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
          <ViroNode position={[this.state.objectXPos, 0, this.state.objectZPos]} dragType="FixedToWorld" onDrag={()=>{}} >
            <Viro3DObject
              onClick={this.props.arSceneNavigator.viroAppProps.showInformation}
              source={require('./res/emoji_smile/emoji_smile.vrx')}
              resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
                  require('./res/emoji_smile/emoji_smile_normal.png'),
                  require('./res/emoji_smile/emoji_smile_specular.png')]}
              position={[this.state.objectXPos, 2, this.state.objectZPos]}
              scale={this.state.scaleObj1}
              type="VRX" />
          </ViroNode>

          <ViroNode position={[0, 0, -1]} dragType="FixedToWorld">
            <Viro3DObject
              onClick={this.props.arSceneNavigator.viroAppProps.showInformation}
              source={require('./res/emoji_smile/emoji_smile.vrx')}
              resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
                  require('./res/emoji_smile/emoji_smile_normal.png'),
                  require('./res/emoji_smile/emoji_smile_specular.png')]}
              position={[0, 0, -0.1]}
              scale={[.5,.5,.5]}
              type="VRX" />
          </ViroNode>
        </ViroARScene>
    );
  }

  componentDidMount(){
    this._setCompass();
  }
  
  _setCompass(){
    let myself = this;
    const degree_update_rate = 3; // Number of degrees changed before the callback is triggered
      RNSimpleCompass.start(degree_update_rate, (degree) => {
        console.log('You are facing', degree);
        myself.setState({
          heading: degree
        });
        RNSimpleCompass.stop();
      });
  }
  _transformPointToAR(lat, long,latPlace,LongPlace) {
    let objPoint = this._latLongToMerc(latPlace, LongPlace); 
    let devicePoint = this._latLongToMerc(lat, long);
    
    // latitude(north,south) maps to the z axis in AR
    // longitude(east, west) maps to the x axis in AR

    let objFinalPosZ = objPoint.y - devicePoint.y;
    let objFinalPosX = objPoint.x - devicePoint.x;
    let angle = this.state.heading * Math.PI/180;
    console.log("heading:" + this.state.heading);
    console.log("Cos: "+ Math.cos(angle));
    console.log("Sen: "+ Math.sin(angle));
    let newRotatedX = objFinalPosX * Math.cos(angle) - objFinalPosZ * Math.sin(angle);
    let newRotatedZ = objFinalPosZ * Math.cos(angle) + objFinalPosX * Math.sin(angle);  

    //flip the z, as negative z(is in front of us which is north, pos z is behind(south).
    return ({x:newRotatedX, z:-newRotatedZ});
  }

  // Converts Lat and Long to Mercator projection
  _latLongToMerc(lat_deg, lon_deg) { 
    let lon_rad = (lon_deg / 180.0 * Math.PI)
    let lat_rad = (lat_deg / 180.0 * Math.PI)
    let sm_a = 6378137.0
    let xmeters  = sm_a * lon_rad
    let ymeters = sm_a * Math.log((Math.sin(lat_rad) + 1) / Math.cos(lat_rad))
    return ({x:xmeters, y:ymeters});
 }
  
  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL){
      if (checkLocalizationPermission()) {
        Geolocation.watchPosition(
          (position) => {
          
            /*
                Frente al H: 9.856204, -83.912598
                Escuela Ciencias Sociales y Matemática: 9.856110, -83.913026
                Pretil: 9.855782, -83.912626
                Casa Verde: 9.937658, -84.074725
            */
            let objetPositionAR = this._transformPointToAR(position.coords.latitude, position.coords.longitude,9.937658, -84.074725);

            this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              objectXPos: objetPositionAR.x,
              objectZPos: objetPositionAR.z,
              coordinateXYZString: "[" + String(objetPositionAR.x) + ", 0, " + String(objetPositionAR.z) + "]",
              coordinateLatLongString: "Lat: " + String(position.coords.latitude) + " ** Lng: " + String(position.coords.longitude),
              error: null   
            });
          },
          (error) => {
              this.setState({
                error: error.message
              });
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } 
      else {
        this.setState({
          error : "Permission Denied"
        });
      }
    } else if (state == ViroConstants.TRACKING_NONE){
      this.setState({
        coordinateXYZString: "Mueva el cel",
        coordinateLatLongString: "porfis",
        error: null   
      });
    }
  }
}

async function checkLocalizationPermission(){
  try {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
  } catch (err) {
    console.warn(err);
  }
  return false;
}


var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  }
});

module.exports = HelloWorldSceneAR;