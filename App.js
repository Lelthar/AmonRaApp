import React, { Component } from 'react';
import {
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';

import RegisterMain from './components/Register/RegisterMain';
import MainApp from './MainApp'
import { 
  USER_DATA,
} from './constants/constants';

import {
    requestCameraPermission,
    requestFineLocationPermission,
    requestPermissions
} from './permission/permission';

import AsyncStorage from '@react-native-community/async-storage';

export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            userData: null
        }
        AsyncStorage.getItem(USER_DATA).then((value) => {
            this.setState({userData: value});
        });
        //requestPermissions();

    }

    componentDidMount() {
    	// do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
        setTimeout(() => {SplashScreen.hide()}, 5000);
    }

    render() {
        const register = <RegisterMain />;
        const mainApp = <MainApp />;
        
        return (this.state.userData ? mainApp : register);
        //return (mainApp);
        //return (register);
    }
}
