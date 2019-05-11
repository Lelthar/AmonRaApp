import React, { Component } from 'react';
import { View, Text, StyleSheet,AppRegistry,Image } from 'react-native';
import Timeline from '../../lib/index'

const data = require('../../data/data.json');
var linea = data.Linea_Del_Tiempo;



export default class TimeLine extends Component  {
    constructor(){
      super()
      this.data = linea.map(obj =>{
        var event = {};
        event.title = obj.Acontecimiento;
        event.description = obj.Descripción;
        event.time = obj.Año;
        return event;
      });
    }


  render() {
    return (
      <View style={styles.container}>
       <View  style={{flex:2}}/>
         <View style={{flex: 23}}>
          <Timeline
            data={this.data}
            isRenderSeperator
            circleSize={15}
            dotSize={7}
            circleColor={'#A6A8AA'}
            lineColor = {'#E7E6E5'}
            lineWidth={4}
            innerCircleType={'dot'}
            //columnFormat={'two-column'}
          />
          </View>
        <View  style={{flex:2}}/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

AppRegistry.registerComponent('TimeLine', () => TimeLine);
