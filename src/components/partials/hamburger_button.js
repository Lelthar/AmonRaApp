import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Flatlist
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SearchBar} from 'react-native-elements';
import { connect } from "react-redux";
import { menuSideAction } from "../../redux/actions/menuDataActions";


// test for menu 
let isMenuVisible = false; //  TODO QUITAR
let isTextDiscoverPressed = true;
// end test

const mapStateToProps = state => {
  return {
    menuSideState: state.menuDataReducer.MENUSIDE
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMenuSide: (data) => {
      dispatch(menuSideAction(data));
    },
  };
};

function search(){ // TODO quitar 

}
function onPressTextDiscover(){

  isTextDiscoverPressed = !isTextDiscoverPressed;

}
const hamburgerMenu = (props) => {

  toggleMenuSide = () => {
    props.setMenuSide(!props.menuSideState);
    //isMenuVisible = props.menuSideState;

  };

  return (
    <View>
      <TouchableOpacity onPress={ toggleMenuSide } >
      <Icon
        name='reorder'
        size={30}
        color="#000"
        style={{ marginRight: 15 }}
      />
      </TouchableOpacity>

      {isMenuVisible?
        <View style={styles.hamburgerMenu}>
          <SearchBar
            round={true}
            containerStyle={styles.searchBarInput}
            leftIconContainerStyle={styles.searchBarInput}
            rightIconContainerStyle={styles.searchBarInput}
            inputStyle={styles.searchBarInput}
            placeholder= "Busqueda"
            onChangeText={search}
            placeholderTextColor='white'
            
          />
          <TouchableOpacity onPress={ onPressTextDiscover } >
            <Text style={styles.textDiscover}>Descubri Barrio Amon</Text>
          </TouchableOpacity>
          
          {isTextDiscoverPressed?
            <View style={{backgroundColor:'#268490'}}>
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

            
            
            

          :null}
          <Text style={styles.textMoreAmon}>Mas de Amon_RA</Text>
        </View>

      :null}
    </View>
   
    );
}; 

const styles = StyleSheet.create({

  /*
  color principal: 349AA9
  color fondo de barra de busqueda: 00545D
  color fondo descubri barrio amon: 00545D
  color fondo lista ordenada: 268490
  color fondo mas amon ra: 248B92
  */

  searchBarInput:{
    backgroundColor: '#00545D',

  },

  textList:{
    color: 'white',
    textAlign: 'left',
    fontSize: 14, 
    backgroundColor: '#268490',
    padding:5,
    marginLeft: 15
  },
  textMoreAmon:{
    color: 'white',
    textAlign: 'center',
    fontSize:14,
    backgroundColor: '#248B92',
    padding:5

  },

  textDiscover:{
    color: 'white',
    textAlign: 'center',
    fontSize:14,
    backgroundColor: '#00545D',
    padding:5
  },

  hamburgerMenu:{
    backgroundColor:'#349AA9',
    height: 200,
    width: 200,
    position: 'absolute', 
    right: 0,
    top: 0
  }

});
export default connect(mapStateToProps, mapDispatchToProps)(hamburgerMenu);