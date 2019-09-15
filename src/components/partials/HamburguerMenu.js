import React, {Component} from 'react';
import {

  StyleSheet,
  Text,
  View,
  AppRegistry,
  TouchableOpacity,

} from 'react-native';

import { SearchBar } from 'react-native-elements';
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

export default class HamburguerMenu extends Component{


  constructor(props){

    super(props);

    this.onPressTextDiscover = this.onPressTextDiscover.bind(this);
    this.onPressTextMoreAmonRa = this.onPressTextMoreAmonRa.bind(this);
    this.onPressTextOrigin = this.onPressTextOrigin.bind(this);
    this.onPressTextVivencias = this.onPressTextVivencias.bind(this);

    this.navigation = this.props.navigation;

    this.state = {

      isTextDiscoverPressed: false,
      discoverText : 'Descubri Barrio Amon'

    }
    // Se le pasa el controlador de la navegación a App.js
    // para controlar la navegación desde Navigator.js
    
  }

  onPressTextDiscover = () => {

    var hola = this.state.isTextDiscoverPressed
    this.setState({
      isTextDiscoverPressed: !hola,
    })
  }

  onPressTextMoreAmonRa = () => {

  }

  onPressTextOrigin= () => {
    
  }

  onPressTextVivencias = () => {
    
  }

  onPressTextArquitectura= () => {
    
  }


  render() {


    return (


    <View style={styles.hamburgerMenu}>
      <SearchBar
            round={true}
            containerStyle={styles.containerInput}
            inputContainerStyle={styles.searchBarInput}
            inputStyle={styles.searchBarInput}
            leftIconContainerStyle={styles.searchBarInput}
            rightIconContainerStyle={styles.searchBarInput}
            placeholder= 'Busqueda'
            placeholderTextColor='white'
            lightTheme={true} 
          />
          <TouchableOpacity onPress={ this.onPressTextDiscover } >
            <Text style={styles.textDiscover}>{this.state.discoverText}</Text>
          </TouchableOpacity>

          {this.state.isTextDiscoverPressed &&

            <View style={{backgroundColor:'#00A2B5'}}>
              <TouchableOpacity onPress= {() => this.navigation.navigate('TimeLine',{goToScreen: this.navigation}) }>
                <Text style={styles.textList} >     •Origen del Barrio</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress= {() => this.props.navigation.navigate('TimeLine',{goToScreen: this.navigation}) }>
                <Text style={styles.textList} >     •Vivencias</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress= {() => this.props.navigation.navigate('TimeLine',{goToScreen: this.navigation}) }>
                <Text style={styles.textList} >     •Arquitectura</Text>
              </TouchableOpacity>
            </View>
            
          }
            

          <TouchableOpacity onPress= { () => this.props.navigation.navigate('TimeLine',{goToScreen: this.navigation}) }>
            <Text style={styles.textMoreAmon}>Mas de Amon_RA</Text>
          </TouchableOpacity>
          
        </View>

    );
  }
}

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

