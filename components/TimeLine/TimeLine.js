import React, { Component } from 'react';
import { View, StyleSheet,AppRegistry, AsyncStorage} from 'react-native';
import Timeline from './TimeLineContent'

//----------Backend--------------
import { 
  TIME_LINE_URL,
  USER_DATA,
} from '../../constants/constants';

import {
  makeBackendRequest,
} from '../../helpers/helpers'

//-------------------------------


const data = require('../../data/data.json');
var linea = data.Linea_Del_Tiempo;

export default class TimeLine extends Component  {
  constructor(){
    super()
    this.state = {
      userData: null,
      data: linea.map(obj =>{
        var event = {};
        event.title = obj.Acontecimiento;
        event.description = obj.Descripción;
        event.time = obj.Año;
        event.image = obj.ImageURL;
        return event;
      })
    };
    /*this.data = linea.map(obj =>{
      var event = {};
      event.title = obj.Acontecimiento;
      event.description = obj.Descripción;
      event.time = obj.Año;
      event.image = obj.ImageURL;
      return event;
    });*/
  }
  
  render() {
    return (
      <View style={styles.container}>
       <View  style={{flex:2}}/>
         <View style={{flex: 23}}>
          <Timeline data={this.state.data}/>
          </View>
        <View  style={{flex:2}}/>
      </View>
    );
  }

  async get_user_data() {
    const user_data_storage = await AsyncStorage.getItem(USER_DATA);
    this.setState({userData: JSON.parse(user_data_storage)});
  }

  async get_timeLine() {
    const response = await makeBackendRequest(TIME_LINE_URL,"GET",this.state.userData);
    const responseJson = await response.json();
    console.log(responseJson);
    this.setState({
      data : responseJson.map(obj =>{
            var event = {};
            event.title = obj.title;
            event.description = obj.description;
            event.time = obj.year;
            event.image = obj.image_url;
            return event;
          })
    });

    console.log(this.data);
  }

  async get_backend_data() {
    await this.get_user_data()
    await this.get_timeLine();
  }

  componentDidMount(){
    this.get_backend_data();
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

AppRegistry.registerComponent('TimeLine', () => TimeLine);
