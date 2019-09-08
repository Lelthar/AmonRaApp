import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

import { connect } from "react-redux";

import {
  menuResetAction,
} from "../../redux/actions/menuDataActions";

import {
  showBriefInformationAction,
} from "../../redux/actions/briefInformationActions";

import {
  changeLayerMenuVisibilityAction,
  setRegionAction,
} from "../../redux/actions/mapActions";

import MapView from 'react-native-maps';
import Image from 'react-native-scalable-image';
import AsyncStorage from '@react-native-community/async-storage';

import FilterMenu from '../../../components/FilterMenu/FilterMenu';
import FilterButton from '../partials/FilterButton';
import HamburgerComponent from '../partials/HamburguerMenu';
import BriefInformation from '../partials/BriefInformation';
import MapLayersMenu from '../partials/MapLayersMenu';

import { 
  FEATURES_URL,
  PERIMETER_URL,
  USER_DATA,
} from '../../../constants/constants';

import {
  IMAGES,
  DEFAULT_MARKER,
} from "../../assets/constants/map";

import {
  makeBackendRequest,
} from '../../../helpers/helpers';

import styles from "../../assets/styles/pages/map";

const mapStateToProps = state => {
  return {
    activeFilters: state.menuDataReducer.ACTIVEFILTERS,
    filterMenu: state.menuDataReducer.FILTERMENU,
    menuSide: state.menuDataReducer.MENUSIDE,
    informationVisible: state.briefInformationReducer.VISIBLE,
    mapStyle: state.mapReducer.MAP_STYLE,
    layersMenuVisible: state.mapReducer.LAYERS_MENU_VISIBLE,
    region: state.mapReducer.REGION,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetAll: () => {
      dispatch(menuResetAction());
    },
    setInformationVisible: (data) => {
      dispatch(showBriefInformationAction(data));
    },
    changeLayersMenuVisibility: () => {
      dispatch(changeLayerMenuVisibilityAction());
    },
    setRegion: (data) => {
      dispatch(setRegionAction(data));
    },
  };
};

