'use strict';

import React, { Component } from 'react';
import {StyleSheet} from 'react-native';

import {
  ViroSpotLight,
  ViroDirectionalLight,
  ViroAmbientLight,
  ViroOrbitCamera,
  ViroScene,
  Viro3DObject,
  ViroText,
  ViroSkyBox,
  ViroNode,
  ViroMaterials,
} from 'react-viro';

//import objects and materials houses
import HousesObject from "./res/houseObj";
import HousesMaterials from "./res/houseMaterials";

var createReactClass = require('create-react-class');

import Orientation from 'react-native-orientation-locker';

var MainScene = createReactClass({
  getInitialState() {
    return {
      rotation : [0, 0, 0],
      scale:[.00075, .00075, .00075],
    };
  },

  componentDidMount(){
    console.log("Realizo el componentDidMount el 3D_SCENE")
    Orientation.lockToPortrait(); //this will lock the view to Portrait
  },

  render: function() {
    return (
     <ViroScene style={styles.container}>
        <ViroSkyBox source={{nx:require('./res/grid_bg.jpg'),
                             px:require('./res/grid_bg.jpg'),
                             ny:require('./res/grid_bg.jpg'),
                             py:require('./res/grid_bg.jpg'),
                             nz:require('./res/grid_bg.jpg'),
                             pz:require('./res/grid_bg.jpg')}} />
        <ViroOrbitCamera position={[0, 0, -0]} active={true} focalPoint={[0, 0, -1]} />
        <ViroDirectionalLight direction={[0, 0, -1]} color="#524C4C" />

        <ViroAmbientLight color="#aaaaaa" />

         <ViroNode position={[0, 0, -1]} ref={this._setARNodeRef} 
              scale={this.state.scale}
              rotation={this.state.rotation} >
            <Viro3DObject
              source={this._object3dSelect(this.props.sceneNavigator.viroAppProps.id)}
              resources={[this._material3dSelect(this.props.sceneNavigator.viroAppProps.id)]}
              dragType="FixedDistance" onDrag={()=>{}}
              onPinch={this._onPinch}
              type="OBJ"
            />
            {/*<Viro3DObject source={require('./res/heart.obj')}
                       materials={["heart"]} onPinch={this._onPinch} type="OBJ" />*/}
       </ViroNode>
     </ViroScene>
    );
  },

  _object3dSelect(objectName){
    const objects = {
      250 : HousesObject.gonzalesFeo,
      251 : HousesObject.centroCine,
      252 : HousesObject.casaVerde,
      254 : HousesObject.alianzaFrancesa,
      256 : HousesObject.castilloDelMoro,
      261 : HousesObject.quesadaAvendano,
      262 : HousesObject.serranoBonilla,
    };
    return objects[objectName];
  },

  _material3dSelect(materialName){
    const objects = {
      250 : HousesMaterials.gonzalesFeo,
      251 : HousesMaterials.centroCine,
      252 : HousesMaterials.casaVerde,
      254 : HousesMaterials.alianzaFrancesa,
      256 : HousesMaterials.castilloDelMoro,
      261 : HousesMaterials.quesadaAvendano,
      262 : HousesMaterials.serranoBonilla,
    };
    return objects[materialName];
  },

  _setARNodeRef(component) {
    this.arNodeRef = component;
  },

  _onRotate(rotateState, rotationFactor, source) {
    //console.log("rotation "+ this.state.rotation + "FACTOR: "+rotationFactor);
    if (rotateState == 2) {
      this.setState({
        rotation : [this.state.rotation[0] + 1.5, this.state.rotation[1], this.state.rotation[2]]
      });
      return;
    }
    //this.arNodeRef.setNativeProps({rotation:[this.state.rotation[0], this.state.rotation[1] + rotationFactor, this.state.rotation[2]]});
  },
  _onPinch(pinchState, scaleFactor, source) {
    
    var newScale = this.state.scale.map((x)=>{return x * scaleFactor})

    if (pinchState == 3) {

      this.setState({
        scale : newScale
      });
      return;
    }

    this.arNodeRef.setNativeProps({scale:newScale});
    //this.spotLight.setNativeProps({shadowFarZ: 6 * newScale[0]});
  },
});

var materials = ViroMaterials.createMaterials({
   heart: {
     lightingModel: "Blinn",
     diffuseTexture: require('./res/Heart_D3.jpg'),
     specularTexture: require('./res/Heart_S2.jpg'),
     writesToDepthBuffer: true,
     readsFromDepthBuffer: true,
   },
});

var styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 18,
    color: '#FFFFFF',
  },
});

module.exports = MainScene;
