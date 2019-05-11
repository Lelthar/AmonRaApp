import React, { Component } from 'react';
import {
  Platform,
  AppRegistry,
  StyleSheet,
  Text,
  Dimensions,
  View
} from 'react-native';
import MapView from 'react-native-maps';

export default class Map extends Component {

constructor () {
  super();
  this.state = {
    marker_hospedaje:true,
    marker_institucional:true,
    marker_cultura:true,
    marker_gastronomia:true
  }
}


localizacion = {
  latitude: 2.938232,
  longitude: -84.075539,
  latitudeDelta: 0.002,
  longitudeDelta: 0.002
}



  render() {
    return (

      //Ver mapa
      <View style={styles.container}>
        <MapView style={styles.map} initialRegion={this.localizacion}>


      <MapView.Marker coordinate={this.localizacion} >
    		  <View style={styles.radius}>
    		  <View style={styles.marker} />
    		  </View>
		  </MapView.Marker>

    {this.state.marker_institucional  &&
      <MapView.Marker
          coordinate={{latitude: 9.93805,
          longitude: -84.07537}}
          title={"TEC"}
          description={"Poner info del tec"}
       />
     }


      {this.state.marker_hospedaje  &&
       <MapView.Marker
           coordinate={{latitude: 9.93839,
           longitude: -84.07566}}
           title={"Hotel Dunn Inn"}
           description={"Poner info del Hotel Dunn Inn"}
        />
      }

      {this.state.marker_gastronomia  &&
        <MapView.Marker
            coordinate={{latitude: 9.93822,
            longitude:  -84.07565}}
            title={"Restaurante Alma"}
            description={"Poner info del Restaurante Alma"}
         />
      }


      {this.state.marker_cultura &&
         <MapView.Marker
             coordinate={{latitude: 9.93800,
             longitude: -84.07599}}
             title={"Lugar Cultura y Arte"}
             description={"Poner info del Lugar Cultura y Arte"}
          />
      }


        </MapView>



      </View>


    );
  }
}

const styles = StyleSheet.create({
  radius: {
  	height: 50,
  	width: 50,
  	borderRadius: 50 / 2,
  	overflow: 'hidden',
  	backgroundColor:'rgba(0,122,255,0.1)',
  	borderWidth: 1,
  	borderColor:'rgba(0,112,255,0.3)',
  	alignItems: 'center',
  	justifyContent: 'center'
  },
  marker: {
  	height: 20,
  	width: 20,
  	borderWidth: 3,
  	borderColor: 'white',
  	borderRadius: 20 / 2,
  	overflow: 'hidden',
  	backgroundColor:'blue'
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
});



AppRegistry.registerComponent('Map', () => Map);
