import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    Dimensions,
    StatusBar,
    BackHandler,
} from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import Image from 'react-native-scalable-image'

import MenuSide from '../MenuSide/MenuSide';
import UseGuide from '../UseGuide/UseGuide';
import RateApp from '../RateApp/RateApp';
//import AugmentedReality from '../Unity/AugmentedReality';


const window_height = Dimensions.get('window').height - 120
const white = "rgba(255, 255, 255, 0.7)";
const turquoise =  "rgb(0,162,181)";
var didBlurSubscription;

const timeLineIconURL = '../../images/icons/PantallaPrincipal/linea_del_tiempo';
const RAIconURL = '../../images/icons/PantallaPrincipal/RA' ;
const virtualVisit = '../../images/icons/PantallaPrincipal/visita_virtual' ;
const directoryIconURL = '../../images/icons/PantallaPrincipal/oferta_urbana';
const mapsIconURL = '../../images/icons/PantallaPrincipal/puntos_de_interes';
const png = '.png';

export default class Navigator extends Component {

    //Please don't change the order of any of the lists.
    constructor (props) {
        super(props);
        this.state = {
            filterMenu: this.props.screenProps.showProps.filterMenu,
            menuSide: this.props.screenProps.showProps.menuSide,
            rateScreen: this.props.screenProps.showProps.rateScreen,
            guideScreen: this.props.screenProps.showProps.guideScreen,
            first: this.props.screenProps.showProps.first,
            orientationMS: "LEFT",
            navigation: null,
            color:false,
            currentScreenTitle: "",
            barsColor: white,
            colorScreens: [
                "Directory", 
                "CultureArt", 
                "Institutional",
                "Hotels", 
                "Gastronomy", 
                "Experiences",
                "Architecture", 
                "MoreAmonRA", 
                "Origin",
                "InfoAmon_RA", 
                "AsociacionVecinos",
                "Activities", 
                "Characters", 
                "Houses",
                "Literature", 
                "Narrations", 
                "Secrets", 
                "ArchitectureView",
                "Place",
            ],
            colorScreensSpanish: [
              "Oferta Urbana", 
              "Cultura y Arte", 
              "Institucional",
              "Hoteles", 
              "Gastronomía", 
              "Vivencias",
              "Arquitectura", 
              "Más de Amón_RA", 
              "Origen del Barrio",
              "Proyecto Amón_RA", 
              "Asociación de Vecinos",
              "Actividades", 
              "Personajes", 
              "Casas",
              "Literatura", 
              "Narraciones", 
              "Secretos", 
              "Arquitectura",
              "Oferta Urbana" //Se debe de cambiar
            ],
            directoryScreens: [],
            screensRecord: ['MapScreen'],
            datosColorScreens: {
            	Directory: "Oferta Urbana",
            	CultureArt: "Cultura y Arte",
            	Institutional: "Institucional",
            	Hotels: "Hoteles",
            	Gastronomy: "Gastronomía", 
              Experiences: "Vivencias",
              Architecture: "Arquitectura", 
              MoreAmonRA: "Más de Amón_RA", 
              Origin: "Origen del Barrio",
              InfoAmon_RA: "Proyecto Amón_RA", 
              AsociacionVecinos: "Asociación de Vecinos",
              Activities: "Actividades", 
              Characters: "Personajes", 
              Houses: "Casas",
              Literature: "Literatura", 
              Narrations: "Narraciones", 
              Secrets: "Secretos", 
              ArchitectureView: "Arquitectura",
              Place: "Place",
            }
        }

        this.makeAnAction = this.makeAnAction.bind(this);
        this.goToScreen = this.goToScreen.bind(this);
        this._hideVideo = this._hideVideo.bind(this);
        this.pushScreenToStack = this.pushScreenToStack.bind(this);
        this.popScreenFromStack = this.popScreenFromStack.bind(this);

        this.toggleFilters = this.props.screenProps.showFunctions.toggleFilters;
        this.toggleMenuSide = this.props.screenProps.showFunctions.toggleMenuSide;
        this.toggleShowGuide = this.props.screenProps.showFunctions.toggleShowGuide;
        this.toggleRateScreen = this.props.screenProps.showFunctions.toggleRateScreen;

        this.setFirstFalse = this.props.screenProps.showFunctions.setFirstFalse;
        this.resetAll = this.props.screenProps.showFunctions.resetAll;
        this.updateNavigationToScreen = this.props.screenProps.updateNavigationToScreen;

        BackHandler.addEventListener('hardwareBackPress', () => {

          if (this.state.guideScreen){
            this.toggleShowGuide();
            return true;
          }

          if (this.state.screensRecord.length > 1){
            this.goBack();
            return true;
          }
          else {
            BackHandler.exitApp();
            return false;
          }
         });
    }

    static getDerivedStateFromProps(props, state){
      state.filterMenu = props.screenProps.showProps.filterMenu;
      state.menuSide = props.screenProps.showProps.menuSide;
      state.rateScreen = props.screenProps.showProps.rateScreen;
      state.guideScreen = props.screenProps.showProps.guideScreen;
      state.first = props.screenProps.showProps.first;
      return state;
    }

