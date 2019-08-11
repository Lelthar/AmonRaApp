
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';

import Orientation from 'react-native-orientation-locker';

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

    _onOrientationDidChange = (orientation) => {
        if (orientation == 'LANDSCAPE-LEFT') {
          //do something with landscape left layout
        } else {
          //do something with portrait layout
        }
      };
    
    componentWillMount() {
        //The getOrientation method is async. It happens sometimes that
        //you need the orientation at the moment the js starts running on device.
        //getInitialOrientation returns directly because its a constant set at the
        //beginning of the js code.
        var initial = Orientation.getInitialOrientation();
        if (initial === 'PORTRAIT') {
          //do stuff
        } else {
          //do other stuff
        }
      };
    
    componentDidMount() {
    
        Orientation.getAutoRotateState((rotationLock) => this.setState({rotationLock}));
        //this allows to check if the system autolock is enabled or not.
    
        Orientation.lockToPortrait(); //this will lock the view to Portrait
        //Orientation.lockToLandscapeLeft(); //this will lock the view to Landscape
        //Orientation.unlockAllOrientations(); //this will unlock the view to all Orientations
    
        //get current UI orientation
        /*
        Orientation.getOrientation((orientation)=> {
          console.log("Current UI Orientation: ", orientation);
        });
    
        //get current device orientation
        Orientation.getDeviceOrientation((deviceOrientation)=> {
          console.log("Current Device Orientation: ", deviceOrientation);
        });
        */
    
        Orientation.addOrientationListener(this._onOrientationDidChange);
      }
    
      componentWillUnmount() {
        Orientation.removeOrientationListener(this._onOrientationDidChange);
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