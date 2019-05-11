import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    AppRegistry,
    Button,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native';



export default class Characters extends Component{

  constructor(props){
      super(props);
      // Se le pasa el controlador de la navegación a App.js
      // para controlar la navegación desde Navigator.js
      this.props.screenProps.getNavigationProp(this.props.navigation)
  }

    render() {

      return (
          <View style={styles.container}>

          <View style={{flex:0.3}} />

           <View style={{flex:0.3}}>
                  <Text style={styles.title} >Personajes</Text>
              </View>

              <View style={{flex:0.4}} />

          </View>

      );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title:  	{
      textAlign: "center",
      fontSize: 35,
      fontFamily: "vincHand",
      color: "#0C5B60"
    },
     name_place: {
       color: "#0C5B60",
       fontWeight: 'bold',
       fontSize: 16
     },
     text: {
       color:'grey',
       fontSize: 16
     }
});

AppRegistry.registerComponent('Characters', () => Characters);
