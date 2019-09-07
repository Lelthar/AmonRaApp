import React, { Component } from 'react';
import { View, 
				 Text, 
				 AppRegistry,
				 Image ,
				 ScrollView,
				 StyleSheet,
				 Dimensions,
				} from 'react-native';

import Swiper from 'react-native-swiper';
const { width } = Dimensions.get('window');

export default class Place extends Component  {
  constructor(props){
    super(props);
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
		const marker = this.props.navigation.state.params.marker;

    this.setState({
    	title: marker.title,
    	description: marker.description,
    	direction: marker.direction,
    	phone_number: marker.tel,
    	facebook: marker.facebook,
    	images_url: marker.images_url
    });
  }

  //this.props.navigation.state.params.place_id
  render() {
    return (
      <View style={styles.container}>
      	<ScrollView
			    contentContainerStyle={{
			      flexGrow: 1,
			      justifyContent: 'space-between'
			  }}>
				  <View style={{height:45}} />
				  <Swiper style={styles.wrapper} loop>
		          <View style={styles.slide}>
		            <Image resizeMode='stretch' style={styles.image} source={{uri: this.state.images_url[0]}} />
		          </View>
		          <View style={styles.slide}>
		            <Image resizeMode='stretch' style={styles.image} source={{uri: this.state.images_url[1]}} />
		          </View>
		          <View style={styles.slide}>
		            <Image resizeMode='stretch' style={styles.image} source={{uri: this.state.images_url[2]}} />
		          </View>
		        </Swiper>
		        <Text style={styles.title}>{this.state.title}</Text>
		    			<Text style={styles.description}>{this.state.description}</Text>
		    			<View style={styles.inferiorPart}>
			    			<Text style={styles.informationText}>Dirección: {this.state.direction}</Text>
			    			<Text style={styles.informationText}>Teléfono: {this.state.phone_number}</Text>
			    			<Text style={styles.informationText}>Facebook: {this.state.facebook}</Text>
		    			</View>
		    	<View style={{height:85}} />
			  </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    width,
    /*flex: 1,*/
    height: 200
  },
  wrapper: {
  	height: 200
  },
  body:{
  	flex:2,
  },
  title: {
  	fontFamily: 'Barlow-Regular',
  	fontSize: 26,
  	textAlign: 'center',
  	color:'rgb(0,162,181)',
  	marginTop:10,
  },
  description: {
  	fontFamily: 'Barlow-Regular',
  	fontSize: 18,
  	/*color:'rgb(0,162,181)',*/
  	marginTop:15,
  	marginLeft:25,
  	marginRight:25,
  },
  inferiorPart: {
  	marginTop:30,
  	marginBottom:10
  },
  informationText: {
  	fontFamily: 'Barlow-Regular',
  	fontSize: 18,
  	textAlign: 'center',
  }

});

AppRegistry.registerComponent('Place', () => Place);