import React from 'react';
import {
  View,
  Image,
} from 'react-native';
import styles from "../../assets/styles/pages/moreAmonRa";

import OptionButton from "../partials/OptionButton";
import HamburgerMenu from '../partials/HamburgerMenu';

import {
  PARTICIPATORY_PROCESS,
  PROJECTS,
  HEADER,
} from "../../assets/constants/moreAmonRa";

import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    menuSide: state.menuDataReducer.MENUSIDE,
  }
};

const MoreAmonRa = (props) => {

  goToProjects = () => {
    props.navigation.navigate('AmonRaProject', {navigation: props.navigation});
  };

  goToParticipatoryProcess = () => {
    console.log("Write navigation to Participatory process here");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header} >
        <Image resizeMode='stretch' source={HEADER} />
      </View>
      <View style={styles.buttonsSection}>
        <OptionButton image={PROJECTS} goTo={goToProjects} />
        <OptionButton image={PARTICIPATORY_PROCESS} goTo={goToParticipatoryProcess} />
      </View>

      {props.menuSide && (
        <HamburgerMenu navigation={props.navigation} /> 
      )}
    </View>
  );
};

export default connect(mapStateToProps,null)(MoreAmonRa);
