import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
  } from 'react-native';

const arr = [require('../res/PEATON.png'),require('../res/ISOMETRICO.png'),require('../res/GENERAL.png')];

export default class MenuImages extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            informationText : "Sin datos",
            counter: {one: 0, two: 1, three: 2},
        }
    }

    changeImage3D(button){
        let one,two, three =0;
    
        //Derecha
        if(button == 2){
          one = (this.state.counter.one-1) >= 0 ? (this.state.counter.one-1) : arr.length-1;
          two = (this.state.counter.two-1) >= 0 ? (this.state.counter.two-1) : arr.length-1;
          three = (this.state.counter.three-1) >= 0 ? (this.state.counter.three-1) : arr.length-1;
        }else{//Izquierda
          one = ((this.state.counter.one+1)%arr.length);
          two = ((this.state.counter.two+1)%arr.length);
          three = ((this.state.counter.three+1)%arr.length);
        }
    
        this.setState({
          counter: {one: one,two: two, three: three}
        })
        
      }
    
      render() { 
        return (
          <View style={localStyles.menuContainer}>
            <View style={localStyles.extremesContainer}>
              <TouchableOpacity style={localStyles.displaybotomRight} onPress={() => this.changeImage3D(1)}>
                <Image  source={require('../../../../images/despliegaizq.png')} />
              </TouchableOpacity>
            </View>
            <View style={localStyles.middleContainer}>
              <Image source={arr[this.state.counter.one]} style={localStyles.photoAux} />
            </View>
            <View style={localStyles.centerContainer}>
              <Image source={arr[this.state.counter.two]} style={localStyles.photoMain} />
            </View>
            <View style={localStyles.middleContainer}>
            <Image source={arr[this.state.counter.three]} style={localStyles.photoAux} />
            </View>
            <View style={localStyles.extremesContainer}>
            <TouchableOpacity style={localStyles.displaybotomLeft} onPress={() => this.changeImage3D(2)}>
              <Image source={require('../../../../images/despliegader.png')} />
            </TouchableOpacity>
            </View>
          </View>
            
        );
      }
}

var localStyles = StyleSheet.create({
    menuContainer: {
    flex:1, 
    flexDirection: 'row', 
    padding:3, 
    bottom: 0,
    position:"absolute",
    backgroundColor:'rgba(255, 255, 255, 0.8)',
    },
    extremesContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    },
    middleContainer: {
    flex:2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    },
    centerContainer: {
    flex:3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    },
    item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    },
    photoMain: {
    height: 100,
    width: "90%",
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    },
    photoAux: {
    height: 65,
    width: 68.8,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
    },
    displaybotomRight: {
    justifyContent: 'center',
    alignItems: 'center',
    },
    displaybotomLeft: {
    justifyContent: 'center',
    alignItems: 'center',
    }
});

module.exports = MenuImages;