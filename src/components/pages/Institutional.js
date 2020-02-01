import React, { Component } from 'react';
import {
    Text,
    View,
    AppRegistry,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';

import { 
  FEATURES_URL,
  USER_DATA,
} from '../../../constants/routesAPI';

import {
  makeBackendRequest,
  getPropsFromPlace,
} from '../../../helpers/helpers'

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
import styles from "../../assets/styles/pages/institutional";
import AsyncStorage from '@react-native-community/async-storage';

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

const INSTITUTIONAL_URL = "?category=Institucional"; 

class Institutional extends Component{

  constructor(props){
      super(props);

      this.navigation = this.props.navigation;

      this.state = {
        markers: [],
        userData: null,
      };
  }


  componentDidMount(){
    this.get_backend_data();
  }

  async get_features(){
    const response = await makeBackendRequest(FEATURES_URL+INSTITUTIONAL_URL,"GET",this.state.userData);
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
    await this.get_user_data();
    await this.get_features();
  }

  fixPlaceNameWithParenthesis(name){
    let placeName = "";
    if(name.includes("(")){
      let i;
      let character;
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
        <View style={{flex:0.3}}>
              <Text style={styles.title} >Institucional</Text>
          </View>

          <View style={{flex:2}} >
          <ScrollView>

          {this.state.markers.map(place => (
            <View key={place.id} style={{flexDirection: "row",padding:10}}>
            <TouchableOpacity style={{width: 15}} />
            <Image  source= {{uri: place.miniature_image_url}} style={{width: 60, height: 60}} resizeMode='stretch' />
            <View style={{backgroundColor: 'rgba(200, 200, 200, 0.7)', flex: 1}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('SeeMore', getPropsFromPlace(place))}>
                  <Text style={styles.name_place} >  { this.fixPlaceNameWithParenthesis(place.name) }</Text>
            </TouchableOpacity>
            <Text style={styles.text}>  Dirección: {place.direction} </Text>
            <Text style={styles.text}>  Tel: {place.phone_number}</Text>
            <Text style={styles.text}>  Facebook: {place.facebook}</Text> 
            </View>
            </View>
          ))}

          </ScrollView>
          </View>

        {this.props.menuSideState &&
            <HamburgerMenu navigation={this.props.navigation} /> }

      </View>

    );
  }
}

const institutionalComponent = connect(mapStateToProps,mapDispatchToProps)(Institutional);
export default institutionalComponent;

AppRegistry.registerComponent('Institutional', () => Institutional);
