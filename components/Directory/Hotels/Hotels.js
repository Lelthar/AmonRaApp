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



export default class Hotels extends Component{

  constructor(props){
      super(props);
      // Se le pasa el controlador de la navegación a App.js
      // para controlar la navegación desde Navigator.js
      this.props.screenProps.getNavigationProp(this.props.navigation)
  }
  state = {
      places: [
         {'name': 'Hotel Dunn Inn', 'direction': 'Avenida 11, Calle 5.', 'number': '2222-3232 / 800-545-4801','facebook': 'https://www.facebook.com/HotelDunnInn/' },
         {'name': 'Hotel Don Carlos', 'direction': 'Avenida 9, Calle 9.', 'number': '2221-6707','facebook': 'https://www.facebook.com/HotelDonCarlosCostaRica/' },
         {'name': 'Hotel Castillo', 'direction': 'Avenida 9, Entre calle 9 y 11.', 'number': '2258-0021','facebook': 'https://www.facebook.com/hotelcastillocostarica/' },
         {'name': 'Hotel Inca Real San José', 'direction': 'Avenida 11, Calle 3 y 3A.', 'number': '22238883 / 22332640 / 88282108','facebook': 'https://www.facebook.com/Hotel-Inca-Real-140910712588711'},
         {'name': 'Hotel y Casino Taormina San José', 'direction': 'Avenida 11, entre calle 3A', 'number': '40555555 (según google maps) 2222 6952 / 6142 6633','facebook': 'https://www.facebook.com/hotelycasinotaormina/'},
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
                    <Text style={styles.title} >Hospedaje</Text>
                </View>

                <View style={{flex:2}} >
                <ScrollView>

                {this.getPlaces().map(hotel => (
                  <View style={{flexDirection: "row",padding:10}}>
                  <TouchableOpacity style={{width: 15}} />
                  <View  style={{backgroundColor: 'rgba(127, 140, 141, 0.7)', width: 60,height: 60}}/>
                  <View style={{backgroundColor: 'rgba(200, 200, 200, 0.7)', width: 300}}>
                  <Text style={styles.name_place} >  Hotel {hotel.name}</Text>
                  <Text style={styles.text} >  Dirección: {hotel.direction} </Text>
                  <Text style={styles.text}>  Tel: {hotel.number}</Text>
                  <Text style={styles.text}>  Facebook: {hotel.facebook}</Text>
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

AppRegistry.registerComponent('Hotels', () => Hotels);
