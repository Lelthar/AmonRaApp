import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
  } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Orientation from 'react-native-orientation-locker';

//----------Backend--------------
import { 
  VIRTUAL_VISIT_IMAGES,
  INFORMATION_HOUSES,
  USER_DATA,
} from '../../../../constants/constants';

import {
  makeBackendRequest,
} from '../../../../helpers/helpers';

//-------------------------------

const FEATURE_ID = "?feature_id=";

export default class MenuImages extends Component {
  constructor(props) {
    super(props);

    this.showMenuImages = this.showMenuImages.bind(this);

    this.state = {
      counter: {one: 0, two: 1, three: 2},
      typeContent : this.props.dataImages.type, //1=information views images 0=images of points information
      images : [],
      houseId : this.props.dataImages.id,
      menuImagesVisible: false,
    }
  }

  componentDidMount(){
    this.get_backend_data();  
    Orientation.lockToPortrait(); //this will lock the view to Portrait
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
            <Image  source={require('../../../../images/despliegaizq.png')} />
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
          <Image source={require('../../../../images/despliegader.png')} />
        </TouchableOpacity>
        </View>
      </View>
    );
  }

  changeImage3D(button){
    let one,two, three =0;
    let length = this.state.images.length;
    //right
    if(button == 2){
      one = (this.state.counter.one-1) >= 0 ? (this.state.counter.one-1) : length-1;
      two = (this.state.counter.two-1) >= 0 ? (this.state.counter.two-1) : length-1;
      three = (this.state.counter.three-1) >= 0 ? (this.state.counter.three-1) : length-1;
    }else{//left
      one = ((this.state.counter.one+1)%length);
      two = ((this.state.counter.two+1)%length);
      three = ((this.state.counter.three+1)%length);
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
    }else{
        console.log("ERROR")
    }
  }
}

var localStyles = StyleSheet.create({
    menuContainer: {
    flex:1, 
    flexDirection: 'row', 
    padding:3,
    paddingTop:7,
    paddingBottom:7, 
    bottom: 0,
    position:"absolute",
    backgroundColor: "#10535D",
    opacity: 0.8,
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
    height: "110%",
    width: "95%",
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FFFFFF",
    },
    photoAux: {
    height: 65,
    width: "95%",
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: "#FFFFFF",
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