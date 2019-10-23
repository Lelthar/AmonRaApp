import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
  } from 'react-native';
import styles from "../../assets/styles/pages/experiences";
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
      menuSideState: state.menuDataReducer.MENUSIDE,
    };
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

const btn_literature = require('../../../images/icons/Vivencias/11.vivencias-02.png');
const btn_narratives = require('../../../images/icons/Vivencias/11.vivencias-04.png');
const btn_characters = require('../../../images/icons/Vivencias/11.vivencias-06.png');
const btn_activities = require('../../../images/icons/Vivencias/11.vivencias-08.png');
const btn_secrets = require('../../../images/icons/Vivencias/11.vivencias-12.png');

class ExperiencesMenu extends Component {
    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
    }

    render() { 
        return( 
            <View style={styles.container}>
                <View style={styles.buttonsRow}>
                    <TouchableOpacity>
                        <Image source={btn_literature}/>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Image source={btn_narratives}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonsRow}>
                    <TouchableOpacity>
                        <Image source={btn_characters}/>
                    </TouchableOpacity>
                    
                    <TouchableOpacity>
                        <Image source={btn_activities}/>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.buttonsRow}>
                    <TouchableOpacity>
                        <Image source={btn_secrets}/>
                    </TouchableOpacity>
                </View>

                {this.props.menuSideState &&
                    <HamburgerMenu navigation={this.props.navigation} /> }
            </View>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ExperiencesMenu);