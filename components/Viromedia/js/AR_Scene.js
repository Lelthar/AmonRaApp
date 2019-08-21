'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Dimensions
} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroBox,
  Viro3DObject, 
  ViroAmbientLight,
  ViroSpotLight,
  ViroNode,
  ViroConstants,
  ViroImage,
  ViroScene,
} from 'react-viro';

import Geolocation from 'react-native-geolocation-service';
import RNSimpleCompass from 'react-native-simple-compass';

/*
const coordTEC = [{place: "Centro de las Artes", lat: 9.857535, lon: -83.911538},
                  {place: "Financiero", lat: 9.856955, lon: -83.912267}, 
                  {place: "Editorial TEC", lat: 9.856614, lon: -83.912142},
                  {place: "Soda El Ferrocarril", lat: 9.857331, lon: -83.910869}, 
                  {place: "Gimnasio Institucional", lat: 9.857003, lon: -83.910855}, 
                  {place: "Gimnasio ASETEC", lat: 9.856535, lon: -83.910827}, 
                  {place: "Escuela Cultura y Deporte", lat: 9.856302, lon: -83.911833}, 
                  {place: "Escuela de Computacion", lat: 9.856713, lon: -83.912661}, 
                  {place: "Escuela de Matematica", lat: 9.856136, lon: -83.913089}, 
                  {place: "Pretil", lat: 9.855712, lon: -83.912805}, 
                  {place: "Soda ASETEC", lat: 9.855463, lon: -83.912314}, 
                  {place: "Lab H", lat: 9.856300, lon: -83.912591}, 
                  {place: "Biblioteca", lat: 9.855000, lon: -83.912591},  
                 ];

const coordAmon = [ {place: "Vista Edificio Esquinero Av 7 y Calle 3", lat: 9.93711, lon: -84.07715},
                    {place: "Vista Casa Alejo Aguilar Bolandi, desde esquina suroeste entre Avenida 9 y Calle 3", lat: 9.938, lon: -84.07718},
                    {place: "Vista Saborío Iglesias (Casa Verde), desde esquina suroeste entre Avenida 9 y Calle 7", lat: 9.93762, lon: -84.07492 },                                       
                    {place: "Vista Avenida 9 hacia el este (costado Casa Mariano Álvarez Melgar)", lat: 9.93791, lon: -84.07652},
                    {place: "Vista Calle 3A hacia Avenida 11", lat: 9.93814, lon: -84.07627},
                    {place: "Vista del muro de la Casa González Feo, desde Calle 9", lat: 9.93701, lon: -84.07409},  
                    {place: "Vista Antiguo Hotel Tenerife, desde Calle 9", lat: 9.93814, lon: -84.07627},
                    {place: "Vista Antiguo Hotel Rey Amón, desde esquina suroeste entre Avenida 7 y Calle 9", lat: 9.93648, lon: -84.07407}, 
                    {place: "Vista Casa 936 (Casa Familia Castro Odio), desde calle 3A", lat: 9.93839, lon: -84.07633},
                    {place: "Vista Restaurante Silvestre (Antigua Casa Peralta Zeller), desde esquina noreste entre Avenida 11 y Calle 3A", lat: 9.93862, lon: -84.07623}, 
                    {place: "Vista Hotel Dunn Inn, desde Avenida 11", lat: 9.9385, lon: -84.0755},
                    {place: "Vista Calle 5 sobre Avenida 11 hacia Avenida 9", lat: 9.9385, lon: -84.0755},
                    {place: "Vista Castillo del Moro desde Calle 3", lat: 9.9392, lon: -84.07702},
                    {place: "Vista Castillo del Moro desde esquina noreste entre Avenida 13 y Calle 3", lat: 9.93941, lon: -84.07696}, 
                    {place: "Vista Antigua Casa Serrano Bonilla", lat: 9.93856, lon: -84.07595}, 
                    {place: "Vista Antigua Escuela Técnica Nacional (Centro Académico de San José - TEC)", lat: 9.93816, lon: -84.07545}, 
                    {place: "Vista Alianza Cultural Franco Costarricense desde la esquina suroeste de la Avenida 7 y Calle 5", lat: 9.93683, lon: -84.07583},
                    {place: "Vista Casa entre Avenida 5 y Calles 5 y 7", lat: 9.93674, lon: -84.07539}, 
                    {place: "Vista Antigua Fosforera (Instituto Mixto de Ayuda Social)", lat: 9.93667, lon: -84.07501},  
                    {place: "Vista Anexo Hotel Don Carlos desde Calle 9", lat: 9.93729, lon: -84.07411},  
                    {place: "Hotel Don Carlos desde Calle 9", lat: 9.93742, lon: -84.07412}, 
                    {place: "Vista Antigua Casa Mariano Álvarez Melgar desde Avenida 9", lat: 9.93792, lon: -84.07619},  
                    {place: "Vista Antigua Casa Mariano Álvarez Melgar desde Calle 3A", lat: 9.93779, lon: -84.07624}, 
                    {place: "Vista Antiguo Anticuario San Ángel", lat: 9.93771, lon: -84.07622},  
                    {place: "Vista Antigüedades Gobelino y Café Gournet, desde esquina sureste Avenida 9 y Calle 3A", lat: 9.93787, lon: -84.07626},
                    {place: "Vista Antigua Casa Alejo Aguilar Bolandi, desde esquina noroeste entre Avenida 9 y Calle 3", lat: 9.93809, lon: -84.07717}, 
                    {place: "Vista Antigua Casa Alejo Aguilar Bolandi, desde Calle 3", lat: 9.9378, lon: -84.07718}, 
                    {place: "Vista Antigua Casa Cipriano Herrero, desde esquina suroeste entre Avenida 11 y Calle 3", lat: 9.93871, lon: -84.07712}, 
                    {place: "Vista Hotel Don Carlos, desde esquina noroeste entre esquina Avenida 9 y Calle 9", lat: 9.93758, lon: -84.07418}, 
                    {place: "Vista Antiguo Hotel Amstel Amón, desde esquina suroeste entre Avenida 11 y Calle 3A", lat: 9.93855, lon: -84.07635},
                    {place: "Vista Antiguo Hotel Hemingway Inn, desde esquina suroeste entre Avenida 9 y Calle 9", lat: 9.9375, lon: -84.07419}, 
                    {place: "Vista interna de la recepción Hotel Inn Casa Verde", lat: 9.93784, lon: -84.07474}, 

                  ]

const mercatorTEC = [{place: "Centro de las Artes", X: -9340989.681840425, Y: 1102789.7035470225},
                     {place: "Financiero", X: -9341070.833749214, Y: 1102724.1708053024},
                     {place: "Editorial TEC", X: -9341056.918812865, Y: 1102685.642126478},
                     {place: "Soda El Ferrocarril", X: -9340915.209101086, Y: 1102766.6540867938}, 
                     {place: "Gimnasio Institucional", X: -9340913.650628215, Y: 1102729.594200243}, 
                     {place: "Gimnasio ASETEC", X: -9340910.533682471, Y: 1102676.7161332557}, 
                     {place: "Escuela Cultura y Deporte", X: -9341022.52109021, Y: 1102650.3901150657}, 
                     {place: "Escuela de Computacion", X: -9341114.693628585, Y: 1102696.827867839}, 
                     {place: "Escuela de Matematica", X: -9341162.338370645, Y: 1102631.634250793}, 
                     {place: "Pretil", X: -9341130.723635262, Y: 1102583.7277487542}, 
                     {place: "Soda ASETEC", X: -9341076.06576528, Y: 1102555.5940062169}, 
                     {place: "Lab H", X: -9341106.90126423, Y: 1102650.164140742}, 
                     {place: "Biblioteca", X: -9341106.90126423, Y: 1102503.2811197315},  
                   //  {place: "Super Cartago", X: -9342335.86844259, Y: 1102024.005848375},  
                     {place: "Esquina sur", X: -9342342.324973054, Y: 1101922.3079511977},  
                    ];
*/
const mercatorAmon = [{place: "Vista Edificio Esquinero Av 7 y Calle 3", X: -9359425.52534968 , Y: 1111781.7786023072},
                      {place: "Vista Casa Alejo Aguilar Bolandi, desde esquina suroeste entre Avenida 9 y Calle 3", X: -9359428.864934405, Y: 1111882.362060863},
                      {place: "Vista Saborío Iglesias (Casa Verde), desde esquina suroeste entre Avenida 9 y Calle 7", X: -9359177.282885212, Y: 1111839.4162810256},                                       
                      {place: "Vista Avenida 9 hacia el este (costado Casa Mariano Álvarez Melgar)", X: -9359355.394070482, Y: 1111872.1906874448},
                      {place: "Vista Calle 3A hacia Avenida 11", X: -9359327.564197782, Y: 1111898.1842028568},
                      {place: "Vista del muro de la Casa González Feo, desde Calle 9", X: -9359084.887707854, Y: 1111770.477107217},  
                      {place: "Vista Antiguo Hotel Tenerife, desde Calle 9", X: -9359327.564197782, Y: 1111898.1842028568},
                      {place: "Vista Antiguo Hotel Rey Amón, desde esquina suroeste entre Avenida 7 y Calle 9", X: -9359082.661318038, Y: 1111710.5792409254}, 
                      {place: "Vista Casa 936 (Casa Familia Castro Odio), desde calle 3A", X: -9359334.243367229, Y: 1111926.4380446929},
                      {place: "Vista Restaurante Silvestre (Antigua Casa Peralta Zeller), desde esquina noreste entre Avenida 11 y Calle 3A", X: -9359323.11141815, Y: 1111952.431598262}, 
                      {place: "Vista Hotel Dunn Inn, desde Avenida 11", X: -9359241.848189872, Y: 1111938.8697419444},
                      {place: "Vista Calle 5 sobre Avenida 11 hacia Avenida 9", X: -9359241.848189872, Y: 1111938.8697419444},
                      {place: "Vista Castillo del Moro desde Calle 3", X: -9359411.053815877, Y: 1112017.9806406198},
                      {place: "Vista Castillo del Moro desde esquina noreste entre Avenida 13 y Calle 3", X: -9359404.37464643, Y: 1112041.7139432493},                      
                      {place: "Vista Antigua Casa Serrano Bonilla",  X: -9359291.941960732, Y: 1111945.650669481}, 
                      {place: "Vista Antigua Escuela Técnica Nacional (Centro Académico de San José - TEC)", X: -9359236.282215333, Y: 1111900.4445094084}, 
                      {place: "Vista Alianza Cultural Franco Costarricense desde la esquina suroeste de la Avenida 7 y Calle 5",X: -9359278.583621832, Y: 1111750.1344247607},
                      {place: "Vista Casa entre Avenida 5 y Calles 5 y 7",  X: -9359229.603045885, Y: 1111739.9630877317}, 
                      {place: "Vista Antigua Fosforera (Instituto Mixto de Ayuda Social)",X: -9359187.301639384, Y: 1111732.0520497558},  
                      {place: "Vista Anexo Hotel Don Carlos desde Calle 9",  X: -9359087.11409767, Y: 1111802.1213021805},  
                      {place: "Hotel Don Carlos desde Calle 9", X: -9359088.227292577, Y: 1111816.8132590507}, 
                      {place: "Vista Antigua Casa Mariano Álvarez Melgar desde Avenida 9", X: -9359318.658638518, Y: 1111873.3208399075},  
                      {place: "Vista Antigua Casa Mariano Álvarez Melgar desde Calle 3A", X: -9359324.22461306, Y: 1111858.6288605737}, 
                      {place: "Vista Antiguo Anticuario San Ángel",  X: -9359321.998223243, Y: 1111849.58764542556},  
                      {place: "Vista Antigüedades Gobelino y Café Gournet, desde esquina sureste Avenida 9 y Calle 3A", X: -9359326.451002875, Y: 1111867.670077934},
                      {place: "Vista Antigua Casa Alejo Aguilar Bolandi, desde esquina noroeste entre Avenida 9 y Calle 3", X: -9359427.751739496, Y: 1111892.533437081}, 
                      {place: "Vista Antigua Casa Alejo Aguilar Bolandi, desde Calle 3", X: -9359428.864934405, Y: 1111859.759012624}, 
                      {place: "Vista Antigua Casa Cipriano Herrero, desde esquina suroeste entre Avenida 11 y Calle 3", X: -9359422.185764957, Y: 1111962.6029937635}, 
                      {place: "Vista Hotel Don Carlos, desde esquina noroeste entre esquina Avenida 9 y Calle 9", X: -9359094.906462025, Y: 1111834.8956755253}, 
                      {place: "Vista Antiguo Hotel Amstel Amón, desde esquina suroeste entre Avenida 11 y Calle 3A", X: -9359336.469757047, Y: 1111944.5205148042},
                      {place: "Vista Antiguo Hotel Hemingway Inn, desde esquina suroeste entre Avenida 9 y Calle 9", X: -9359096.019656934, Y: 1111825.8544661829}, 
                      {place: "Vista interna de la recepción Hotel Inn Casa Verde", X: -9359157.24537687, Y: 1111864.2796211652}, 

                  ]

