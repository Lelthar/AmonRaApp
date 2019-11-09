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

//------------------------
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

import HamburgerMenu from '../../../src/components/partials/HamburgerMenu';


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

class Institutional extends Component{

  constructor(props){
      super(props);
      // Se le pasa el controlador de la navegación a App.js
      // para controlar la navegación desde Navigator.js
      this.navigation = this.props.navigation;
      this.state = {

        markers: [],
        userData: null,
        places: [
         {'name': 'Alianza Cultural Franco Costarricense', 'direction': 'Avenida 7, Calle 5.', 'number': '2257-1438','facebook': 'fb.com/AlianzaFrancesaCostaRica' },
         {'name': 'Instituto Nacional de Vivienda y Urbanismo (INVU)', 'direction': 'Avenida 9, entre Calle 3 y 5', 'number': '2211-0000','facebook': 'fb.com/INVU.porelbiencomun' },
         {'name': 'Tecnológico de Costa Rica (TEC)', 'direction': 'Entre calles 5 y 7, y avenidas 9 y 11', 'number': '2257-0470','facebook': 'fb.com/tecnologicocostarica' },
         {'name': 'Escuela de Computación - Administración de Empresas - TEC', 'direction': 'Avenida 9, calle 7', 'number': '2257-9585 2550-9064','facebook': 'fb.com/Ing-Computaci%C3%B3n-TEC-707508426041351 fb.com/EscuelaDeAdministacionDeEmpresasDelTec'},
         {'name': 'Casa Cultural Amón - TEC', 'direction': 'Avenida 11, calle 5', 'number': '2550-9449 / 2550-9447','facebook': 'fb.com/casaculturalamonsj'},
         {'name': 'Escuela de Arquitectura y Urbanismo - TEC', 'direction': 'Avenida 9, calle 5', 'number': '2550-9036','facebook': 'fb.com/aeau.tec'},
         {'name': 'Fondo de Desarrollo Social y Asignaciones Familiares (FODESAF)', 'direction': 'Avenida 11, calle 3', 'number': '2547-3600 / 2547-3601 / 2547-3602','facebook': 'N/A'},
         {'name': 'Instituto Nacional de Seguros (INS)', 'direction': 'Avenida 7, entre calles 9 y 11', 'number': '2287-6000','facebook': 'fb.com/InstitutoNacionaldeSeguros'},
         {'name': 'Cooperativa Coopemep R.L.', 'direction': 'Calle Central, avenida 11', 'number': '2295-0600','facebook': 'fb.com/coopemep.cooperativa'},
         {'name': 'Instituto Mixto de Ayuda Social (IMAS)', 'direction': 'Avenida 7, calle 7', 'number': '2202-4000 / 800-000-4627','facebook': 'fb.com/InstitutoMixtodeAyudaSocial'},
         {'name': 'Fundación Pro Zoológicos (FUNDAZOO)', 'direction': 'Diagonal 11, Avenidas 11 y 11A', 'number': '2233-6701 / 2256-0012','facebook': 'fb.com/FundazooCR'},
         {'name': 'Casa Santa Margarita', 'direction': 'Calle 3A, entre avenidas 9 y 11', 'number': '22217713 / 22576160','facebook': 'N/A'},
         {'name': 'Centro Costarricense de Producción Cinematográfica', 'direction': 'Avenida 11, calle 11', 'number': '2542-5200','facebook': 'fb.com/cine.mcj.cr'},
         ]

      }
  }

   // AmonRa's backoffice query
   async get_features(){
      
      const institutionalUrl = "?category=Institucional" ; 
      const response = await makeBackendRequest(FEATURES_URL+institutionalUrl,"GET",this.state.userData);
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
  

    // End backoffice consult

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

          { //<View style={{flex:0.3}} />
          }

           <View style={{flex:0.3}}>
                  <Text style={styles.title} >Institucional</Text>
              </View>

              <View style={{flex:2}} >
              <ScrollView>

              {this.state.markers.map(place => (


                <View style={{flexDirection: "row",padding:10}}>
                <TouchableOpacity style={{width: 15}} />
                <Image  source= {{uri: place.miniature_image_url}} style={{width: 60, height: 60}} resizeMode='stretch' />
                <View style={{backgroundColor: 'rgba(200, 200, 200, 0.7)', flex: 1}}>
                <Text style={styles.name_place} >  {this.fixPlaceNameWithParenthesis(place.name)}</Text>
                <Text style={styles.text}>  Dirección: {place.direction} </Text>
                <Text style={styles.text}>  Tel: {place.phone_number}</Text>
                <Text style={styles.text}>  Facebook: {place.facebook}</Text> 
                <TouchableOpacity style={{flex: 1,alignItems: 'flex-end'}} onPress={() => this.props.navigation.navigate('SeeMore',{goToScreen: this.navigation, placeInfo: place})} >
                  <View style={{flexDirection: 'row'}}>
                    <Image  source={require('../../../images/icons/Directory/masinfogris.png')}/>
                  </View>
                </TouchableOpacity>
                </View>
                </View>


              ))}

              </ScrollView>
              </View>

            {// <View style={{flex:0.4}} />
            }

            {this.props.menuSideState &&
                <HamburgerMenu navigation={this.props.navigation} /> }

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
      paddingTop: 10
    },
    text: {
      color:'grey',
      fontSize: 16,
      paddingLeft: 10
    }
});

const institutionalComponent = connect(mapStateToProps,mapDispatchToProps)(Institutional);
export default institutionalComponent;

AppRegistry.registerComponent('Institutional', () => Institutional);
