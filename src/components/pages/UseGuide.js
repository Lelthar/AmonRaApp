import React from 'react';
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import styles from "../../assets/styles/pages/useGuide";
import HamburgerMenu from '../partials/HamburgerMenu';
import { connect } from "react-redux";

const buttonMap = require('../../assets/images/useGuide/buttonMap.png');
const buttonRA = require('../../assets/images/useGuide/buttonRA.png');
const buttonVirtualVisit = require('../../assets/images/useGuide/buttonVirtualVisit.png');
const buttonUrbanOffer = require('../../assets/images/useGuide/buttonUrbanOffer.png');
const buttonTimeline = require('../../assets/images/useGuide/buttonTimeline.png');
const buttonCompleteGuide = require('../../assets/images/useGuide/buttonCompleteGuide.png');

const mapStateToProps = state => {
  return {
    menuSide: state.menuDataReducer.MENUSIDE,
  }
};
const UseGuide = (props) => {

  return (
    <View style={ styles.container }>

      <TouchableOpacity style = {styles.button}>
        <Image resizeMode= 'stretch' style={styles.imageResizeAndFillParent} source={buttonMap} />
      </TouchableOpacity>

      <TouchableOpacity style = {styles.button}>
        <Image resizeMode= 'stretch' style={styles.imageResizeAndFillParent} source={buttonRA} />
      </TouchableOpacity>

      <TouchableOpacity style = {styles.button}>
        <Image resizeMode= 'stretch' style={styles.imageResizeAndFillParent} source={buttonVirtualVisit} />
      </TouchableOpacity>

      <TouchableOpacity style = {styles.button}>
        <Image resizeMode= 'stretch' style={styles.imageResizeAndFillParent} source={buttonUrbanOffer} />
      </TouchableOpacity>

      <TouchableOpacity style = {styles.button}>
        <Image resizeMode= 'stretch' style={styles.imageResizeAndFillParent} source={buttonTimeline} />
      </TouchableOpacity>

      <TouchableOpacity style = {styles.button}>
        <Image resizeMode= 'stretch' style={styles.imageResizeAndFillParent} source={buttonCompleteGuide} />
      </TouchableOpacity>

      {props.menuSide && (
        <HamburgerMenu navigation={props.navigation} /> 
      )}
    </View>
  );
};

export default connect(mapStateToProps,null)(UseGuide);