export default class AR_Scene extends Component {

  constructor() {
    super();

    this._onTrackingUpdated = this._onTrackingUpdated.bind(this);
    this._coordLatLongToMercator = this._coordLatLongToMercator.bind(this);
    this._transformPointToAR = this._transformPointToAR.bind(this);
    this._calibrateCompass = this._calibrateCompass.bind(this);
    this._setObjectPositions = this._setObjectPositions.bind(this);
    this.getARModel = this.getARModel.bind(this);

    this.state = {
      userLatitude: 0,
      userLongitude: 0,
      objectPlaceAR1: "Sin datos",
      objectPlaceAR2: "Sin datos",
      objectXPos1: 0,
      objectZPos1: 0,
      objectXPos2: 0,
      objectZPos2: 0,
      compassHeading: 0,
      coordinateString: "Sin datos",
      coordinateLatLongString: "Sin datos",
      hasARInitialized: false,
      error: null
    };
  }
  
  render() { 
    return (
        <ViroARScene onTrackingUpdated={this._onTrackingUpdated}> 
          <ViroAmbientLight color={"#aaaaaa"} />
          {this.state.hasARInitialized
            ? this.getARModel()
            : null
          }
        </ViroARScene>
    );
  }

  getARModel(){
    return(
      <ViroNode>
        {this.loadARObject1()}
        {this.loadARObject2()}

        <ViroImage
            position={[0, 0.5,-1.5]}
            resizeMode='ScaleToFill'
            dragType="FixedDistance" onDrag={()=>{}}
            source={{uri:'https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F1.VistaEdificioEsquineroAvenida7yCalle3%2FIMG_1118.jpg?alt=media&token=40885398-5a20-4b3a-9bc5-2e5bf6dbbf73'}}
        />
      </ViroNode>
    );
  }

