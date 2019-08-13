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

export default class TimeLine extends Component  {
  constructor(){
    super()

    this.state = {
      hasDownloadedInfo: false,
      userData: null,
      data: null,
    };
  }
  
  render() {
    return (
      <View style={{flex:1}}>
        <View style={{flex: 2}}>
         {
          this.state.hasDownloadedInfo
          ? <Timeline data={this.state.data}/>
          : null
         }
        </View>
      </View>
    );
  }

  componentDidMount(){
    this.get_backend_data();
  }

  async get_user_data() {
    const user_data_storage = await AsyncStorage.getItem(USER_DATA);
    this.setState({userData: JSON.parse(user_data_storage)});
  }

  async get_timeLine() {
    const response = await makeBackendRequest(TIME_LINE_URL,"GET",this.state.userData);
    const responseJson = await response.json();
    this.setState({
      hasDownloadedInfo: true,
      data : responseJson.map(obj =>{
            var event = {};
            event.title = obj.title;
            event.description = obj.description;
            event.time = obj.year;
            event.image_url = obj.image_url;
            return event;
          })
    });
  }

  async get_backend_data() {
    await this.get_user_data()
    await this.get_timeLine();
  }
}

AppRegistry.registerComponent('TimeLine', () => TimeLine);
