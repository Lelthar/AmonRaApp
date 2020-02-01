import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
  } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Orientation from 'react-native-orientation-locker';
import localStyles from "../../assets/styles/partials/menuImages";
import { 
  VIRTUAL_VISIT_IMAGES,
  INFORMATION_HOUSES,
  USER_DATA,
} from '../../../constants/routesAPI';
import {
  makeBackendRequest,
} from '../../../helpers/helpers';

const FEATURE_ID = "?feature_id=";
const LEFT_ARROW_ICON = require('../../assets/images/icons/despliegaizq.png');
const RIGHT_ARROW_ICON = require('../../assets/images/icons/despliegader.png');

export default class MenuImages extends Component {
  constructor(props) {
    super(props);

    this.showMenuImages = this.showMenuImages.bind(this);

    this.state = {
      counter: {one: 0, two: 1, three: 2},
      typeContent : this.props.dataImages.type, 
      images : [],
      houseId : this.props.dataImages.id,
      menuImagesVisible: false,
      userData: null,
    };
  }

  componentDidUpdate(){
    Orientation.lockToPortrait();
  }

  componentDidMount() {
    Orientation.lockToPortrait(); 
    this.get_backend_data(); 
  }

  render() {
    return (
        this.state.menuImagesVisible && (
          this.showMenuImages()
        )
    );
  }

  showMenuImages(){
    return (
      <View style={localStyles.menuContainer}>
        <View style={localStyles.extremesContainer}>
          <TouchableOpacity style={localStyles.displaybotomRight} onPress={() => this.changeImage3D(1)}>
            <Image  source={LEFT_ARROW_ICON} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={localStyles.middleContainer} onPress={() => 
            this.props.handleClickMenuImage(this.state.images[this.state.counter.one])}>
          <Image source={{uri :this.state.images[this.state.counter.one].image_url}} style={localStyles.photoAux} />
        </TouchableOpacity>
        <TouchableOpacity style={localStyles.centerContainer} onPress={() => 
            this.props.handleClickMenuImage(this.state.images[this.state.counter.two])}>
          <Image source={{uri :this.state.images[this.state.counter.two].image_url}} style={localStyles.photoMain} />
        </TouchableOpacity>
        <TouchableOpacity style={localStyles.middleContainer} onPress={() => 
            this.props.handleClickMenuImage(this.state.images[this.state.counter.three])}>
          <Image source={{uri :this.state.images[this.state.counter.three].image_url}} style={localStyles.photoAux} />
        </TouchableOpacity>
        <View style={localStyles.extremesContainer}>
        <TouchableOpacity style={localStyles.displaybotomLeft} onPress={() => this.changeImage3D(2)}>
          <Image source={RIGHT_ARROW_ICON} />
        </TouchableOpacity>
        </View>
      </View>
    );
  }

  changeImage3D(button){
    let one,two, three = 0;

    one = this.state.counter.one;
    two = this.state.counter.two;
    three = this.state.counter.three;
    let length = this.state.images.length;

    if(button == 2){ // go to right
      if(this.state.counter.three < length-1){
        one = this.state.counter.one+1;
        two = this.state.counter.two+1;
        three = this.state.counter.three+1;
      }
    }else{ // go to left
      if(this.state.counter.one>0){
        one = this.state.counter.one-1;
        two = this.state.counter.two-1;
        three = this.state.counter.three-1;
      }
    }
    this.setState({
      counter: {one: one,two: two, three: three}
    });
  }

  async get_backend_data() {
    await this.get_user_data();
    await this.get_brief_description();
  }

  async get_user_data() {
    const user_data_storage = await AsyncStorage.getItem(USER_DATA);
    this.setState({userData: JSON.parse(user_data_storage)});
  }

  async get_brief_description(){
    let URL_GET_INFO = "";
    if(this.state.typeContent==1){
      URL_GET_INFO = VIRTUAL_VISIT_IMAGES;
    }else{
      URL_GET_INFO = INFORMATION_HOUSES;
    }
    URL_GET_INFO += FEATURE_ID+this.state.houseId;
    let response = await makeBackendRequest(URL_GET_INFO, "GET", this.state.userData);
    let responseJson = await response.json();
    if(responseJson != undefined){
      this.setState({
        images : responseJson,
        menuImagesVisible : true,
      });
    }
  }
}

module.exports = MenuImages;