  loadARObject1(){
    return(
      <ViroNode>
        <ViroText text={this.state.objectPlaceAR1}
          scale={[2,2,2]} height={5} width={4} 
          position={[this.state.objectXPos1 + 0.5, 1, this.state.objectZPos1]}
          style={styles.helloWorldTextStyle}
        />

        <ViroImage
          onClick={this.props.arSceneNavigator.viroAppProps.setInformation}
          scale={[2,2,2]} 
          position={[this.state.objectXPos1, 1, this.state.objectZPos1]}
          source={{uri:'https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/icon_info.png?alt=media&token=80f734be-cb39-4eb9-a301-c08825cc0c67'}}
        />
      </ViroNode>
    );
  }

  loadARObject2(){
    return ( 
      <ViroNode>
        <ViroText text="Objeto de ejemplo"
          scale={[0.4,0.4,0.4]} height={5} width={4} 
          position={[0, 1, -1]}
          style={styles.helloWorldTextStyle}
        />

        <ViroImage
          onClick={this.props.arSceneNavigator.viroAppProps.setInformation}
          scale={[.5,.5,.5]}
          position={[0.5, 0, -1]}
          source={{uri:'https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/icon_info.png?alt=media&token=80f734be-cb39-4eb9-a301-c08825cc0c67'}}
        />
      </ViroNode>
    );
  }

