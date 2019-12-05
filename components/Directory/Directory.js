import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import { connect } from "react-redux";
import HamburgerMenu from '../../src/components/partials/HamburgerMenu';
import styles from "../../src/assets/styles/pages/directory";

import {
    View,
    AppRegistry,
    Image,
    TouchableOpacity,
} from 'react-native';

import {
  filterMenuAction,
  activeFiltersAction,
  menuSideAction,
  rateScreenAction,
  guideScreenAction,
  menuResetAction,
} from "../../src/redux/actions/menuDataActions";

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

const imageSwiper1 = require('../../images/Swiper/ALIANZA/ALIANZAI.png');
const imageSwiper2 = require('../../images/Swiper/RESTAURANTESILVESTRE/RESTAURANTESILVESTREI.png');
const imageSwiper3 = require('../../images/Swiper/HOTELDONCARLOS/HOTELDONCARLOSI.png');
const imageSwiper4 = require('../../images/Swiper/TECNOLOGICO/TECNOLOGICO.png');

const buttonCulture = require('../../images/icons/Directory/culturagris.png');
const buttonGastronomy = require('../../images/icons/Directory/gastrogris.png');
const buttonHotels = require('../../images/icons/Directory/hospedajegris.png');
const buttonInstitutional = require('../../images/icons/Directory/instigris.png');

class Directory extends Component{

    constructor(props){
        super(props);
        this.navigation = this.props.navigation;
    }

    render() {

        return (
          <View style={styles.container}>
            <View style={{flex:0.35}}>
              <Swiper style={styles.wrapper}  loop>
                <View style={styles.slide}>
                  <Image style={styles.image} source={imageSwiper1} />
                </View>
                <View style={styles.slide}>
                  <Image resizeMode='stretch' style={styles.image} source={imageSwiper2} />
                </View>
                <View style={styles.slide}>
                  <Image resizeMode='stretch' style={styles.image} source={imageSwiper3} />
                </View>
                <View style={styles.slide}>
                  <Image resizeMode='stretch' style={styles.image} source={imageSwiper4} />
                </View>
              </Swiper>
            </View>
            <View style={styles.contentUnderSwiper}>  

              <TouchableOpacity style={styles.newSquare} onPress={() => this.props.navigation.navigate('CultureArt',{goToScreen: this.navigation})} >
                <Image style={styles.imageResizeAndFillParent} source={buttonCulture} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.newSquare} onPress={() => this.props.navigation.navigate('Gastronomy',{goToScreen: this.navigation})}>
                <Image style={styles.imageResizeAndFillParent} source={buttonGastronomy} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.newSquare} onPress={() => this.props.navigation.navigate('Hotels',{goToScreen: this.navigation})} >
                <Image style={styles.imageResizeAndFillParent} source={buttonHotels} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.newSquare} onPress={() => this.props.navigation.navigate('Institutional',{goToScreen: this.navigation})} >
                <Image style={styles.imageResizeAndFillParent} source={buttonInstitutional} />
              </TouchableOpacity>

          </View>
          {this.props.menuSideState &&
            <HamburgerMenu navigation={this.props.navigation} />}
        </View>
        );
    }
}

const dirComponent = connect(mapStateToProps,mapDispatchToProps)(Directory)
export default dirComponent;
AppRegistry.registerComponent('Directory', () => Directory);
