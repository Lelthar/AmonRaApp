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



export default class Institutional extends Component{

  constructor(props){
      super(props);
      // Se le pasa el controlador de la navegación a App.js
      // para controlar la navegación desde Navigator.js
      this.props.screenProps.getNavigationProp(this.props.navigation)
  }

  state = {
      places: [
         {'name': 'Invu', 'direction': 'dir 1', 'number': 'num 1','facebook': 'face 1' },
         {'name': 'Número 2', 'direction': 'dir 2', 'number': 'num 2','facebook': 'face 2' },
         {'name': 'Número 3', 'direction': 'dir 3', 'number': 'num 3','facebook': 'face 3' },
         {'name': 'Número 4', 'direction': 'dir 4', 'number': 'num 4','facebook': 'face 4'},
         {'name': 'Número 5', 'direction': 'dir 5', 'number': 'num 5','facebook': 'face 5'},
         {'name': 'Número 6', 'direction': 'dir 6', 'number': 'num 6','facebook': 'face 6'},
         {'name': 'Número 7', 'direction': 'dir 7', 'number': 'num 7','facebook': 'face 7'},
         {'name': 'Número 8', 'direction': 'dir 8', 'number': 'num 8','facebook': 'face 8'},
         {'name': 'Número 9', 'direction': 'dir 9', 'number': 'num 9','facebook': 'face 9'},
         {'name': 'Número 10', 'direction': 'dir 10', 'number': 'num 10','facebook': 'face 10'},
         {'name': 'Número 11', 'direction': 'dir 11', 'number': 'num 11','facebook': 'face 11'},
         {'name': 'Número 12', 'direction': 'dir 12', 'number': 'num 12','facebook': 'face 12'}
      ]
   }

     getPlaces(){

         var places = this.state.places

         return places

     }

    render() {

      return (
          <View style={styles.container}>

          <View style={{flex:0.3}} />

           <View style={{flex:0.3}}>
                  <Text style={styles.title} >Institucional</Text>
              </View>

              <View style={{flex:2}} >
              <ScrollView>

              {this.getPlaces().map(place => (
                <View style={{flexDirection: "row",padding:10}}>
                <TouchableOpacity style={{width: 15}} />
                <Image  source={require('../../../images/icons/Directory/invu.jpg')}/>
                <View style={{backgroundColor: 'rgba(200, 200, 200, 0.7)', width: 300}}>
                <Text style={styles.name_place} >  {place.name}</Text>
                <Text style={styles.text}>  Dirección: {place.direction} </Text>
                <Text style={styles.text}>  Tel: {place.number}</Text>
                <Text style={styles.text}>  Facebook: {place.facebook}</Text>
                <TouchableOpacity style={{flex: 1,alignItems: 'flex-end'}} onPress={console.log("más")} >
                  <View style={{flexDirection: 'row'}}>
                    <Image  source={require('../../../images/icons/Directory/masinfogris.png')}/>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1,alignItems: 'flex-end'}} onPress={console.log("ir")} >
                  <View style={{flexDirection: 'row'}}>
                    <Image  source={require('../../../images/icons/Directory/ir_gris.png')}/>
                  </View>
                </TouchableOpacity>
                </View>
                </View>


              ))}

              </ScrollView>
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

AppRegistry.registerComponent('Institutional', () => Institutional);
