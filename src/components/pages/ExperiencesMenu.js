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

const LITERATURE_BTN = require('../../assets/images/experiences/11.vivencias-02.png');
const NARRATIVES_BTN = require('../../assets/images/experiences/11.vivencias-04.png');
const CHARACTERS_BTN = require('../../assets/images/experiences/11.vivencias-06.png');
const ACTIVITIES_BTN = require('../../assets/images/experiences/11.vivencias-08.png');
const SECRETS_BTN = require('../../assets/images/experiences/11.vivencias-12.png');

class ExperiencesMenu extends Component {
    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
    }

    render() { 
        return( 
            <View style={styles.container}>
                <View style={styles.buttonsRow}>
                    <TouchableOpacity onPress={()=>this.openLiterature()}>
                        <Image source={LITERATURE_BTN}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>this.openNarratives()}>
                        <Image source={NARRATIVES_BTN}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonsRow}>
                    <TouchableOpacity onPress={()=>this.openCharacters()}>
                        <Image source={CHARACTERS_BTN}/>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={()=>this.openActivities()}>
                        <Image source={ACTIVITIES_BTN}/>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.buttonsRow}>
                    <TouchableOpacity onPress={()=>this.openSecrets()}>
                        <Image source={SECRETS_BTN}/>
                    </TouchableOpacity>
                </View>

                {this.props.menuSideState &&
                    <HamburgerMenu navigation={this.props.navigation} /> }
            </View>
        );
    }

    openNarratives = () => {
        this.props.navigation.navigate('Narratives',{goToScreen: this.props.navigation});
    }

    openSecrets = () => {
        this.props.navigation.navigate('Secrets',{goToScreen: this.props.navigation});
    }

    openCharacters = () => {
        this.props.navigation.navigate('Characters',{goToScreen: this.props.navigation});
    }

    openLiterature = () => {
        this.props.navigation.navigate('Literature',{goToScreen: this.props.navigation});
    }

    openActivities = () => {
        this.props.navigation.navigate('Activities',{goToScreen: this.props.navigation});
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ExperiencesMenu);