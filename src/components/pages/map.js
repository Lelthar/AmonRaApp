import React, { Component } from 'react';
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
    Modal,
} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Image from 'react-native-scalable-image';
import FilterMenu from '../../../components/FilterMenu/FilterMenu';
import SlidingUpPanel from 'rn-sliding-up-panel';

import AsyncStorage from '@react-native-community/async-storage';

//------------------------
import { 
  FEATURES_URL,
  PERIMETER_URL,
  USER_DATA,
} from '../../../constants/constants';

import {
  makeBackendRequest,
} from '../../../helpers/helpers'

//------------------------
var userLocation = null;

const barrio_amon_location = {
  latitude: 9.938232,
  longitude: -84.075539,
  latitudeDelta: 0.004,
  longitudeDelta: 0.004
};

const origin = {latitude: 9.8676834, longitude: -83.8953375};
const destination = {latitude: 9.864605, longitude:  -83.926220};
const GOOGLE_MAPS_APIKEY = "AIzaSyClk_-24I-chIehpLCDp17fpOhSDbqPSbo";

const filtros_url = require('../../assets/images/map/mapa_filtros.png');

let {height, width} = Dimensions.get('window');

//const poligono = data["Perímetro Barrio Amón"];
const imagenes = {
  "Cultura y arte":require("../../assets/images/map/Culturayarte.png"),
  "Fotos 360°":require("../../assets/images/map/Fotos360°.png"),
  "Gastronomía":require("../../assets/images/map/Gastronomia.png"),
  "Hospedaje":require("../../assets/images/map/Hospedaje.png"),
  "Institucional":require("../../assets/images/map/Institucional.png"),
  "Naturaleza":require("../../assets/images/map/Naturaleza.png"),
  "Pasado perdido":require("../../assets/images/map/Pasadoperdido.png"),
  "Patrimonio Arquitectónico":require("../../assets/images/map/Patrimonioarquitectonico.png"),
  "Realidad Aumentada":require("../../assets/images/map/RealidadAumentada.png"),
  "Secretos":require("../../assets/images/map/Secretos.png"),
  "Modelos 3D":require("../../assets/images/map/Modelos3d.png"),
};

import { connect } from "react-redux";

import {
  filterMenuAction,
  activeFiltersAction,
  menuSideAction,
  rateScreenAction,
  guideScreenAction,
  menuResetAction,
} from "../../redux/actions/menuDataActions";

const mapStateToProps = state => {
  return {
    activeFilters: state.menuDataReducer.ACTIVEFILTERS,
    filterMenu: state.menuDataReducer.FILTERMENU
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFilterMenu: (data) => {
      dispatch(filterMenuAction(data));
    },
    setActiveFilters: (data) => {
      dispatch(activeFiltersAction(data));
    },
    setMenuSide: (data) => {
      dispatch(menuSideAction(data));
    },
    setRateScreen: (data) => {
      dispatch(rateScreenAction(data));
    },
    setGuideScreen: (data) => {
      dispatch(guideScreenAction(data));
    },
    resetAll: () => {
      dispatch(menuResetAction());
    },
  }
};

