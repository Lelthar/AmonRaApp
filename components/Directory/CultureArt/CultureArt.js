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



export default class CultureArt extends Component{

  constructor(props){
      super(props);
      // Se le pasa el controlador de la navegación a App.js
      // para controlar la navegación desde Navigator.js
      this.props.screenProps.getNavigationProp(this.props.navigation)
  }

  state = {
      places: [
         {'name': 'TEOR/éTica', 'direction': 'Calle 7, entre avenidas 11 y 9.', 'number': '22334881','facebook': 'https://www.facebook.com/teoreticapagina/' },
         {'name': 'Lado V. Centro de estudio y documentación ', 'direction': 'Calle 7, entre avenidas 11 y 9.', 'number': '22211051','facebook': 'https://www.facebook.com/teoreticapagina/' },
         {'name': 'Libros Duluoz', 'direction': 'Avenida 7, entre calles 3 y 3A.', 'number': '22560414','facebook': 'https://www.facebook.com/libros.duluoz/' },
         {'name': 'Galería Talentum (Antigua Casa Familia Doryan)', 'direction': 'Avenida 11, entre calles 5 y 3A.', 'number': '22566346','facebook': 'https://www.facebook.com/galeriatalentum/'},
         {'name': 'Casa del Barrio Amón (Casa Serrano Bonilla)', 'direction': 'Avenida 11, entre calles 3 y 3A', 'number': '22480733','facebook': 'https://www.facebook.com/Casadelbarrioamon/'},
         {'name': 'Camanance. Taller y Tienda', 'direction': 'Avenida 9, entre calle 9 y 11', 'number': '88591361','facebook': 'https://es-la.facebook.com/camanancecr/'},
         {'name': 'Matisse Cine Espacio-Temporal', 'direction': 'Calle 5, entre avenida 7 y 9', 'number': '83809764','facebook': 'https://www.facebook.com/cinematisse/'},
         {'name': 'Murales de Cuentos de Concherías', 'direction': 'Avenida 9, entre calle 7 y 9', 'number': 'num 8','facebook': 'face 8'},
         {'name': 'Triángulo Showroom Creativo', 'direction': 'Calle 3A, entre avenida 9 y 11', 'number': '83810148 / 88516060','facebook': 'https://www.facebook.com/galeriatalentum/'},
         {'name': 'Amon Solar / El Sótano', 'direction': 'Avenida 11, Calle 3', 'number': '2221 2302','facebook': 'https://www.facebook.com/amonsolarcr/'},
         {'name': 'Boutique Annemarie Gift & Shop', 'direction': 'Avenida 9, Calle 9.', 'number': '2221 6707','facebook': 'https://www.facebook.com/HotelDonCarlosCostaRica/'},
         {'name': 'Insólita ', 'direction': 'Avenida 9 y 11, Calle 3A.', 'number': '8492 9090','facebook': 'https://www.facebook.com/insolitacr/'}
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
                  <Text style={styles.title} >Cultura y Arte</Text>
              </View>

              <View style={{flex:2}} >
              <ScrollView>

              {this.getPlaces().map(place => (
                <View style={{flexDirection: "row",padding:10}}>
                <TouchableOpacity style={{width: 15}} />
                <View  style={{backgroundColor: 'rgba(127, 140, 141, 0.7)', width: 60,height: 60}}/>
                <View style={{backgroundColor: 'rgba(200, 200, 200, 0.7)', width: 300}}>
                <Text style={styles.name_place} >  {place.name}</Text>
                <Text style={{fontFamily: "Roboto",color:'grey',fontSize: 16}}>  Dirección: {place.direction} </Text>
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

AppRegistry.registerComponent('CultureArt', () => CultureArt);