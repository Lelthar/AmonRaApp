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
} from 'react-viro';

import Geolocation from 'react-native-geolocation-service';
import RNSimpleCompass from 'react-native-simple-compass';
import mercatorAmon from './placesAR.json';
import Items3D from './res/indexObj';
import Materials3D from './res/indexMaterials';

const defaultImage = "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2Fdefault.png?alt=media&token=240374eb-adf4-42cc-8fdc-c70662582a92";
const defaultLabel3D = "casa936";
const degree_update_rate = 20;

let heading = 0;

export class ARScene extends Component {

  constructor(props) {
    super(props);
    this._coordLatLongToMercator = this._coordLatLongToMercator.bind(this);
    this._transformPointToAR = this._transformPointToAR.bind(this);
    this._setObjectPositions = this._setObjectPositions.bind(this);  
    this._getThreeNearestObjects = this._getThreeNearestObjects.bind(this); 
    this._generateARObject = this._generateARObject.bind(this); 
    this._object3dSelect = this._object3dSelect.bind(this); 
    this._material3dSelect = this._material3dSelect.bind(this); 

    this.state = {
      sceneVisible: false,
      firstNearestARObject: {
          x: 0, 
          z: 0, 
          placeID: 0, 
          tittle: "",
          img: defaultImage, 
          label3DObject: defaultLabel3D, 
      },
      secondNearestARObject: {
          x: 0, 
          z: 0, 
          placeID: 0, 
          tittle: "",
          img: defaultImage, 
          label3DObject: defaultLabel3D,
      },
      thirdsecondNearestARObject: {
        x: 0, 
        z: 0, 
        placeID: 0, 
        tittle: "",
        img: defaultImage, 
        label3DObject: defaultLabel3D,
      },
    };

    RNSimpleCompass.start(degree_update_rate, (degree) => {
      heading = degree 
    });
  }

  componentDidMount(){
    if (checkLocalizationPermission()) {
      this._setObjectPositions();
    } 
  }

  render() { 
    return (
      <ViroARScene>
        {this.state.sceneVisible && (
          this.loadARObject(this.state.firstNearestARObject)
        )}    
        {this.state.sceneVisible && (
          this.loadARObject(this.state.secondNearestARObject)
        )} 
        {this.state.sceneVisible && (
          this.loadARObject(this.state.thirdNearestARObject)
        )} 
      </ViroARScene>
    );
  }

  loadARObject(objectAR){
    return(
      <ViroNode>
        <ViroImage
          position={[objectAR.x, 0.1, objectAR.z - 1.5]}
          resizeMode='ScaleToFit'
          scale={[50,50,50]}
          source={{uri: objectAR.img}}
        />
        <ViroAmbientLight color="#FFFFFF"/>
        <Viro3DObject 
          onClick={() => this.props.arSceneNavigator.viroAppProps.setInformation(objectAR.placeID, objectAR.tittle)}
          source={this._object3dSelect(objectAR.label3DObject)} 
          position={[objectAR.x, 1, objectAR.z - 1]}
          scale={[1,1,1]}
          resources={[this._material3dSelect(objectAR.label3DObject)]}
          type="OBJ" 
        />
      </ViroNode>
    );
  }

  _setObjectPositions(){
    Geolocation.watchPosition(
      (position) => {
        this._getThreeNearestObjects(position.coords.latitude, position.coords.longitude)
      },
      {enableHighAccuracy: true, distanceFilter: 0, maximumAge: 0, timeout: 20000},
    );
  }

  // Sacar los dos objetos mas cercanos al dispositivo, es decir, con la menor distancia por recorrer
  _getThreeNearestObjects(lat, long){
    let firstObject, secondObject, thirdObject; 
    let firstObjectDistance = Number.MAX_VALUE, secondObjectDistance = Number.MAX_VALUE, thirdObjectDistance = Number.MAX_VALUE;
    let userMercatorPoint = this._coordLatLongToMercator(lat, long);
    mercatorAmon.forEach((element) => {
      let objectAR = this._transformPointToAR(userMercatorPoint, element);
      let distance = Math.abs(objectAR.x) +  Math.abs(objectAR.z);
      if(distance < firstObjectDistance){
        thirdObject = secondObject;
        thirdObjectDistance = secondObjectDistance;
        secondObject = firstObject;
        secondObjectDistance = firstObjectDistance;
        firstObject = objectAR;
        firstObjectDistance = distance;
      }else if(distance < secondObjectDistance){
        thirdObject = secondObject
        thirdObjectDistance = secondObjectDistance;
        secondObject = objectAR;
        secondObjectDistance = distance;
      }else if(distance < thirdObjectDistance){
        thirdObject = objectAR;
        thirdObjectDistance = distance;
      }
    });
    
    this.setState({
      firstNearestARObject: firstObject,
      secondNearestARObject: secondObject, 
      thirdNearestARObject: thirdObject,  
      sceneVisible: true,
    });
  }

  _transformPointToAR(userMercPoint, objectMercPoint) {
    let compassHeading = heading;
    let objFinalPosZ = objectMercPoint.Y - userMercPoint.Y;
    let objFinalPosX = objectMercPoint.X - userMercPoint.X;
    let angle = (compassHeading * Math.PI)/180;
    let newRotatedX = objFinalPosX * Math.cos(angle) - objFinalPosZ * Math.sin(angle);
    let newRotatedZ = objFinalPosZ * Math.cos(angle) + objFinalPosX * Math.sin(angle);  
    return this._generateARObject(newRotatedX, -newRotatedZ, objectMercPoint);
  }
  