    componentDidMount(){
    	this.updateNavigationToScreen(this.goToScreen);
    }

    setColor(screen){
      if (this.state.datosColorScreens[screen] !== undefined){
          this.setState({color: true});
      } else {
          this.setState({color: false});
      }
    }

    pushScreenToStack(screen){
      let visitedScreens = this.state.screensRecord.slice();
      visitedScreens.push(screen);
      this.setState({
          screensRecord: visitedScreens
      });
    }

    popScreenFromStack(){
      let visitedScreens = this.state.screensRecord.slice();
      visitedScreens.pop();
      this.setState({
          screensRecord: visitedScreens
      });
      let willReturn = visitedScreens.slice().pop();
      return willReturn;
    }

    goToScreen(screen, params){
      this.resetAll();
      this.setColor(screen);
      this.props.navigation.navigate(screen,params);
      this.pushScreenToStack(screen);
      this.setCurrentScreenTitle(screen,params);
    }

    setCurrentScreenTitle(screen,params){
      let correctName = "";

      if (screen === "Place") {
      	correctName = params["title"]; 
      } else {
      	correctName = this.state.datosColorScreens[screen]
      }
      this.setState({currentScreenTitle: correctName});
    }


    goBack(){
      this.resetAll();
       //console.debug("RADEBUG: current routeName: " + this.props.navigation.state.routeName);
       let result = this.props.navigation.pop();
       let goingTo = this.popScreenFromStack();
       if (result) {
         console.debug("RADEBUG: POP true. Should be going to " + goingTo);
         this.setColor(goingTo);
         this.setCurrentScreenTitle(goingTo);

       } else {
         this.setColor(this.state.screensRecord.slice(-1).pop());
         this.setCurrentScreenTitle(this.state.screensRecord.slice(-1).pop());
         console.debug("RADEBUG: POP false. Stack:" + JSON.stringify(this.state.screensRecord));
       }
    }

    makeAnAction(message){
        if (message.action === "send"){
            Alert.alert(
                "Su comentario ha sido recibido, gracias por su apoyo!"
            )
        }
        this.toggleRateScreen();
    }

    isNecessaryToShowGuide(){
      return this.state.first || this.state.guideScreen;
    }

    _hideVideo(){
      if (this.state.first){
        this.setFirstFalse();
      }
      if (this.state.guideScreen){
        this.toggleShowGuide();
      }
    }

