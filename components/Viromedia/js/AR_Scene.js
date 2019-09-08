'use strict'
import React, { Component } from 'react';

import {
  PermissionsAndroid,
} from 'react-native';

import {
  ViroARScene,
  Viro3DObject, 
  ViroAmbientLight, 
  ViroNode,
  ViroImage,
  ViroText,
} from 'react-viro';

import Geolocation from 'react-native-geolocation-service';
import RNSimpleCompass from 'react-native-simple-compass';
import { connect } from "react-redux";
import { setPlaceArAction } from "../../../src/redux/actions/viromediaArAction";

const mercatorAmon = [{place: "Vista Edificio Esquinero Av 7 y Calle 3", X: -9359425.52534968 , Y: 1111781.7786023072, img: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F1.VistaEdificioEsquineroAvenida7yCalle3%2FIMG_1118.jpg?alt=media&token=40885398-5a20-4b3a-9bc5-2e5bf6dbbf73"},
                      {place: "Vista Casa Alejo Aguilar Bolandi, desde esquina suroeste entre Avenida 9 y Calle 3", X: -9359428.864934405, Y: 1111882.362060863, img: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F2.VistaCasaAlejoAguilarBolandiDesdeEsquinaSuroesteEntreAvenida9yCalle3%2FNP-002109.jpg?alt=media&token=e893373f-feba-498b-9256-ec64e985277f"},
                      {place: "Vista Saborío Iglesias (Casa Verde), desde esquina suroeste entre Avenida 9 y Calle 7", X: -9359177.282885212, Y: 1111839.4162810256, img: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F3.VistaCasaSaborioIglesiasDesdeEsquinaSuroesteEntreAvenida9yCalle7%2F6933.JPG?alt=media&token=5e1ba8ec-9240-4577-bfeb-686dea44b382"},                                       
                      {place: "Vista Avenida 9 hacia el este (costado Casa Mariano Álvarez Melgar)", X: -9359355.394070482, Y: 1111872.1906874448, img: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F4.VistaAvenida9HaciaElEste%2FIMG_0448.JPG?alt=media&token=69660f7f-a5b7-436e-927a-7bcb69d259d4"},
                      {place: "Vista Calle 3A hacia Avenida 11", X: -9359327.564197782, Y: 1111898.1842028568, img: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F5.VistaCalle3AHaciaAvenida11%2F57599.JPG?alt=media&token=39e7e576-6c65-4859-a9de-5022d689a7aa"},
                      {place: "Vista del muro de la Casa González Feo, desde Calle 9", X: -9359084.887707854, Y: 1111770.477107217, img: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F6.VistaTapiaCasaGonzalezFeo%2CdesdeCalle9%2F2719.JPG?alt=media&token=46c8b38c-9a85-4d87-b0b8-af1f2596e093"},  
                      {place: "Vista Antiguo Hotel Tenerife, desde Calle 9", X: -9359327.564197782, Y: 1111898.1842028568, img: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F7.VistaAntiguoHotelTenerifeDesdeCalle9%2F2720.JPG?alt=media&token=ea402288-000f-45c3-82b4-ea9afd42454d"},
                      {place: "Vista Antiguo Hotel Rey Amón, desde esquina suroeste entre Avenida 7 y Calle 9", X: -9359082.661318038, Y: 1111710.5792409254, img: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F8.VistaAntiguoHotelReyAmonDesdeEsquinaSuroesteEntreAvenida7yCalle9%2F6939.JPG?alt=media&token=fb12163a-37f1-4e82-9458-2f75dac4627c"}, 
                      {place: "Vista Casa 936 (Casa Familia Castro Odio), desde calle 3A", X: -9359334.243367229, Y: 1111926.4380446929, img: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F1.VistaEdificioEsquineroAvenida7yCalle3%2FIMG_1118.jpg?alt=media&token=40885398-5a20-4b3a-9bc5-2e5bf6dbbf73"},
                      {place: "Vista Restaurante Silvestre (Antigua Casa Peralta Zeller), desde esquina noreste entre Avenida 11 y Calle 3A", X: -9359323.11141815, Y: 1111952.431598262, img: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F10.VistaRestauranteSilvestre(AntiguaCasaPeraltaZeller)%2CdesdeEsquinaNoresteEntreAvenida11yCalle%203A%2F6942.JPG?alt=media&token=1fd31a10-3838-471a-bd35-5b3526442ef6"}, 
                      {place: "Vista Hotel Dunn Inn, desde Avenida 11", X: -9359241.848189872, Y: 1111938.8697419444, img: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F1.VistaEdificioEsquineroAvenida7yCalle3%2FIMG_1118.jpg?alt=media&token=40885398-5a20-4b3a-9bc5-2e5bf6dbbf73"},
                      {place: "Vista Calle 5 sobre Avenida 11 hacia Avenida 9", X: -9359241.848189872, Y: 1111938.8697419444, img: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F1.VistaEdificioEsquineroAvenida7yCalle3%2FIMG_1118.jpg?alt=media&token=40885398-5a20-4b3a-9bc5-2e5bf6dbbf73"},
                      {place: "Vista Castillo del Moro desde Calle 3", X: -9359411.053815877, Y: 1112017.9806406198, img: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F1.VistaEdificioEsquineroAvenida7yCalle3%2FIMG_1118.jpg?alt=media&token=40885398-5a20-4b3a-9bc5-2e5bf6dbbf73"},
                      {place: "Vista Castillo del Moro desde esquina noreste entre Avenida 13 y Calle 3", X: -9359404.37464643, Y: 1112041.7139432493, img: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F1.VistaEdificioEsquineroAvenida7yCalle3%2FIMG_1118.jpg?alt=media&token=40885398-5a20-4b3a-9bc5-2e5bf6dbbf73"},                      
                      {place: "Vista Antigua Casa Serrano Bonilla",  X: -9359291.941960732, Y: 1111945.650669481, img: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F1.VistaEdificioEsquineroAvenida7yCalle3%2FIMG_1118.jpg?alt=media&token=40885398-5a20-4b3a-9bc5-2e5bf6dbbf73"}, 
                      {place: "Vista Antigua Escuela Técnica Nacional (Centro Académico de San José - TEC)", X: -9359236.282215333, Y: 1111900.4445094084, img: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F1.VistaEdificioEsquineroAvenida7yCalle3%2FIMG_1118.jpg?alt=media&token=40885398-5a20-4b3a-9bc5-2e5bf6dbbf73"}, 
                      {place: "Vista Alianza Cultural Franco Costarricense desde la esquina suroeste de la Avenida 7 y Calle 5",X: -9359278.583621832, Y: 1111750.1344247607, img: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F1.VistaEdificioEsquineroAvenida7yCalle3%2FIMG_1118.jpg?alt=media&token=40885398-5a20-4b3a-9bc5-2e5bf6dbbf73"},
                      {place: "Vista Casa entre Avenida 5 y Calles 5 y 7",  X: -9359229.603045885, Y: 1111739.9630877317, img: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F1.VistaEdificioEsquineroAvenida7yCalle3%2FIMG_1118.jpg?alt=media&token=40885398-5a20-4b3a-9bc5-2e5bf6dbbf73"}, 
                      {place: "Vista Antigua Fosforera (Instituto Mixto de Ayuda Social)",X: -9359187.301639384, Y: 1111732.0520497558, img: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F1.VistaEdificioEsquineroAvenida7yCalle3%2FIMG_1118.jpg?alt=media&token=40885398-5a20-4b3a-9bc5-2e5bf6dbbf73"},  
                      {place: "Vista Anexo Hotel Don Carlos desde Calle 9",  X: -9359087.11409767, Y: 1111802.1213021805, img: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F1.VistaEdificioEsquineroAvenida7yCalle3%2FIMG_1118.jpg?alt=media&token=40885398-5a20-4b3a-9bc5-2e5bf6dbbf73"},  
                      {place: "Hotel Don Carlos desde Calle 9", X: -9359088.227292577, Y: 1111816.8132590507, img: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F21.HotelDonCarlosDesdeCalle9%2F6931-2.jpg?alt=media&token=a7d735a4-8926-4349-9b83-0a909b6fb7b9"}, 
                      {place: "Vista Antigua Casa Mariano Álvarez Melgar desde Avenida 9", X: -9359318.658638518, Y: 1111873.3208399075, img: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F1.VistaEdificioEsquineroAvenida7yCalle3%2FIMG_1118.jpg?alt=media&token=40885398-5a20-4b3a-9bc5-2e5bf6dbbf73"},  
                      {place: "Vista Antigua Casa Mariano Álvarez Melgar desde Calle 3A", X: -9359324.22461306, Y: 1111858.6288605737, img: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F1.VistaEdificioEsquineroAvenida7yCalle3%2FIMG_1118.jpg?alt=media&token=40885398-5a20-4b3a-9bc5-2e5bf6dbbf73"}, 
                      {place: "Vista Antiguo Anticuario San Ángel",  X: -9359321.998223243, Y: 1111849.58764542556, img: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F1.VistaEdificioEsquineroAvenida7yCalle3%2FIMG_1118.jpg?alt=media&token=40885398-5a20-4b3a-9bc5-2e5bf6dbbf73"},  
                      {place: "Vista Antigüedades Gobelino y Café Gournet, desde esquina sureste Avenida 9 y Calle 3A", X: -9359326.451002875, Y: 1111867.670077934, img: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F1.VistaEdificioEsquineroAvenida7yCalle3%2FIMG_1118.jpg?alt=media&token=40885398-5a20-4b3a-9bc5-2e5bf6dbbf73"},
                      {place: "Vista Antigua Casa Alejo Aguilar Bolandi, desde esquina noroeste entre Avenida 9 y Calle 3", X: -9359427.751739496, Y: 1111892.533437081, img: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F1.VistaEdificioEsquineroAvenida7yCalle3%2FIMG_1118.jpg?alt=media&token=40885398-5a20-4b3a-9bc5-2e5bf6dbbf73"}, 
                      {place: "Vista Antigua Casa Alejo Aguilar Bolandi, desde Calle 3", X: -9359428.864934405, Y: 1111859.759012624, img: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F1.VistaEdificioEsquineroAvenida7yCalle3%2FIMG_1118.jpg?alt=media&token=40885398-5a20-4b3a-9bc5-2e5bf6dbbf73"}, 
                      {place: "Vista Antigua Casa Cipriano Herrero, desde esquina suroeste entre Avenida 11 y Calle 3", X: -9359422.185764957, Y: 1111962.6029937635, img: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F1.VistaEdificioEsquineroAvenida7yCalle3%2FIMG_1118.jpg?alt=media&token=40885398-5a20-4b3a-9bc5-2e5bf6dbbf73"}, 
                      {place: "Vista Hotel Don Carlos, desde esquina noroeste entre esquina Avenida 9 y Calle 9", X: -9359094.906462025, Y: 1111834.8956755253, img: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F1.VistaEdificioEsquineroAvenida7yCalle3%2FIMG_1118.jpg?alt=media&token=40885398-5a20-4b3a-9bc5-2e5bf6dbbf73"}, 
                      {place: "Vista Antiguo Hotel Amstel Amón, desde esquina suroeste entre Avenida 11 y Calle 3A", X: -9359336.469757047, Y: 1111944.5205148042, img: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F1.VistaEdificioEsquineroAvenida7yCalle3%2FIMG_1118.jpg?alt=media&token=40885398-5a20-4b3a-9bc5-2e5bf6dbbf73"},
                      {place: "Vista Antiguo Hotel Hemingway Inn, desde esquina suroeste entre Avenida 9 y Calle 9", X: -9359096.019656934, Y: 1111825.8544661829, img: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F1.VistaEdificioEsquineroAvenida7yCalle3%2FIMG_1118.jpg?alt=media&token=40885398-5a20-4b3a-9bc5-2e5bf6dbbf73"}, 
                      {place: "Vista interna de la recepción Hotel Inn Casa Verde", X: -9359157.24537687, Y: 1111864.2796211652, img: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F1.VistaEdificioEsquineroAvenida7yCalle3%2FIMG_1118.jpg?alt=media&token=40885398-5a20-4b3a-9bc5-2e5bf6dbbf73"}, 

                  ];


export class AR_Scene extends Component {

  constructor(props) {
    super(props);
    this._coordLatLongToMercator = this._coordLatLongToMercator.bind(this);
    this._transformPointToAR = this._transformPointToAR.bind(this);
    this._calibrateCompass = this._calibrateCompass.bind(this);
    this._setObjectPositions = this._setObjectPositions.bind(this);
    this.getARModel = this.getARModel.bind(this); 

    this.state = {
      firstNearestARObject: {x: 0, z: 0.5, place:"Cargando", img: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F2.VistaCasaAlejoAguilarBolandiDesdeEsquinaSuroesteEntreAvenida9yCalle3%2FNP-002109.jpg?alt=media&token=e893373f-feba-498b-9256-ec64e985277f"},
      secondNearestARObject: {x: 0, z: 0.5, place:"Cargando", img: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F2.VistaCasaAlejoAguilarBolandiDesdeEsquinaSuroesteEntreAvenida9yCalle3%2FNP-002109.jpg?alt=media&token=e893373f-feba-498b-9256-ec64e985277f"},
      compassHeading: 0,
      hasARInitialized: false,
    };
  }

  componentDidMount(){
    if (checkLocalizationPermission()) {
      this._setObjectPositions();
      this.setState({hasARInitialized: true});
    } 
  }

  render() { 
    return (
        <ViroARScene> 
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
        {this.loadARObject(this.state.firstNearestARObject.x, this.state.firstNearestARObject.z, this.state.firstNearestARObject.place, this.state.firstNearestARObject.img)}
        {this.loadARObject(this.state.secondNearestARObject.x, this.state.secondNearestARObject.z, this.state.secondNearestARObject.place, this.state.secondNearestARObject.img)}
        {this.loadARObject(0, -2, "Frente", "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/RealidadVirtual%2F2.VistaCasaAlejoAguilarBolandiDesdeEsquinaSuroesteEntreAvenida9yCalle3%2FNP-002109.jpg?alt=media&token=e893373f-feba-498b-9256-ec64e985277f")
        }
      </ViroNode>
    );
  }

  loadARObject(posX, posZ, place, img){
    return(
      <ViroNode>
        <ViroText
            text={this.state.textprueba}
            width={3} height={3}
            style={{fontFamily:"Arial", fontSize:30, color: '#ffffff',}}
            scale={[1, 1, 1]}
            position={[0,-1,-1]}
        />

        <Viro3DObject
          source={require('./res/emoji_smile/emoji_smile.vrx')}
          position={[posX, 1, posZ + 0.5]}
          scale={[1,1,1]}
          type="VRX"
          lightReceivingBitMask={3}
          shadowCastingBitMask={2}
          transformBehaviors={['billboardY']}
          resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
                    require('./res/emoji_smile/emoji_smile_specular.png'),
                    require('./res/emoji_smile/emoji_smile_normal.png')]}/>

        <ViroImage
          position={[posX, 0.5, posZ]}
          resizeMode='ScaleToFit'
          scale={[1.5, 1.5, 1.5]}
          dragType="FixedDistance" onDrag={()=>{}}
          source={{uri: img}}
        />

        <ViroImage
          onClick={() => this.props.arSceneNavigator.viroAppProps.setInformation(place)}
          scale={[1,1,1]}
          position={[posX, 1, posZ + 1]}
          source={{uri:'https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/icon_info.png?alt=media&token=80f734be-cb39-4eb9-a301-c08825cc0c67'}}
        />

      </ViroNode>
    );
  }

  _setObjectPositions(){
    Geolocation.watchPosition(
      (position) => {
        this._calibrateCompass();
        let objectAR, firstObject, secondObject; 
        let firstObjectDistance = Number.MAX_VALUE, secondObjectDistance = Number.MAX_VALUE;

        // Sacar los dos objetos mas cercanos al dispositivo, es decir, con la menor distancia por recorrer
        mercatorAmon.forEach((element) => {
          objectAR = this._transformPointToAR(position.coords.latitude, position.coords.longitude, element.X, element.Y, element.place, element.img);
          let distance = Math.abs(objectAR.x) +  Math.abs(objectAR.z);
          if(distance < firstObjectDistance){
            secondObject = firstObject;
            firstObject = objectAR;
            firstObjectDistance = distance;
          }else if(distance < secondObjectDistance){
            secondObject = objectAR;
            secondObjectDistance = distance;
          }
        });
        this.setState({
          firstNearestARObject: firstObject,
          secondNearestARObject: secondObject,  
        });
      },
      {enableHighAccuracy: true, maximumAge: 0, distanceFilter: 10}
    );
  }

  _calibrateCompass(){
    let myself = this;
    const degree_update_rate = 3; // Number of degrees changed before the callback is triggered
      RNSimpleCompass.start(degree_update_rate, (degree) => {
        myself.setState({
          compassHeading: degree
        });
        RNSimpleCompass.stop();
      });
  }
  
  _transformPointToAR(lat, long, objectPoint_x, objectPoint_y, place, img) {
    let userPoint = this._coordLatLongToMercator(lat, long);

    // latitude(north,south) maps to the z axis in AR
    // longitude(east, west) maps to the x axis in AR

    let objFinalPosZ = objectPoint_y - userPoint.y;
    let objFinalPosX = objectPoint_x - userPoint.x;
    let angle = this.state.compassHeading * Math.PI/180;
    let newRotatedX = objFinalPosX * Math.cos(angle) - objFinalPosZ * Math.sin(angle);
    let newRotatedZ = objFinalPosZ * Math.cos(angle) + objFinalPosX * Math.sin(angle);  

    //flip the z, as negative z(is in front of us which is north, pos z is behind(south).
    return ({x:newRotatedX, z:-newRotatedZ, place: place, img: img});
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

const mapDispatchToProps = (dispatch) => {
  return {
    setPlaceArAction: (data) => {
      dispatch(setPlaceArAction(data));
    },
  };
};

module.exports = connect(null, mapDispatchToProps)(AR_Scene);


/*
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
                  */