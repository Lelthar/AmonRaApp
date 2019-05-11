'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

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
  ViroConstants
} from 'react-viro';

import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import RNSimpleCompass from 'react-native-simple-compass';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    this.state = {
      text : "Initializing AR...",
      latitude: 0,
      longitude: 0,
      objectXPos: 0,
      objectZPos: 0,
      heading: 0,
      coordinateString: "Sin datos",
      coordinateLatLongString: "Sin datos",
      textClick : "Vasio",
      error: null

    };

    this._onInitialized = this._onInitialized.bind(this);
    this._latLongToMerc = this._latLongToMerc.bind(this);
    this._transformPointToAR = this._transformPointToAR.bind(this);
    this._onClick = this._onClick.bind(this);
  }

  /*
        <ViroAmbientLight color={"#aaaaaa"} />
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]} position={[this.state.objectXPos, 0, this.state.objectZPos]} color="#ffffff" castsShadow={true} />

        <ViroNode position={[this.state.objectXPos, 0, this.state.objectZPos]}>
          <Viro3DObject
            source={require('./res/emoji_smile/emoji_smile.vrx')}
            position={[1,2,2]}
            scale={[0, .5, -1]}
            type="VRX"
          />
        </ViroNode>

        <ViroNode position={[0.1,0.1,0.1]}>
            <Viro3DObject
              source={require('./res/emoji_smile/emoji_smile.vrx')}
              position={[0,0,0.1]}
              scale={[0, .5, -1]}
              type="VRX"
            />
          </ViroNode>

    

  */

  /*
 <ViroNode position={[0, -.1, 0]} scale={[0,0,0]}>
            <Viro3DObject
              source={require('./res/emoji_smile/emoji_smile.vrx')}
              position={[0,0,0.1]}
              scale={[0, .5, -1]}
              type="VRX"
            />
          </ViroNode>
  */
  /*
    
      <ViroARScene>
        <ViroAmbientLight color={"#aaaaaa"} />
        <ViroARImageMarker target={"targetOne"} >
          <ViroBox position={[0, .25, 0]} scale={[.5, .5, .5]} />
          <ViroNode position={[0, -.1, 0]} scale={[0,0,0]} dragType="FixedToWorld" onDrag={()=>{}}>
              <Viro3DObject 
                source={require('./res/emoji_smile/emoji_smile.vrx')}
                resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
                            require('./res/emoji_smile/emoji_smile_normal.png'),
                            require('./res/emoji_smile/emoji_smile_specular.png')]}
                position={[0, 0, 0.1]}
                scale={[.2,.2,.2]}
                type="VRX" />
          </ViroNode>
        </ViroARImageMarker>
      </ViroARScene>

  */

  componentDidMount(){
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

  _onClick(position,source){
    console.log("Clickeado! "+position);
    this.setState({
      textClick : "AAA"
    });
  }

  render() { 
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroText text={this.state.textClick+"||"+this.state.heading+"||"+this.state.coordinateLatLongString + " || " +this.state.coordinateXYZString}
            scale={[.1, .1, .1]} height={5} width={4} position={[0, 0, -.1]} style={styles.helloWorldTextStyle} />
        <ViroText text={"PUNTO"}
            scale={[5, 5, 5]} height={5} width={4} position={[this.state.objectXPos, 0, this.state.objectZPos]} style={styles.helloWorldTextStyle} />
        <ViroAmbientLight color={"#aaaaaa"} /> 
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]}
          position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
        <ViroNode position={[this.state.objectXPos, 0, this.state.objectZPos]} dragType="FixedToWorld"  >
          <Viro3DObject
            source={require('./res/emoji_smile/emoji_smile.vrx')}
            resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
                require('./res/emoji_smile/emoji_smile_normal.png'),
                require('./res/emoji_smile/emoji_smile_specular.png')]}
            position={[this.state.objectXPos, 0, this.state.objectZPos]}
            scale={[20, 20, 20]}
            type="VRX" 
            onClick={this._onClick}/>
        </ViroNode>
      </ViroARScene>
      
    );

  }


  _transformPointToAR(lat, long) {
    
    var objPoint = this._latLongToMerc(9.855428, -83.913814); //Laimi abajo 9.855317, -83.913404
    var devicePoint = this._latLongToMerc(lat, long);
    
    // latitude(north,south) maps to the z axis in AR
    // longitude(east, west) maps to the x axis in AR

    var objFinalPosZ = objPoint.y - devicePoint.y;
    var objFinalPosX = objPoint.x - devicePoint.x;

    //var objFinalPosZ = 2;
    //var objFinalPosX = 0;

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
    var lat_rad = (lat_deg / 180.0 * Math.PI)
    var sm_a = 6378137.0
    var xmeters  = sm_a * lon_rad
    var ymeters = sm_a * Math.log((Math.sin(lat_rad) + 1) / Math.cos(lat_rad))
    return ({x:xmeters, y:ymeters});
 }
  
  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL){
      if (checkLocalizationPermission()) {
        Geolocation.watchPosition(
          (position) => {
          
            var objetPositionAR = this._transformPointToAR(position.coords.latitude, position.coords.longitude);

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

ViroARTrackingTargets.createTargets({
  "targetOne" : {
    source : require('./res/casa1.jpg'), // CASA VERDE ACTUAL
    orientation : "Up",
    physicalWidth : 0.1 // real world width in meters
  },
});


module.exports = HelloWorldSceneAR;
