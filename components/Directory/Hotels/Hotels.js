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

  goTo(screen,params){
        var goToScreen = this.props.navigation.state.params.goToScreen
        goToScreen(screen, params)
    }
    
  state = {
      places: [
         {'name': 'Hotel Dunn Inn', 'direction': 'Avenida 11, Calle 5.', 'number': '2222-3232 / 800-545-4801','facebook': 'fb.com/HotelDunnInn' },
         {'name': 'Hotel Don Carlos', 'direction': 'Avenida 9, Calle 9.', 'number': '2221-6707','facebook': 'fb.com/HotelDonCarlosCostaRica' },
         {'name': 'Hotel Castillo', 'direction': 'Avenida 9, Entre calle 9 y 11.', 'number': '2258-0021','facebook': 'fb.com/hotelcastillocostarica' },
         {'name': 'Hotel Inca Real San José', 'direction': 'Avenida 11, Calle 3 y 3A.', 'number': '2223-8883 / 2233-2640 / 8828-2108','facebook': 'fb.com/Hotel-Inca-Real-140910712588711'},
         {'name': 'Hotel y Casino Taormina San José', 'direction': 'Avenida 11, entre calle 3A', 'number': '4055-5555 (según google maps) 2222-6952 / 6142-6633','facebook': 'fb.com/hotelycasinotaormina'},
         {'name': 'Hotel Kekoldi', 'direction': 'Avenida 9, entre calle 7 y 5', 'number': '2248-0804','facebook': 'fb.com/Kekoldi/'},
         {'name': 'Hostel Van Gogh', 'direction': 'Calle 7, entre avenida 9 y 7', 'number': '2221-3554','facebook': 'fb.com/HostelVanGogh'},
         {'name': 'Hostel Pangea', 'direction': 'Avenida 7, entre calle 3 y 3A', 'number': '2221-1992','facebook': 'fb.com/Hostel-Pangea-239092546120739'},
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
                  <View style={{backgroundColor: 'rgba(200, 200, 200, 0.7)', width: 200}}>
                  <Text style={styles.name_place} >  Hotel {hotel.name}</Text>
                  <Text style={styles.text} >  Dirección: {hotel.direction} </Text>
                  <Text style={styles.text}>  Tel: {hotel.number}</Text>
                  <Text style={styles.text}>  Facebook: {hotel.facebook}</Text>
                  <TouchableOpacity style={{flex: 1,alignItems: 'flex-end'}} onPress={ () =>  this.goTo('SeeMore', {goToScreen: this.props.navigation.state.params.goToScreen , name: hotel.name, direction: hotel.direction, phone: hotel.number,facebook: hotel.facebook} )} >
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
