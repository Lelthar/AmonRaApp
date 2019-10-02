import React, {Component} from 'react';
import {
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	Dimensions
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
} from '../../../helpers/helpers'

import HamburgerMenu from '../partials/HamburgerMenu';
import styles from "../../assets/styles/pages/architectureDetail";


var {windowHeight, windowWidth} = Dimensions.get('window');

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
 
		var pic2 = {uri: this.state.images_url[1] } ; 
		return (

			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<Image resizeMode='stretch' style={styles.image} source={pic2} />
				</View>
				<View style={styles.informationContainer}>
				</View>

				{this.props.menuSideState &&
				  <HamburgerMenu navigation={this.props.navigation} /> }
			</View>
		);
	}
}



export default connect(mapStateToProps,mapDispatchToProps)(ArquitectureDetail);
