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

  const participatoryProcess = {
    navigation: props.navigation,
    images_url_1: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/Proceso_Participativo%2FFestivalAm%C3%B3nCultural2017.JPG?alt=media&token=a5454606-d8d0-4c39-982f-6e4810af6c55",
    images_url_2: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/Proceso_Participativo%2FTalleresparticipativos1.JPG?alt=media&token=5d234724-2946-4ce5-9253-3c9521210f52",
    images_url_3: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/Proceso_Participativo%2FTalleresparticipativos2.JPG?alt=media&token=037afc03-22d4-4bc1-a86b-e348fc9d6c5a",
    events: [
      {
        title: "Procesos participativos",
        description: "Un proceso participativo se puede entender como una práctica donde los equipos de trabajo, junto con la interacción sistemática y ordenada de los autores o interesados al proyecto, alcanzan objetivos en común.\n\nLos objetivos de los procesos participativos ejecutados por el proyecto de investigación Amón_RA fueron:\n  1. Recopilar información vivencial, histórica, familiar y anecdótica para enriquecer los contenidos de la aplicación móvil.\n  2. Validar la información de la base de datos del proyecto por parte de los actores sociales de barrio Amón, en un ejercicio donde se contrastan los elementos del PUHBA con la visión propia de los agentes.\n  3. Validar los elementos de programación “mínimos” que debería tener la aplicación móvil, según los requerimientos de los agentes sociales.\n  4. Aplicar métodos de diseño del software para la aplicación móvil.\n\nA continuación, se presenta una breve reseña de los procesos implementados:"
      },
      {
        title: "Dibujando Amón: 4 de marzo 2017",
        description: "El equipo de investigación aprovechó la oportunidad que ofrecía el Festival Amón Cultural, del 2017, para ejecutar el proyecto “Dibujando Amón”, con la intención de recabar información sobre la imagen urbana y la percepción del paisaje por medio de tres ejercicios simultáneos.\n\nLas actividades desarrolladas en este taller se denominaron:\n¿Qué te gusta de Amón?: con este ejercicio de dibujo libre se logró identificar elementos del paisaje urbano histórico de barrio Amón (PUHBA) considerados con valor por parte de los involucrados.\n\nRedibujá Amón: mediante la intervención de fotografías del barrio, en diferentes formatos, los participantes identificaron los elementos del PUHBA que les gustaban, los que no y los que cambiarían, permitiendo conocer la percepción que estas personas tienen del barrio.\n\nImagínate en Amón: mediante este ejercicio se elaboró una cartografía social, basada en los elementos de la Imagen de la Ciudad (Lynch, 2015), identificando las sendas, bordes, hitos y nodos que se perciben de barrio Amón."
      },
      {
        title: "Taller 1: 26 de octubre, 2017",
        description: "En este taller se validó la información de la línea del tiempo y se identificaron puntos del barrio como referentes urbanos por sus valores históricos o comunitarios. Por último, se realizó una comprobación de la posibles funcionalidades de la aplicación móvil."
      },
      {
        title: "Taller 2: 9 de noviembre, 2017",
        description: "En el taller se recolectó información anecdótica de los 9 inmuebles patrimoniales del barrio; se relacionaron fotografías antiguas con los contextos físico, histórico y anecdótico; y por último, se validaron los términos de la estructura de los contenidos de la aplicación."
      },
      {
        title: "Taller 3: 7 de diciembre, 2017",
        description: "En este último taller se validó tanto la arquitectura de la información Alpha y la nomenclatura de la aplicación móvil, así como el reconocimiento de patrones de diseño, jerarquía y secuencia de lectura."
      },
      {
        title: "Explorando con Amón_RA: 3 de marzo 2018",
        description: "En el Festival Amón Cultural, del 2018, se aprovechó para validar con los usuarios las rutas definidas por el equipo de investigación de Amón_RA a partir de los contenidos de la aplicación y explorar el uso de herramientas de Realidad Aumentada vinculadas a la aplicación móvil."
      },
    ],
  };

  const headerImage = "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/Mas_AmonRA%2FIMG_0478_optimized.jpg?alt=media&token=d6353fba-f58f-4398-9bcf-ac1aeaf14083"

  goToProjects = () => {
    props.navigation.navigate('AmonRaProject', {navigation: props.navigation});
  };

  goToParticipatoryProcess = () => {
    props.navigation.navigate('ParticipatoryProcess', participatoryProcess);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header} >
        <Image resizeMode='stretch' source={{uri: headerImage}} />
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
