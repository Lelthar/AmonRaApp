import React, { Component } from 'react';
import {
  View, 
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

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
} from '../../../helpers/helpers';

import HamburgerMenu from '../partials/HamburgerMenu';
import styles from "../../assets/styles/pages/architecture";

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
  };
};

class Architecture extends Component {

  constructor(props){
    super(props);
    this.navigation = this.props.navigation;

    this.state = {

      markers: [],
      markersColumn1: [],
      markersColumn2: []

    };
  }

  async splitMarkers(){

      const arrayLength = this.state.markers.length;
      const half = arrayLength / 2;
      let  i = 0;
      let markers1 = [];
      let markers2 = [];

      for(i; i < arrayLength; i++){

        if(i < half){
          markers1.push(this.state.markers[i]);
        }
        else{
          markers2.push(this.state.markers[i]);
        }
      }

      this.setState({
        markers: this.state.markers,
        markersColumn1: markers1,
        markersColumn2: markers2
      });


    }

  // AmonRa's backoffice query
  async get_features(){
    const institutionalUrl = "?category=Patrimonio%20Arquitectónico"; 
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
    await this.splitMarkers();
  }

  componentDidMount(){
    this.get_backend_data();
  }

  render() {
    return (

      <View style={{flex: 1, flexDirection: 'row', alignItems:'center'}}>

        <ScrollView contentContainerStyle={{flexDirection:'column', alignItems:'center'}}>
        {
          this.state.markersColumn1.map(place => (

            <View>
              <TouchableOpacity onPress= {() => this.navigation.navigate('ArchitectureDetail',{goToScreen: this.navigation, placeInfo: place }) }>
                <Image resizeMode='stretch' source= {{uri: place.image1_url}} style={styles.image}/>
              </TouchableOpacity>          
            </View> ))
        }
        </ScrollView>

        <View style={{flex: 1}}>
        </View>

        <ScrollView contentContainerStyle={{flexDirection:'column',alignItems:'center'}}>
        {
          this.state.markersColumn2.map(place => (

            <View>
              <TouchableOpacity onPress= {() => this.navigation.navigate('ArchitectureDetail',{goToScreen: this.navigation, placeInfo: place}) }>
                <Image  resizeMode='stretch' source= {{uri: place.image1_url}} style={styles.image}/> 
              </TouchableOpacity>           
            </View> ))
        }
        </ScrollView>
        
        {this.props.menuSideState &&
          <HamburgerMenu navigation={this.props.navigation} /> }
      </View>
    );
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(Architecture);
