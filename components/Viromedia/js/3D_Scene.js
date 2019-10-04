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

var createReactClass = require('create-react-class');

var MainScene = createReactClass({
  getInitialState() {
    return {
      rotation : [0, 0, 0],
      scale:[.0006, .0006, .0006],
    };
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
        <ViroDirectionalLight direction={[0, 0, -1]} color="#ffffff" />

        <ViroAmbientLight color="#aaaaaa" />

         <ViroNode position={[0, 0, -1]} ref={this._setARNodeRef} 
              scale={this.state.scale}
              rotation={this.state.rotation} >
            <Viro3DObject
              source={require('./res/house/GFCOORDENADAS.obj')}
              onPinch={this._onPinch}
              type="OBJ"
            />
            {/*<Viro3DObject source={require('./res/heart.obj')}
                       materials={["heart"]} onPinch={this._onPinch} type="OBJ" />*/}
       </ViroNode>
     </ViroScene>
    );
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
      console.log("SCALE: ");
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
