import React, { Component } from 'react';
import {
  View, 
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  TouchableHighlight
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
      markers: []
    };
  }
  
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
  }

  componentDidMount(){
    this.get_backend_data();
  }

  render() {
    return (

      <View style={styles.container}>
        <FlatList 
          data={this.state.markers}
          numColumns={2}
          keyExtractor={(item, index) => index}
          contentContainerStyle={styles.list_style}
          renderItem={({item}) => (
            <TouchableHighlight style= {styles.list_item}
              onPress={ () => this.navigation.navigate('ArchitectureDetail',{goToScreen: this.navigation, placeInfo: item }) }
            >
              <View style={{flex:1}}>
                <Image source={{uri: item.image1_url}} style={styles.image} />
              </View>
            </TouchableHighlight>
          )}
        />
        {this.props.menuSideState &&
          <HamburgerMenu navigation={this.props.navigation} /> }
      </View>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Architecture);
