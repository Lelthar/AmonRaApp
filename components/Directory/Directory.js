import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import { connect } from "react-redux";
import HamburgerMenu from '../../src/components/partials/HamburgerMenu';

import {
    StyleSheet,
    View,
    AppRegistry,
    Image,
    Dimensions,
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

const { width } = Dimensions.get('window').width;

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
                  <Image style={styles.image} source={require('../../images/Swiper/ALIANZA/ALIANZAI.png')} />
                </View>
                <View style={styles.slide}>
                  <Image resizeMode='stretch' style={styles.image} source={require('../../images/Swiper/RESTAURANTESILVESTRE/RESTAURANTESILVESTREI.png')} />
                </View>
                <View style={styles.slide}>
                  <Image resizeMode='stretch' style={styles.image} source={require('../../images/Swiper/HOTELDONCARLOS/HOTELDONCARLOSI.png')} />
                </View>
                <View style={styles.slide}>
                  <Image resizeMode='stretch' style={styles.image} source={require('../../images/Swiper/TECNOLOGICO/TECNOLOGICO.png')} />
                </View>
              </Swiper>
            </View>
            <View style={styles.contentUnderSwiper}>  

              <TouchableOpacity style={styles.newSquare} onPress={() => this.props.navigation.navigate('CultureArt',{goToScreen: this.navigation})} >
                <Image style={styles.imageResizeAndFillParent} source={require('../../images/icons/Directory/culturagris.png')} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.newSquare} onPress={() => this.props.navigation.navigate('Gastronomy',{goToScreen: this.navigation})}>
                <Image style={styles.imageResizeAndFillParent} source={require('../../images/icons/Directory/gastrogris.png')} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.newSquare} onPress={() => this.props.navigation.navigate('Hotels',{goToScreen: this.navigation})} >
                <Image style={styles.imageResizeAndFillParent} source={require('../../images/icons/Directory/hospedajegris.png')} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.newSquare} onPress={() => this.props.navigation.navigate('Institutional',{goToScreen: this.navigation})} >
                <Image style={styles.imageResizeAndFillParent} source={require('../../images/icons/Directory/instigris.png')} />
              </TouchableOpacity>

          </View>
          {this.props.menuSideState &&
            <HamburgerMenu navigation={this.props.navigation} />}
        </View>
        );
    }
}
const styles = StyleSheet.create({
  newSquare:{
    height:'35%',
    width:'35%',
    margin:'5%',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  contentUnderSwiper:{
    flex:0.65,
    flexDirection:'row',
    flexWrap:'wrap',
    alignItems:'center',
    justifyContent: 'center',
  },
  wrapper: {
  },
  imageResizeAndFillParent: {
    flex: 1,
    width: null,
    height: null,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    width,
    flex: 1,
  },
});

const dirComponent = connect(mapStateToProps,mapDispatchToProps)(Directory)
export default dirComponent;
AppRegistry.registerComponent('Directory', () => Directory);

