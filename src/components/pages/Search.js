import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList
} from 'react-native';
import styles from "../../assets/styles/pages/search";

import HamburgerMenu from '../partials/HamburgerMenu';

import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    menuSide: state.menuDataReducer.MENUSIDE,
  }
};

const Search = (props) => {

  return (
    <View style={styles.container}>

      {props.navigation.state.params.results.length > 0 ?
        <FlatList
          data={props.navigation.state.params.results}
          renderItem={({item}, index) => 
            <View key={index} style={styles.cardContainer}>
              <Text style={styles.nameText}>{item.name}</Text>
              <Text style={styles.tagName}>Se encuentra en la sección: {item.tag_name}</Text>
            </View>
          }
        /> :
        <View style={styles.emptyResultsContainer}>
          <Text style={styles.emptyResults}>No se encontraron resultados de la búsqueda.</Text>
        </View>
      }


      {props.menuSide && (
        <HamburgerMenu navigation={props.navigation} /> 
      )}
    </View>
  );
};

export default connect(mapStateToProps,null)(Search);