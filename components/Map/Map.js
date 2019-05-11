import React, { Component, PureComponent } from 'react';
import {
    Platform,
    AppRegistry,
    StyleSheet,
    Text,
    Dimensions,
    View,
    TouchableOpacity,
    Button,
    TouchableHighlight,
    Geolocation,
    ScrollView
} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Image from 'react-native-scalable-image';
import FilterMenu from '../FilterMenu/FilterMenu';
import SlidingUpPanel from 'rn-sliding-up-panel';

var userLocation = null;
const data = require('../../data/data.json');

const barrio_amon_location = {
  latitude: 9.938232,
  longitude: -84.075539,
  latitudeDelta: 0.004,
  longitudeDelta: 0.004
};

const origin = {latitude: 9.8676834, longitude: -83.8953375};
const destination = {latitude: 9.864605, longitude:  -83.926220};
const GOOGLE_MAPS_APIKEY = "AIzaSyClk_-24I-chIehpLCDp17fpOhSDbqPSbo";

const filtros_url = require( '../../images/icons/PantallaPrincipal/mapa_filtros.png' );
const puntos = data.features;
const poligono = data["Perímetro Barrio Amón"];
const imagenes = {
  "Cultura":require("../../images/icons/maps/Cultura.png"),
  "Fotografías 360":require("../../images/icons/maps/Fotografias 360.png"),
  "Gastronomía":require("../../images/icons/maps/Gastronomia.png"),
  "Hospedaje":require("../../images/icons/maps/Hospedaje.png"),
  "Institucional":require("../../images/icons/maps/Institucional.png"),
   "Naturaleza":require("../../images/icons/maps/Naturaleza.png"),
   "Pasado Perdido":require("../../images/icons/maps/Pasado Perdido.png"),
   "Patrimonio Arquitectónico":require("../../images/icons/maps/Patrimonio Arquitectonico.png"),
   "Realidad Aumentada":require("../../images/icons/maps/Realidad Aumentada.png"),
   "Secretos":require("../../images/icons/maps/Secretos.png"),
}




export default class Map extends PureComponent {

    constructor (props) {
        super(props);
        this.state = {
            marginBottom: null,
            activeFilters: [],
            markers: puntos,
            map_style: 'standard',
            capasOpen: false,
            screen_style: 'MapScreen',
            
            visible: false,
            allowDragging: true,

            region_amon: {
      			  latitude: 9.938232,
      		    longitude: -84.075539,
      			  latitudeDelta: 0.004,
      			  longitudeDelta: 0.004
            },

            region: {
              latitude: 9.938232,
      		    longitude: -84.075539,
      			  latitudeDelta: 0.004,
      			  longitudeDelta: 0.004
            	//error: null
            },

            coords_dir: {
              origen: null,
              destino: null
            },
        }
        this.toggleFilters = this.props.screenProps.showFunctions.toggleFilters;
        this.props.screenProps.getNavigationProp(this.props.navigation);
        this.resetAll = this.props.screenProps.showFunctions.resetAll;

    }


    //Cuando los props cambian (en MainApp.js) este método se ejecuta
    //Props es el objeto entero que cambió (enviado como screenProps)
    //y state es el estado actual de Map.js
    //este se puede modificar, y al retornarlo es como hacer this.setState
    //
    //Su función es ver los filtros activos
    static getDerivedStateFromProps(props, state) {
      state.activeFilters = props.screenProps.activeFilters;
      return state;
    }


    //Toma los filtros activos, revisa la lista de markers, y crea un nuevo markers con propiedades
    // más amigables para el renderizado
    getActiveMarkers(){

        var activeFilters = this.state.activeFilters.slice()
        var markers = this.state.markers
        var activeMarkers = []

        //console.debug("NEWMARKER: activeFilters: " JSON.stringify(activeFilters));

        for(filter in activeFilters){
          var markersOfOneCategoryList =  markers[activeFilters[filter].key];
          for (marker in markersOfOneCategoryList){

            //console.debug("NEWMARKER: oldmarker" + JSON.stringify(markersOfOneCategoryList[marker]));
            var newMarker =
            {
              coordinates: {
                latitude: markersOfOneCategoryList[marker].geometry.coordinates[1],
                longitude: markersOfOneCategoryList[marker].geometry.coordinates[0]
              },
              title: markersOfOneCategoryList[marker].properties.Name,
              direction: markersOfOneCategoryList[marker].properties.direction,
              tel: markersOfOneCategoryList[marker].properties.tel,
              facebook: markersOfOneCategoryList[marker].facebook,
              category: activeFilters[filter].key,
            };
            //console.debug("NEWMARKER: newmarker" + JSON.stringify(newMarker));
            activeMarkers.push(newMarker);
          }
        }

        return activeMarkers
    }