class MapComponent extends Component {
    constructor (props) {
        super(props);
        this.state = {
            marginBottom: null,
            activeFilters: [],
            markers: [],
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
            },

            coords_dir: {
              origen: null,
              destino: null
            },
            informationVisible: false,
            checkerTitle: "Vacio",
            checkerDir: "Vacio",
            checkerTel: "Vacio",
            checkerFacebook: "Vacio",
            current_marker: null,
            userData: null,
            perimeter_data_loaded: false,
            barrio_amon_coordinates: [],
            data: this.props.data,
        };
    }

    toggleFilters() {
      this.props.setFilterMenu(!this.props.filterMenu);
    }

    closeMenu() {
      this.props.resetAll();
    }

    menuFilterChanged() {
      this.setState({
        wasMenuFilterChanged: true,
      });
    }

    //Cuando los props cambian (en MainApp.js) este método se ejecuta
    //Props es el objeto entero que cambió (enviado como screenProps)
    //y state es el estado actual de Map.js
    //este se puede modificar, y al retornarlo es como hacer this.setState
    //
    //Su función es ver los filtros activos
    goTo(screen,params){
        /*let goToScreen = this.props.screenProps.navigatorMethod;
        goToScreen(screen, params);*/
    }

    getActiveMarkers(){
      const activeFilters = this.props.activeFilters.slice();
      const markers = this.state.markers;

      const activeFiltersKeys = this.filter_filters_by_key(activeFilters);

      return (activeFiltersKeys.length > 0) ? this.filter_markers_by_active_filter(markers,activeFiltersKeys) : [];
    }

    filter_filters_by_key(activeFilters) {
      let activeFiltersKeys = [];

      for(filter in activeFilters){
        activeFiltersKeys.push(activeFilters[filter].key);
      }
      return activeFiltersKeys;
    }

    filter_markers_by_active_filter(markers,filters) {
      let activeMarkers = []

      for (let i = 0; i < markers.length; i++) {
        if (filters.includes(markers[i].category)) {
          let newMarker = {
            coordinates: {
              latitude: markers[i].latitude,
              longitude: markers[i].longitude
            },
            title: markers[i].name,
            description: markers[i].description,
            direction: markers[i].direction,
            tel: markers[i].phone_number,
            facebook: markers[i].facebook,
            category: markers[i].category,
            marker_id: 1,
            images_url: [markers[i].image1_url,markers[i].image2_url,markers[i].image3_url],
          };
          activeMarkers.push(newMarker);
        }
      } 
      return activeMarkers;
    }

    openInformation(marker) {
      this.closeMenu();

      this.setState({
        informationVisible:true,
        checkerTitle:marker.title,
        checkerDir:marker.direction,
        checkerTel:marker.tel,
        checkerFacebook:marker.facebook,
        checkerId:marker.marker_id,
        current_marker:marker,
      });
    };
    
    toggleInformation() {  
      this.setState({informationVisible: false});
    }

    localizacion = {
        latitude: 9.938232,
        longitude: -84.075539,
        latitudeDelta: 0.004,
        longitudeDelta: 0.004
    };

    setMapHybrid(){
      //this.resetAll();
      this.setState({
        map_style: 'hybrid'
      });
    }

    setMapStandard(){
      //this.resetAll();
      this.setState({
        map_style: 'standard'
      });
    }

    // fetch directions and decode polylines
    async getDirections(startLoc, destinationLoc) {
        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`);
            let respJson = await resp.json();
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return  {
                    latitude : point[0],
                    longitude : point[1]
                }
            });
            this.setState({coords: coords});
            return coords;
        } catch(error) {
            return error
        }
    }


    envia_datos_localizacion(lat,lon,latPersona,lonPersona){
      let startLocc = lat+','+lon;
      let finalLocc = latPersona+','+lonPersona;
    
      this.setState({
        coords_dir:{
          origen: startLocc,
          destino: finalLocc
        }
      });
    }

    display_my_location(){
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
      };
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

    updateData() {
      this.setState({
        data: this.props.data
      })
    }

    async get_perimeters(){
  
      const response = await makeBackendRequest(PERIMETER_URL,"GET",this.state.userData);
        
      const responseJson = await response.json();
  
      const coordinates_perimeter = this.arrayOfCoordinatesToLatLng(responseJson);
  
      this.setState({
        barrio_amon_coordinates: coordinates_perimeter,
        perimeter_data_loaded: true,
      });
  
    }

    async get_features(){
      
      const response = await makeBackendRequest(FEATURES_URL,"GET",this.state.userData);
        
      const responseJson = await response.json();
  
      this.setState({
        markers: responseJson,
      });
  
    }

    async get_user_data() {
      const user_data_storage = await AsyncStorage.getItem(USER_DATA);
      this.setState({ userData: JSON.parse(user_data_storage)});
    }

    async get_backend_data() {
      await this.get_user_data()
      await this.get_perimeters();
      await this.get_features();
    }
  
    componentDidMount(){
      this.get_backend_data();
    }

    
    render() {
      return (
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
          onPress = {() => this.closeMenu()}
        >
        
        { this.state.perimeter_data_loaded &&

        <MapView.Polygon
            coordinates={this.state.barrio_amon_coordinates}
            strokeWidth={2}
            tappable={false}
            strokeColor="#fd3c00"
        /> }
            {/*Marker si estoy en barrio amón:agarrar localizacion, sino estoy en barrio amón: no ponerlo*/}

            {this.getActiveMarkers().map( (marker, index) => (
              
              <MapView.Marker
                  key={index}
                  coordinate={marker.coordinates}
                 
                  description={marker.description}
                  onPress={() => this.openInformation(marker) }
                  image={imagenes[marker.category]}
              >

                  <MapView.Callout tooltip={true} />
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


            <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>

            { /* barra de arriba */}
              <View style={{flex:8}}/>

              {/* Body completo, flex row */}
              <View style={{flex:40, flexDirection:'row', justifyContent:'center'}}>

              <View style={{flex:2}}/>

                {/* 1 columnas de botón */}
                <View style={{flex:0.5, flexDirection:'column'}}>

                  <View style={{flex:0.5}}/>

                  <View style={{flex:5.5, flexDirection:'row'}}>
                    <View style={{flex:2}}/>
                    <TouchableOpacity style={styles.imgContainer} onPress={()=> this.setState({capasOpen: !this.state.capasOpen})}>
                      <Image  style={styles.squareButton} source={this.state.capasOpen ?
                                                                        require('../../assets/images/map/capas-icon-turq.png') :
                                                                        require('../../assets/images/map/capas-icon.png') }/>

                    </TouchableOpacity>
                  </View>

                  <View style={{flex:0.5}}/>

                  <View style={{flex:15}}>
                  {
                    this.state.capasOpen &&
                    <View style={styles.capasMenu}>
                      <View style={{flex:15}}>
                        <TouchableOpacity style={styles.imgContainer} onPress={()=> this.setMapStandard()}>
                          <Image  style={styles.squareButton} source={require('../../assets/images/map/basico.png')} />
                        </TouchableOpacity>
                        <View style={{flex:0.50}}/>
                        <TouchableOpacity style={styles.imgContainer} onPress={()=> this.setMapHybrid()}>
                          <Image  style={styles.squareButton} source={require('../../assets/images/map/satelite.png')} />
                        </TouchableOpacity>
                        <View style={{flex:0.50}}/>
                        <TouchableOpacity style={styles.imgContainer} onPress={()=> this.goToBarrioAmon()}>
                          <Image  style={styles.squareButton} source={require('../../assets/images/map/barrio_amon.png')} />
                        </TouchableOpacity>
                        <View style={{flex:0.50}}/>
                        </View>
                      <View style={{flex:1.3}}/>
                    </View>
                  }
                  </View>                       

                  <View style={{flex:12, flexDirection:'row'}}>
                    <View style={{flex:2}}/>
                    <TouchableOpacity style={styles.imgContainer} onPress={()=> this.display_my_location()}>
                      <Image  style={styles.squareButton} source={require('../../assets/images/map/ubicacion.png')} />
                    </TouchableOpacity>
                  </View>
                  <View style={{flex:2.5}}/>
                </View>
                {/* 0.5 columna vacía*/}
                <View style={{flex:0.10}}/>                  

              </View>

              {/* Boton de filtros */}

              <View style={styles.bottom}>
                <TouchableOpacity style={ styles.arrow_button } onPress={ () => this.toggleFilters() }>
                  <Image source={ filtros_url }/>
                </TouchableOpacity>  
              </View> 

              {/* Menu de filtros del mapa */}          
              {
                this.props.filterMenu &&
                <View style={ styles.filters }>
                  <FilterMenu />
                </View> 
              }            

              {this.state.informationVisible && <View style={{flex:14, flexDirection: 'row', padding:15, width:300,position:"absolute",bottom:0,backgroundColor:'rgba(54, 145, 160, 0.8)'}} >
                <View style={{flex:6}}>
                  <View style={{flex:1, marginBottom:5}}>
                    <Text style={{color:'white',fontSize: 18,fontWeight:"bold"}}>{this.state.checkerTitle}</Text>
                  </View>
                  <View style={{flex:1,marginBottom:5}}>
                    <Text style={{color:'white',fontSize: 16}}>{"Dirección: "+this.state.checkerDir}</Text>
                    <Text style={{color:'white',fontSize: 16}}>{"Tel: "+this.state.checkerTel}</Text>
                    <Text style={{color:'white',fontSize: 16}}>{"Facebook: "+this.state.checkerFacebook}</Text>
                  </View>
                  <View style={{flex:0.5}}/>
                  <View style={{flex:1}}>
                    <Text style={{color:'white',fontSize: 14}}>{"Visita este lugar para descubrir más RA"}</Text>
                  </View>
                </View>
                <View style={{flex:1}}>
                  <View style={{flex:1}}>
                    <TouchableOpacity style={{flex: 1,alignItems: 'flex-end'}} onPress={this.toggleInformation.bind(this)} >
                      
                      <Image source={require('../../assets/images/map/close.png')} />
                     
                    </TouchableOpacity>
                  </View>
                  <View style={{flex:1, marginTop: 20}}>
                    <TouchableOpacity style={{flex: 1,alignItems: 'flex-end'}} onPress={()=> this.props.navigation.navigate('Place', {place_id:this.state.checkerId, title: this.state.current_marker.category, category: this.state.current_marker})} >
                    <Image source={require('../../assets/images/map/masinfo.png')}/>
                     
                    </TouchableOpacity>
                  </View>
                  <View style={{flex:1}}>
                    <TouchableOpacity style={{flex: 1,alignItems: 'flex-end'}} onPress={()=> console.log("Ir")} >
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{color:'white',fontSize: 16}}>ir </Text>
                        <Image source={require('../../assets/images/map/navigation.png')}/>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>  }

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
    flex:1,
    height: 28,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"red",
  },
  bottom: {
    position:'absolute', 
    left:0, 
    bottom:0,
  },
  filters: {
    position:'absolute', 
    left: 0,
    bottom: 0,
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

//export default connect(mapStateToProps, mapDispatchToProps)(Map);

const mapComponent = connect(mapStateToProps, mapDispatchToProps)(MapComponent);
export default mapComponent;