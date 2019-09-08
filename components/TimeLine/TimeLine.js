import React, { Component } from 'react';
import { View, StyleSheet,AppRegistry} from 'react-native';
import Timeline from './TimeLineContent'
import AsyncStorage from '@react-native-community/async-storage';

//----------Backend--------------
import { 
  TIME_LINE_URL,
  USER_DATA,
} from '../../constants/constants';

import {
  makeBackendRequest,
} from '../../helpers/helpers'

//-------------------------------

//Imports for redux

import { connect } from "react-redux";

import {
  filterMenuAction,
  activeFiltersAction,
  menuSideAction,
  rateScreenAction,
  guideScreenAction,
  menuResetAction,
} from "../../src/redux/actions/menuDataActions";

import HamburguerComponent from '../../src/components/partials/HamburguerMenu'

const mapStateToProps = state => {
  return {
    menuSideState: state.menuDataReducer.MENUSIDE
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFilterMenu: (data) => {
      dispatch(filterMenuAction(data));
    },
    setActiveFilters: (data) => {
      dispatch(activeFiltersAction(data));
    },
    setMenuSide: (data) => {
      dispatch(menuSideAction(data));

    },
    setRateScreen: (data) => {
      dispatch(rateScreenAction(data));
    },
    setGuideScreen: (data) => {
      dispatch(guideScreenAction(data));
    },
    resetAll: () => {
      dispatch(menuResetAction());
    },
  }
};

// End of redux imports

class TimeLine extends Component  {
  constructor(props){
    super(props);

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
        {this.props.menuSideState &&
                < HamburguerComponent /> }
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

const timeLineComponent = connect(mapStateToProps,mapDispatchToProps)(TimeLine);
export default timeLineComponent;
AppRegistry.registerComponent('TimeLine', () => TimeLine);
