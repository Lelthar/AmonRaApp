import React, {useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import Swiper from 'react-native-swiper';

//Imports for redux

import { connect } from "react-redux";

import HamburgerMenu from '../partials/HamburgerMenu';

import styles from "../../assets/styles/pages/seeMore";

const mapStateToProps = state => {
  return {
    menuSideState: state.menuDataReducer.MENUSIDE
  }
};

// End of redux imports

const SeeMore = (props) => {

  useEffect(() => {
    if (props.navigation.state.params.hasTitle) {
      props.navigation.setParams({ header_title: props.navigation.state.params.category })
    }
  }, []);

  return (
    <View style={styles.container}>

      <View style={{flex:0.35}}>
        <Swiper>
          {props.navigation.state.params.images_url_1 != "" && (
            <View style={styles.slide}>
              <Image resizeMode='center' style={styles.imageOr} source={{uri: props.navigation.state.params.images_url_1}} />
            </View>
          )}
          {props.navigation.state.params.images_url_2 != "" && (
            <View style={styles.slide}>
              <Image resizeMode='center' style={styles.imageOr} source={{uri: props.navigation.state.params.images_url_2}} />
            </View>
          )}
          {props.navigation.state.params.images_url_3 != "" && (
            <View style={styles.slide}>
              <Image resizeMode='center' style={styles.imageOr} source={{uri: props.navigation.state.params.images_url_3}} />
            </View>
          )}
        </Swiper>
      </View> 

      <View style={{flex:0.65}}>  
        <Text style={styles.titleOr} >{props.navigation.state.params.title}</Text>
        <ScrollView>
          <Text style = {styles.descriptionOr}>{props.navigation.state.params.description} </Text>
          {props.navigation.state.params.direction != "" && (
            <Text style = {styles.directionOr}>Dirección: {props.navigation.state.params.direction } </Text> 
          )}
          {props.navigation.state.params.phone_number != "" && (
            <Text style = {styles.phoneOr}>Tel: {props.navigation.state.params.phone_number} </Text> 
          )}
          {props.navigation.state.params.facebook != "" && (
            <Text style = {styles.facebookOr}>Facebook: {props.navigation.state.params.facebook} </Text>
          )}
        </ScrollView>
      </View>

      {props.menuSideState &&
        <HamburgerMenu navigation={props.navigation} />
      }

    </View>
  );
};

export default connect(mapStateToProps,null)(SeeMore);
