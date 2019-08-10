'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Dimensions
} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroBox,
  Viro3DObject, 
  ViroAmbientLight,
  ViroSpotLight,
  ViroNode,
  ViroConstants,
  ViroImage,
} from 'react-viro';

import Geolocation from 'react-native-geolocation-service';
import RNSimpleCompass from 'react-native-simple-compass';


const coordTEC = [{place: "Centro de las Artes", lat: 9.857535, lon: -83.911538},
                  {place: "Financiero", lat: 9.856955, lon: -83.912267}, 
                  {place: "Editorial TEC", lat: 9.856614, lon: -83.912142},
                  {place: "Soda El Ferrocarril", lat: 9.857331, lon: -83.910869}, 
                  {place: "Gimnasio Institucional", lat: 9.857003, lon: -83.910855}, 
                  {place: "Gimnasio ASETEC", lat: 9.856535, lon: -83.910827}, 
                  {place: "Escuela Cultura y Deporte", lat: 9.856302, lon: -83.911833}, 
                  {place: "Escuela de Computacion", lat: 9.856713, lon: -83.912661}, 
                  {place: "Escuela de Matematica", lat: 9.856136, lon: -83.913089}, 
                  {place: "Pretil", lat: 9.855712, lon: -83.912805}, 
                  {place: "Soda ASETEC", lat: 9.855463, lon: -83.912314}, 
                  {place: "Lab H", lat: 9.856300, lon: -83.912591}, 
                  {place: "Biblioteca", lat: 9.855000, lon: -83.912591},  
                 ];

const mercatorTEC = [{place: "Centro de las Artes", X: -9340989.681840425, Y: 1102789.7035470225},
                     {place: "Financiero", X: -9341070.833749214, Y: 1102724.1708053024},
                     {place: "Editorial TEC", X: -9341056.918812865, Y: 1102685.642126478},
                     {place: "Soda El Ferrocarril", X: -9340915.209101086, Y: 1102766.6540867938}, 
                     {place: "Gimnasio Institucional", X: -9340913.650628215, Y: 1102729.594200243}, 
                     {place: "Gimnasio ASETEC", X: -9340910.533682471, Y: 1102676.7161332557}, 
                     {place: "Escuela Cultura y Deporte", X: -9341022.52109021, Y: 1102650.3901150657}, 
                     {place: "Escuela de Computacion", X: -9341114.693628585, Y: 1102696.827867839}, 
                     {place: "Escuela de Matematica", X: -9341162.338370645, Y: 1102631.634250793}, 
                     {place: "Pretil", X: -9341130.723635262, Y: 1102583.7277487542}, 
                     {place: "Soda ASETEC", X: -9341076.06576528, Y: 1102555.5940062169}, 
                     {place: "Lab H", X: -9341106.90126423, Y: 1102650.164140742}, 
                     {place: "Biblioteca", X: -9341106.90126423, Y: 1102503.2811197315},  
                     {place: "Super Cartago", X: -9342335.86844259, Y: 1102024.005848375},  
                     {place: "Esquina sur", X: -9342342.324973054, Y: 1101922.3079511977},  
                    ];

export default class AR_Scene extends Component {

  constructor() {
    super();

    this._onTrackingUpdated = this._onTrackingUpdated.bind(this);
    this._coordLatLongToMercator = this._coordLatLongToMercator.bind(this);
    this._transformPointToAR = this._transformPointToAR.bind(this);
    this._calibrateCompass = this._calibrateCompass.bind(this);
    this._setObjectPositions = this._setObjectPositions.bind(this);
    
    this.state = {
      userLatitude: 0,
      userLongitude: 0,
      objectPlaceAR1: null,
      objectPlaceAR2: null,
      objectXPos1: 0,
      objectZPos1: 0,
      objectXPos2: 0,
      objectZPos2: 0,
      compassHeading: 0,
      coordinateString: "Sin datos",
      coordinateLatLongString: "Sin datos",
      error: null
    };
  }
  
  render() { 
    return (
        <ViroARScene>
          {/*<ViroText text={this.state.heading+"||"+this.state.coordinateLatLongString + " || " +this.state.coordinateXYZString}
              scale={[.1, .1, .1]} height={5} width={4} position={[0, 0, -.1]} style={styles.helloWorldTextStyle} />
          
          <ViroText text={"Casa Verde"}
            scale={[7, 7, 7]} height={7} width={5} position={[this.state.objectXPos, 0, this.state.objectZPos]} style={styles.helloWorldTextStyle} />
          */}
          
          
          <ViroAmbientLight color={"#aaaaaa"} />

          <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]}
            position={[0, 3, 1]} color="#ffffff" castsShadow={true} />

          <ViroText text={this.state.objectPlaceAR1}
            scale={[3, 3, 3]} height={5} width={4} 
            position={[this.state.objectXPos1 + 0.5, 1, this.state.objectZPos1]}
            style={styles.helloWorldTextStyle}/>

