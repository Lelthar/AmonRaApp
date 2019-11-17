'use strict'
import React, { Component } from 'react';

import {
  PermissionsAndroid,
} from 'react-native';

import {
  ViroARScene,
  Viro3DView, 
  ViroAmbientLight, 
  ViroNode,
  ViroImage,
  ViroConstants,
  ViroBox,
} from 'react-viro';

import Geolocation from 'react-native-geolocation-service';
import RNSimpleCompass from 'react-native-simple-compass';
import mercatorAmon from './placesAR.json';
import Items3D from './res/indexObj';
import Materials3D from './res/indexMaterials';

const DEGREE_UPDATE_RATE = 10;
const DISTANCE_MAX = 100;
const SIZE_MIN = 1;
const SIZE_MAX = 15;
const LABEL_SIZE_MIN = 0.025;
const LABEL_SIZE_MAX = 0.5;

let heading = 0;

export class ARScene extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userMercProjection: null,
      sceneVisible: false,
      trackingUpdated: true,
      arePlacesBeingWatched: [false,false,false],
      nearestARPlaces: [
          {
            x: 0, 
            z: 0, 
            lat: 0,
            lon: 0,
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
            lat: 0,
            lon: 0,
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
          lat: 0,
          lon: 0,
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
      this.state.sceneVisible && this._iterateARViewsHeading();
    });
  }

  render() {
    console.log(models);
    return (
      <ViroARScene onTrackingUpdated={this._onTrackingUpdated}>
        {this.state.sceneVisible && this.state.trackingUpdated && (
          /*<ViroImage
          position={[0,0.1,-2]}
          resizeMode='ScaleToFit'
          scale={[1,1,1]}
          source={{uri: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F28.VistaAntiguaCasaCiprianoHerreroDesdeEsquinaSuroesteEntreAvenida11yCalle3%2FcasaCiprianoAntigua.jpg?alt=media&token=e4f0f281-0099-4ac1-af3a-52329c71ef4e"}}
          />*/
          this.renderARViews()
        )}
      </ViroARScene>
    );
  }

  renderARViews = () => {
    let renderedViews = [];
    this.state.nearestARPlaces.forEach((item, index)=> {
      renderedViews.push(this._checkIfShouldEnableARView(item, index));
    })
    return renderedViews;
  }

  componentDidMount(){
    if (checkLocalizationPermission()) {
      this._watchGeopositionLookingForARPlaces();
    } 
  }

  _iterateARViewsHeading = () => {
    let newArePlacesBeingWatched = [];
    this.state.arePlacesBeingWatched.forEach((item, index) => {
      newArePlacesBeingWatched.push(this._isCurrentHeadingBetweenViewsHeadingRange(index));
    });

    if(this.state.arePlacesBeingWatched.toString() !== newArePlacesBeingWatched.toString()){
      this.setState({
        arePlacesBeingWatched: newArePlacesBeingWatched,
      });
    }
  }

  _getViewScale = (viewAR, maxSize, minSize) => {
    let scale = 0;
    let ratio = minSize / maxSize;
    let distance = Math.abs(viewAR.x) +  Math.abs(viewAR.z);
    distance > DISTANCE_MAX
    ? scale = minSize
    : scale = distance * ratio * maxSize / 2;
    return [scale,scale,scale];
  }

  _isCurrentHeadingBetweenViewsHeadingRange = (index) => {
    let placeAR = this.state.nearestARPlaces[index];
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

  _checkIfShouldEnableARView = (place, index) => {
    return (
      this.state.arePlacesBeingWatched[index] 
        ? this._createARView(place)
        : null
    );
  }
  
  _createARView = (place) => {
    let newARView = this._transformMercPointToAR(this.state.userMercProjection, place);
    let imageScale = this._getViewScale(newARView, SIZE_MAX, SIZE_MIN);
    let buttonScale = this._getViewScale(newARView, LABEL_SIZE_MAX, LABEL_SIZE_MIN);
    return this.showARView(newARView, imageScale, buttonScale);
  }

  showARView = (viewAR, imageScale, buttonScale) => {
    let pos = 0;
    viewAR.z > 0
    ? pos = 1
    : pos = -1
    console.log("Activando",viewAR);
    return( 
      <ViroNode key={viewAR.placeID}>
        <ViroAmbientLight color="#FFFFFF"/>
        <Viro3DView 
          onClick={() => this.props.arSceneNavigator.viroAppProps.setInformation(viewAR.placeID, viewAR.tittle)}
          source={this._get3DButtonlByViewName(viewAR.label3DView)} 
          position={[0, 0.1, -1]}
          scale={buttonScale}
          resources={[this._get3DMaterialByViewName(viewAR.label3DView)]}
          type="OBJ" 
        />
        <ViroImage
          position={[viewAR.x, 0.1, viewAR.z + pos - 2]}
          resizeMode='ScaleToFit'
          scale={imageScale}
          source={{uri: viewAR.img}}
        />
      </ViroNode>
    );
  }

  _watchGeopositionLookingForARPlaces = () => {
    Geolocation.watchPosition(
      (position) => {
        this._iterateARLocations(position.coords.latitude, position.coords.longitude)
      },
      {distanceFilter: 1, maximumAge: 0, timeout: 20000},
    );
  }

  _iterateARLocations = (lat, lon) => {
    let nearestARPlaces = this._getThreeNearestPlaces(lat, lon);
    let userMercProjection = this._coordLatLongToMercatorProjection(lat, lon);
    this.setState({
      userMercProjection: userMercProjection,
      nearestARPlaces: nearestARPlaces,
      sceneVisible: true,
    });
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

  _transformMercPointToAR = (userMercPoint, ViewMercPoint) => {
    let compassHeading = heading;
    let objFinalPosZ = ViewMercPoint.Y - userMercPoint.Y;
    let objFinalPosX = ViewMercPoint.X - userMercPoint.X;
    let angle = (compassHeading * Math.PI)/180;
    let newRotatedX = objFinalPosX * Math.cos(angle) - objFinalPosZ * Math.sin(angle);
    let newRotatedZ = objFinalPosZ * Math.cos(angle) + objFinalPosX * Math.sin(angle);  
    return this._generateARView(newRotatedX, -newRotatedZ, ViewMercPoint);
  }
  
  _generateARView = (newX, newZ, place) => {
    return ({ 
              x: newX, 
              z: newZ, 
              placeID: place.placeID, 
              tittle: place.tittle,
              img: place.img, 
              label3DView: place.label3DView,
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

  _distanceBetweenTwoCoordinates = (lat1, lon1, lat2, lon2) => {
    const earth_radius_Km = 6371; 
    let distanceLat = this._toRadians(lat2-lat1);
    let distanceLon = this._toRadians(lon2-lon1);
    lat1 = this._toRadians(lat1);
    lat2 = this._toRadians(lat2);
    let a = Math.sin(distanceLat/2) * Math.sin(distanceLon/2) + Math.sin(distanceLon/2) * Math.sin(distanceLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    let distance = earth_radius_Km * c;
    return distance;
  }

  _toRadians = (value) => {
    return (value / 180.0) * Math.PI;
  }

  _get3DButtonlByViewName = (viewName) => {
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

  _onTrackingUpdated = (state, reason) => {
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
