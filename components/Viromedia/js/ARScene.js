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
  ViroARImageMarker,
  ViroARTrackingTargets,
} from 'react-viro';

import Geolocation from 'react-native-geolocation-service';
import RNSimpleCompass from 'react-native-simple-compass';
import mercatorAmon from './placesAR.json';
import Items3D from './res/indexObj';
import Materials3D from './res/indexMaterials';

//import FakeTimers from '@jest/fake-timers/build/jestFakeTimers';

const defaultImage = "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2Fdefault.png?alt=media&token=240374eb-adf4-42cc-8fdc-c70662582a92";
const defaultLabel3D = "castilloDelMoro";

let targetNearestObj_1 = "default";
let targetNearestObj_2 = "default";

export class ARScene extends Component {

  constructor(props) {
    super(props);
    this._coordLatLongToMercator = this._coordLatLongToMercator.bind(this);
    this._transformPointToAR = this._transformPointToAR.bind(this);
    this._calibrateCompass = this._calibrateCompass.bind(this);
    this._setObjectPositions = this._setObjectPositions.bind(this);
    this._createImageTarget = this._createImageTarget.bind(this);    
    this._getTwoNearestObjects = this._getTwoNearestObjects.bind(this); 
    this._generateARObject = this._generateARObject.bind(this); 
    this._object3dSelect = this._object3dSelect.bind(this); 
    this._material3dSelect = this._material3dSelect.bind(this); 

    this.state = {
      firstNearestARObject: {
          x: 0, 
          z: 0, 
          place: targetNearestObj_1, 
          img: defaultImage, 
          targetLink: defaultImage,
          label3DObject: defaultLabel3D, 
      },
      secondNearestARObject: {
          x: 0, 
          z: 0, 
          place: targetNearestObj_2, 
          img: defaultImage, 
          targetLink: defaultImage,
          label3DObject: defaultLabel3D,
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
        {
          this.loadARObject(this.state.firstNearestARObject, targetNearestObj_1)   
        }        
        {
          this.loadARObject(this.state.secondNearestARObject, targetNearestObj_2)
        }
      </ViroARScene>
    );
  }
  
  loadARObject(objectAR, targetName){
    return(
      <ViroNode>
        <ViroARImageMarker target={targetName} onAnchorFound={() => (console.log("got it"))}>
            <ViroImage
              position={[0, -4, -2]}
              rotation={[0,90,90]}
              resizeMode='ScaleToFit'
              scale={[10,10,10]}
              source={{uri: objectAR.img}}
            />
        </ViroARImageMarker>

        <ViroAmbientLight color="#FFFFFF" />

        <Viro3DObject 
          onClick={() => this.props.arSceneNavigator.viroAppProps.setInformation(objectAR.place)}
          source={this._object3dSelect(objectAR.label3DObject)} 
          position={[objectAR.x, 1, objectAR.z -1]}
          scale={[0.02, 0.02, 0.02]}
          resources={[this._material3dSelect(objectAR.label3DObject)]}
          type="OBJ" 
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
        this._createImageTarget(targetNearestObj_1, firstObject.targetLink);
        this._createImageTarget(targetNearestObj_2, secondObject.targetLink);
        this.setState({
          firstNearestARObject: firstObject,
          secondNearestARObject: secondObject, 
        });
      },
      {enableHighAccuracy: true, maximumAge: 0, distanceFilter: 10},
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
      compassHeading = degree;
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
    return this._generateARObject(newRotatedX, -newRotatedZ, objectMercPoint);
  }

  _generateARObject(newX, newZ, object){
    return ({ 
              x: newX, 
              z: newZ, 
              place: object.place, 
              img: object.img, 
              targetLink: object.targetLink,
              label3DObject: object.label3DObject
           });
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

  _object3dSelect(objectName){
    const objects = {
      "edificioEsquineroAv7C3": Items3D.edificioEsquineroAv7C3,
      "casaAlejoAguilarBolandi": Items3D.casaAlejoAguilarBolandi,
      "casaMarianoAlvarezMelgar" : Items3D.casaMarianoAlvarezMelgar, 
      "calle3AAvenida11": Items3D.calle3AAvenida11, 
      "hotelTenerife": Items3D.hotelTenerife, 
      "hotelReyAmon": Items3D.hotelReyAmon, 
      "restauranteSilvestre": Items3D.restauranteSilvestre, 
      "castilloDelMoro": Items3D.castilloDelMoro, 
    };
    return objects[objectName];
  }

  _material3dSelect(materialName){
    const materials = {
      "edificioEsquineroAv7C3": Materials3D.edificioEsquineroAv7C3,
      "casaAlejoAguilarBolandi": Materials3D.casaAlejoAguilarBolandi,
      "casaMarianoAlvarezMelgar" : Materials3D.casaMarianoAlvarezMelgar, 
      "calle3AAvenida11": Materials3D.calle3AAvenida11, 
      "hotelTenerife": Materials3D.hotelTenerife, 
      "hotelReyAmon": Materials3D.hotelReyAmon, 
      "restauranteSilvestre": Materials3D.restauranteSilvestre, 
      "castilloDelMoro": Materials3D.castilloDelMoro, 
    };
    return materials[materialName];
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
    physicalWidth : 5,
  }
});

module.exports = ARScene;


