import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    AppRegistry,
    Button,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import Swiper from 'react-native-swiper';
import firebase from 'react-native-firebase';
import { SearchBar} from 'react-native-elements';

//Imports for redux

import { connect } from "react-redux";

import {
  filterMenuAction,
  activeFiltersAction,
  menuSideAction,
  rateScreenAction,
  guideScreenAction,
  menuResetAction,
} from "../../src/redux/actions/menuDataActions";

import HamburguerComponent from '../../src/components/partials/HamburguerMenu'

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


const { width } = Dimensions.get('window').width
var isMenuVisible = true;
let onPressTextDiscover = () =>{
      return ;
    }

class Directory extends Component{

    constructor(props){
        super(props);
        // Se le pasa el controlador de la navegación a App.js
        // para controlar la navegación desde Navigator.js
        
        this.navigation = this.props.navigation;
    }

    pruebaFirebase(){
      var storageRef = firebase.storage().ref('ImageTest/prueba.png');
                        storageRef.getDownloadURL().then(function(url) {
                          console.log("Correcto")
                          console.log(url);

                        }, function(error){
                          console.log("Error");
                          console.log(error);
                        });
    }

    render() {
        return (

            <View style={styles.container}>

            {/* Navigator uses flex 10. 1 up, 1 down, 8 body */}
               <View style={{flex:2}} />

                {/* Full body container. Flex 8. Hay 23 flexes en el full body */}
                <View style={styles.body}>

                  {/* Swiper Flex 9*/}
                  <View style={styles.swiper}>

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

                    {/* Ends Swiper Flex 9*/}
                  </View>



                    <View style={styles.contentUnderSwiper}>

                    <View style={{flex:1}}/>
                    <View style={styles.buttonsRow}>
                      <View style={{flex:2}}/>
                      
                      <TouchableOpacity style={styles.squareButton} onPress={() => this.props.navigation.navigate('CultureArt',{goToScreen: this.navigation})} >
                          <Image style={styles.imageResizeAndFillParent} source={require('../../images/icons/Directory/culturagris.png')} />
                      </TouchableOpacity>
                    

                      <View style={{flex:1}}/>

                      <TouchableOpacity style={styles.squareButton} onPress={() => this.props.navigation.navigate('Gastronomy',{goToScreen: this.navigation})}>
                          <Image style={styles.imageResizeAndFillParent} source={require('../../images/icons/Directory/gastrogris.png')} />
                      </TouchableOpacity>

         

                      <View style={{flex:2}}/>



                    {/* Ends flex 5. Half 14*/}
                    {/* ,  borderWidth: 2, borderColor: '#000000'*/}
                    </View>
                    <View style={{flex:1}}/>

                    <View style={styles.buttonsRow}>
                      <View style={{flex:2}}/>

                      <TouchableOpacity style={styles.squareButton}  onPress={() => this.props.navigation.navigate('Hotels',{goToScreen: this.navigation})} >
                          <Image style={styles.imageResizeAndFillParent} source={require('../../images/icons/Directory/hospedajegris.png')} />
                      </TouchableOpacity>

                      <View style={{flex:1}}/>

                      <TouchableOpacity style={styles.squareButton}  onPress={() => this.props.navigation.navigate('Institutional',{goToScreen: this.navigation})} >
                          <Image style={styles.imageResizeAndFillParent} source={require('../../images/icons/Directory/instigris.png')} />
                      </TouchableOpacity>

                      <View style={{flex:2}}/>

                    {/* Ends flex 5. Half 14*/}
                    </View>

                    <View style={{flex:2}}/>

                    {/* Ends flex 14*/}
                    </View>


                {/* Ends full body flex 8*/}
                </View>
                <View style={{flex:2}}/>

                {/*Start of hamburguer menu */}
                {this.props.menuSideState &&
                  < HamburguerComponent />
                }
            {/*End of hamburguer menu */}

            </View>

        );
    }
}


const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  body:{
    flex:23
  },
  swiper:{
    flex: 9
  },
  contentUnderSwiper:{
    flex:14
  },
  buttonsRow:{
    flex:5,
    flexDirection: "row"
  },
  wrapper: {
  },
  squareButton:{
    flex:3
  },
  imageResizeAndFillParent: {
    flex: 1,
    width: null,
    height: null
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  image: {
    width,
    flex: 1
  },

});

const dirComponent = connect(mapStateToProps,mapDispatchToProps)(Directory)
export default dirComponent;
AppRegistry.registerComponent('Directory', () => Directory);

