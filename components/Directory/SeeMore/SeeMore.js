import React, {Component} from 'react';
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

var {windowHeight, windowWidth} = Dimensions.get('window');

export default class SeeMore extends Component{

	constructor(props){
        super(props);
        // Se le pasa el controlador de la navegación a App.js
        // para controlar la navegación desde Navigator.js
        this.props.screenProps.getNavigationProp(this.props.navigation)

         this.state = {

          title: "",
          description: "",
          direction: "",
          phone_number: "",
          facebook: "",
          images_url: [],
    };
    }

componentDidMount(){

    this.setState({
      title: this.props.navigation.state.params.placeInfo.name , 
      description: this.props.navigation.state.params.placeInfo.description, 
      direction: this.props.navigation.state.params.placeInfo.direction ,
      phone_number: this.props.navigation.state.params.placeInfo.phone_number,
      facebook: this.props.navigation.state.params.placeInfo.facebook,
      images_url: [this.props.navigation.state.params.placeInfo.image1_url, 
                  this.props.navigation.state.params.placeInfo.image2_url, 
                  this.props.navigation.state.params.placeInfo.image3_url]
    });
  }

  render() {

    // Empieza prueba 

    var pic = {uri: this.state.images_url[0] } ; 
    var pic2 = {uri: this.state.images_url[1] } ; 
    var pic3 = {uri : this.state.images_url[2] } ; 

    return (

      <View style = {styles.container}>

          <View style = {styles.swiper}>

            <Swiper style = {styles.wrapper} loop>

              <View style={styles.slide}>
                <Image source = {pic} style = {styles.image} resizeMode='stretch' />
              </View>

            <View style={styles.slide}>
              <Image source = {pic2} style = {styles.image} resizeMode='stretch' />
            </View>

            <View style={styles.slide}>
              <Image source = {pic3} style = {styles.image} resizeMode='stretch' />
            </View>

          </Swiper>

        </View>

        <View style={ styles.information }>
            <Text style={styles.title} >{this.state.title}</Text>
            <Text style = {styles.description}> {this.state.description} </Text>
            <Text style = {styles.direction}>  Direccion: {this.state.direction } </Text> 
            <Text style = {styles.phone}> Telefono: {this.state.phone_number} </Text> 
            <Text style = {styles.facebook}> Facebook: {this.state.facebook} </Text>
            
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({

   nothing: {
   },

   information:{
    height: windowHeight
   },
	slide: {
    height:250,
    backgroundColor: 'transparent'
	},
  swiper:{
    height:250
  },
	image: {
		width: windowWidth,
		height: 250
	},
	
	title: {
		textAlign: "center", fontSize:20,
		fontFamily: "vincHand",
    color: "#0C5B60",
    marginTop: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center'
	},

	description: {
		textAlign: "center", fontSize:18,
		color: "#0C5B60",
    textAlign: 'left',
    marginLeft: 20,
    marginRight: 20
	},

  direction:{
    textAlign: "center", fontSize:15,
    color: "grey",
    marginLeft: 20, 
    marginRight: 50,
    marginTop: 50,
    textAlign: 'left'
  },

  phone:{
    textAlign: "center", fontSize: 15,
    color: "grey",
    marginLeft: 20, 
    marginRight: 20,
    textAlign: 'left'
    
  },
  facebook:{
    textAlign: "center", fontSize: 15,
    color: "grey",
    marginLeft: 20, 
    marginRight: 20,
    textAlign: 'left'
   
  },
  wrapper: {
  },

  container: {
    flex:1,
    backgroundColor: 'white',
  }

});



    AppRegistry.registerComponent('SeeMore', () => SeeMore);