import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import RegisterMain from './src/components/pages/RegisterMain';
import MainApp from './MainApp';
import AsyncStorage from '@react-native-community/async-storage';
import { 
  USER_DATA,
} from './constants/routesAPI';


export default class App extends Component<Props> {
    constructor(props) {
        super(props);

        this.state = {
            userData: null,
        }
        
        AsyncStorage.getItem(USER_DATA).then((value) => {
            this.setState({userData: value});
        });

    }

    componentDidMount() {
        setTimeout(() => {SplashScreen.hide()}, 3000);
    }

    render() {
        const register = <RegisterMain />;
        const mainApp = <MainApp />;
        
        return (this.state.userData ? mainApp : register);
    }
}
