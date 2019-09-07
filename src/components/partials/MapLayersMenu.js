import React from 'react';
import {
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import styles from "../../assets/styles/partials/mapLayersMenu";

import {
  BARRIO_AMON_LOCATION,
} from "../../assets/constants/map";

import {
  BASIC_MAP,
  SATELITAL_MAP,
  BARRIO_AMON_IMAGE,
} from "../../assets/constants/mapLayersMenu";

import { connect } from "react-redux";

import {
  setMapStyleAction,
  setRegionAction,
} from "../../redux/actions/mapActions";

const mapStateToProps = state => {
  return {
    normalStyle: state.mapReducer.NORMAL_STYLE,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMenuStyle: (data) => {
      dispatch(setMapStyleAction(data));
    },
    setRegion: (data) => {
      dispatch(setRegionAction(data));
    },
  };
};

const MapLayersMenu = (props) => {

  changeMapStyle = () => {
    props.setMenuStyle(!props.normalStyle);
  };

  setBarrioAmonDirection = () => {
    props.setRegion(BARRIO_AMON_LOCATION);
  };

  return (
    <View style={styles.capasMenu} >
      <View style={{flex:15}} >
        <TouchableOpacity style={styles.imgContainer} onPress={() => changeMapStyle()} >
          <Image
            style={styles.squareButton}
            source={props.normalStyle ?
              SATELITAL_MAP :
              BASIC_MAP
            }
          />
        </TouchableOpacity>
        <View style={{flex:0.50}} />
        <TouchableOpacity style={styles.imgContainer} onPress={() => setBarrioAmonDirection()} >
          <Image  style={styles.squareButton} source={BARRIO_AMON_IMAGE} />
        </TouchableOpacity>
        <View style={{flex:0.50}} />
      </View>
      <View style={{flex:1.3}} />
    </View>
  );
}; 

export default connect(mapStateToProps, mapDispatchToProps)(MapLayersMenu);