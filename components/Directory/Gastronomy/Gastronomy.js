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




export default class Gastronomy extends Component{

  constructor(props){
      super(props);
      // Se le pasa el controlador de la navegación a App.js
      // para controlar la navegación desde Navigator.js
      this.props.screenProps.getNavigationProp(this.props.navigation)
  }

  state = {
      places: [
         {'name': 'Alma de Amón', 'direction': 'Avenida 9 y 11, Calle 5.', 'number': '"4700 2637 (facebook) / 8309-7227 / 2222 3232"','facebook': 'https://www.facebook.com/AlmadeAmon/ ' },
         {'name': 'Soda Yasmin', 'direction': ' Avenida 9 y 11, Calle 5.', 'number': '6207 9573','facebook': 'face 2' },
         {'name': 'De acá', 'direction': 'Calle 3A entre Avenida 9 y 11', 'number': '6296 4102','facebook': 'https://www.facebook.com/deacacostarica/' },
         {'name': 'Café Rojo', 'direction': 'Avenida 7, Entre calle 3 y 5.', 'number': '2221-2425 / 2441-1003 / 2222-0894 / 8397-0871 / 8853-7253','facebook': 'https://www.facebook.com/elcaferojo/'},
         {'name': 'Café Europa', 'direction': 'Avenida 7 y 9, Calle 7.', 'number': '2221 1682','facebook': 'https://www.facebook.com/comidasyotros/'},
         {'name': 'Cáfé Amón', 'direction': 'Avenida 9, Calle 9.', 'number': '2221 6707 / 8837 0303','facebook': 'https://www.facebook.com/CafeAmon/'},
         {'name': 'Cafenauta', 'direction': 'Avenida 9 y 11, Calle 3A.', 'number': '2221 1652 / 7013 3435 / 8828 9715','facebook': 'https://www.facebook.com/soycafenauta/'},
         {'name': 'Restaurante II Gattopardo', 'direction': 'Avenida 11, Calle 3A.', 'number': '4055 5530 / 8440 7618 / 83261560','facebook': 'https://www.facebook.com/IlGattopardoRestaurante/'},
         {'name': 'Tournant Restaurante y Café', 'direction': 'Avenida 11, Calle 3A y 5.', 'number': '2248 9523  / 8352 5998','facebook': 'https://www.facebook.com/tournantchefs/'},
         {'name': 'Restaurante Silvestre (Antigua Casa Peralta Zeller)', 'direction': 'Calle 3A, entre avenida 11 y 9', 'number': '2221 2465 / 4700 0506 / 8860 1369','facebook': 'https://www.facebook.com/RestSilvestre/'},
         {'name': 'Delicias Del Perú', 'direction': 'Calle 3A, entre avenidas 7 y 9', 'number': '2222 1959','facebook': 'face 11'},
         {'name': 'Criollita Amón. Restaurante y Café', 'direction': 'Avenida 9, entre calles 3A y 5', 'number': '2221 6917 / 7225 9216','facebook': 'https://www.facebook.com/criollitaamon/'},
         {'name': 'PANÍ-VORO', 'direction': 'Avenida 9, Calle 9.', 'number': 'num 12','facebook': 'https://www.facebook.com/panivorocr/'},
         {'name': 'Le Café', 'direction': 'Avenida 7, calle 5', 'number': '7288 2159','facebook': 'https://www.facebook.com/Le-Caf%C3%A9-1709669752634172/'}
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
                  <Text style={styles.title} >Gastronomía</Text>
              </View>

              <View style={{flex:2}} >
              <ScrollView>

              {this.getPlaces().map(place => (
                <View style={{flexDirection: "row",padding:10}}>
                <TouchableOpacity style={{width: 15}} />
                <View  style={{backgroundColor: 'rgba(127, 140, 141, 0.7)', width: 60,height: 60}}/>
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

AppRegistry.registerComponent('Gastronomy', () => Gastronomy);