
import React, { Component } from 'react';
import {
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

    render() {
        return (
            <Provider store={setupStore}>
                <ApplicationNavigator />
            </Provider>
        );
    }
}