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
  getPropsFromPlace,
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
} from "../../redux/actions/menuDataActions";

import HamburgerMenu from '../partials/HamburgerMenu';


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
class Hotels extends Component{

  constructor(props){
      super(props);
      // Se le pasa el controlador de la navegación a App.js
      // para controlar la navegación desde Navigator.js
      this.navigation = this.props.navigation;
      this.state = {

        markers: [],
        userData: null,
        places: [
         {'name': 'Hotel Dunn Inn', 'direction': 'Avenida 11, Calle 5.', 'number': '2222-3232 / 800-545-4801','facebook': 'fb.com/HotelDunnInn' },
         {'name': 'Hotel Don Carlos', 'direction': 'Avenida 9, Calle 9.', 'number': '2221-6707','facebook': 'fb.com/HotelDonCarlosCostaRica' },
         {'name': 'Hotel Castillo', 'direction': 'Avenida 9, Entre calle 9 y 11.', 'number': '2258-0021','facebook': 'fb.com/hotelcastillocostarica' },
         {'name': 'Hotel Inca Real San José', 'direction': 'Avenida 11, Calle 3 y 3A.', 'number': '2223-8883 / 2233-2640 / 8828-2108','facebook': 'fb.com/Hotel-Inca-Real-140910712588711'},
         {'name': 'Hotel y Casino Taormina San José', 'direction': 'Avenida 11, entre calle 3A', 'number': '4055-5555 (según google maps) 2222-6952 / 6142-6633','facebook': 'fb.com/hotelycasinotaormina'},
         {'name': 'Hotel Kekoldi', 'direction': 'Avenida 9, entre calle 7 y 5', 'number': '2248-0804','facebook': 'fb.com/Kekoldi/'},
         {'name': 'Hostel Van Gogh', 'direction': 'Calle 7, entre avenida 9 y 7', 'number': '2221-3554','facebook': 'fb.com/HostelVanGogh'},
         {'name': 'Hostel Pangea', 'direction': 'Avenida 7, entre calle 3 y 3A', 'number': '2221-1992','facebook': 'fb.com/Hostel-Pangea-239092546120739'},
         ]

      }
  }

     // AmonRa's backoffice query

   async get_features(){

      const hotelUrl = "?category=Hospedaje" ; 
      const response = await makeBackendRequest(FEATURES_URL+hotelUrl,"GET",this.state.userData);
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
                    <Text style={styles.title} >Hospedaje</Text>
                </View>

                <View style={{flex:2}} >
                <ScrollView>

                {this.state.markers.map(hotel => (

                  <View style={{flexDirection: "row",padding:10}}>
                  <TouchableOpacity style={{width: 15}} />
                  <Image  source= {{uri: hotel.miniature_image_url}} style={{width: 60, height: 60}} resizeMode='stretch' />
                  <View style={{backgroundColor: 'rgba(200, 200, 200, 0.7)', flex: 1}}>
                  <Text style={styles.name_place} >  Hotel: {this.fixPlaceNameWithParenthesis(hotel.name)}</Text>
                  <Text style={styles.text} >  Dirección: {hotel.direction} </Text>
                  <Text style={styles.text}>  Tel: {hotel.phone_number}</Text>
                  <Text style={styles.text}>  Facebook: {hotel.facebook}</Text>
                  <TouchableOpacity style={{flex: 1,alignItems: 'flex-end'}}  onPress={() => this.props.navigation.navigate('SeeMore', getPropsFromPlace(hotel))} >
                    <View style={{flexDirection: 'row'}}>
                      <Image  source={ require('../../../images/icons/Directory/masinfogris.png') }/>
                    </View>
                  </TouchableOpacity>
                  </View>
                  </View>


                ))}

                </ScrollView>
                </View>

             {//   <View style={{flex:0.4}} />
             }

             {this.props.menuSideState &&
                <HamburgerMenu navigation={this.props.navigation} />
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
      paddingLeft:10
    }
});


const hotelComponent = connect(mapStateToProps,mapDispatchToProps)(Hotels);
export default hotelComponent;

AppRegistry.registerComponent('Hotels', () => Hotels);