    render() {
      const lastScreen = this.state.screensRecord.slice(-1).pop();
        return (

            <View style={styles.container}>
            <StatusBar
               barStyle="dark-content"
               translucent = {false}
             />
                      {this.state.color  &&
                        <View style={styles.headerBarColor}>

                          <TouchableOpacity style={ styles.button } onPress={() => this.goBack()} >
                              <Image  style={styles.squareButton} source={require('../../images/icons/PantallaPrincipal/atras.png')} />
                          </TouchableOpacity>

                          <View style={styles.headerTextContainer}>
                            <Text style={styles.headerText}> {this.state.currentScreenTitle} </Text>
                          </View>

                          <TouchableOpacity style={ styles.button } onPress={() => this.toggleMenuSide()} >
                              <Image  style={styles.squareButton} source={require('../../images/icons/PantallaPrincipal/menu_hamburguesa_gris.png')} />
                          </TouchableOpacity>
                        </View>
                      }

                      {!this.state.color  &&
                        <View style={styles.headerBar}>
                        <View style={{flex:4}}/>
                          <TouchableOpacity style={styles.button} onPress={() => this.toggleMenuSide()} >
                            <Image style={styles.squareButton} source={require('../../images/icons/PantallaPrincipal/menu_hamburguesa_gris.png')} />
                          </TouchableOpacity>
                        </View>
                      }


                <View style={styles.navbar, styles.body}>

                  {this.state.menuSide &&
                      <MenuSide goToScreen={this.goToScreen} order={this.state.color} toggleShowGuide={this.toggleShowGuide}/>
                  }                   
                </View>

                {!this.state.color  &&
                 <View style={styles.footerBar}>
                   <View style={styles.footerBarRow}>

                      <TouchableOpacity style={styles.button} onPress={() => this.goToScreen("MapScreen",{goToScreen: this.goToScreen,activeFilters: this.state.activeFilters, resetAll: this.resetAll})}>
                        <Image style={styles.squareButton}  source={lastScreen === "MapScreen" ?
                                                                         require(mapsIconURL + png) :
                                                                         require(mapsIconURL + "_gris" + png) }
                       />
                     </TouchableOpacity>

                     <TouchableOpacity style={styles.button} onPress={() => this.goToScreen("Viromedia", {goToScreen: this.goToScreen, do: "AR"})} >
                       <Image style={styles.squareButton}  source={lastScreen === "Viromedia" ?
                                                                         require(RAIconURL + png) :
                                                                         require(RAIconURL + "_gris" + png) }
                       />
                     </TouchableOpacity>

                     <TouchableOpacity style={styles.button} onPress={() => this.goToScreen("VirtualVisit", {goToScreen: this.goToScreen})}>
                       <Image style={styles.squareButton}  source={lastScreen === "VirtualVisit" ?
                                                                         require(virtualVisit + png) :
                                                                         require(virtualVisit + "_gris" + png) }
                       />

                     </TouchableOpacity>

                     <TouchableOpacity style={styles.button} onPress={() => this.goToScreen("Directory", {goToScreen: this.goToScreen})}>
                       <Image style={styles.squareButton} source={this.state.colorScreens.slice(0,5).includes(lastScreen) ?
                                                                         require(directoryIconURL + png) :
                                                                         require(directoryIconURL + "_gris" + png) }
                       />
                     </TouchableOpacity>

                     <TouchableOpacity style={styles.button} onPress={() => this.goToScreen("TimeLine")}>
                       <Image style={styles.squareButton}  source={lastScreen === "TimeLine" ?
                                                                         require(timeLineIconURL + png) :
                                                                         require(timeLineIconURL + "_gris" + png) }
                       />
                     </TouchableOpacity>

                   </View>
                 </View>
                }

                   {this.state.color  &&
                    <View style={styles.footerBarColor}>
                      <View style={styles.footerBarRow}>

                        <TouchableOpacity style={styles.button} onPress={() => this.goToScreen("MapScreen",{goToScreen: this.goToScreen,activeFilters: this.state.activeFilters, resetAll: this.resetAll})}>
                          <Image style={styles.squareButton}  source={lastScreen === "MapScreen" ?
                                                                            require(mapsIconURL + "_blanco"+ png) :
                                                                            require(mapsIconURL + "_turquesa" + png) }
                          />
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.button} onPress={() => this.goToScreen("Viromedia", {goToScreen: this.goToScreen, do: "AR"})} >
                          <Image style={styles.squareButton}  source={lastScreen === "Viromedia" ?
                                                                            require(RAIconURL + "_blanco"+ png) :
                                                                            require(RAIconURL + "_turquesa" + png) }
                          />
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.button} onPress={() => this.goToScreen("VirtualVisit", {goToScreen: this.goToScreen})}>
                          <Image style={styles.squareButton}  source={lastScreen === "3d" ?
                                                                            require(virtualVisit + "_blanco"+png) :
                                                                            require(virtualVisit + "_turquesa" + png) }
                          />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => this.goToScreen("Directory", {goToScreen: this.goToScreen})}>
                          <Image style={styles.squareButton} source={this.state.colorScreens.slice(0,5).includes(lastScreen) ?
                                                                            require(directoryIconURL + "_blanco"+png) :
                                                                            require(directoryIconURL + "_turquesa" + png) }
                          />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => this.goToScreen("TimeLine")}>
                          <Image style={styles.squareButton}  source={lastScreen === "TimeLine" ?
                                                                            require(timeLineIconURL + "_blanco"+ png) :
                                                                            require(timeLineIconURL + "_turquesa" + png) }
                          />
                        </TouchableOpacity>

                      </View>
                    </View>
                  }

                {this.state.rateScreen &&
                    <RateApp makeAnAction={this.makeAnAction}/>
                }

                {this.isNecessaryToShowGuide() &&
                    <UseGuide hideVideo={this._hideVideo}/>
                }

            </View>
        );
    }
}


const styles = StyleSheet.create ({
    container: {
      flex: 1
    },

    navbar:{
      flex:1
    },

    body:{
      flex:23,
      flexDirection: 'column'
    },

    footerBar:{
      flex:2,
      width: Dimensions.get('window').width,
      backgroundColor: 'rgba(255, 255, 255, 0.7)'
    },

    footerBarColor:{
      flex:2,
      flexDirection: "column",
      width: Dimensions.get('window').width,
      backgroundColor: '#00A2B5',
      justifyContent:'center',
      alignItems:'center'
    },

    headerBar:{
      flex: 2.7,
      flexDirection: "row",
      backgroundColor: 'rgba(255, 255, 255, 0.7)'
    },

    headerBarColor:{
      flex:2.7,
      flexDirection: "row",
      backgroundColor: 'rgb(0,162,181)'
    },

    headerText:{
      color: '#FFFFFF',
      fontFamily: 'Barlow-Regular',
      fontSize: 26,
    },

    button: {
      flex: 1,
      justifyContent:'center',
      alignItems:'center',
    },

    headerTextContainer:{
      flex: 3,
      justifyContent: 'center',
      alignItems: 'center'
    },

    capasMenu:{
      backgroundColor: 'white',
      flex:1,

    },

    squareButton: {
      resizeMode:'center',
      width: null,
      height: null,
    },

    footerBarRow:{
      flexDirection:"row",
      flex:1
    }

});

AppRegistry.registerComponent('Navigator', () => Navigator);
