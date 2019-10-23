import React from 'react';
import {
  View,
  Image,
} from 'react-native';
import styles from "../../assets/styles/pages/moreAmonRa";

import OptionButton from "../partials/OptionButton";

import {
  PARTICIPATORY_PROCESS,
  PROJECTS,
  HEADER,
} from "../../assets/constants/moreAmonRa";

const MoreAmonRa = (props) => {

  goToProjects = () => {
    console.log("Write navigation to Projejcts here");
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
    </View>
  );
};

export default MoreAmonRa;
