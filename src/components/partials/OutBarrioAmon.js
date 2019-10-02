import React from 'react';

import {
  TouchableOpacity,
  View,
  Text,
  Image
} from 'react-native';

import {
  WARNING_BARRIO_AMON_IMAGE,
} from "../../assets/constants/outBarriioAmon";

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../../assets/styles/partials/outBarrioAmon';

import { connect } from 'react-redux';

import {
  setOutBarrioAmonVisibilityAction,
} from "../../redux/actions/mapActions";

const titleText = "Ups no te encuentras\nen barrio Amón";
const descriptionText = "La ubicación GPS no está en\nBarrio Amón, por eso no podés\nacceder a la realidad aumentada";
const finalTextTop = "Visítanos para vivir la";
const finalTextBottom = "experiencia";

const mapStateToProps = state => {
  return {
      
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setOutBarrioAmonVisibility: (data) => {
      dispatch(setOutBarrioAmonVisibilityAction(data));
    },
  };
};

const OutBarrioAmon = (props) => {

  closeOutBarrioAmon = () => {
    props.setOutBarrioAmonVisibility(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleSection} >
        <Icon
          name='exclamation-triangle'
          size={30}
          color="#FFFFFF"
        />
        <Text style={styles.titleText}>{titleText}</Text>
      </View>
      <View style={styles.descriptionSection}>
        <Text style={styles.descriptionText}>{descriptionText}</Text>
      </View>
      <View style={styles.finalSection}>
        <View>
          <Text style={styles.finalText}>{finalTextTop}</Text>
        </View>
        <View style={styles.finalSectionBottom} >
          <Text style={styles.finalText}>{finalTextBottom}</Text>
          <Image
            source={WARNING_BARRIO_AMON_IMAGE}
            style={{marginLeft:5,resizeMode: 'center',
            width : 120,
            height : 34,}}
          />
        </View>
      </View>
      <TouchableOpacity onPress={closeOutBarrioAmon} style={styles.closeButton} >
        <Icon
          name='times'
          size={22}
          color="#FFFFFF"
        />
      </TouchableOpacity>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(OutBarrioAmon);