    localizacion = {
        latitude: 9.938232,
        longitude: -84.075539,
        latitudeDelta: 0.004,
        longitudeDelta: 0.004
    };


    setMapHybrid(){
      this.resetAll();
      this.setState({
        map_style: 'hybrid'
      });
    }

    setMapStandard(){
      this.resetAll();
      this.setState({
        map_style: 'standard'
      });
    }

    // fetch directions and decode polylines
    async getDirections(startLoc, destinationLoc) {
        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
            let respJson = await resp.json();
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return  {
                    latitude : point[0],
                    longitude : point[1]
                }
            })
            this.setState({coords: coords})
            return coords
        } catch(error) {
            return error
        }
    }


    envia_datos_localizacion(lat,lon,latPersona,lonPersona){
      console.debug("DISMAPS: envia_datos_localizacion ")
      var startLocc = lat+','+lon
      var finalLocc = latPersona+','+lonPersona
      console.debug("DISMAPS: startLoc" +startLocc)
      console.debug("DISMAPS: finalLoc" +finalLocc)
      this.setState({
        coords_dir:{
          origen: startLocc,
          destino: finalLocc
        }
      })

      //this.setState({coords_dir: this.getDirections(startLocc,finalLocc)})

    }


    display_my_location(){
      //alert("userLocation is:" + JSON.stringify(userLocation))
      this.setState({
        region: userLocation
      });
    }

    setUserLocation(coordinate){
      userLocation = {
        longitude : coordinate.longitude,
        latitude: coordinate.latitude,
        latitudeDelta: 0.004,
        longitudeDelta: 0.004
      }
    }

    goToBarrioAmon(){
      this.setState({
        region:barrio_amon_location
      });
    }

    //Para cada lista [Lat,Lng] en una lista (List<Lat,Lng>) genera un objeto latitude longitude
    arrayOfCoordinatesToLatLng(LonLatArray){
      coordinates = []
      for (LonLat in LonLatArray){
        coordinates.push({
            latitude: LonLatArray[LonLat][1],
            longitude: LonLatArray[LonLat][0]
        })
      }
      return coordinates;
    }


    show_filters( pfilters ) {
      this.resetAll();     
      if (pfilters === this.state.screen_style) {
        this.toggleFilters();
        this.setState ({
          visible: !(this.state.visible)
        });
      } 
      else { return; }      
    }

    
    render() {

      const BarrioAmonCoordinates = this.arrayOfCoordinatesToLatLng(poligono[0]);
      return (
        //Ver mapa
        <View style={styles.container}>

          <MapView
          style={styles.map}
          showsMyLocationButton={true}
          onUserLocationChange={locationChangedResult => this.setUserLocation(locationChangedResult.nativeEvent.coordinate)}
          showsUserLocation={true}
          region={this.state.region}
          mapType={this.state.map_style}
          showsCompass = {true}
          showsMyLocationButton={true}
          chacheEnabled={false}
          zoomEnabled={true}
          onRegionChangeComplete={res=>this.setState({region:res})}
        >

        <MapView.Polygon
            coordinates={BarrioAmonCoordinates}
            strokeWidth={2}
            tappable={false}
            strokeColor="#fd3c00"
            onPress={() => this.resetAll()}
        />


            {/*Marker si estoy en barrio amón:agarrar localizacion, sino estoy en barrio amón: no ponerlo*/}

            {this.getActiveMarkers().map( (marker, index) => (
              
              <MapView.Marker
                  key={index}
                  coordinate={marker.coordinates}
                  title={marker.title}
                  description={marker.description}
                  onPress={() => this.resetAll() }
                  image={imagenes[marker.category]}
              >

                  <MapView.Callout style={{backgroundColor:'rgba(54, 145, 160, 0.8)'}} flat={true} tooltip={true}  
                                   onPress={()=>this.envia_datos_localizacion(marker.coordinates[0].latitude,marker.coordinates[0].longitude,
                                                                               this.state.region.latitude,this.state.region.longitude)}>
                      <Text style={{color:'white',fontSize: 16}}>{marker.title}</Text>
                      <Text style={{color:'white',fontSize: 16}}>{marker.direction}</Text>
                      <Text style={{color:'white',fontSize: 16}}>{marker.tel}</Text>
                      <Text style={{color:'white',fontSize: 16}}>{marker.facebook}</Text>
                      <TouchableOpacity style={{flex: 1,alignItems: 'flex-end'}} onPress={console.debug("DISMAPS: " +"ir")} >
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{color:'white',fontSize: 16}}>ir </Text>
                        <Image  source={require('../../images/icons-temp/navigation.png')}/>
                      </View>
                      </TouchableOpacity>
                  </MapView.Callout >
              </MapView.Marker>
          ))}

            <MapViewDirections
              origin={ this.state.coords_dir.origen}
              destination={this.state.coords_dir.destino}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="hotpink"
            />
            </MapView>


            <View style={{flex:1}}>

            { /* barra de arriba */}
              <View style={{flex:8}}/>

              {/* Body completo, flex row */}
              <View style={{flex:40, flexDirection:'row', justifyContent:'center'}}>

              <View style={{flex:3.75}}/>

                {/* 1 columnas de botón */}
                <View style={{flex:0.5, flexDirection:'column'}}>

                  <View style={{flex:0.5}}/>

                  <View style={{flex:5.5, flexDirection:'row'}}>
                    <View style={{flex:2}}/>
                    <TouchableOpacity style={styles.imgContainer} onPress={()=> this.setState({capasOpen: !this.state.capasOpen})}>
                      <Image  style={styles.squareButton} source={this.state.capasOpen ?
                                                                        require('../../images/icons/maps/capas-icon-turq.png') :
                                                                        require('../../images/icons/maps/capas-icon.png') }/>

                    </TouchableOpacity>
                  </View>

                  <View style={{flex:0.5}}/>

                  <View style={{flex:15}}>
                  {
                    this.state.capasOpen &&
                    <View style={styles.capasMenu}>
                      <View style={{flex:15}}>
                        <TouchableOpacity style={styles.imgContainer} onPress={()=> this.setMapStandard()}>
                          <Image  style={styles.squareButton} source={require('../../images/icons/maps/basico.png')} />
                        </TouchableOpacity>
                        <View style={{flex:0.50}}/>
                        <TouchableOpacity style={styles.imgContainer} onPress={()=> this.setMapHybrid()}>
                          <Image  style={styles.squareButton} source={require('../../images/icons/maps/satelite.png')} />
                        </TouchableOpacity>
                        <View style={{flex:0.50}}/>
                        <TouchableOpacity style={styles.imgContainer} onPress={()=> this.goToBarrioAmon()}>
                          <Image  style={styles.squareButton} source={require('../../images/icons/maps/barrio_amon.png')} />
                        </TouchableOpacity>
                        <View style={{flex:0.50}}/>
                        </View>
                      <View style={{flex:1.3}}/>
                    </View>
                  }
                  </View>                      
                  

                  <View style={{flex:9.5, flexDirection:'row'}}>
                    <View style={{flex:2}}/>
                    <TouchableOpacity style={styles.imgContainer} onPress={()=> this.display_my_location()}>
                      <Image  style={styles.squareButton} source={require('../../images/icons/maps/ubicacion.png')} />
                    </TouchableOpacity>
                  </View>
                  <View style={{flex:2.5}}/>
                </View>
                {/* 0.5 columna vacía*/}
                <View style={{flex:0.10}}/>                  

              </View>

                                     
              {/* Menu de filtros del mapa */}
              <View style={ styles.filters }>            
              {
                this.props.screenProps.showProps.filterMenu &&                
                  <FilterMenu activeFilters={this.props.screenProps.activeFilters} 
                            getActiveFilters={this.props.screenProps.getActiveFilters}/>         
                  
              }              
              </View>              
              
              {/* Boton de filtros */}
              <View style={{ flex:6 }}>   
                  <TouchableOpacity style={ styles.arrow_button } onPress={ () => this.show_filters('MapScreen') }>
                    <Image source={ filtros_url }/>
                  </TouchableOpacity>              
              </View>

              <View style={{ flex: 5.5 }}/>                  

            </View>
        </View>
      );
    }
}


const styles = StyleSheet.create({
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    box: {
        flex:1
    },
    mapStyleControls: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 20
    },
    mapStyleControlss: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 50,
        marginLeft: 20
    },
    mapStyleControlsss: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 100,
        marginLeft: 20
    },
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
        flex: 1
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
    imgContainer:{
      flex:5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    squareButton: {
        resizeMode:'contain',
        flex:1
      },

      capasMenu:{
      backgroundColor: 'white',
      flex:20,
      flexDirection:'row',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      },
      map: {
        ...StyleSheet.absoluteFillObject
      },
      arrow_button: {
        flex:5, 
        flexDirection:'row', 
        justifyContent: 'center', 
        marginLeft:"86%"
      },
      filters: {
        flex:23,
        flexDirection: 'row',
        justifyContent: 'center',
      },
      slide_menu: {
        flex: 1,
        zIndex: 1,
        backgroundColor : "#13535C",
        opacity: 0.8,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginLeft: 520,
        marginTop: 92,
    }
});

AppRegistry.registerComponent('Map', () => Map);
