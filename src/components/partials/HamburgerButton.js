import React from 'react';
import {
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from "react-redux";
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

const HamburgerButton = (props) => {

  toggleMenuSide = () => {
    props.setMenuSide(!props.menuSideState);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleMenuSide} >
        <Icon
          name='reorder'
          size={30}
          color="#127C8A"
          style={{ marginRight: 15 }}
        />
      </TouchableOpacity>
    </View>
  );
}; 

export default connect(mapStateToProps, mapDispatchToProps)(HamburgerButton);