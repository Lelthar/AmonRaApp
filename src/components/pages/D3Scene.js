'use strict';

import React, { Component } from 'react';
import {StyleSheet} from 'react-native';

import {
  ViroDirectionalLight,
  ViroAmbientLight,
  ViroOrbitCamera,
  ViroScene,
  Viro3DObject,
  ViroSkyBox,
  ViroNode,
} from 'react-viro';

import Orientation from 'react-native-orientation-locker';
import HousesObject from "../../assets/objects/houseObj";
import HousesMaterials from "../../assets/objects/houseMaterials";

const grid_bg = require('../../assets/objects/grid_bg.jpg');

var createReactClass = require('create-react-class');

var MainScene = createReactClass({
  getInitialState() {
    return {
      rotation : [0, 0, 0],
      scale:[.00075, .00075, .00075],
    };
  },

  componentDidMount(){
    Orientation.lockToPortrait(); //this will lock the view to Portrait
  },

  render: function() {
    return (
     <ViroScene>
        <ViroSkyBox source={{nx:grid_bg,
                             px:grid_bg,
                             ny:grid_bg,
                             py:grid_bg,
                             nz:grid_bg,
                             pz:grid_bg}} />
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
              onPinch={(pinchState, scaleFactor) => this._onPinch(pinchState, scaleFactor, this.state.scale)}
              type="OBJ"
            />
       </ViroNode>
     </ViroScene>
    );
  },

  _object3dSelect(objectName){
    const objects = {
      337 : HousesObject.centroCine,
      338 : HousesObject.gonzalesFeo,
      339 : HousesObject.casaVerde,
      340 : HousesObject.alianzaFrancesa,
      341 : HousesObject.quesadaAvendano,
      342 : HousesObject.serranoBonilla,
      343 : HousesObject.castilloDelMoro,
    };
    return objects[objectName];
  },

  _material3dSelect(materialName){
    const objects = {
      337 : HousesMaterials.centroCine,
      338 : HousesMaterials.gonzalesFeo,
      339 : HousesMaterials.casaVerde,
      340 : HousesMaterials.alianzaFrancesa,
      341 : HousesMaterials.quesadaAvendano,
      342 : HousesMaterials.serranoBonilla,
      343 : HousesMaterials.castilloDelMoro,
    };
    return objects[materialName];
  },

  _setARNodeRef(component) {
    this.arNodeRef = component;
  },

  _onRotate(rotateState, rotationFactor, source) {
    if (rotateState == 2) {
      this.setState({
        rotation : [this.state.rotation[0] + 1.5, this.state.rotation[1], this.state.rotation[2]]
      });
      return;
    }
  },

  _onPinch(pinchState, scaleFactor, source) {
    let newScale = this.state.scale.map((x)=>{return x * scaleFactor})
    if (pinchState == 3){
      this.setState({
        scale : newScale
      });
      return;
    }
    this.arNodeRef.setNativeProps({scale:newScale});
  },
});

module.exports = MainScene;
