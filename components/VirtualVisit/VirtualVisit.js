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
  	TouchableHighlight
} from 'react-native';
import Swiper from 'react-native-swiper';
const { width } = Dimensions.get('window');
const imageRatio = PixelRatio.getPixelSizeForLayoutSize(60);
const fiveRatio = PixelRatio.getPixelSizeForLayoutSize(5);
const sevenRatio = PixelRatio.getPixelSizeForLayoutSize(7);
var amonData = require("../../data/data.json");


const tabs = ["3D","360"];
//const elementHeight = PixelRatio.getPixelSizeForLayoutSize(3);
//const elementWidth = PixelRatio.getPixelSizeForLayoutSize(2);

//requires to repair state
export default class VirtualVisit extends Component{



    constructor(props){
        super(props);
        // Se le pasa el controlador de la navegación a App.js
        // para controlar la navegación desde Navigator.js
        this.props.screenProps.getNavigationProp(this.props.navigation)
        this.state = {
            "currentTab":"3D",
            current:true
        };
    this.handleClick = this.handleClick.bind(this);
    this.onNavBarClick = this.onNavBarClick.bind(this);
    this.open3dModel = this.open3dModel.bind(this);
		this.open360Image = this.open360Image.bind(this);
    this.goToScreen = this.props.navigation.state.params.goToScreen;
    this.navigation = this.props.navigation;
		//let keys = Object.keys(amonData);
    }

    handleClick(item) {
	   let name = item.properties.Name;
     if(this.state.currentTab == "3D"){
        this.open3dModel(name);
     }else{
        this.open360Image(name);
     }

    }

    open3dModel(modelName){
      this.goToScreen("Viromedia",{goToScreen : this.goToScreen, do : "3D", fileName : modelName,});
    }

    open360Image(imageName){
      this.goToScreen("Viromedia",{goToScreen : this.goToScreen, do : "VR", filename : imageName,});
    }

    onNavBarClick(keyname){
      this.setState({"currentTab" : keyname});
    }




    render() {
        let nabvarClickFunction =this.onNavBarClick;
        let currentTab = this.state.currentTab;
        let FlatListContent = currentTab == "3D" ? amonData.features["Patrimonio Arquitectónico"] : amonData.features["Fotografías 360"];
        return (
          <View style={styles.container}>
            <View  style={styles.barMargin}/>
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
        				<FlatList
        				  data={FlatListContent}
        				  numColumns={3}
                  keyExtractor={(item, index) => index}
                  contentContainerStyle={styles.list_style}
        				  renderItem={({item}) => (
        				    <TouchableHighlight style= {styles.list_item}
          					onPress={() => this.handleClick(item)}
          					>
          					<View >
                       <Image source={ require('../../images/Swiper/DEFAULT.jpg')} style={styles.imageResizeAndFillParent} />
          						<Text numberOfLines={1} style={styles.list_text}>{item.properties.Name}</Text>
          					</View>
        					</TouchableHighlight>
        					)
        				  }
        				/>


                </View>

            </View>
        );
    }
}

//change item withd when getting the image url
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#FFFFFF"
  },
  wrapper: {
  },
  body:{
    flex:23,
  },
  swiper:{
    flex: 9
  },
  barMargin:{
    flex:2
  },
  contentUnderSwiper:{
    flex:14
  },
  image: {
    resizeMode: "cover",
    flex: 1
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  imageResizeAndFillParent: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
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
  list_text:{
    backgroundColor:"#42bff4",
    fontFamily: "Barlow-Regular",
    alignSelf: "flex-end"
  },
  list_item:{
    height: imageRatio,
    width: "33.3%",
    padding: "3%",
    backgroundColor:"#ffffff",
    flexDirection:"row",
    alignItems:'flex-end',
  },
    navigation_bar:{
    flexDirection:"row",
    flexGrow:0.03

  },
  list_style: {
    flexGrow:0.97,
    marginLeft: "4%",
    marginRight: "4%",
    marginTop: "5%",
    width:"92%",
    justifyContent: "space-evenly",

  }
});
AppRegistry.registerComponent('VirtualVisit', () => VirtualVisit);
