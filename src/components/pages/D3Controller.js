import React, { Component } from 'react';
import {
  View,
} from 'react-native'; 

import {
  ViroVRSceneNavigator,
} from 'react-viro';

import MenuImages from "../partials/MenuImages";
import PointSheet from "../partials/PointSheet";
import PointSheetView from "../partials/PointSheetView";
import SwitchButtom from "../partials/SwitchButton";
import CloseButton from "../partials/CloseButton";

const D3_SCENE = require('./D3Scene');

export class D3Controller extends Component {

  constructor(props) {
    super(props);

    this.closeDataPoint = this.closeDataPoint.bind(this);
    this.showDataPoint = this.showDataPoint.bind(this);
    this.changeMenuImage = this.changeMenuImage.bind(this);
    this.closeScene3D = this.closeScene3D.bind(this);

    this.state = {
      sharedProps : this.props.sharedProps, 
      viro3dProps: {
        setInformation: this.closeDataPoint,
        id: this.props.content, 
      },
      dataPoint: {},
      switchButtomVisible: true,
      menuViews: true,
      dataPointVisible: false,
      dataPointVisible1: false,
      dataPointViewVisible: false,
      dataPointViewVisible1: false,
    }
  }   

  componentDidMount() {
    if(this.state.viro3dProps.id==341 | this.state.viro3dProps.id==342){
      this.setState({
        switchButtomVisible: false,
      });
    }
  }

  render() { 
    return (
      <View style={{flex:1}}>
        <ViroVRSceneNavigator 
          {...this.state.sharedProps}
          initialScene={{scene: D3_SCENE}} 
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

        {this.state.dataPointVisible && (//PointSheet
          <PointSheet dataPoint={{data:this.state.dataPoint}} 
            handlePressDataSheet={this.closeDataPoint}/>
          )
        }

        {this.state.dataPointVisible1 && (//PointSheet
          <PointSheet dataPoint={{data:this.state.dataPoint}} 
            handlePressDataSheet={this.closeDataPoint}/>
          )
        }

        {this.state.dataPointViewVisible && (//PointSheet
          <PointSheetView dataPoint={{data:this.state.dataPoint}} 
            handlePressDataSheet={this.closeDataPoint}/>
          )
        }

        {this.state.dataPointViewVisible1 && (//PointSheet
          <PointSheetView dataPoint={{data:this.state.dataPoint}} 
            handlePressDataSheet={this.closeDataPoint}/>
          )
        }
        
        {this.state.switchButtomVisible && (
          <SwitchButtom handleSwitchClick={this.changeMenuImage} />
          )
        }

        {
          <CloseButton handlePressClose={this.closeScene3D} />
        }

      </View>
    );
  }

  changeMenuImage(type){
    this.setState({
      menuViews : type,
      dataPointVisible: false,
      dataPointVisible1: false,
      dataPointViewVisible: false,
      dataPointViewVisible1: false,
    });
  }

  showDataPoint(data){
    if(!this.state.menuViews){
      this.setState({
        dataPointVisible : true,
        dataPointVisible1 : false,
        dataPoint : data,
      });
      if(this.state.dataPointVisible){
        this.setState({
          dataPointVisible : false,
          dataPointVisible1 : true,
          dataPoint : data,
        });
      }
    }else{
      this.setState({
        dataPointViewVisible : true,
        dataPointViewVisible1 :false,
        dataPoint : data,
      });
      if(this.state.dataPointViewVisible){
        this.setState({
          dataPointViewVisible1 : true,
          dataPointViewVisible : false,
          dataPoint : data,
        });
      }
    }
    console.log(this.state.dataPoint);
  }

  closeDataPoint(){
    if(!this.state.menuViews){
      this.setState({
        dataPointVisible : false,
        dataPointVisible1 : false,
      });
    }else{
      this.setState({
        dataPointViewVisible : false,
        dataPointViewVisible1 : false,
      });
    }
  }

  closeScene3D(){
    this.props.navigation.goBack()
  }
}

export default D3Controller;