          <ViroImage
            onClick={this.props.arSceneNavigator.viroAppProps.setInformation}
            scale={[5,5,5]}
            position={[this.state.objectXPos1, 1, this.state.objectZPos1]}
            source={require('./res/icon_info.png')}
          />

          <ViroText text={this.state.objectPlaceAR2}
            scale={[3, 3, 3]} height={5} width={4} 
            position={[this.state.objectXPos2 + 0.5, 1, this.state.objectZPos2]}
            style={styles.helloWorldTextStyle}/>

          <ViroImage
            onClick={this.props.arSceneNavigator.viroAppProps.setInformation}
            scale={[5,5,5]}
            position={[this.state.objectXPos2, 1, this.state.objectZPos2]}
            source={require('./res/icon_info.png')}
          />

           {/*<ViroImage
            onClick={this.props.arSceneNavigator.viroAppProps.setInformation}
            scale={[0.5,0.5,0.5]}
            position={[0, 1, 0.5]}
            source={require('./res/icon_info.png')}
          />

         <ViroImage
            position={[0, .1, 0.5]}
            resizeMode='ScaleToFit'
            source={require('./res/imgSample.jpg')}
          />*/}

        </ViroARScene>
    );
  }

  componentDidMount(){
    if (checkLocalizationPermission()) {
      this._setObjectPositions();
    } 
    else {
      this.setState({
        error : "Permission Denied"
      });
    }
  }
  
  _setObjectPositions(){
    Geolocation.watchPosition(
      (position) => {
        this._calibrateCompass();
      //  console.log("Current Lat " + position.coords.latitude + " Current Lng " + position.coords.longitude);

        let objetPositionAR1;
        let objetPositionAR2;
        let objectDistanceArray = [];
        let objectsArray = [];

        mercatorTEC.forEach((element) => {
          objetPositionAR1 = this._transformPointToAR(position.coords.latitude, position.coords.longitude, element.X, element.Y, element.place);
          objectsArray.push(objetPositionAR1);
          objectDistanceArray.push(Math.abs(objetPositionAR1.x) +  Math.abs(objetPositionAR1.z));
        });

        let indexNearestObject = objectDistanceArray.indexOf(Math.min(...objectDistanceArray));
        objetPositionAR1 = objectsArray[indexNearestObject];

        objectDistanceArray.splice(indexNearestObject, 1); 
        objectsArray.splice(indexNearestObject, 1);

        indexNearestObject = objectDistanceArray.indexOf(Math.min(...objectDistanceArray));
        objetPositionAR2 = objectsArray[indexNearestObject];

        this.setState({
          userLatitude: position.coords.latitude,
          userLongitude: position.coords.longitude,
          objectPlaceAR1: objetPositionAR1.p,
          objectPlaceAR2: objetPositionAR2.p,
          objectXPos1: objetPositionAR1.x,
          objectZPos1: objetPositionAR1.z,
          objectXPos2: objetPositionAR2.x,
          objectZPos2: objetPositionAR2.z,
          error: null   
        });
      },
      (error) => {
          this.setState({
            error: error.message
          });
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 0, distanceFilter: 10}
    );
  }

  _calibrateCompass(){
    let myself = this;
    const degree_update_rate = 3; // Number of degrees changed before the callback is triggered
      RNSimpleCompass.start(degree_update_rate, (degree) => {
     //   console.log('You are facing', degree);
        myself.setState({
          compassHeading: degree
        });
        RNSimpleCompass.stop();
      });
  }
  
  _transformPointToAR(lat, long, objectPoint_x, objectPoint_y, place) {
    let userPoint = this._coordLatLongToMercator(lat, long);
    //let superChospi = this._coordLatLongToMercator(9.8507581, -83.923631);
    //let esquina = this._coordLatLongToMercator(9.849858, -83.923689);

    // latitude(north,south) maps to the z axis in AR
    // longitude(east, west) maps to the x axis in AR

    let objFinalPosZ = objectPoint_y - userPoint.y;
    let objFinalPosX = objectPoint_x - userPoint.x;
    let angle = this.state.compassHeading * Math.PI/180;
    let newRotatedX = objFinalPosX * Math.cos(angle) - objFinalPosZ * Math.sin(angle);
    let newRotatedZ = objFinalPosZ * Math.cos(angle) + objFinalPosX * Math.sin(angle);  

    //flip the z, as negative z(is in front of us which is north, pos z is behind(south).
    return ({x:newRotatedX, z:-newRotatedZ, p: place});
  }

  // Converts Lat and Long to Mercator projection
  _coordLatLongToMercator(lat_degree, lon_degree) { 
    let lon_radians = (lon_degree / 180.0 * Math.PI);
    let lat_radians = (lat_degree / 180.0 * Math.PI);
    let earth_radius = 6378137.0;
    let xmeters  = earth_radius * lon_radians;
    let ymeters = earth_radius * Math.log((Math.sin(lat_radians) + 1) / Math.cos(lat_radians));
    return ({x:xmeters, y:ymeters});
 }
  
  _onTrackingUpdated(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL){
      console.log("Tracking normal");
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
    fontSize: 50,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = AR_Scene;