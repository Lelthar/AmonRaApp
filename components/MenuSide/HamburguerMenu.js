import React, { Component } from 'react';
import {

	StyleSheet,
    Text,
    Dimensions,
    View,
    TouchableOpacity,

} from 'react-native';

import { SearchBar } from 'react-native-elements';
import { connect } from "react-redux";

let onPressTextDiscover = () => {
	return;
}

const hamburguerComponent = () => {

	return (

		<View style={styles.hamburgerMenu}>

          <SearchBar
            round={true}
            containerStyle={styles.containerInput}
            inputContainerStyle={styles.searchBarInput}
            inputStyle={styles.searchBarInput}
            leftIconContainerStyle={styles.searchBarInput}
            rightIconContainerStyle={styles.searchBarInput}
            placeholder= "Busqueda"
            placeholderTextColor='white'
            lightTheme={true} 
          />
          <TouchableOpacity onPress={ onPressTextDiscover } >
            <Text style={styles.textDiscover}>Descubri Barrio Amon</Text>
          </TouchableOpacity>
          
            <View style={{backgroundColor:'#00A2B5'}}>
              <TouchableOpacity onPress= {onPressTextDiscover}>
                <Text style={styles.textList} >•Origen del Barrio</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress= {onPressTextDiscover}>
                <Text style={styles.textList} >•Vivencias</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress= {onPressTextDiscover}>
                <Text style={styles.textList} >•Arquitectura</Text>
              </TouchableOpacity>
            </View>
          <Text style={styles.textMoreAmon}>Mas de Amon_RA</Text>
        </View>

	);
};

const styles = StyleSheet.create({
  

  // Styles for hamburguer menu:

  searchBarInput:{
    backgroundColor: '#10535D',

  },
  containerInput:{
    backgroundColor: '#00A2B5'

  },
  textList:{
    color: 'white',
    textAlign: 'left',
    fontSize: 14, 
    backgroundColor: '#00A2B5',
    padding:5,
    marginLeft: 15
  },
  textMoreAmon:{
    color: 'white',
    textAlign: 'center',
    fontSize:14,
    backgroundColor: '#00A2B5',
    padding:5

  },

  textDiscover:{
    color: 'white',
    textAlign: 'center',
    fontSize:14,
    backgroundColor: '#10535D',
    padding:5
  },

  hamburgerMenu:{
    backgroundColor:'#00A2B5',
    height: 200,
    width: 200,
    position: 'absolute',
    top: 0,
    right: 0,

  }

});

export default connect(null, null)(hamburguerComponent);