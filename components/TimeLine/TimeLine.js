import React, { Component } from 'react';
import { View, StyleSheet,AppRegistry} from 'react-native';
import Timeline from './TimeLineContent'
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
        event.image = obj.ImageURL;
        return event;
      });
    }
  
  render() {
    return (
      <View style={styles.container}>
       <View  style={{flex:2}}/>
         <View style={{flex: 23}}>
          <Timeline data={this.data}/>
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
