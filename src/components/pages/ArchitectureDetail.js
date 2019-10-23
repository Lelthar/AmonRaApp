import React, {Component} from 'react';
import {
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';

import { connect } from "react-redux";

import {
  filterMenuAction,
  activeFiltersAction,
  menuSideAction,
  rateScreenAction,
  guideScreenAction,
  menuResetAction,
} from "../../redux/actions/menuDataActions";

import { 
  FEATURES_URL,
  PERIMETER_URL,
  USER_DATA,
} from '../../../constants/constants';

import {
  makeBackendRequest,
} from '../../../helpers/helpers';

import HamburgerMenu from '../partials/HamburgerMenu';
import Option from '../partials/Option';
import styles from "../../assets/styles/pages/architectureDetail";
import Icon from 'react-native-vector-icons/FontAwesome';


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

class ArquitectureDetail extends Component {

	constructor(props){
		super(props);
		this.navigation = this.props.navigation;
		this.state = {
		  title: "",
		  description: "",
		  direction: "",
		  phone_number: "",
		  facebook: "",
		  images_url: [],
		};

	}

	componentDidMount(){ 
    this.setState({
      title: this.props.navigation.state.params.placeInfo.name , 
      description: this.props.navigation.state.params.placeInfo.description, 
      direction: this.props.navigation.state.params.placeInfo.direction ,
      phone_number: this.props.navigation.state.params.placeInfo.phone_number,
      facebook: this.props.navigation.state.params.placeInfo.facebook,
      images_url: [this.props.navigation.state.params.placeInfo.image1_url, 
                  this.props.navigation.state.params.placeInfo.image2_url, 
                  this.props.navigation.state.params.placeInfo.image3_url]
    });
  }

	render(){
 
		const pic2 = { uri: this.state.images_url[1] };

    //Examples of props for the Option Partial, TODO: Replace with database query
    const lorem = "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.";
    const breveObject = {name: "Breve descripción", description: lorem };
    const fichaObject = {name: "Ficha técnica", description: lorem};
    const vivenciasObject = {name: "Vivencias", description: lorem};
    const resenhaObject = {name: "Reseña histórica", description: lorem};
    const caracteristicasObject = {name: "Características estilísticas", description: lorem};
		
    return (
      <View style={styles.container} >
        <View style={styles.imageContainer} >
          <Image resizeMode='stretch' style={styles.image} source={pic2} />
        </View>
        <View style={styles.informationContainer}>
          <Text style={styles.textTitle} >{this.state.title}</Text>
          <ScrollView style={styles.scroll} >
            <Option information={breveObject} />
            <Option information={fichaObject} />
            <Option information={vivenciasObject} />
            <Option information={resenhaObject} />
            <Option information={caracteristicasObject} />
            </ScrollView>
        </View>
				{ this.props.menuSideState &&
				  <HamburgerMenu navigation={this.props.navigation} /> }
      </View>
		);
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(ArquitectureDetail);
