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
} from 'react-native';
import Swiper from 'react-native-swiper';
const { width } = Dimensions.get('window');

export default class Experiences extends Component{

    constructor(props){
        super(props);
        // Se le pasa el controlador de la navegación a App.js
        // para controlar la navegación desde Navigator.js
        this.props.screenProps.getNavigationProp(this.props.navigation)
    }

    goTo(screen){
        var goToScreen = this.props.navigation.state.params.goToScreen
        goToScreen(screen, [])
    }

    render() {

      return (
          <View style={styles.container}>

          {/* Navigator uses flex 10. 1 up, 1 down, 8 body */}
             <View style={{flex:2}} />

              {/* Full body container. Flex 8. Hay 23 flexes en el full body */}
              <View style={styles.body}>

                  <View style={styles.contentUnderSwiper}>

                  <View style={{flex:1}}/>
                  <View style={styles.buttonsRow}>
                    <View style={{flex:2}}/>

                    <TouchableOpacity style={styles.squareButton} onPress={() => this.goTo('Literature')}  >
                        <Image style={styles.imageResizeAndFillParent} source={require('../../../images/icons/Vivencias/11.vivencias-02.png')} />
                    </TouchableOpacity>

                    <View style={{flex:1}}/>

                    <TouchableOpacity style={styles.squareButton} onPress={() =>  this.goTo('Narrations')} >
                        <Image style={styles.imageResizeAndFillParent}   source={require('../../../images/icons/Vivencias/11.vivencias-04.png')} />
                    </TouchableOpacity>

                    <View style={{flex:2}}/>

                  {/* Ends flex 5. Half 14*/}
                  {/* ,  borderWidth: 2, borderColor: '#000000'*/}
                  </View>

                  <View style={{flex:1}}/>
                  <View style={styles.buttonsRow}>
                    <View style={{flex:2}}/>

                    <TouchableOpacity style={styles.squareButton} onPress={() => this.goTo('Characters')} >
                        <Image style={styles.imageResizeAndFillParent} source={require('../../../images/icons/Vivencias/11.vivencias-06.png')} />
                    </TouchableOpacity>

                    <View style={{flex:1}}/>

                    <TouchableOpacity style={styles.squareButton} onPress={() =>  this.goTo('Activities')} >
                        <Image style={styles.imageResizeAndFillParent} source={require('../../../images/icons/Vivencias/11.vivencias-08.png')} />
                    </TouchableOpacity>

                    <View style={{flex:2}}/>

                  {/* Ends flex 5. Half 14*/}
                  </View>

                  <View style={{flex:1}}/>
                  <View style={styles.buttonsRow}>
                    <View style={{flex:2}}/>

                    <TouchableOpacity style={styles.squareButton} onPress={() => this.goTo('Houses')} >
                        <Image style={styles.imageResizeAndFillParent} source={require('../../../images/icons/Vivencias/11.vivencias-10.png')} />
                    </TouchableOpacity>

                    <View style={{flex:1}}/>

                    <TouchableOpacity style={styles.squareButton} onPress={() =>  this.goTo('Secrets')} >
                        <Image style={styles.imageResizeAndFillParent} source={require('../../../images/icons/Vivencias/11.vivencias-12.png')} />
                    </TouchableOpacity>

                    <View style={{flex:2}}/>

                  {/* Ends flex 5. Half 14*/}
                  </View>

                  <View style={{flex:2}}/>

                  {/* Ends flex 14*/}
                  </View>


              {/* Ends full body flex 8*/}
              </View>
              <View style={{flex:2}}/>


          </View>

      );
    }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  body:{
    flex:23
  },
  swiper:{
    flex: 9
  },
  contentUnderSwiper:{
    flex:14
  },
  buttonsRow:{
    flex:5,
    flexDirection: "row"
  },
  wrapper: {
  },
  squareButton:{
    flex:5
  },
  imageResizeAndFillParent: {
    flex: 1,
    width: null,
    height: null
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  image: {
    width,
    flex: 1
  }
});

AppRegistry.registerComponent('Experiences', () => Experiences);
