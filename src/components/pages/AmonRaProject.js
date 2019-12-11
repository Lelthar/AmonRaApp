import React from 'react';
import {
  View,
  ScrollView,
  Image,
} from 'react-native';
import styles from "../../assets/styles/pages/amonRaProject";
import Swiper from 'react-native-swiper';
import Option from '../partials/Option';
import Credits from '../partials/Credits';
import HamburgerMenu from '../partials/HamburgerMenu';
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    menuSide: state.menuDataReducer.MENUSIDE,
  }
};

const AmonRaProject = (props) => {

  const amonraDetail1 = "Implementación de la realidad aumentada como herramienta para la puesta en valor y difusión del paisaje urbano histórico de barrio Amón es un proyecto de investigación del Tecnológico de Costa Rica (TEC) que inició en 2017.\n\n";
  const amonraDetail2 = "Este proyecto, con vinculación internacional, es financiado por la Vicerrectoría de Investigación y Extensión; y tiene como objetivo general implementar la realidad aumentada como herramienta para la puesta en valor y difusión del paisaje urbano histórico de barrio Amón.\n\n";
  const amonraDetail3 = "Es liderado por la Escuela de Arquitectura y Urbanismo del TEC, y en su desarrollo participan conjuntamente las Escuelas de Diseño Industrial e Ingeniería en Computación; además de los actores sociales que conforman el barrio y que han aportado desde sus diversas perspectivas. \n\n";
  const amonraDetail4 = "Asimismo, el proyecto se vincula al Departamento de Geografía de la Universidad Autónoma de Madrid, al Centro de Investigación y Conservación del Patrimonio Cultural del Ministerio de Cultura y al Departamento de Servicios Culturales de la Municipalidad de San José.\n\n";
  const amonraDetail5 = "Amón_RA marca un punto de ruptura en la evolución de las aplicaciones móviles en el país para la puesta en valor y difusión del patrimonio, completando la percepción e interacción del usuario con el mundo real.";
  const amonraDetails = amonraDetail1 + amonraDetail2 +amonraDetail3 +amonraDetail4 +amonraDetail5;

  const paisajeDetail1 = "Para comprender el ámbito de trabajo de Amón_RA, es necesario conceptualizar lo que se entiende por paisaje urbano histórico (PUH); según la recomendación de la UNESCO de 2011 el PUH es:\n"
  const paisajeDetail2 = "“... la zona urbana resultante de una estratificación histórica de valores y atributos culturales y naturales, lo que trasciende la noción de “conjunto” o “centro histórico” para abarcar el contexto urbano general y su entorno geográfico” (UNESCO, 2011).\n\n";
  const paisajeDetail3 = "El proyecto entiende al PUHBA como la zona urbana de uno de los primeros ensanches de la ciudad de San José, conocido como barrio Amón, la cual se encuentra integrada a su entorno natural y ha sido construida a través del tiempo por la comunidad.\n\n";
  const paisajeDetail4 = "En el PUHBA se mezcla lo antiguo con lo contemporáneo y es el reflejo de las huellas tangibles como: edificaciones, espacios públicos, elementos patrimoniales y entornos naturales; así como intangibles: gastronomía,  todo tipo de expresiones artísticas y las vivencias de sus personajes.";
  const paisajeDetails = paisajeDetail1 + paisajeDetail2 + paisajeDetail3 + paisajeDetail4;

  const creditsList = [
    {
      title: "Investigadores Escuela de Arquitectura y Urbanismo del TEC:",
      body: "Dr. Arq. David Porras Alfaro (Coordinador)\nDra. Arq. Kenia García Baltodano\nMstr. Arq. Tomás Martínez Baldares",
    },
    {
      title: "Investigadora Escuela de Diseño Industrial del TEC:",
      body: "Mstr. DI. María del Carmen Valverde Solano",
    },
    {
      title: "Investigadores Escuela de Ingeniería en Computación del TEC:",
      body: "Mstr. Ing. Esteban Arias Méndez\nMstr. Ing. Ericka Solano Fernández",
    },
    {
      title: "Asistente Especial de Posgrado del TEC:",
      body: "Arq. Jose Pablo Bulgarelli Bolaños",
    },
    {
      title: "Asistentes Escuela de Arquitectura y Urbanismo del TEC:",
      body: "Danny Oconitrillo Obando\nGerald Cordero Arias\nGloriana Vargas Castro\nIsmael Arias Zapata\nJacqueline Arias Flores\nJoseph Vargas González\nJuan Eduardo Chaves Quirós\nSilvia Jiménez Loaiza\nYendry Mora Cascante\nFernando Agüero Bravo\nSarah Rodríguez Fernández",
    },
    {
      title: "Asistentes Escuela de Diseño Industrial del TEC:",
      body: "Angélica María Rodríguez Delgado\nGraciela Camacho Fidalgo\nValeria Corella Córdoba\nMónica González Sosa\nHenry Nicolás Carvajal Coto",
    },
    {
      title: "Asistentes Escuela de Ingeniería en Computación del TEC:",
      body: "Ángel Villalobos Peña\nBryan Vargas Fernández\nCarlos Gomez Soza\nEsteban González Damasio\nFabián de Jesús Astorga Cerdas\nGabriel Ramírez Ramírez\nJoseph Salazar Acuña\nArturo Mora Granados\nMichael Choque Núñez\nNelson Gómez Alvarado\nNicol Morice Sandí\nJosé Pablo Vargas Campos\nErin Siezar García\nGerald Morales Alvarado\nJosué Suárez Campos\nMarlon Reyes Montero\nJose David Villalobos Martinez\nJosé Daniel Gómez Casasola",
    },
    {
      title: "Investigadores del Departamento de Geografía de la Universidad Autónoma de Madrid:",
      body: "Dra. Carmen Hidalgo Giralt\nDr. Diego A. Barrado Timón",
    },
  ]

  const contactoDetails = "Dr. Arq. David Porras Alfaro (Coordinador)\ndporras@tec.ac.cr\n2550-9033";
  
  const AmonRa = {name: "Amón_RA", description: amonraDetails };
  const Paisaje = {name: "Paisaje Urbano Histórico de barrio Amón (PUHBA)", description: paisajeDetails };
  const Creditos = {name: "Créditos", credits: creditsList };
  const Contacto = {name: "Contacto", description: contactoDetails };

  const image_1 = "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/Proyecto_AmonRA%2FDSC02752_optimized.jpg?alt=media&token=898febcc-6dec-484c-ad95-bd1f3cb2e236";
  const image_2 = "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/Proyecto_AmonRA%2FDSC02774.JPG?alt=media&token=f222f984-16e3-4bd5-9996-50f10e4d8b8d";

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Swiper>
          <View style={styles.slide}>
            <Image resizeMode='contain' style={styles.imageOr} source={{uri: image_1}} />
          </View>
          <View style={styles.slide}>
            <Image resizeMode='contain' style={styles.imageOr} source={{uri: image_2}} />
          </View>
        </Swiper>
      </View>
      <View style={styles.bodySection}>
        <ScrollView style={styles.scroll} >
          <Option information={AmonRa} />
          <Option information={Paisaje} />
          <Credits information={Creditos} />
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
