import React, { Component } from 'react';
import {
  View,
} from 'react-native'; 

import {
  ViroVRSceneNavigator,
} from 'react-viro';

import VRController from './VRController';
import ARController from './ARController';
import D3Controller from './D3Controller';
import MenuImages from "../partials/MenuImages";
import PointSheet from "../partials/PointSheet";
import SwitchButtom from "../partials/SwitchButton";

const Initial3DScene = require('./D3Scene');
const sharedProps = {
  apiKey:"30EA748C-7956-4E0E-87A3-0EB2B0CBE931",
}

const NAVIGATOR_TYPE_VR = "VR";
const NAVIGATOR_TYPE_AR = "AR";
const NAVIGATOR_TYPE_3D = "3D";

export class ViromediaController extends Component {

  constructor(props) {

    super(props);
    this.closeDataPoint = this.closeDataPoint.bind(this);
    this.showDataPoint = this.showDataPoint.bind(this);
    this.changeMenuImage = this.changeMenuImage.bind(this);
    this._get3DNavigator = this._get3DNavigator.bind(this);
    this.state = {
      sharedProps : sharedProps, 
      navigatorType : this.props.navigation.state.params.do,
      content: this.props.navigation.state.params.filename,
      focusedScreen: true,

      //3D
      viro3dProps: {setInformation: this.closeDataPoint,
        id: this.props.navigation.state.params.filename, 
      },
      dataPoint: {},
      switchButtomVisible: true,
      menuViews: true,
      dataPointVisible: false,
    }
  }   

  componentDidMount() {
    if (this.state.navigatorType == NAVIGATOR_TYPE_AR){
      const { navigation } = this.props;
      navigation.addListener('willFocus', () =>
        this.setState({ focusedScreen: true })
      );
      navigation.addListener('willBlur', () =>
        this.setState({ focusedScreen: false })
      );
    }
  }

  render() { 
    if (this.state.navigatorType == NAVIGATOR_TYPE_AR && this.state.focusedScreen){
      return <ARController sharedProps={this.state.sharedProps} navigation={this.props.navigation}/>

    } else if (this.state.navigatorType == NAVIGATOR_TYPE_VR) {
      return <VRController sharedProps={this.state.sharedProps} content={this.state.content} navigation={this.props.navigation}/>

    } else if (this.state.navigatorType == NAVIGATOR_TYPE_3D) {
      return this._get3DNavigator();//<D3Controller sharedProps={this.state.sharedProps} content={this.state.content} navigation={this.props.navigation}/>
      
    } else{
      return null
    }
  }

  // Returns the ViroSceneNavigator which will start the 3D experience
  _get3DNavigator() {
    return (
      <View style={{flex:1}}>
        <ViroVRSceneNavigator 
          {...this.state.sharedProps}
          initialScene={{scene: Initial3DScene}} 
          vrModeEnabled={false}
          viroAppProps={this.state.viro3dProps}/>

        {/*
        {this.state.menuViews && (
          <MenuImages 
            dataImages={{id:this.state.viro3dProps.id,type:1}} 
            handleClickMenuImage={this.showDataPoint} />
            )
        }

        {!this.state.menuViews && (
          <MenuImages 
            dataImages={{id:this.state.viro3dProps.id,type:0}} 
            handleClickMenuImage={this.showDataPoint} />
            )
        }

        {this.state.dataPointVisible && (
          <PointSheet dataPoint={{data:this.state.dataPoint}} 
            handlePressDataSheet={this.closeDataPoint}/>
          )
        }*/}
        
        {/*this.state.switchButtomVisible && (
          <SwitchButtom handleSwitchClick={this.changeMenuImage} />
          )
        */}

      </View>
    );
  }

  changeMenuImage(type){
    this.setState({
      menuViews : type,
      dataPointVisible: false,
    });
  }

  // Enable or Disable DataSheet
  closeDataPoint(){
    this.setState({
      dataPointVisible : !this.state.dataPointVisible,
    });
  }

  // Enable or Disable DataSheet
  showDataPoint(data){
    if(!this.state.menuViews){
      this.setState({
        dataPointVisible : !this.state.dataPointVisible,
        dataPoint : data,
      });
    }
  }
}

export default ViromediaController;
