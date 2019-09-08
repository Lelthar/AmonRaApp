import React, {Component} from 'react';
import {

  StyleSheet,
  Text,
  View,
  AppRegistry,
  Button,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Swiper from 'react-native-swiper';

var {windowHeight, windowWidth} = Dimensions.get('window');

//Imports for redux

import { connect } from "react-redux";

import {
  filterMenuAction,
  activeFiltersAction,
  menuSideAction,
  rateScreenAction,
  guideScreenAction,
  menuResetAction,
} from "../../../src/redux/actions/menuDataActions";

import HamburguerComponent from '../../../src/components/partials/HamburguerMenu'

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

// End of redux imports

class SeeMore extends Component{

  constructor(props){
    super(props);
    // Se le pasa el controlador de la navegación a App.js
    // para controlar la navegación desde Navigator.js
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

  render() {

    // Empieza prueba 

    var pic = {uri: this.state.images_url[0] } ; 
    var pic2 = {uri: this.state.images_url[1] } ; 
    var pic3 = {uri : this.state.images_url[2] } ; 

    return (

       <View style={styles.container}>

       <View style={{flex:0.35}}>
              <Swiper style={styles.wrapper}  loop>

                <View style={styles.slide}>
                  <Image resizeMode='center' style={styles.imageOr} source={pic } />
                </View>
                <View style={styles.slide}>
                  <Image resizeMode='center' style={styles.imageOr} source={pic2 } />
                </View>
                <View style={styles.slide}>
                  <Image resizeMode='center' style={styles.imageOr} source={ pic3 } />
                </View>
              </Swiper>
      </View> 
      <View style={{flex:0.65}}>
              
                  <Text style={styles.titleOr} >{this.state.title}</Text>
                  <ScrollView>
                    <Text style = {styles.descriptionOr}>{this.state.description} </Text>
                    <Text style = {styles.directionOr}>Dirección: {this.state.direction } </Text> 
                    <Text style = {styles.phoneOr}>Tel{this.state.phone_number} </Text> 
                    <Text style = {styles.facebookOr}>Facebook: {this.state.facebook} </Text>
                  </ScrollView>
      </View>

        {this.props.menuSideState &&
        < HamburguerComponent /> }
    
    </View>

    );
  }
}

const styles = StyleSheet.create({

   nothing: {
   },

   information:{
    height: windowHeight
   },
  slideOr: {
    height:250,
    backgroundColor: 'transparent'
  },
  swiperOr:{
    marginTop:70,
    height:250
  },
  imageOr: {
    width: windowWidth,
    height: 250
  },
  
  titleOr: {
    textAlign: "center", fontSize:20,
    fontFamily: "vincHand",
    color: "#0C5B60",
    padding:20,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  descriptionOr: {
    textAlign: "justify", fontSize:18,
    color: "#0C5B60",
    paddingLeft:20,
    paddingRight:20,
  },

  directionOr:{
    textAlign: "center", fontSize:15,
    color: "grey",
    marginLeft: 20, 
    marginRight: 50,
    marginTop: 50,
    textAlign: 'left'
  },

  phoneOr:{
    textAlign: "center", fontSize: 15,
    color: "grey",
    marginLeft: 20, 
    marginRight: 20,
    textAlign: 'left'
    
  },
  facebookOr:{
    textAlign: "center", fontSize: 15,
    color: "grey",
    marginLeft: 20, 
    marginRight: 20,
    marginBottom: 150,
    textAlign: 'left'
   
  },
  wrapperOr: {
  },

  container: {
    flex:1,
    backgroundColor: 'white',
  },

  body:{
    flex:23
  },
  swiper:{
    flex: 9
  },
  contentUnderSwiper:{
    flex:10
  },
  buttonsRow:{
    flex:5,
    flexDirection: "row"
  },
  wrapper: {
  },
  squareButton:{
    flex:5
  },
  imageResizeAndFillParent: {
    flex: 1,
    width: null,
    height: null
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#111111'
  },

  image: {
    
    height:250,
    flex:1

  }

});


const seeMoreComponent = connect(mapStateToProps,mapDispatchToProps)(SeeMore);
export default seeMoreComponent;

AppRegistry.registerComponent('SeeMore', () => SeeMore);