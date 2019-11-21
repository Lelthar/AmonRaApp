import React, { Component } from 'react';
import {
    View,
    Image,
    FlatList,
    TouchableOpacity,
  } from 'react-native';
import styles from "../../assets/styles/partials/tripleColFlatList";

import { connect } from "react-redux";
import AsyncStorage from '@react-native-community/async-storage';

import { 
  FEATURES_URL,
  USER_DATA,
} from '../../../constants/constants';

import {
  makeBackendRequest,
} from '../../../helpers/helpers';

import {
  filterMenuAction,
  activeFiltersAction,
  menuSideAction,
  rateScreenAction,
  guideScreenAction,
  menuResetAction,
} from "../../redux/actions/menuDataActions";

import HamburgerMenu from '../partials/HamburgerMenu';

const URL = "?category=Personaje";

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

class Characters extends Component {
    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;

        this.state = {
          data: [],
        }
    }

    componentDidMount(){
      this.get_backend_data();
    }

    async get_features(){
      let response = await makeBackendRequest(FEATURES_URL+URL,"GET",this.state.userData);
      let responseJson = await response.json();
      this.setState({
        data: responseJson,
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

    render() { 
        return( 
            <View style={styles.container}>
                <FlatList
                    data={this.state.data}
                    numColumns={3}
                    keyExtractor={(item, index) => index}
                    contentContainerStyle={styles.list_style}
                    renderItem={({item}) => (
                        <TouchableOpacity style= {styles.list_item}
                            onPress={() => this.handleClick(item)}>
                            <Image source={{uri: item.miniature_image_url}} style={styles.image} />
                    </TouchableOpacity>
                    )}
                />
                {this.props.menuSideState &&
                  <HamburgerMenu navigation={this.props.navigation} /> }
            </View>
        );
    }
    
    handleClick = (item) => {
        this.props.navigation.navigate('ExperiencesDetail',{tittle: item.name, description: item.description, imgHeader: item.image1_url});
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Characters);
