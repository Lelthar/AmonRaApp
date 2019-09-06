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


const hamburgerMenu = (props) => {

  toggleMenuSide = () => {
    props.setMenuSide(!props.menuSideState);

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
    </View>
   
    );
}; 

export default connect(mapStateToProps, mapDispatchToProps)(hamburgerMenu);