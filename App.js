import React, { Component } from 'react';
import {
  AsyncStorage
} from 'react-native';

import RegisterMain from './components/Register/RegisterMain';
import MainApp from './MainApp'

import {
    requestCameraPermission,
    requestFineLocationPermission,
    requestPermissions
} from './permission/permission';

export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            userData: null
        }
        AsyncStorage.getItem('userData').then((value) => {
            this.setState({userData: value});
        });
        //requestPermissions();

    }
    render() {
      const register = <RegisterMain />;
      const mainApp = <MainApp />;

      return (this.state.userData ? mainApp : register);
      //return (mainApp);
      //return (register);
    }
}
