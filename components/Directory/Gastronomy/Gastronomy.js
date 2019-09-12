import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    AppRegistry,
    Button,
    ScrollView,
    TouchableOpacity,
    Image,
    AsyncStorage
} from 'react-native';


import { 
  FEATURES_URL,
  PERIMETER_URL,
  USER_DATA,
} from '../../../constants/constants';

import {
  makeBackendRequest,
} from '../../../helpers/helpers'

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

//import HamburguerComponent from '../../../src/components/partials/HamburguerMenu'
import HM from '../../../src/components/partials/HamburguerMenu'


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


class Gastronomy extends Component{

  constructor(props){
      super(props);
      // Se le pasa el controlador de la navegación a App.js
      // para controlar la navegación desde Navigator.js
      this.navigation = this.props.navigation;
      this.state = {

        markers: [], 
        userData: null, 
        places: [

         {'name': 'Alma de Amón', 'direction': 'Avenida 9 y 11, Calle 5.', 'number': '"4700 2637 (facebook) / 8309-7227 / 2222 3232"','facebook': 'https://www.facebook.com/AlmadeAmon/ ' },
         {'name': 'Soda Yasmin', 'direction': ' Avenida 9 y 11, Calle 5.', 'number': '6207 9573','facebook': 'face 2' },
         {'name': 'De acá', 'direction': 'Calle 3A entre Avenida 9 y 11', 'number': '6296 4102','facebook': 'https://www.facebook.com/deacacostarica/' },
         {'name': 'Café Rojo', 'direction': 'Avenida 7, Entre calle 3 y 5.', 'number': '2221-2425 / 2441-1003 / 2222-0894 / 8397-0871 / 8853-7253','facebook': 'https://www.facebook.com/elcaferojo/'},
         {'name': 'Café Europa', 'direction': 'Avenida 7 y 9, Calle 7.', 'number': '2221 1682','facebook': 'https://www.facebook.com/comidasyotros/'},
         {'name': 'Cáfé Amón', 'direction': 'Avenida 9, Calle 9.', 'number': '2221 6707 / 8837 0303','facebook': 'https://www.facebook.com/CafeAmon/'},
         {'name': 'Cafenauta', 'direction': 'Avenida 9 y 11, Calle 3A.', 'number': '2221 1652 / 7013 3435 / 8828 9715','facebook': 'https://www.facebook.com/soycafenauta/'},
         {'name': 'Restaurante II Gattopardo', 'direction': 'Avenida 11, Calle 3A.', 'number': '4055 5530 / 8440 7618 / 83261560','facebook': 'https://www.facebook.com/IlGattopardoRestaurante/'},
         {'name': 'Tournant Restaurante y Café', 'direction': 'Avenida 11, Calle 3A y 5.', 'number': '2248 9523  / 8352 5998','facebook': 'https://www.facebook.com/tournantchefs/'},
         {'name': 'Restaurante Silvestre (Antigua Casa Peralta Zeller)', 'direction': 'Calle 3A, entre avenida 11 y 9', 'number': '2221 2465 / 4700 0506 / 8860 1369','facebook': 'https://www.facebook.com/RestSilvestre/'},
         {'name': 'Delicias Del Perú', 'direction': 'Calle 3A, entre avenidas 7 y 9', 'number': '2222 1959','facebook': 'face 11'},
         {'name': 'Criollita Amón. Restaurante y Café', 'direction': 'Avenida 9, entre calles 3A y 5', 'number': '2221 6917 / 7225 9216','facebook': 'https://www.facebook.com/criollitaamon/'},
         {'name': 'PANÍ-VORO', 'direction': 'Avenida 9, Calle 9.', 'number': 'num 12','facebook': 'https://www.facebook.com/panivorocr/'},
         {'name': 'Le Café', 'direction': 'Avenida 7, calle 5', 'number': '7288 2159','facebook': 'https://www.facebook.com/Le-Caf%C3%A9-1709669752634172/'}
         ]
      }
  }

    // Amon Ra BackOffice query
    async get_features(){
      
      const gastronomyUrl = "?category=Gastronomía" ; 
      const response = await makeBackendRequest(FEATURES_URL+gastronomyUrl,"GET",this.state.userData);
      const responseJson = await response.json();
  
      this.setState({
        markers: responseJson,
      });
  
    }

    async get_user_data() {
      const user_data_storage = await AsyncStorage.getItem(USER_DATA);
      this.setState({ userData: JSON.parse(user_data_storage)});
    }

    async get_backend_data() {
      await this.get_user_data()
      await this.get_features();
    }

    componentDidMount(){
      this.get_backend_data();
    }

    fixPlaceNameWithParenthesis(name){

      var placeName = "";
      if(name.includes("(")){

        var i;
        var character;
        for( i = 0 ; i < name.length ; i++){

          character = name.charAt(i);
          if(character == '(' ){
            break;
          }
          else{
            placeName += character;
          }
        }
      }

      else{
        placeName = name;
      }

      return placeName;
    }


    render() {

      return (
          <View style={styles.container}>

       {//   <View style={{flex:0.3}} />
       }

           <View style={{flex:0.3}}>
                  <Text style={styles.title} >Gastronomía</Text>
              </View>

              <View style={{flex:2}} >
              <ScrollView>

              {this.state.markers.map(place => (
                <View style={{flexDirection: "row",padding:10}}>
                <TouchableOpacity style={{width: 15}} />
                <Image  source= {{uri: place.miniature_image_url}} style={{width: 60, height: 60}} resizeMode='stretch' />
                <View style={{backgroundColor: 'rgba(200, 200, 200, 0.7)', flex: 1}}>
                <Text style={styles.name_place} >  { this.fixPlaceNameWithParenthesis(place.name) }</Text>
                <Text style={styles.text}>  Dirección: {place.direction} </Text>
                <Text style={styles.text}>  Tel: {place.phone_number}</Text>
                <Text style={styles.text}>  Facebook: {place.facebook}</Text> 
                <TouchableOpacity style={{flex: 1,alignItems: 'flex-end'}} onPress={() => this.props.navigation.navigate('SeeMore',{goToScreen: this.navigation, placeInfo: place})}>
                  <View style={{flexDirection: 'row'}}>
                    <Image  source={require('../../../images/icons/Directory/masinfogris.png')}/>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1,alignItems: 'flex-end'}} onPress={console.log("ir")} >
                  <View style={{flexDirection: 'row'}}>
                    <Image  source={require('../../../images/icons/Directory/ir_gris.png')}/>
                  </View>
                </TouchableOpacity>
                </View>
                </View>


              ))}

              </ScrollView>
              </View>

          {//    <View style={{flex:0.4}} />
          }

          {this.props.menuSideState &&
                < HM />
          }

          </View>

      );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title:  	{
      textAlign: "center",
      fontSize: 20,
      fontFamily: "vincHand",
      color: "#0C5B60",
      marginTop:20,
      marginBottom:20,
      fontWeight: 'bold'
    },
    name_place: {
      color: "#0C5B60",
      fontWeight: 'bold',
      fontSize: 16,
      paddingLeft:5,
      paddingTop:10
    },
    text: {
      color:'grey',
      fontSize: 16,
      paddingLeft: 10
    }
});

const gastronomyComponent = connect(mapStateToProps,mapDispatchToProps)(Gastronomy);
export default gastronomyComponent;

AppRegistry.registerComponent('Gastronomy', () => Gastronomy);
