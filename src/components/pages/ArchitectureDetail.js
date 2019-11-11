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
      description: this.props.navigation.state.params.placeInfo.brief_description,
      fichaTecnica: this.props.navigation.state.params.placeInfo.architecture_information,
      experiences: this.props.navigation.state.params.placeInfo.experiences ,
      historicalReview: this.props.navigation.state.params.placeInfo.historical_review,
      stylisticFeatures: this.props.navigation.state.params.placeInfo.stylistic_features,
      imageUrl: this.props.navigation.state.params.placeInfo.image2
    });
  }

	render(){
 
		const pic2 = { uri: this.state.imageUrl };  
    const descriptionObject = {name: "Breve descripción", description: this.state.description };
    const fichaObject = {name: "Ficha técnica", description: this.state.fichaTecnica};
    const experiencesObject = {name: "Vivencias", description: this.state.experiences};
    const resenhaObject = {name: "Reseña histórica", description: this.state.historicalReview};
    const stylisticFeaturesObject = {name: "Características estilísticas", description: this.state.stylisticFeatures};
		
    return (
      <View style={styles.container} >
        <View style={styles.imageContainer} >
          <Image resizeMode='stretch' style={styles.image} source={pic2} />
        </View>
        <View style={styles.informationContainer}>
          <Text style={styles.textTitle} >{this.state.title}</Text>
          <ScrollView style={styles.scroll} >
            <Option information={descriptionObject} />
            <Option information={fichaObject} />
            <Option information={experiencesObject} />
            <Option information={resenhaObject} />
            <Option information={stylisticFeaturesObject} />
            </ScrollView>
        </View>
				{ this.props.menuSideState &&
				  <HamburgerMenu navigation={this.props.navigation} /> }
      </View>
		);
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(ArquitectureDetail);
