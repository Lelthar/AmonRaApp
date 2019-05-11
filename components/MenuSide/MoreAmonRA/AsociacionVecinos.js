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
const fiveRatio = PixelRatio.getPixelSizeForLayoutSize(5);
const sevenRatio = PixelRatio.getPixelSizeForLayoutSize(7);
const LoremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";


export default class AsociacionVecinos extends Component{

    constructor(props){
        super(props);
        // Se le pasa el controlador de la navegación a App.js
        // para controlar la navegación desde Navigator.js
        this.props.screenProps.getNavigationProp(this.props.navigation)
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
                      <Image style={styles.image} source={require('../../../images/Dir1.jpg')} />
                    </View>
                    <View style={styles.slide}>
                      <Image style={styles.image} source={require('../../../images/Dir2.jpg')} />
                    </View>
                    <View style={styles.slide}>
                      <Image style={styles.image} source={require('../../../images/Dir3.jpg')} />
                    </View>
                  </Swiper>

                  {/* Ends Swiper Flex 9*/}
                </View>

                {/* Content under swiper. Flex 14*/}
                  <View style={styles.contentUnderSwiper}>

                  <ScrollView contentContainerStyle={{flexGrow:1, margin: PixelRatio.getPixelSizeForLayoutSize(7),}}>

                    <Text style={styles.title}> Asociación para la conservación y desarrollo de Barrio Amón </Text>
                    <Text style={styles.text} > Breve reseña de la Asociación para la conservación y desarrollo de Barrio Amón </Text>

                    <Text style={styles.title}> Contactos </Text>
                    <Text style={styles.text}> {LoremIpsum} </Text>


                  {/* ENDS Content under swiper. Flex 14*/}
                  </ScrollView>

                  </View>

              {/* Ends body flex 23*/}
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
    textAlign: "justify",
    fontSize: 20,
    fontFamily: "Barlow-Regular",
    marginBottom: sevenRatio
  },
});

AppRegistry.registerComponent('AsociacionVecinos', () => Origin);
