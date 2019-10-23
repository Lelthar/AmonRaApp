import React from 'react';
import {
  View,
  ScrollView,
  Image,
} from 'react-native';
import styles from "../../assets/styles/pages/amonRaProject";

import Option from '../partials/Option';
import HamburgerMenu from '../partials/HamburgerMenu';

import {
  HEADER,
} from "../../assets/constants/moreAmonRa";

import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    menuSide: state.menuDataReducer.MENUSIDE,
  }
};

const AmonRaProject = (props) => {

  const lorem = "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.";
  const AmonRa = {name: "Amón_RA", description: lorem };
  const Paisaje = {name: "Paisaje Urbano Histórico de barrio Amón (PUHBA)", description: lorem };
  const Creditos = {name: "Créditos", description: lorem };
  const Contacto = {name: "Contacto", description: lorem };

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Image resizeMode='stretch' source={HEADER} />
      </View>
      <View style={styles.bodySection}>
        <ScrollView style={styles.scroll} >
          <Option information={AmonRa} />
          <Option information={Paisaje} />
          <Option information={Creditos} />
          <Option information={Contacto} />
        </ScrollView>
      </View>

      {props.menuSide && (
        <HamburgerMenu navigation={props.navigation} /> 
      )}
    </View>
  );
};

export default connect(mapStateToProps,null)(AmonRaProject);
