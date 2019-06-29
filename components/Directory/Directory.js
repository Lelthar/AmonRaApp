import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    AppRegistry,
    Button,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import Swiper from 'react-native-swiper';
import firebase from 'react-native-firebase';

const { width } = Dimensions.get('window').width

export default class Directory extends Component{

    constructor(props){
        super(props);
        // Se le pasa el controlador de la navegación a App.js
        // para controlar la navegación desde Navigator.js
        this.props.screenProps.getNavigationProp(this.props.navigation)
    }


    goTo(screen,params){
        var goToScreen = this.props.navigation.state.params.goToScreen
        goToScreen(screen,params)
    }


    pruebaFirebase(){

      var storageRef = firebase.storage().ref('ImageTest/prueba.png');
                        storageRef.getDownloadURL().then(function(url) {

                          console.log("Correcto")
                          console.log(url);

                        }, function(error){

                          console.log("Error");
                          console.log(error);
                        });


    }
    render() {

        return (

            <View style={styles.container}>
            {/* Navigator uses flex 10. 1 up, 1 down, 8 body */}
               <View style={{flex:2}} />

                {/* Full body container. Flex 8. Hay 23 flexes en el full body */}
                <View style={styles.body}>

                  {/* Swiper Flex 9*/}
                  <View style={styles.swiper}>

                    <Swiper style={styles.wrapper}  loop>

                      <View style={styles.slide}>
                        <Image style={styles.image} source={require('../../images/Swiper/ALIANZA/ALIANZAI.png')} />
                      </View>

                      <View style={styles.slide}>
                        <Image resizeMode='stretch' style={styles.image} source={require('../../images/Swiper/RESTAURANTESILVESTRE/RESTAURANTESILVESTREI.png')} />
                      </View>

                      <View style={styles.slide}>
                        <Image resizeMode='stretch' style={styles.image} source={require('../../images/Swiper/HOTELDONCARLOS/HOTELDONCARLOSI.png')} />
                      </View>

                      <View style={styles.slide}>
                        <Image resizeMode='stretch' style={styles.image} source={require('../../images/Swiper/TECNOLOGICO/TECNOLOGICO.png')} />
                      </View>
                      
                    </Swiper>

                    {/* Ends Swiper Flex 9*/}
                  </View>



                    <View style={styles.contentUnderSwiper}>

                    <View style={{flex:1}}/>
                    <View style={styles.buttonsRow}>
                      <View style={{flex:2}}/>

                      
                      <TouchableOpacity style={styles.squareButton} onPress={() =>  this.goTo('CultureArt', {goToScreen: this.props.navigation.state.params.goToScreen} )} >
                          <Image style={styles.imageResizeAndFillParent} source={require('../../images/icons/Directory/culturagris.png')} />
                      </TouchableOpacity>
                    

                      <View style={{flex:1}}/>

                      <TouchableOpacity style={styles.squareButton} onPress={ () => this.goTo('Gastronomy', {goToScreen: this.props.navigation.state.params.goToScreen} )}>

                          <Image style={styles.imageResizeAndFillParent} source={require('../../images/icons/Directory/gastrogris.png')} />
                      </TouchableOpacity>

         

                      <View style={{flex:2}}/>



                    {/* Ends flex 5. Half 14*/}
                    {/* ,  borderWidth: 2, borderColor: '#000000'*/}
                    </View>
                    <View style={{flex:1}}/>

                    <View style={styles.buttonsRow}>
                      <View style={{flex:2}}/>

                      <TouchableOpacity style={styles.squareButton} onPress={() => this.goTo('Hotels', {goToScreen: this.props.navigation.state.params.goToScreen}) } >
                          <Image style={styles.imageResizeAndFillParent} source={require('../../images/icons/Directory/hospedajegris.png')} />
                      </TouchableOpacity>

                      <View style={{flex:1}}/>

                      <TouchableOpacity style={styles.squareButton} onPress={() =>  this.goTo('Institutional', {goToScreen: this.props.navigation.state.params.goToScreen })} >
                          <Image style={styles.imageResizeAndFillParent} source={require('../../images/icons/Directory/instigris.png')} />
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

AppRegistry.registerComponent('Directory', () => Directory);
