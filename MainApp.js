
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';


import ApplicationNavigator from "./src/components/pages/navigation";

import { Provider } from "react-redux";
import setupStore from "./src/redux/setupStore";

export default class MainApp extends Component {

    constructor (props) {
        super(props);

        let firstTime = false;

        if (typeof this.props.navigation != "undefined"){
            firstTime = true;
        }

        this.state = {
            current_screen: "None",
            navigation: {},
            first: firstTime,
            activeFilters: [],
            filterMenu: false,
            menuSide: false,
            rateScreen: false,
            guideScreen: false,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            navigatorMethod: null,
        }
        this.getNavigationProp = this.getNavigationProp.bind(this);
        this.getActiveFilters = this.getActiveFilters.bind(this);
        this.updateNavigationToScreen  = this.updateNavigationToScreen.bind(this);
    }

    updateNavigationToScreen(goToScreen) {
        this.setState(
            {
                navigatorMethod:goToScreen
            });
    }

    // This function is use to open the FilterMenu and the map screen
    toggleFilters() {
        this.setState({
            filterMenu: !(this.state.filterMenu)
          })
    }

    // This function is use to open the MenuSide
    toggleMenuSide(){
        this.resetAll()
        this.setState({
            menuSide: !this.state.menuSide
        })
    }

    toggleShowGuide(){
        this.resetAll()
        this.setState({
            guideScreen: !this.state.guideScreen
        })
    }

    toggleRateScreen(){
        this.resetAll()
        this.setState({
            rateScreen: !this.state.rateScreen
        })
    }

    setFirstFalse(){
      this.setState({
          first: false,
      })
    }

    resetAll(){
        this.setState({
            filterMenu: false,
            menuSide: false,
            rateScreen: false,
            guideScreen: false
        })
    }

    getActiveFilters(filters){
        this.setState({
            activeFilters: filters
        })
    }

    getNavigationProp(navProp){
        this.setState({navigation: navProp});
    }

    render() {
      var screenProps = {
        activeFilters:this.state.activeFilters,
        getNavigationProp:this.getNavigationProp,
        getActiveFilters:this.getActiveFilters,
        showFunctions: {
          toggleFilters: this.toggleFilters.bind(this),
          toggleMenuSide: this.toggleMenuSide.bind(this),
          toggleShowGuide: this.toggleShowGuide.bind(this),
          toggleRateScreen: this.toggleRateScreen.bind(this),
          setFirstFalse: this.setFirstFalse.bind(this),
          resetAll: this.resetAll.bind(this),

        },
        showProps:{
          filterMenu: this.state.filterMenu,
          menuSide: this.state.menuSide,
          rateScreen: this.state.rateScreen,
          guideScreen: this.state.guideScreen,
          first: this.state.first
        },
      }
        return (
            <Provider store={setupStore}>
                <ApplicationNavigator />
            </Provider>
        );
    }
}