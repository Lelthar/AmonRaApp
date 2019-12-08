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
  ViroConstants,
} from 'react-viro';

import Geolocation from 'react-native-geolocation-service';
import RNSimpleCompass from 'react-native-simple-compass';
import mercatorAmon from '../../assets/files/placesAR.json';
import Items3D from '../../assets/objects/indexObj';
import Materials3D from '../../assets/objects/indexMaterials';

const DEGREE_UPDATE_RATE = 10;
const DISTANCE_MIN = 1;
const DISTANCE_MAX = 100;
const SIZE_MIN = 1;
const SIZE_MAX = 15;
const LABEL_SIZE_MIN = 0.025;
const LABEL_SIZE_MAX = 0.5;

let heading = 0;
let watchID = 0;

export class ARScene extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sceneVisible: false,
      trackingUpdated: true,
      arePlacesBeingWatched: [false,false,false],
      userMercProjection: null,
      nearestARPlaces: [
        {
            x: 0, 
            z: 0, 
            placeID: 0, 
            tittle: "",
            img: "", 
            label3DObject: "", 
            "min_degree": 0,
            "max_degree": 0
        },
        {
            x: 0, 
            z: 0, 
            placeID: 0, 
            tittle: "",
            img: "", 
            label3DObject: "",
            "min_degree": 0,
            "max_degree": 0,
        },
        {
          x: 0, 
          z: 0, 
          placeID: 0, 
          tittle: "",
          img: "", 
          label3DObject: "",
          "min_degree": 0,
          "max_degree": 0,
        }
      ],
    };

    RNSimpleCompass.start(DEGREE_UPDATE_RATE, (degree) => {
      heading = degree 
      console.log(degree);
      this.props.arSceneNavigator.viroAppProps.changeCompass(heading);
      this._iterateARViewsHeading();
    });
  }

  componentDidMount(){
    if (checkLocalizationPermission()) {
      this._watchGeopositionLookingForARPlaces();
    } 
  }

  componentWillUnmount(){
    RNSimpleCompass.stop();
    Geolocation.clearWatch(watchID);
    Geolocation.stopObserving();
  }

  render() { 
    return (
      <ViroARScene onTrackingUpdated={this._onTrackingUpdated}>
        {this.state.sceneVisible && this.state.trackingUpdated && (
          this.state.nearestARPlaces.map((item , index)=> (
            this.enableARViewByHeadingCompass(item, index)
          ))
        )}
      </ViroARScene>
    );
  }

  _iterateARViewsHeading = () => {
    console.log("Iterating views");
    let newArePlacesBeingWatched = [];
    this.state.nearestARPlaces.forEach((item, index) => {
      newArePlacesBeingWatched.push(this._isCurrentHeadingBetweenViewsHeadingRange(item));
    });
    
    if(this.state.arePlacesBeingWatched.toString() !== newArePlacesBeingWatched.toString()){
      console.log("newArePlacesBeingWatched",newArePlacesBeingWatched);
      this.setState({
        arePlacesBeingWatched: newArePlacesBeingWatched,
      });
    }
  }

  _getViewScale = (viewAR, maxSize, minSize) => {
    let scale = 0;
    let ratio = minSize / maxSize;
    let distance = Math.abs(viewAR.x) +  Math.abs(viewAR.z);
    console.log("Distance",distance);
    distance > DISTANCE_MAX
    ? scale = minSize
    : scale = distance * ratio * maxSize / 2;
    if (scale > maxSize){
      scale = maxSize;
    }
    return [scale,scale,scale];
  }

  _isCurrentHeadingBetweenViewsHeadingRange = (placeAR) => {
    if (placeAR.min_degree > placeAR.max_degree){ // Cuando es de i.e 240 a 40 
      if ((placeAR.min_degree > heading && heading < placeAR.max_degree) || (placeAR.min_degree < heading && heading > placeAR.max_degree)){
        return true;
      }
    }
    else if(placeAR.min_degree < heading && heading < placeAR.max_degree){
      return true;
    }

    return false;
  }

  enableARViewByHeadingCompass=(place, index)=>{
    return (
      this.state.arePlacesBeingWatched[index]
      ? this._setARView(place)
      : null 
    );
  }

  _setARView = (place) => {
    let newARView = this._transformMercPointToAR(this.state.userMercProjection, place);
    let imageScale = this._getViewScale(newARView, SIZE_MAX, SIZE_MIN);
    let buttonScale = this._getViewScale(newARView, LABEL_SIZE_MAX, LABEL_SIZE_MIN);
    return this.showARView(newARView, imageScale, buttonScale);
  }
  
  showARView = (viewAR, imageScale, buttonScale) => {
    console.log("Activando",viewAR);
    return( 
      <ViroNode key={viewAR.placeID}>
        <ViroAmbientLight color="#FFFFFF"/>
        <Viro3DObject
          onClick={() => this.props.arSceneNavigator.viroAppProps.setInformation(viewAR.placeID, viewAR.tittle)}
          source={this._get3DButtonByViewName(viewAR.label3DObject)} 
          position={[viewAR.x, 10 ,viewAR.z]}
          scale={buttonScale}
          resources={[this._get3DMaterialByViewName(viewAR.label3DObject)]}
          type="OBJ" 
        />
        <ViroImage
          position={[viewAR.x, 0.1, viewAR.z]}
          resizeMode='ScaleToFit'
          scale={imageScale}
          source={{uri: viewAR.img}}
        />
      </ViroNode>
    );
  }

  _watchGeopositionLookingForARPlaces = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        this._iterateARLocations(position.coords.latitude, position.coords.longitude)
      },
      {distanceFilter: 0, maximumAge: 0, timeout: 20000},
    );
  }

  _getThreeNearestPlaces = (userLat, userLon) => {
    let firstNearestPlace, secondNearestPlace, thirdNearestPlace;
    let firstNearestPlaceDistance = Number.MAX_VALUE,
        secondNearestPlaceDistance = Number.MAX_VALUE, 
        thirdNearestPlaceDistance = Number.MAX_VALUE;

    mercatorAmon.forEach((placeAR) => {
      let distance = this._distanceBetweenTwoCoordinates(userLat, userLon, placeAR.lat, placeAR.lon);
      if(distance < firstNearestPlaceDistance){
        thirdNearestPlace = secondNearestPlace;
        thirdNearestPlaceDistance = secondNearestPlaceDistance;
        secondNearestPlace = firstNearestPlace;
        secondNearestPlaceDistance = firstNearestPlaceDistance;
        firstNearestPlace = placeAR;
        firstNearestPlaceDistance = distance;
      }else if(distance < secondNearestPlaceDistance){
        thirdNearestPlace = secondNearestPlace
        thirdNearestPlaceDistance = secondNearestPlaceDistance;
        secondNearestPlace = placeAR;
        secondNearestPlaceDistance = distance;
      }else if(distance < thirdNearestPlaceDistance){
        thirdNearestPlace = placeAR;
        thirdNearestPlaceDistance = distance;
      }
    });
    console.log("Nearest Places",[firstNearestPlace, secondNearestPlace, thirdNearestPlace])
    return [firstNearestPlace, secondNearestPlace, thirdNearestPlace];
  }

  _onTrackingUpdated=(state, reason) =>{
    if (state == ViroConstants.TRACKING_NORMAL){
      this.setState({
        trackingUpdated: true,
      });
    }
    else if (state == ViroConstants.TRACKING_NONE){
      this.setState({
        trackingUpdated: false,
      });
    }
  }

  _iterateARLocations = (lat, lon) => {
    let nearestARPlaces = this._getThreeNearestPlaces(lat, lon);
    //console.log("Mi casa",this._coordLatLongToMercatorProjection(9.850768, -83.923726));
    let userMercProjection = this._coordLatLongToMercatorProjection(lat, lon);
    this.setState({
      userMercProjection: userMercProjection,
      nearestARPlaces: nearestARPlaces,
      sceneVisible: true,
    });
  }

  _transformMercPointToAR = (userMercPoint, ViewMercPoint) => {
    let compassHeading = heading;
    let objFinalPosZ = ViewMercPoint.Y - userMercPoint.Y;
    let objFinalPosX = ViewMercPoint.X - userMercPoint.X;
    let angle = (compassHeading * Math.PI)/180;
    let newRotatedX = objFinalPosX * Math.cos(angle) - objFinalPosZ * Math.sin(angle);
    let newRotatedZ = objFinalPosZ * Math.cos(angle) + objFinalPosX * Math.sin(angle);  
    return this._createARObject(newRotatedX, -newRotatedZ, ViewMercPoint);
  }
  
  _createARObject = (newX, newZ, place) => {
    return ({ 
              x: newX, 
              z: newZ, 
              placeID: place.placeID, 
              tittle: place.tittle,
              img: place.img, 
              label3DObject: place.label3DObject,
              "min_degree": place.min_degree,
              "max_degree": place.max_degree
           });
  }

  _coordLatLongToMercatorProjection = (lat_degree, lon_degree) => { 
    const earth_radius = 6378137.0;
    let lon_radians = this._toRadians(lon_degree);
    let lat_radians = this._toRadians(lat_degree);
    let xmeters  = earth_radius * lon_radians;
    let ymeters = earth_radius * Math.log((Math.sin(lat_radians) + 1) / Math.cos(lat_radians));
    return ({X:xmeters, Y:ymeters});
  }

  _toRadians = (value) => {
    return (value / 180.0) * Math.PI;
  }

  _distanceBetweenTwoCoordinates = (lat1, lon1, lat2, lon2) => {
    lat1 = this._toRadians(lat1);
    lon1 = this._toRadians(lon1);
    lat2 = this._toRadians(lat2);
    lon2 = this._toRadians(lon2);
    const earth_diam_km = 12742; 
    let distanceLat = lat2 - lat1;
    let distanceLon = lon2 - lon1;
    let a = (
      (1 - Math.cos(distanceLat)) +
      (1 - Math.cos(distanceLon)) * Math.cos(lat1) * Math.cos(lat2)
    ) / 2;
  
    return earth_diam_km * Math.asin(Math.sqrt(a));
  }

  _get3DButtonByViewName = (viewName) => {
    const buttons = {
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
      "hotelAmstelAmon": Items3D.hotelAmstelAmon,
    };

    return buttons[viewName];
  }

  _get3DMaterialByViewName = (viewName) => {
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
      "hotelAmstelAmon": Materials3D.hotelAmstelAmon,
    };
    
    return materials[viewName];
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