  componentDidMount(){
    if (checkLocalizationPermission()) {
      this._setObjectPositions();
    } 
    else {
      this.setState({
        error : "Permission Denied"
      });
    }
  }
  
  _setObjectPositions(){
    Geolocation.watchPosition(
      (position) => {
        this._calibrateCompass();
        let objectAR, firstObject, secondObject; 
        let firstObjectDistance = Number.MIN_VALUE, secondObjectDistance = Number.MIN_VALUE;

        mercatorAmon.forEach((element) => {
          objectAR = this._transformPointToAR(position.coords.latitude, position.coords.longitude, element.X, element.Y, element.place);
          let distance = Math.abs(objectAR.x) +  Math.abs(objectAR.z);
          if(distance > firstObjectDistance){
            secondObject = firstObject;
            firstObject = objectAR;
            firstObjectDistance = Math.abs(objectAR.x) +  Math.abs(objectAR.z);
          }else if(distance > secondObjectDistance){
            secondObject = objectAR;
            secondObjectDistance = Math.abs(objectAR.x) +  Math.abs(objectAR.z);
          }
        });

        this.setState({
          userLatitude: position.coords.latitude,
          userLongitude: position.coords.longitude,
          objectPlaceAR1: firstObject.place,
          objectPlaceAR2: secondObject.place,
          objectXPos1: firstObject.x,
          objectZPos1: firstObject.z,
          objectXPos2: secondObject.x,
          objectZPos2: secondObject.z,
          error: null   
        });
      },
      (error) => {
          this.setState({
            error: error.message
          });
      },
      {enableHighAccuracy: true, maximumAge: 0, distanceFilter: 10}
    );
  }

