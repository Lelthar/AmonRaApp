import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import {
  makeBackendRequest,
} from '../../../helpers/helpers';

import {
  SEARCH_INTERMEDIATES, 
  USER_DATA,
} from '../../../constants/routesAPI';

import { SearchBar } from 'react-native-elements';
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "../../assets/styles/partials/hamburgerMenu";
import AsyncStorage from '@react-native-community/async-storage';
import { menuSideAction } from "../../redux/actions/menuDataActions";

const mapStateToProps = state => {
  return {
    menuSideState: state.menuDataReducer.MENUSIDE,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMenuSide: (data) => {
      dispatch(menuSideAction(data));
    },
  };
};

const HamburguerComponent = (props) => {

  const [isTextDiscoverPressed,setTextDiscoverPressed] = useState(false);
  const [userData, setUserData] = useState(null);
  const [searchText, setSearchText] = useState('');
  const search = searchText;

  onPressTextDiscover = () => {
    setTextDiscoverPressed(!isTextDiscoverPressed);
  };

  updateSearch = search =>{
    setSearchText(search);
  };

  toggleMenuSide = () => {
    props.setMenuSide(!props.menuSideState);
  };

  onClickSearchIcon = async () =>{
    /*message = "Clic en el icono de buscar ";
    message = message.concat(searchText);
    console.error(message);*/
    if (searchText != "") {
      const searchTextParam =  "?search=" + encodeURI(searchText);

      const response = await makeBackendRequest(SEARCH_INTERMEDIATES+searchTextParam,"GET",userData);

      console.log(response.status);

      const responseJson = await response.json();

      console.log(responseJson);
      if (response.status === 200) {
        props.navigation.navigate('Search', {results: responseJson});
        toggleMenuSide();
      }
    }
  };

  getUserData = async () => {
    const userDataStorage = await AsyncStorage.getItem(USER_DATA);
    setUserData(JSON.parse(userDataStorage));
  };

  useEffect(() => {
    getUserData();
  }, []);

  goToOrigin = () => {
    props.navigation.navigate('Origin',{goToScreen: props.navigation});
    toggleMenuSide(); 
  };

  goToArchitecture = () => {
    props.navigation.navigate('Architecture',{goToScreen: props.navigation});
    toggleMenuSide();
  };

  goToExperiences = () => {
    props.navigation.navigate('ExperiencesMenu',{goToScreen: props.navigation});
    toggleMenuSide();
  };

  goToMoreAmonRa = () => {
    props.navigation.navigate('MoreAmonRa', {});
    toggleMenuSide();
  }

  goToUseGuide = () => {
    props.navigation.navigate('UseGuide',{goToScreen: props.navigation});
    toggleMenuSide();
  }

  return (
    <View style={styles.hamburgerMenu}>

          <SearchBar
            round={true}
            containerStyle={styles.containerInput}
            inputContainerStyle={styles.searchBarInput}
            inputStyle={styles.searchBarInput}
            leftIconContainerStyle={styles.searchBarInput}
            rightIconContainerStyle={styles.searchBarInput}
            placeholder= 'Búsqueda'
            placeholderTextColor='white'
            lightTheme={true}
            onChangeText={updateSearch}
            value={search}
            searchIcon={
              <TouchableOpacity onPress={onClickSearchIcon} >
                <Icon
                name='search'
                size={20}
                color="#127C8A"
                />
              </TouchableOpacity> }
          />

          {!isTextDiscoverPressed && 
            <TouchableOpacity onPress={ onPressTextDiscover } >
            <Text style={styles.textDiscover}>Descubrí Barrio Amón</Text>
          </TouchableOpacity>
          }
          
          {isTextDiscoverPressed &&

            <View>
              <TouchableOpacity onPress={ onPressTextDiscover } >
              <Text style={styles.textDiscoverHighlight}>Descubrí Barrio Amón</Text>
              </TouchableOpacity>
              <View style={{backgroundColor:'#00A2B5'}}>
                <TouchableOpacity onPress= { goToOrigin }>
                  <Text style={styles.textList} >     •Origen del Barrio</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress= { goToExperiences }>
                  <Text style={styles.textList} >     •Vivencias</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress= { goToArchitecture }>
                  <Text style={styles.textList} >     •Arquitectura</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
          <TouchableOpacity onPress= { goToUseGuide }>
            <Text style={styles.textMoreAmon}>Guía de Uso</Text>
          </TouchableOpacity> 
          <TouchableOpacity onPress= { goToMoreAmonRa }>
            <Text style={styles.textMoreAmon}>Más de Amon_RA</Text>
          </TouchableOpacity>     
        </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HamburguerComponent);
