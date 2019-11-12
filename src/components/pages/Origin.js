import React, { Component } from 'react';
import {
	View,
	Image,
	ScrollView,
} from 'react-native';

import { connect } from 'react-redux';

import {
  filterMenuAction,
  activeFiltersAction,
  menuSideAction,
  rateScreenAction,
  guideScreenAction,
  menuResetAction,
} from '../../redux/actions/menuDataActions';

import {
  HEADER,
  creatorCotent,
  naturalContextContent,
  socialContextContent,
  solicitudContent
} from "../../assets/constants/origin";

import HamburgerMenu from '../partials/HamburgerMenu';
import Option from '../partials/Option';
import styles from '../../assets/styles/pages/architectureDetail';



const mapStateToProps = state => {
  return {
    menuSideState: state.menuDataReducer.MENUSIDE
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFilterMenu: (data) => {
      dispatch(filterMenuAction(data));
    },
    setActiveFilters: (data) => {
      dispatch(activeFiltersAction(data));
    },
    setMenuSide: (data) => {
      dispatch(menuSideAction(data));

    },
    setRateScreen: (data) => {
      dispatch(rateScreenAction(data));
    },
    setGuideScreen: (data) => {
      dispatch(guideScreenAction(data));
    },
    resetAll: () => {
      dispatch(menuResetAction());
    },
  }
};

class Origin extends Component {

	constructor(props){
		super(props);
		this.navigation = this.props.navigation;

	}

	render(){
    //Examples of props for the Option Partial, TODO: Replace with database query
    const lorem = "Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.";

    //const conformationObject = {name: "Conformación inicial", description: lorem };
    const creatorObject = {name: "Creador de la iniciativa", description: creatorCotent};
    const naturalContextObject = {name: "Contexto natural", description: naturalContextContent};
    const socialContextObject = {name: "Contexto socioeconómico", description: socialContextContent};
    const solicitudObject = {name: "Solicitud a la municipalidad", description: solicitudContent};
		
		return(

			<View style={styles.container} >
        <View style={styles.imageContainer} >
          <Image resizeMode='stretch' style={styles.image} source={HEADER} />
        </View>
        <View style={styles.informationContainer}>
          <ScrollView style={styles.scroll} >
            {/*<Option information={conformationObject} />*/}
            <Option information={creatorObject} />
            <Option information={naturalContextObject} />
            <Option information={socialContextObject} />
            <Option information={solicitudObject} />
            </ScrollView>
        </View>
				{ this.props.menuSideState &&
				  <HamburgerMenu navigation={this.props.navigation} /> }
      </View>
		);
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Origin);
