'use strict'
import React, { Component } from 'react';

import {
  PermissionsAndroid,
} from 'react-native';

import {
  ViroARScene,
  Viro3DObject, 
  ViroAmbientLight, 
  ViroNode,
  ViroImage,
  ViroText,
  ViroBox,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroARCamera,
  ViroCamera

} from 'react-viro';

import Geolocation from 'react-native-geolocation-service';
import RNSimpleCompass from 'react-native-simple-compass';
import mercatorAmon from './placesAR.json';
//import FakeTimers from '@jest/fake-timers/build/jestFakeTimers';

const defaultARLabel = 'https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/icon_info.png?alt=media&token=80f734be-cb39-4eb9-a301-c08825cc0c67';
const defaultImage = "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2Fdefault.png?alt=media&token=240374eb-adf4-42cc-8fdc-c70662582a92"
var targetNearestObj_1 = "default";
var targetNearestObj_2 = "default";

export class AR_Scene extends Component {

  constructor(props) {
    super(props);
    this._coordLatLongToMercator = this._coordLatLongToMercator.bind(this);
    this._transformPointToAR = this._transformPointToAR.bind(this);
    this._calibrateCompass = this._calibrateCompass.bind(this);
    this._setObjectPositions = this._setObjectPositions.bind(this);
    this._createImageTarget = this._createImageTarget.bind(this);    
    this._getTwoNearestObjects = this._getTwoNearestObjects.bind(this); 

    this.state = {
      firstNearestARObject: {x: 0, 
                             z: 0, 
                             place: targetNearestObj_1, 
                             img: defaultImage, 
                             targetName: targetNearestObj_1
                            },
      secondNearestARObject: {x: 0, 
                              z: 0, 
                              place: targetNearestObj_2, 
                              img: defaultImage, 
                              targetName: targetNearestObj_2
                            },
    };
  }

  componentDidMount(){
    if (checkLocalizationPermission()) {
      this._setObjectPositions();
    } 
  }

  render() { 
    return (
      <ViroARScene>
        {this.loadARObject(this.state.firstNearestARObject.x, this.state.firstNearestARObject.z, this.state.firstNearestARObject.place, this.state.firstNearestARObject.img, targetNearestObj_1)
        }        
        {this.loadARObject(this.state.secondNearestARObject.x, this.state.secondNearestARObject.z, this.state.secondNearestARObject.place, this.state.secondNearestARObject.img, targetNearestObj_2)
        }
      </ViroARScene>
    );
  }
  
  loadARObject(posX, posZ, place, nearestImageAR, nearestTargetAR){
    return(
      <ViroNode>
        <ViroARImageMarker target={nearestTargetAR} onAnchorFound={() => (console.log("got it"))}>
            <ViroImageearth_radius
              position={[0, -4, -2]}
              rotation={[0,90,90]}
              resizeMode='ScaleToFit'
              scale={[10,10,10]}
              source={{uri: nearestImageAR}}
            />
        </ViroARImageMarker>

        <ViroImage
          onClick={() => this.props.arSceneNavigator.viroAppProps.setInformation(place)}
          scale={[1,1,1]}
          position={[posX, 1, posZ -1]}
          source={{uri: defaultARLabel}}
        />
      </ViroNode>
    );
  }

  _createImageTarget(targetName, source_uri) {
    let targets= {};
    targets[targetName] = {
      source: {uri: source_uri},
      orientation: "Up",
      physicalWidth: 5,
    }
    ViroARTrackingTargets.deleteTarget(targetName);
    ViroARTrackingTargets.createTargets(targets);
  }

  _setObjectPositions(){
    Geolocation.watchPosition(
      (position) => {
        let objetsAR = this._getTwoNearestObjects(position.coords.latitude, position.coords.longitude);
        let firstObject = objetsAR.obj1;
        let secondObject = objetsAR.obj2;
        targetNearestObj_1 = "target1";
        targetNearestObj_2 = "target2";
        this._createImageTarget(targetNearestObj_1, firstObject.targetName);
        this._createImageTarget(targetNearestObj_2, secondObject.targetName);
        this.setState({
          firstNearestARObject: firstObject,
          secondNearestARObject: secondObject, 
        });
      },
      {enableHighAccuracy: true, maximumAge: 0, distanceFilter: 10}
    );
  }

  // Sacar los dos objetos mas cercanos al dispositivo, es decir, con la menor distancia por recorrer
  _getTwoNearestObjects(lat, long){
    let firstObject, secondObject; 
    let firstObjectDistance = Number.MAX_VALUE, secondObjectDistance = Number.MAX_VALUE;
    let compassHeading = this._calibrateCompass();

    mercatorAmon.forEach((element) => {
      let userMercatorPoint = this._coordLatLongToMercator(lat, long);
      let objectAR = this._transformPointToAR(compassHeading, userMercatorPoint, element);
      let distance = Math.abs(objectAR.x) +  Math.abs(objectAR.z);
      if(distance < firstObjectDistance){
        secondObject = firstObject;
        firstObject = objectAR;
        firstObjectDistance = distance;
      }else if(distance < secondObjectDistance){
        secondObject = objectAR;
        secondObjectDistance = distance;
      }
    });

    return ({obj1: firstObject, obj2: secondObject});
  }

  _calibrateCompass(){
    let compassHeading = 0;
    const degree_update_rate = 3; // Number of degrees changed before the callback is triggered
    RNSimpleCompass.start(degree_update_rate, (degree) => {
      compassHeading = degree
      RNSimpleCompass.stop();
    });
    return compassHeading;
  }
  
  _transformPointToAR(compassHeading, userMercPoint, objectMercPoint) {
    let objFinalPosZ = objectMercPoint.Y - userMercPoint.Y;
    let objFinalPosX = objectMercPoint.X - userMercPoint.X;
    let angle = compassHeading * Math.PI/180;
    let newRotatedX = objFinalPosX * Math.cos(angle) - objFinalPosZ * Math.sin(angle);
    let newRotatedZ = objFinalPosZ * Math.cos(angle) + objFinalPosX * Math.sin(angle);  
    return ({x:newRotatedX, z:-newRotatedZ, place: objectMercPoint.place, img: objectMercPoint.img, targetName: objectMercPoint.targetName});
  }

  // Converts Lat and Long to Mercator projection
  _coordLatLongToMercator(lat_degree, lon_degree) { 
    let lon_radians = (lon_degree / 180.0 * Math.PI);
    let lat_radians = (lat_degree / 180.0 * Math.PI);
    let earth_radius = 6378137.0;
    let xmeters  = earth_radius * lon_radians;
    let ymeters = earth_radius * Math.log((Math.sin(lat_radians) + 1) / Math.cos(lat_radians));
    return ({X:xmeters, Y:ymeters});
 }

}

async function checkLocalizationPermission(){
  try {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
  } catch (err) {}
  return false;
}

ViroARTrackingTargets.createTargets({
  default : {
    source: {uri: defaultImage},
    orientation : "Up",
    physicalWidth : 5 
  },
});

module.exports = AR_Scene;