  _generateARObject(newX, newZ, object){
    return ({ 
              x: newX, 
              z: newZ, 
              placeID: object.placeID, 
              tittle: object.tittle,
              img: object.img, 
              label3DObject: object.label3DObject
           });
  }

  // Converts Lat and Long to Mercator projection
  _coordLatLongToMercator(lat_degree, lon_degree) { 
    let lon_radians = (lon_degree / 180.0) * Math.PI;
    let lat_radians = (lat_degree / 180.0) * Math.PI;
    let earth_radius = 6378137.0;
    let xmeters  = earth_radius * lon_radians;
    let ymeters = earth_radius * Math.log((Math.sin(lat_radians) + 1) / Math.cos(lat_radians));
    return ({X:xmeters, Y:ymeters});
  }

  _object3dSelect(objectName){
    const objects = {
      "calle3Ahaciaav11": Items3D.calle3Ahaciaav11,
      "casa936": Items3D.casa936,
      "hoteldoncarlos": Items3D.hoteldoncarlos,
      "antiguedadesgobelino": Items3D.antiguedadesgobelino,
      "joaquintinoco": Items3D.joaquintinoco,
      "serranobonilla": Items3D.serranobonilla,
      "familiaolle":  Items3D.familiaolle,
      "calle5haciaav9": Items3D.calle5haciaav9,
      "hotelreyamon": Items3D.hotelreyamon,
      "alvarezmelgar": Items3D.alvarezmelgar,
      "ciprianoherrero": Items3D.ciprianoherrero,
      "anticuariosanangel": Items3D.anticuariosanangel,
      "quesadaavendano": Items3D.quesadaavendano,
      "ulateblanco": Items3D.ulateblanco,
      "hoteltenerife": Items3D.hoteltenerife,
      "centrodecine": Items3D.centrodecine,
      "eliaspages": Items3D.eliaspages,
      "calvopena": Items3D.calvopena,
      "brenesmendez": Items3D.brenesmendez,
      "huetequiroz": Items3D.huetequiroz,
      "herrerodelpera": Items3D.herrerodelpera,
      "av5ycalles5y7": Items3D.av5ycalles5y7,
      "alianzaFrancesa": Items3D.alianzaFrancesa,
      "gonzalesfeo": Items3D.gonzalesfeo,
      "aguilarbolandi": Items3D.aguilarbolandi,
      "antiguafosforera": Items3D.antiguafosforera,
      "hotelhemingway": Items3D.hotelhemingway,
      "avenida7calle3": Items3D.avenida7calle3,
      "casamuseo707": Items3D.casamuseo707,
      "casaverde": Items3D.casaverde,
      "peraltazeller": Items3D.peraltazeller,
      "hoteldunninn": Items3D.hoteldunninn,
      "hinncasaverde": Items3D.hinncasaverde,
      "obregonloria": Items3D.obregonloria,
      "familiamadriz": Items3D.familiamadriz,
      "castillodelmoro": Items3D.castillodelmoro,
      "escuelatecnicanacional": Items3D.escuelatecnicanacional,
    };

    return objects[objectName];
  }

  _material3dSelect(materialName){
    const materials = {
      "calle3Ahaciaav11": Materials3D.calle3Ahaciaav11,
      "casa936": Materials3D.casa936,
      "hoteldoncarlos": Materials3D.hoteldoncarlos,
      "antiguedadesgobelino": Materials3D.antiguedadesgobelino,
      "joaquintinoco": Materials3D.joaquintinoco,
      "serranobonilla": Materials3D.serranobonilla,
      "familiaolle":  Materials3D.familiaolle,
      "calle5haciaav9": Materials3D.calle5haciaav9,
      "hotelreyamon": Materials3D.hotelreyamon,
      "alvarezmelgar": Materials3D.alvarezmelgar,
      "ciprianoherrero": Materials3D.ciprianoherrero,
      "anticuariosanangel": Materials3D.anticuariosanangel,
      "quesadaavendano": Materials3D.quesadaavendano,
      "ulateblanco": Materials3D.ulateblanco,
      "hoteltenerife": Materials3D.hoteltenerife,
      "centrodecine": Materials3D.centrodecine,
      "eliaspages": Materials3D.eliaspages,
      "calvopena": Materials3D.calvopena,
      "brenesmendez": Materials3D.brenesmendez,
      "huetequiroz": Materials3D.huetequiroz,
      "herrerodelpera": Materials3D.herrerodelpera,
      "av5ycalles5y7": Materials3D.av5ycalles5y7,
      "alianzaFrancesa": Materials3D.alianzaFrancesa,
      "gonzalesfeo": Materials3D.gonzalesfeo,
      "aguilarbolandi": Materials3D.aguilarbolandi,
      "antiguafosforera": Materials3D.antiguafosforera,
      "hotelhemingway": Materials3D.hotelhemingway,
      "avenida7calle3": Materials3D.avenida7calle3,
      "casamuseo707": Materials3D.casamuseo707,
      "casaverde": Materials3D.casaverde,
      "peraltazeller": Materials3D.peraltazeller,
      "hoteldunninn": Materials3D.hoteldunninn,
      "hinncasaverde": Materials3D.hinncasaverde,
      "obregonloria": Materials3D.obregonloria,
      "familiamadriz": Materials3D.familiamadriz,
      "castillodelmoro": Materials3D.castillodelmoro,
      "escuelatecnicanacional": Materials3D.escuelatecnicanacional,
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

module.exports = ARScene;
