import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    AppRegistry,
    Button,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    PixelRatio
} from 'react-native';
import Swiper from 'react-native-swiper';
const { width } = Dimensions.get('window')
const fiveRatio = PixelRatio.getPixelSizeForLayoutSize(5);
const sevenRatio = PixelRatio.getPixelSizeForLayoutSize(7);


export default class InfoAmon_RA extends Component{

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
                      <Image style={styles.image} source={require('../../../images/amon1.jpg')} />
                    </View>
                    <View style={styles.slide}>
                      <Image style={styles.image} source={require('../../../images/amon2.jpg')} />
                    </View>
                    <View style={styles.slide}>
                      <Image style={styles.image} source={require('../../../images/amon3.jpg')} />
                    </View>
                  </Swiper>

                  {/* Ends Swiper Flex 9*/}
                </View>

                {/* Content under swiper. Flex 14*/}
                  <View style={styles.contentUnderSwiper}>

                  <ScrollView contentContainerStyle={{flexGrow:1, margin: PixelRatio.getPixelSizeForLayoutSize(7),}}>

                    <Text style={styles.title}> Concepto paisaje urbano histórico de Barrio Amón </Text>
                    <Text style={styles.text} > Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp </Text>

                    <Text style={styles.title}> Créditos </Text>
                    <Text style={styles.text}> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp </Text>

                    <Text style={styles.title}> Contactos </Text>
                    <Text style={styles.text}> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp </Text>

                    <Text style={styles.title}> Lorem Ipsum </Text>
                    <Text style={styles.text}> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp </Text>

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
    fontSize: 20,
    textAlign: "justify",
    fontFamily: "Barlow-Regular",
    marginBottom: sevenRatio
  },
});

AppRegistry.registerComponent('Directory', () => Directory);