  _calibrateCompass(){
    let myself = this;
    const degree_update_rate = 3; // Number of degrees changed before the callback is triggered
      RNSimpleCompass.start(degree_update_rate, (degree) => {
     //   console.log('You are facing', degree);
        myself.setState({
          compassHeading: degree
        });
        RNSimpleCompass.stop();
      });
  }
  
  _transformPointToAR(lat, long, objectPoint_x, objectPoint_y, place) {
    let userPoint = this._coordLatLongToMercator(lat, long);

    // latitude(north,south) maps to the z axis in AR
    // longitude(east, west) maps to the x axis in AR

    let objFinalPosZ = objectPoint_y - userPoint.y;
    let objFinalPosX = objectPoint_x - userPoint.x;
    let angle = this.state.compassHeading * Math.PI/180;
    let newRotatedX = objFinalPosX * Math.cos(angle) - objFinalPosZ * Math.sin(angle);
    let newRotatedZ = objFinalPosZ * Math.cos(angle) + objFinalPosX * Math.sin(angle);  

    //flip the z, as negative z(is in front of us which is north, pos z is behind(south).
    return ({x:newRotatedX, z:-newRotatedZ, place: place});
  }

  // Converts Lat and Long to Mercator projection
  _coordLatLongToMercator(lat_degree, lon_degree) { 
    let lon_radians = (lon_degree / 180.0 * Math.PI);
    let lat_radians = (lat_degree / 180.0 * Math.PI);
    let earth_radius = 6378137.0;
    let xmeters  = earth_radius * lon_radians;
    let ymeters = earth_radius * Math.log((Math.sin(lat_radians) + 1) / Math.cos(lat_radians));
    return ({x:xmeters, y:ymeters});
 }
  
  _onTrackingUpdated(state, reason) {
    /*if (state == ViroConstants.TRACKING_NORMAL){
      this.setState({
        hasARInitialized: true,
      });
      console.log("Tracking normal");
    } else{
      console.log("Error tracking " + state);
    }*/
    this.setState({
      hasARInitialized: true,
    });
  }

}

async function checkLocalizationPermission(){
  try {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
  } catch (err) {
    console.warn(err);
  }
  return false;
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 50,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = AR_Scene;