import React, { useState } from 'react';
import {

  StyleSheet,
    Text,
    Dimensions,
    View,
    TouchableOpacity,

} from 'react-native';

import { SearchBar } from 'react-native-elements';
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "../../assets/styles/partials/hamburgerMenu";

const HamburguerComponent = (props) => {

  const [isTextDiscoverPressed,setTextDiscoverPressed] = useState(false);
  const [searchText, setSearchText] = useState('');
  const search = searchText;

  onPressTextDiscover = () => {
    setTextDiscoverPressed(!isTextDiscoverPressed);
  }

  updateSearch = search =>{
    setSearchText(search);
  }

  onClickSearchIcon = () =>{
    message = "Clic en el icono de buscar ";
    message = message.concat(searchText);
    console.error(message);
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
          <TouchableOpacity onPress={ onPressTextDiscover } >
            <Text style={styles.textDiscover}>Descubrí Barrio Amón</Text>
          </TouchableOpacity>

          {isTextDiscoverPressed &&

            <View style={{backgroundColor:'#00A2B5'}}>
              <TouchableOpacity onPress= {() => props.navigation.navigate('TimeLine',{goToScreen: props.navigation}) }>
                <Text style={styles.textList} >     •Origen del Barrio</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress= {() => props.navigation.navigate('ExperiencesMenu',{goToScreen: props.navigation }) }>
                <Text style={styles.textList} >     •Vivencias</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress= {() => props.navigation.navigate('Architecture',{goToScreen: props.navigation}) }>
                <Text style={styles.textList} >     •Arquitectura</Text>
              </TouchableOpacity>
            </View>
          }

          <TouchableOpacity onPress= {() => props.navigation.navigate('MoreAmonRa', {}) }>
            <Text style={styles.textMoreAmon}>Más de Amon_RA</Text>
          </TouchableOpacity>     
        </View>
  );
};

export default connect(null, null)(HamburguerComponent);
