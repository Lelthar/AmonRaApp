import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
  Button,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  PixelRatio,
  FlatList,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Swiper from 'react-native-swiper';
const { width } = Dimensions.get('window');
const imageRatio = PixelRatio.getPixelSizeForLayoutSize(60);
const fiveRatio = PixelRatio.getPixelSizeForLayoutSize(5);
const sevenRatio = PixelRatio.getPixelSizeForLayoutSize(7);

import { 
  FEATURES_URL,
  PERIMETER_URL,
  USER_DATA,
} from '../../../constants/constants';

import {
  makeBackendRequest,
} from '../../../helpers/helpers'

//Imports for redux

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

const HOUSES = [337,338,339,340,341,342,343];
const URL_360 = "?category=Fotos%20360°" ;
const URL_3D = "?category=Modelos%203D";

const mapStateToProps = state => {
  return {
    menuSideState: state.menuDataReducer.MENUSIDE
  }
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
  }
};

// End of redux imports

const tabs = ["3D","360"];
//const elementHeight = PixelRatio.getPixelSizeForLayoutSize(3);
//const elementWidth = PixelRatio.getPixelSizeForLayoutSize(2);

//requires to repair state
class VirtualVisit extends Component{

  constructor(props){
    super(props);
    // Se le pasa el controlador de la navegación a App.js
    // para controlar la navegación desde Navigator.js
    this.state = {
        "currentTab":"3D",
        current:true,
        markers: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.onNavBarClick = this.onNavBarClick.bind(this);
    this.open3dModel = this.open3dModel.bind(this);
    this.open360Image = this.open360Image.bind(this);
    this.navigation = this.props.navigation;
    //let keys = Object.keys(amonData);
  }

  async get_features(){
    
    let response3D = await makeBackendRequest(FEATURES_URL+URL_3D,"GET",this.state.userData);
    let responseJson3D = await response3D.json();
    
    const resultJson3D = responseJson3D.filter(element => {
      return HOUSES.indexOf(element.id) != -1;
    });

    let response360 = await makeBackendRequest(FEATURES_URL+URL_360,"GET",this.state.userData);
    let responseJson360 = await response360.json();

    this.setState({
      markers: [resultJson3D,responseJson360],
    });
  }

  async get_user_data() {
    const user_data_storage = await AsyncStorage.getItem(USER_DATA);
    this.setState({ userData: JSON.parse(user_data_storage)});
  }

  async get_backend_data() {
    await this.get_user_data()
    await this.get_features();
  }

  componentDidMount(){
    this.get_backend_data();
  }

  handleClick(item) {
    if(this.state.currentTab == "3D"){
      this.open3dModel(item.id);
    }else{
      this.open360Image(item.image1_url);
    }

  }

  open3dModel(modelId){
    this.props.navigation.navigate("ViromediaController",{do : "3D", filename : modelId,});
  }

  open360Image(imageName){
    this.props.navigation.navigate("ViromediaController",{do : "VR", filename : imageName,});
  }

  onNavBarClick(keyname){
    this.setState({"currentTab" : keyname});
  }


  render() {
    let nabvarClickFunction =this.onNavBarClick;
    let currentTab = this.state.currentTab;
    let FlatListContent = currentTab == "3D" ? this.state.markers[0] : this.state.markers[1];
    return (
      <View style={styles.container}>
          <View style={styles.body}>
            <View style={styles.navigation_bar}>
              {
                tabs.map(function(text, index){
                  return( <TouchableOpacity  key = {index}
                          style={text == currentTab ? styles.nav_button_selected : styles.nav_button}
                          onPress={function(){nabvarClickFunction(text)}}
                          >
                          <Text style={styles.white_text}>{text}</Text>
                          </TouchableOpacity>)
                })
              }
            </View>
            <FlatList style={{flex: 15}}
              data={FlatListContent}
              numColumns={3}
              keyExtractor={(item, index) => index}
              contentContainerStyle={styles.list_style}
              renderItem={({item}) => (
                <TouchableOpacity style= {styles.list_item}
                onPress={() => this.handleClick(item)}
                >
                <View style={{flex:1}}>
                      <Image source={{uri: item.miniature_image_url}} style={styles.imageResizeAndFillParent} />
                </View>
              </TouchableOpacity>
              )
              }
            />
            </View>
            {/*Start of hamburguer menu */}
            {this.props.menuSideState &&
              < HamburgerMenu navigation={this.props.navigation}/>
            }
        {/*End of hamburguer menu */}

        </View>
    );
  }
}

//change item withd when getting the image url
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#ffffff",
  },
  body:{
    flex:25,
  },
  imageResizeAndFillParent: {
    flex: 1,
    resizeMode: "stretch",
  },
  title:  	{
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Barlow-Regular",
    color: "#0C5B60",
    marginBottom: fiveRatio
  },
  text: {
    color: '#6D6F70',
    fontSize: 20,
    textAlign: "justify",
    fontFamily: "Barlow-Regular",
    marginBottom: sevenRatio
  },
  white_text:{
    color:"#FFFFFF",
    textAlign:"center",
    fontWeight: 'bold',
  },
  nav_button:{
    flex:1,
    backgroundColor:"#707070",
    justifyContent: 'center',
  },
  nav_button_selected:{
    flex:1,
    backgroundColor:"#42bff4",
    justifyContent: 'center',
  },
  navigation_bar:{
    height: "8%",
    flexDirection:"row",
    backgroundColor: "#000"
  },
  list_item:{
    height: imageRatio,
    width: "33.3%",
    padding: "2%",
    backgroundColor:"#ffffff",
  },
  list_style: {
    marginLeft: "4%",
    marginRight: "4%",
    paddingTop: "5%",
    width:"93%",
    justifyContent: "space-evenly",

  }
});

export default connect(mapStateToProps,mapDispatchToProps)(VirtualVisit);
