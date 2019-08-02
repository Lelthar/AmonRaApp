
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';

import Orientation from 'react-native-orientation';
import {
    StackNavigator
} from 'react-navigation';

import Navigator from './components/Navigator/Navigator'
import Map from './components/Map/Map'
import Directory from './components/Directory/Directory';
import SeeMore from './components/Directory/SeeMore/SeeMore';
import CultureArt from './components/Directory/CultureArt/CultureArt';
import Hotels from './components/Directory/Hotels/Hotels';
import Institutional from './components/Directory/Institutional/Institutional';
import Gastronomy from './components/Directory/Gastronomy/Gastronomy';
import Origin from './components/MenuSide/Origin/Origin';
import Experiences from './components/MenuSide/Experiences/Experiences';
import Architecture from './components/MenuSide/Architecture/Architecture';
import ArchitectureView from './components/MenuSide/Architecture/ArchitectureView';
import TimeLine from './components/TimeLine/TimeLine';
import MoreAmonRA from './components/MenuSide/MoreAmonRA/MoreAmonRA';
import InfoAmon_RA from './components/MenuSide/MoreAmonRA/InfoAmon_RA';
import AsociacionVecinos from './components/MenuSide/MoreAmonRA/AsociacionVecinos';
import Activities from './components/MenuSide/Experiences/Activities/Activities';
import Characters from './components/MenuSide/Experiences/Characters/Characters';
import Houses from './components/MenuSide/Experiences/Houses/Houses';
import Literature from './components/MenuSide/Experiences/Literature/Literature';
import Narrations from './components/MenuSide/Experiences/Narrations/Narrations';
import VirtualVisit from './components/VirtualVisit/VirtualVisit';
import Secrets from './components/MenuSide/Experiences/Secrets/Secrets';
import Place from './components/Map/Place/Place';
import ViromediaController from './components/Viromedia/ViromediaController';
//import LocationLoader from './components/LocationLoaderView/LocationLoader';


const navigationOptions = {
    title: 'Home',
    headerMode: 'none'
}

const RootStack = StackNavigator(
    {
        MapScreen: {
            screen: Map
        },
        Directory:{
            screen: Directory
        },
        CultureArt:{ //Directory CultureArt
            screen: CultureArt
        },
        Institutional:{ //Directory Institutional
            screen: Institutional
        },
        Hotels:{ //Directory Hotels
            screen: Hotels
        },
        Gastronomy:{ //Directory Gastronomy
            screen: Gastronomy
        },
        TimeLine:{
            screen: TimeLine
        },
        Origin: {
            screen: Origin
        },
        Experiences: {
            screen: Experiences
        },
        Architecture: {
            screen: Architecture
        },
        ArchitectureView: {
            screen: ArchitectureView
        },
        MoreAmonRA: {
            screen: MoreAmonRA
        },
        InfoAmon_RA:{
            screen: InfoAmon_RA
        },
        AsociacionVecinos:{
            screen: AsociacionVecinos
        },
        Activities:{
            screen: Activities
        },
        Characters:{
            screen: Characters
        },
        Houses:{
            screen: Houses
        },
        Literature:{
            screen: Literature
        },
        Narrations:{
            screen: Narrations
        },
        Secrets:{
            screen: Secrets
        },
        Place:{
            screen: Place
        },
        VirtualVisit:{
            screen: VirtualVisit
        },
        Viromedia:{
            screen: ViromediaController
        },
        SeeMore: {
            screen: SeeMore
        }

    },
    navigationOptions
);

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

    componentWillMount(){
        const initial = Orientation.getInitialOrientation();

        if (initial === 'PORTRAIT') {
            console.log("Celular inicio en PORTRAIT")
        } else {
            console.log("Celular inicio en LANDSCAPE")
        }

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

    componentDidMount(){
        // this locks the view to Portrait Mode
        Orientation.lockToPortrait();

        // this locks the view to Landscape Mode
        //Orientation.lockToLandscape();

        // this unlocks any previous locks to all Orientations
        // Orientation.unlockAllOrientations();

        Orientation.addOrientationListener(this._orientationDidChange);
    }

    _orientationDidChange = (orientation) => {
        if (orientation === 'LANDSCAPE') {
            console.log("Cambio la orientacion a LADSCAPE")
            width=Dimensions.get('window').width;
        } else {
            console.log("Cambio la orientacion a PORTRAIT")
            width=Dimensions.get('window').width;
        }

        this.setState({
          width:width
        });
    }

    componentWillUnmount() {
        Orientation.getOrientation((err, orientation) => {
            console.log(`Current Device Orientation: ${orientation}`);
        });

        // Remember to remove listener
        Orientation.removeOrientationListener(this._orientationDidChange);
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

        navigatorMethod:this.state.navigatorMethod,
        updateNavigationToScreen: this.updateNavigationToScreen.bind(this),
      }
        return (
            /*<View style={styles.container}>


                <View style={{position: 'absolute', width: this.state.width, height: this.state.height}}>
                    <RootStack
                        screenProps={screenProps}
                        params={this.state}/>
                </View>

                <Navigator screenProps={screenProps} navigation={this.state.navigation} />

            </View>*/
            <View>

            </View>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    screenStyle: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
});
