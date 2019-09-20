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
  	TouchableHighlight,
    AsyncStorage
} from 'react-native';

import Swiper from 'react-native-swiper';
const { width } = Dimensions.get('window');
const imageRatio = PixelRatio.getPixelSizeForLayoutSize(60);
const fiveRatio = PixelRatio.getPixelSizeForLayoutSize(5);
const sevenRatio = PixelRatio.getPixelSizeForLayoutSize(7);

import { 
  FEATURES_URL,
  PERIMETER_URL,
  USER_DATA,
} from '../../constants/constants';

import {
  makeBackendRequest,
} from '../../helpers/helpers'

//Imports for redux

import { connect } from "react-redux";

import {
  filterMenuAction,
  activeFiltersAction,
  menuSideAction,
  rateScreenAction,
  guideScreenAction,
  menuResetAction,
} from "../../src/redux/actions/menuDataActions";

import HamburgerMenu from '../../src/components/partials/HamburgerMenu';

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
      
      let url3D = "?category=Cultura%20y%20arte" ; 
      let response3D = await makeBackendRequest(FEATURES_URL+url3D,"GET",this.state.userData);
      let responseJson3D = await response3D.json();

      let url360 = "?category=Fotos%20360°" ; 
      let response360 = await makeBackendRequest(FEATURES_URL+url360,"GET",this.state.userData);
      let responseJson360 = await response360.json();

      this.setState({
        markers: [responseJson3D,responseJson360],
      });


      //console.log(this.state.markers);
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
     let name = item.image1_url;
     if(this.state.currentTab == "3D"){
        this.open3dModel(name);
     }else{
        this.open360Image(name);
     }

    }

    open3dModel(modelName){
      this.props.navigation.navigate("ViromediaController",{goToScreen : this.goToScreen, do : "3D", fileName : modelName,});
    }

    open360Image(imageName){
      this.props.navigation.navigate("ViromediaController",{goToScreen : this.goToScreen, do : "VR", filename : imageName,});
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
        				    <TouchableHighlight style= {styles.list_item}
          					onPress={() => this.handleClick(item)}
          					>
          				  <View style={{flex:1}}>
                          <Image source={{uri: item.miniature_image_url}} style={styles.imageResizeAndFillParent} />
          					</View>
        					</TouchableHighlight>
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
