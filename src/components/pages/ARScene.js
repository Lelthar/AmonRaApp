'use strict'
import React, { Component } from 'react';

import {
  ViroARScene,
  Viro3DObject, 
  ViroAmbientLight, 
  ViroNode,
  ViroImage,
  ViroConstants,
} from 'react-viro';

import { 
  AR_PLACES_URL,
  USER_DATA,
} from '../../../constants/routesAPI';

import {
  makeBackendRequest,
} from '../../../helpers/helpers'

import AsyncStorage from '@react-native-community/async-storage';
import {requestPermissions} from '../../../permission/permission.js';
import Geolocation from 'react-native-geolocation-service';
import RNSimpleCompass from 'react-native-simple-compass';
import Items3D from '../../assets/objects/indexObj';
import Materials3D from '../../assets/objects/indexMaterials';

const DEGREE_UPDATE_RATE = 10;
const DISTANCE_MAX = 70;
const SIZE_MIN = 1;
const SIZE_MAX = 15;
const LABEL_SIZE_MIN = 0.075;
const LABEL_SIZE_MAX = 0.5;

let heading = 0;

export class ARScene extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sceneVisible: false, 
      trackingUpdated: true,
      arePlacesBeingWatched: [],
      userMercProjection: null,
      userData: null,
      placesARData: [],
    };
  }

  componentDidMount(){
    if (requestPermissions()) {
      this.get_backend_data();
      this._startCompass();
    } 
  }

  componentWillUnmount(){
    RNSimpleCompass.stop();
  }

  render() { 
    return (
      <ViroARScene>
        {this.state.sceneVisible && this.state.trackingUpdated && (
          this.state.placesARData.map((placeAR , index)=> (
            this.enableARViewByHeadingCompass(placeAR, index)
          ))
        )}
      </ViroARScene>
    );
  }

  async get_features(){
    let response = await makeBackendRequest(AR_PLACES_URL,"GET",this.state.userData);
    let responseJson = await response.json();
    this.setState({
      placesARData: responseJson,
    });
  }

  async get_user_data() {
    const user_data_storage = await AsyncStorage.getItem(USER_DATA);
    this.setState({ userData: JSON.parse(user_data_storage)});
  }

  async get_backend_data() {
    await this.get_user_data()
    await this.get_features();
  }

  _startCompass = () => {
    RNSimpleCompass.start(DEGREE_UPDATE_RATE, (degree) => {
      heading = degree 
      this._iterateARViewsHeading();
    });
  }

  _getCurrentPosition = (newArePlacesBeingWatched) => {
    Geolocation.getCurrentPosition(
      (position) => {
        let userMercProjection = this._coordLatLongToMercatorProjection(position.coords.latitude, position.coords.longitude);
        this.setState({
          sceneVisible: true,
          arePlacesBeingWatched: newArePlacesBeingWatched,
          userMercProjection : userMercProjection,
        });
      },
      (error) => {console.log(error.message);},
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  }

  _iterateARViewsHeading = () => {
    let newArePlacesBeingWatched = [];
    this.state.placesARData.forEach((placeAR) => {
      newArePlacesBeingWatched.push(this._isCurrentHeadingBetweenViewsHeadingRange(placeAR));
    });

    if(this.state.arePlacesBeingWatched.toString() !== newArePlacesBeingWatched.toString())
      this._getCurrentPosition(newArePlacesBeingWatched)
  }


  _getViewScale = (viewAR, maxSize, minSize) => {
    let scale = 0;
    let ratio = minSize / maxSize;
    let distance = Math.abs(viewAR.x) +  Math.abs(viewAR.z);
    distance > DISTANCE_MAX
    ? scale = 0
    : scale = distance * ratio * maxSize / 2;

    if (scale > maxSize)
      scale = maxSize;

    return [scale,scale,scale];
  }

  _isCurrentHeadingBetweenViewsHeadingRange = (placeAR) => {
    if (placeAR.min_degree > placeAR.max_degree){ // Cuando es de i.e 240 a 40 
      if ((placeAR.min_degree > heading && heading < placeAR.max_degree) || (placeAR.min_degree < heading && heading > placeAR.max_degree))
        return true;
    }
    else if(placeAR.min_degree < heading && heading < placeAR.max_degree)
      return true;
    
    return false;
  }

  enableARViewByHeadingCompass = (place, index) => {    
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
    if(JSON.stringify(imageScale) !== JSON.stringify([0,0,0]))
      return this.showARView(newARView, imageScale, buttonScale) ;
    
    return null;
  }
  
  showARView = (viewAR, imageScale, buttonScale) => {
    return( 
      <ViroNode key={viewAR.placeID}>
        <ViroAmbientLight color="#FFFFFF"/>
        <Viro3DObject
          onClick={() => this.props.arSceneNavigator.viroAppProps.setInformation(viewAR.placeID, viewAR.tittle, viewAR.architectureDataID)}
          source={this._get3DButtonByViewName(viewAR.label3DObject)} 
          position={[viewAR.x, 12, viewAR.z]}
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

  _transformMercPointToAR = (userMercPoint, viewMercPoint) => {
    let compassHeading = heading;
    let objFinalPosZ = viewMercPoint.y - userMercPoint.Y;
    let objFinalPosX = viewMercPoint.x - userMercPoint.X;
    let angle = (compassHeading * Math.PI)/180;
    let newRotatedX = objFinalPosX * Math.cos(angle) - objFinalPosZ * Math.sin(angle);
    let newRotatedZ = objFinalPosZ * Math.cos(angle) + objFinalPosX * Math.sin(angle);  
    return this._createARObject(newRotatedX, -newRotatedZ, viewMercPoint);
  }
  
  _createARObject = (newX, newZ, place) => {
    return ({ 
              x: newX, 
              z: newZ, 
              placeID: place.feature_id, 
              tittle: place.name,
              architectureDataID: place.architecture_data_id,
              img: place.image_url, 
              label3DObject: place.label_3d,
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

module.exports = ARScene;
