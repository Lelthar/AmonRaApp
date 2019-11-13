import React from 'react';
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

const ParticipatoryProcess = (props) => {
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

    <View style={{flex:0.65, marginBottom: 10}}>  
      <ScrollView>
        {props.navigation.state.params.events.map((event, index) => (
          <View key={index} >
            <Text style={styles.titleOr} >{event.title}</Text>
            <Text style = {styles.descriptionOr}>{event.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>

    {props.menuSideState &&
      <HamburgerMenu navigation={props.navigation} />
    }

  </View>
  );
};

export default connect(mapStateToProps,null)(ParticipatoryProcess);
