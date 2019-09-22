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
    Dimensions,
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
//-------------------------------------

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

var {windowHeight, windowWidth} = Dimensions.get('window');


class CultureArt extends Component{

  constructor(props){
      super(props);
      // Se le pasa el controlador de la navegación a App.js
      // para controlar la navegación desde Navigator.js
      //this.props.screenProps.getNavigationProp(this.props.navigation)
      this.navigation = this.props.navigation;
      this.state = {

        markers: [],
        userData: null,
        places: [
         {'name': 'TEOR/éTica', 'direction': 'Calle 7, entre avenidas 11 y 9.', 'number': '22334881','facebook': 'https://www.facebook.com/teoreticapagina/' },
         {'name': 'Lado V. Centro de estudio y documentación ', 'direction': 'Calle 7, entre avenidas 11 y 9.', 'number': '22211051','facebook': 'https://www.facebook.com/teoreticapagina/' },
         {'name': 'Libros Duluoz', 'direction': 'Avenida 7, entre calles 3 y 3A.', 'number': '22560414','facebook': 'https://www.facebook.com/libros.duluoz/' },
         {'name': 'Galería Talentum (Antigua Casa Familia Doryan)', 'direction': 'Avenida 11, entre calles 5 y 3A.', 'number': '22566346','facebook': 'https://www.facebook.com/galeriatalentum/'},
         {'name': 'Casa del Barrio Amón (Casa Serrano Bonilla)', 'direction': 'Avenida 11, entre calles 3 y 3A', 'number': '22480733','facebook': 'https://www.facebook.com/Casadelbarrioamon/'},
         {'name': 'Camanance. Taller y Tienda', 'direction': 'Avenida 9, entre calle 9 y 11', 'number': '88591361','facebook': 'https://es-la.facebook.com/camanancecr/'},
         {'name': 'Matisse Cine Espacio-Temporal', 'direction': 'Calle 5, entre avenida 7 y 9', 'number': '83809764','facebook': 'https://www.facebook.com/cinematisse/'},
         {'name': 'Murales de Cuentos de Concherías', 'direction': 'Avenida 9, entre calle 7 y 9', 'number': 'num 8','facebook': 'face 8'},
         {'name': 'Triángulo Showroom Creativo', 'direction': 'Calle 3A, entre avenida 9 y 11', 'number': '83810148 / 88516060','facebook': 'https://www.facebook.com/galeriatalentum/'},
         {'name': 'Amon Solar / El Sótano', 'direction': 'Avenida 11, Calle 3', 'number': '2221 2302','facebook': 'https://www.facebook.com/amonsolarcr/'},
         {'name': 'Boutique Annemarie Gift & Shop', 'direction': 'Avenida 9, Calle 9.', 'number': '2221 6707','facebook': 'https://www.facebook.com/HotelDonCarlosCostaRica/'},
         {'name': 'Insólita ', 'direction': 'Avenida 9 y 11, Calle 3A.', 'number': '8492 9090','facebook': 'https://www.facebook.com/insolitacr/'}
      ]

      }
  }
  
  /*goTo(screen,params){
        var goToScreen = this.props.navigation.state.params.goToScreen
        goToScreen(screen, params)
    }*/



   // AmonRa's backoffice query

   async get_features(){
      const cultureArtUrl = "?category=Cultura%20y%20arte" ; 
      const response = await makeBackendRequest(FEATURES_URL+cultureArtUrl,"GET",this.state.userData);
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
  

    // End backoffice query
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

          {//<View style={{flex:0.3}} />
          }

           <View style={{flex:0.3}}>
                  <Text style={styles.title} >Cultura y Arte</Text>
              </View>

              <View style={{flex:2}} >
              <ScrollView>

              {this.state.markers.map(place => (

                <View style={{flexDirection: "row",padding: 10}}>
                <TouchableOpacity style={{width: 15}} />
                <Image  source= {{uri: place.miniature_image_url}} style={{width: 60, height: 60}} resizeMode='stretch' />
                <View style={{backgroundColor: 'rgba(200, 200, 200, 0.7)', flex: 1 }}>
                <Text style={styles.name_place} >  { this.fixPlaceNameWithParenthesis(place.name) }</Text>
                <Text style={styles.text}>Dirección: {place.direction}</Text>
                <Text style={styles.text}>Tel: {place.phone_number}</Text>
                <Text style={styles.text}>Facebook: {place.facebook}</Text> 
                <TouchableOpacity style={{flex: 1,alignItems: 'flex-end'}}  onPress={() => this.props.navigation.navigate('SeeMore',{goToScreen: this.navigation, placeInfo: place})}>
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

              {//<View style={{flex:0.4}} />
              }

              {this.props.menuSideState &&
                <HamburgerMenu navigation={this.props.navigation} />
              }

          </View>

      );
    }
}


               /*
                onPress={ () => this.goTo('SeeMore', {goToScreen: this.props.navigation.state.params.goToScreen , placeInfo: place} )}

                */

              
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title:    {
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

const cultureArtComponent = connect(mapStateToProps,mapDispatchToProps)(CultureArt);
export default cultureArtComponent;

AppRegistry.registerComponent('CultureArt', () => CultureArt);