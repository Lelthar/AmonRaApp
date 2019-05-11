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
const fiveRatio = PixelRatio.getPixelSizeForLayoutSize(5);
const sevenRatio = PixelRatio.getPixelSizeForLayoutSize(7);
var amonData = require("../../../data/data.json");
import * as colors from '../../../data/colors'

export default class Architecture extends Component{

    constructor(props){
        super(props);
        // Se le pasa el controlador de la navegación a App.js
        // para controlar la navegación desde Navigator.js
        this.props.screenProps.getNavigationProp(this.props.navigation)
        this.state = {
          show:true,
          current:true
        }
    }

    goTo(screen, props){
      var goToScreen = this.props.navigation.state.params.goToScreen
      goToScreen(screen, props)
    }

  render() {

    return (
      <View style={styles.container}>
        <View  style={styles.barMargin}/>
          <View style={styles.body}>
          <FlatList
        				  data={amonData.features["Patrimonio Arquitectónico"]}
        				  numColumns={2}
                  contentContainerStyle={styles.list_style}
        				  renderItem={({item}) => (
        				    <TouchableHighlight style= {styles.list_item}
          					onPress={() => this.goTo('ArchitectureView', {architectureData:item.properties})}
          					>
                    <View style={styles.container}>
                      <Image source={ require('../../../images/Swiper/DEFAULT.jpg')} style={styles.image} />
                      <View>
                        <Text style={styles.list_text}>{item.properties.Name}</Text>
                      </View>
                    </View>
        					</TouchableHighlight>
        					)
                  }
       		/>
          </View>
        <View  style={styles.barMargin}/>
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
    width,
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
    height: null
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
  navigation_bar:{
    flexDirection:"row",
    flexGrow:0.05,
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
    backgroundColor:colors.DARK_TURQUOISE,
    color: 'white',
    width:"100%"
  },
  list_item:{
    flex:0.5,
    margin: 20,
    height: 140,
    backgroundColor:"#ffffff",
    flexDirection:"row",
    alignItems:'flex-end',
  },
  list_style: {
    flexGrow:0.5,
    width:"100%"
  },
  image:{
    flex: 1,
    flex: 1,
    width: null,
    height: null
  }
});
AppRegistry.registerComponent('Architecture', () => Architecture);
