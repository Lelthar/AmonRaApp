import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    AppRegistry,
    Button,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    PixelRatio,
} from 'react-native';
import Swiper from 'react-native-swiper';
const { width } = Dimensions.get('window')
const sevenRatio = PixelRatio.getPixelSizeForLayoutSize(7);
import * as colors from '../../../data/colors'


export default class ArchitectureView extends Component{

  constructor(props){
    super(props);

    // Se le pasa el controlador de la navegación a App.js
    // para controlar la navegación desde Navigator.js
    this.state = {
      data:this.props.navigation.state.params.architectureData,
    };
    this.props.screenProps.getNavigationProp(this.props.navigation);
    /*Los datos del edificio vienen en this.props.navigation.state.params.architectureData */
    //alert(JSON.stringify(this.props.navigation.state.params.architectureData));
}

renderInfo(){
  var info = this.state.data["Más Información"];
  var keys = Object.keys(info);
  var objects=[];
  for (var key of keys){
    objects.push(  <Text style={styles.title}> {key} </Text> );
    if (typeof info[key] == 'string'){
      objects.push(<Text style={styles.text}> {info[key]} </Text>);
    }else{
      for (var paragraph of info[key]){
        objects.push(<Text style={styles.text}> {paragraph} </Text>);
      }
    }
  }
  return objects;
}


render() {

    return (
      <View style={styles.container}>

      {/* Navigator uses flex 10. 1 up, 1 down, 8 body */}
         <View style={styles.barMargin} />

          {/* Full body container.  Hay 23 flexes en el full body */}
          <View style={styles.body}>

            {/* Swiper Flex 9*/}
            <View style={styles.swiper}>

              <Swiper style={styles.wrapper}  loop>
                <View style={styles.slide}>
                  <Image style={styles.image} source={require('../../../images/Swiper/CASAVERDE/CASAVERDEI.jpg')} />
                </View>
                <View style={styles.slide}>
                  <Image style={styles.image} source={require('../../../images/Swiper/CASAVERDE/CASAVERDEII.jpg')} />
                </View>
              </Swiper>

              {/* Ends Swiper Flex 9*/}
            </View>

            {/* Content under swiper. Flex 14*/}
              <View style={styles.contentUnderSwiper}>

                <ScrollView contentContainerStyle={styles.scroll}>
                  <Text style={styles.title}> {this.state.data["Name"]} </Text>
                  <Text style={styles.text}> {this.state.data["Descripción"]} </Text>

                  {this.renderInfo()}

                {/* ENDS Content under swiper. Flex 14*/}
                </ScrollView>
              </View>

              {/* Ends body flex 23*/}
          </View>
              <View style={styles.contentButtons}>
                <TouchableOpacity style={styles.button}>
                  <Image style={styles.squareButton}  source={require('../../../images/icons/RA/ficha-tecnica.png') }
                  />
                </TouchableOpacity>

                <View style={{flex:2}}/>

                <TouchableOpacity style={styles.button}>
                    <Image style={styles.squareButton}  source={require('../../../images/icons/RA/vivenciass.png') }
                    />
                </TouchableOpacity>
              </View>
          <View style={styles.barMargin} />

     </View>

    );
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1
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
    flex:1
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

  text: {
    color: 'black',
    fontSize: 18,
    fontFamily: "Barlow-Regular",
    marginBottom: sevenRatio
  },
  title: {
    color: colors.DARK_TURQUOISE,
    textAlign: "center",
    fontSize: 35,
    fontFamily: "Barlow-Regular",
    marginBottom: sevenRatio
  },
  contentButtons:{
    flexDirection:"row",
    flex:1
  },
  button: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
  },
  squareButton: {
    resizeMode:'center',
    width: null,
    height: null
  },
  scroll:{
    flexGrow:1,
    margin: sevenRatio
  },
});

AppRegistry.registerComponent('ArchitectureView', () => ArchitectureView);
