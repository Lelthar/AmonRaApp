

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


const HamburguerComponent = (props) => {

  // Declare a new state variable, called isTextDiscoverPressed
  const [isTextDiscoverPressed,setTextDiscoverPressed] = useState(false);


  onPressTextDiscover = () => {
    setTextDiscoverPressed(!isTextDiscoverPressed);
  }

  onPressTextMoreAmonRa = () => {

  }

  onPressTextOrigin= () => {
    
  }

  onPressTextVivencias = () => {
    
  }

  onPressTextArquitectura= () => {
    
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
          />
          <TouchableOpacity onPress={ onPressTextDiscover } >
            <Text style={styles.textDiscover}>Descubrí Barrio Amón</Text>
          </TouchableOpacity>

          {isTextDiscoverPressed &&

            <View style={{backgroundColor:'#00A2B5'}}>
              <TouchableOpacity onPress= {() => props.navigation.navigate('TimeLine',{goToScreen: props.navigation}) }>
                <Text style={styles.textList} >     •Origen del Barrio</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress= {() => props.navigation.navigate('TimeLine',{goToScreen: props.navigation }) }>
                <Text style={styles.textList} >     •Vivencias</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress= {() => props.navigation.navigate('TimeLine',{goToScreen: props.navigation}) }>
                <Text style={styles.textList} >     •Arquitectura</Text>
              </TouchableOpacity>
            </View>
          }
            

          <TouchableOpacity onPress= {onPressTextMoreAmonRa}>
            <Text style={styles.textMoreAmon}>Más de Amon_RA</Text>
          </TouchableOpacity>
          
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
    width: 200,
    position: 'absolute',
    top: 0,
    right: 0,

  }

});

export default connect(null, null)(HamburguerComponent);

