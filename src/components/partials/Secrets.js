import React, { Component } from 'react';
import {
    View,
    Image,
    FlatList,
    TouchableOpacity,
  } from 'react-native';
import styles from "../../assets/styles/partials/tripleColFlatList";
import secretsInfo from "../../assets/files/secretos.json";

import { connect } from "react-redux";

import {
  filterMenuAction,
  activeFiltersAction,
  menuSideAction,
  rateScreenAction,
  guideScreenAction,
  menuResetAction,
} from "../../redux/actions/menuDataActions";

import HamburgerMenu from '../partials/HamburgerMenu';

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

class Secrets extends Component {
    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
    }
    
    render() { 
        return( 
            <View style={styles.container}>
                <FlatList
                    data={secretsInfo}
                    numColumns={3}
                    keyExtractor={(item, index) => index}
                    contentContainerStyle={styles.list_style}
                    renderItem={({item}) => (
                        <TouchableOpacity style= {styles.list_item}
                            onPress={() => this.handleClick(item)}>
                            <Image source={{uri: item.buttonLink}} style={styles.image} />
                    </TouchableOpacity>
                    )}
                />
                {this.props.menuSideState &&
                  <HamburgerMenu navigation={this.props.navigation} /> }
            </View>
        );
    }

    handleClick = (item) => {
        console.log(item.secreto);
        this.props.navigation.navigate('CharacterDetail',{tittle: item.nombre, description: item.secreto, imgHeader: item.imagen});
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Secrets);