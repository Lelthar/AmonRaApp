import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import styles from "../../assets/styles/pages/useGuide";
import HamburgerMenu from '../partials/HamburgerMenu';
import { connect } from "react-redux";

const buttonMap = require('../../assets/images/useGuide/buttonMap.png');
const buttonRA = require('../../assets/images/useGuide/buttonRA.png');
const buttonVirtualVisit = require('../../assets/images/useGuide/buttonVirtualVisit.png');
const buttonUrbanOffer = require('../../assets/images/useGuide/buttonUrbanOffer.png');
const buttonTimeline = require('../../assets/images/useGuide/buttonTimeline.png');
const buttonCompleteGuide = require('../../assets/images/useGuide/buttonCompleteGuide.png');

const mapStateToProps = state => {
  return {
    menuSide: state.menuDataReducer.MENUSIDE,
  }
};

class UseGuide extends Component {
  constructor(props) {
      super(props);
      this.navigation = this.props.navigation;
  }

  goToVideoMap = () => {
    this.props.navigation.navigate('VideoGuidePlayer', {goToScreen:this.props.navigation, videoID:'395989564'});
  }

  goToVideoRA = () => {
    this.props.navigation.navigate('VideoGuidePlayer', {goToScreen:this.props.navigation, videoID:'395989594'});
  }

  goToVideoVirtual = () => {
    this.props.navigation.navigate('VideoGuidePlayer', {goToScreen:this.props.navigation, videoID:'395989618'});
  }

  goToVideoUrban = () => {
    this.props.navigation.navigate('VideoGuidePlayer', {goToScreen:this.props.navigation, videoID:'395989669'});
  }

  goToVideoTime = () => {
    this.props.navigation.navigate('VideoGuidePlayer', {goToScreen:this.props.navigation, videoID:'395989695'});
  }

  goToVideoComplete = () => {
    this.props.navigation.navigate('VideoGuidePlayer', {goToScreen:this.props.navigation, videoID:'395989709'});
  }

  render() { 
    return (
      <View style={ styles.container }>

        <TouchableOpacity style = {styles.button} onPress={()=>this.goToVideoMap()}>
          <Image resizeMode= 'stretch' style={styles.imageResizeAndFillParent} source={buttonMap} />
        </TouchableOpacity>

        <TouchableOpacity style = {styles.button} onPress={()=>this.goToVideoRA()}>
          <Image resizeMode= 'stretch' style={styles.imageResizeAndFillParent} source={buttonRA} />
        </TouchableOpacity>

        <TouchableOpacity style = {styles.button} onPress={()=>this.goToVideoVirtual()}>
          <Image resizeMode= 'stretch' style={styles.imageResizeAndFillParent} source={buttonVirtualVisit} />
        </TouchableOpacity>

        <TouchableOpacity style = {styles.button} onPress={()=>this.goToVideoUrban()}>
          <Image resizeMode= 'stretch' style={styles.imageResizeAndFillParent} source={buttonUrbanOffer} />
        </TouchableOpacity>

        <TouchableOpacity style = {styles.button} onPress={()=>this.goToVideoTime()}>
          <Image resizeMode= 'stretch' style={styles.imageResizeAndFillParent} source={buttonTimeline} />
        </TouchableOpacity>

        <TouchableOpacity style = {styles.button} onPress={()=>this.goToVideoComplete()}>
          <Image resizeMode= 'stretch' style={styles.imageResizeAndFillParent} source={buttonCompleteGuide} />
        </TouchableOpacity>

        {this.props.menuSide && (
          <HamburgerMenu navigation={this.props.navigation} /> 
        )}
      </View>
    );
  }
}

export default connect(mapStateToProps,null)(UseGuide);
