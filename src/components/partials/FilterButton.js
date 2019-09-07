import React from 'react';
import {
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import styles from "../../assets/styles/partials/filterButton";

import { connect } from "react-redux";
import { filterMenuAction } from "../../redux/actions/menuDataActions";

const mapStateToProps = state => {
  return {
    filterMenu: state.menuDataReducer.FILTERMENU,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFilterMenu: (data) => {
      dispatch(filterMenuAction(data));
    },
  };
};

const FilterButton = (props) => {

  toggleFilters = () => {
    props.setFilterMenu(!props.filterMenu);
  };

  return (
    <View>
      <TouchableOpacity style={styles.arrowButton} onPress={() => toggleFilters()} >
        <Image source={require('../../assets/images/map/mapa_filtros.png')} />
      </TouchableOpacity> 
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterButton);