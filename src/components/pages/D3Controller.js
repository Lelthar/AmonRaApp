import React, { Component } from 'react';
import {
  View,
} from 'react-native'; 

import {
  ViroVRSceneNavigator,
} from 'react-viro';

import MenuImages from "../partials/MenuImages";
import PointSheet from "../partials/PointSheet";
import SwitchButtom from "../partials/SwitchButton";
import dataJson from "../../assets/files/data3D.json";

const Initial3DScene = require('./3DScene');

export class D3Controller extends Component {

  constructor(props) {
    super(props);

    this.closeDataPoint = this.closeDataPoint.bind(this);
    this.showDataPoint = this.showDataPoint.bind(this);
    this.changeMenuImage = this.changeMenuImage.bind(this);

    this.state = {
      sharedProps : this.props.sharedProps, 
      menuViews: true,
      viro3dProps: {setInformation: this.closeDataPoint,
        id: this.props.content, 
      },
      dataPointVisible: false,
      dataPoint: {},
      switchButtomVisible: true,
    }
  }   

  componentDidMount(){
      if(this.state.viro3dProps.id==261 | this.state.viro3dProps.id==262){
        this.setState({
          switchButtomVisible: false,
        });
      }
  }

  render() { 
      return this._get3DNavigator();
  }

  // Returns the ViroSceneNavigator which will start the 3D experience
  _get3DNavigator() {
    return (
      <View style={{flex:1}}>
        <ViroVRSceneNavigator 
          {...this.state.sharedProps}
          initialScene={{scene: Initial3DScene}} 
          onExitViro={this._exitViro} 
          vrModeEnabled={false}
          viroAppProps={this.state.viro3dProps}/>

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

        {this.state.dataPointVisible //PointSheet
          ? <PointSheet dataPoint={{data:this.state.dataPoint}} 
              handlePressDataSheet={this.closeDataPoint}/>
          : null
        }
        
        {this.state.switchButtomVisible 
          ? <SwitchButtom handleSwitchClick={this.changeMenuImage} />
          : null
        }

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

  _views3dSelect(objectName){
    const objects = {
      250 : dataJson.houses.GonzalesFeo.views,
      251 : dataJson.houses.CentroCine.views,
      252 : dataJson.houses.CasaVerde.views,
      254 : dataJson.houses.AlianzaFrancesa.views,
      256 : dataJson.houses.CastilloMoro.views,
      261 : dataJson.houses.QuesadaAvendano.views,
      262 : dataJson.houses.SerranoBonilla.views,
    };
    return objects[objectName];
  }

  _points3dSelect(objectName){
    const objects = {
      250 : dataJson.houses.GonzalesFeo.views,
      251 : dataJson.houses.CentroCine.views,
      252 : dataJson.houses.CasaVerde.views,
      254 : dataJson.houses.AlianzaFrancesa.views,
      256 : dataJson.houses.CastilloMoro.points,
      261 : dataJson.houses.QuesadaAvendano.views,
      262 : dataJson.houses.SerranoBonilla.views,
    };
    return objects[objectName];
  }

}

export default D3Controller;