const Map = (props) => {

  const [barrioAmonCoordinates, setBarrioAmonCoordinates] = useState([]);
  const [currentMarker, setCurrentMarker] = useState(DEFAULT_MARKER);
  const [markers, setMarkers] = useState([]);
  const [perimeterDataLoaded, setPerimeterDataLoaded] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  closeMenu = () => {
    props.resetAll();
  };

  getActiveMarkers = () => {
    const activeFilters = props.activeFilters.slice();

    const activeFiltersKeys = filterFiltersByKey(activeFilters);

    return (activeFiltersKeys.length > 0) ? filterMarkersByActiveFilter(markers,activeFiltersKeys) : [];
  };

  filterFiltersByKey = (activeFilters) => {
    let activeFiltersKeys = [];

    for(filter in activeFilters) {
      activeFiltersKeys.push(activeFilters[filter].key);
    }
    return activeFiltersKeys;
  }

  filterMarkersByActiveFilter = (selectedMarkers, filters) => {
    let activeMarkers = []

    for (let i = 0; i < selectedMarkers.length; i++) {
      if (filters.includes(selectedMarkers[i].category)) {
        const newMarker = {
          coordinates: {
            latitude: selectedMarkers[i].latitude,
            longitude: selectedMarkers[i].longitude
          },
          title: selectedMarkers[i].name,
          description: selectedMarkers[i].description,
          direction: selectedMarkers[i].direction,
          tel: selectedMarkers[i].phone_number,
          facebook: selectedMarkers[i].facebook,
          category: selectedMarkers[i].category,
          marker_id: 1,
          images_url: [selectedMarkers[i].image1_url, selectedMarkers[i].image2_url, selectedMarkers[i].image3_url],
        };
        activeMarkers.push(newMarker);
      }
    }

    return activeMarkers;
  };

  openInformation = (marker) => {
    closeMenu();

    setCurrentMarker(marker);
    props.setInformationVisible(true);
  };

  displayMyLocation = () => {
    props.setRegion(userLocation);
  };

  addUserLocation = (coordinate) => {
    setUserLocation({
      longitude : coordinate.longitude,
      latitude: coordinate.latitude,
      latitudeDelta: 0.004,
      longitudeDelta: 0.004,
    });
  };

  arrayOfCoordinatesToLatLng = (lonLatArray) => {
    let coordinates = []
    for (lonLat in lonLatArray){
      coordinates.push({
        latitude: lonLatArray[lonLat][1],
        longitude: lonLatArray[lonLat][0]
      });
    }

    return coordinates;
  };

  getPerimeters =  async () => {
    const response = await makeBackendRequest(PERIMETER_URL,"GET",userData);
      
    const responseJson = await response.json();

    const coordinatesPerimeter = arrayOfCoordinatesToLatLng(responseJson);

    setBarrioAmonCoordinates(coordinatesPerimeter);
    setPerimeterDataLoaded(true);
  };

  getFeatures = async () => {
    const response = await makeBackendRequest(FEATURES_URL,"GET",userData);
      
    const responseJson = await response.json();

    setMarkers(responseJson);
  };

  getUserData = async () => {
    const userDataStorage = await AsyncStorage.getItem(USER_DATA);

    setUserData(JSON.parse(userDataStorage));
  };

  getBackendData = async () => {
    await getUserData();
    await getPerimeters();
    await getFeatures();
  }

  useEffect(() => {
    getBackendData();
  }, []);

  return (
    <View style={styles.container} >
      <MapView
        style={styles.map}
        showsMyLocationButton={true}
        onUserLocationChange={locationChangedResult => addUserLocation(locationChangedResult.nativeEvent.coordinate)}
        showsUserLocation={true}
        region={props.region}
        mapType={props.mapStyle}
        showsCompass = {true}
        showsMyLocationButton={true}
        chacheEnabled={false}
        zoomEnabled={true}
        onRegionChangeComplete={res => props.setRegion(res)}
        onPress = {() => closeMenu()}
      >
        
        {perimeterDataLoaded && (
          <MapView.Polygon
            coordinates={barrioAmonCoordinates}
            strokeWidth={2}
            tappable={false}
            strokeColor="#fd3c00"
          />
        )}

        {/*Marker si estoy en barrio amón:agarrar localizacion, sino estoy en barrio amón: no ponerlo*/}

        {getActiveMarkers().map((marker, index) => (
          <MapView.Marker
            key={index}
            coordinate={marker.coordinates}
            description={marker.description}
            onPress={() => openInformation(marker) }
            image={IMAGES[marker.category]}
          >
            <MapView.Callout tooltip={true} />
          </MapView.Marker>
        ))}

      </MapView>

      <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}} >

        { /* barra de arriba */}
        <View style={{flex:8}} />

        {/* Body completo, flex row */}
        <View style={{flex:40, flexDirection:'row', justifyContent:'center'}} >

          <View style={{flex:2}} />

          {/* 1 columnas de botón */}
          <View style={{flex:0.5, flexDirection:'column'}} >

            <View style={{flex:0.5}}/>

            <View style={{flex:5.5, flexDirection:'row'}} >

              <View style={{flex:2}} />

              <TouchableOpacity style={styles.imgContainer} onPress={()=> props.changeLayersMenuVisibility()} >
                <Image
                  style={styles.squareButton}
                  source={props.layersMenuVisible ? require('../../assets/images/map/capas-icon-turq.png') :
                                                    require('../../assets/images/map/capas-icon.png') }
                />
              </TouchableOpacity>
            </View>

            <View style={{flex:0.5}}/>

            <View style={{flex:15}} >
            
              {props.layersMenuVisible && (
                <MapLayersMenu />
              )}
            </View>                       

            <View style={{flex:12, flexDirection:'row'}} >
              <View style={{flex:2}} />
              <TouchableOpacity style={styles.imgContainer} onPress={() => displayMyLocation()} >
                <Image
                  style={styles.squareButton}
                  source={require('../../assets/images/map/ubicacion.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={{flex:2.5}} />
          </View>

          {/* 0.5 columna vacía*/}
          <View style={{flex:0.10}} />                  

        </View>

        {/* Boton de filtros */}
        <View style={styles.filterButton} >
          <FilterButton />
        </View> 

        {/* Menu de filtros del mapa */}          
        {props.filterMenu && (
          <View style={styles.filterMenu} >
            <FilterMenu />
          </View> 
        )}            

        {props.informationVisible && (
          <BriefInformation marker={currentMarker} navigation={props.navigation} />
        )}

        <View style={{ flex: 5.5 }} />                  
      </View>

      {props.menuSide && (
        <HamburgerComponent /> 
      )}
                    
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);