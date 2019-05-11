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
            hasUserRegistered: null
        }
        AsyncStorage.getItem('hasUserRegistered').then((value) => {
            this.setState({hasUserRegistered: value});
        });
        //requestPermissions();

    }
    render() {
      const register = <RegisterMain />;
      const mainApp = <MainApp />;

      //return (this.state.hasUserRegistered ? mainApp : register)
      return (mainApp);
      //return (register);
    }
}
