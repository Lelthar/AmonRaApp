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

const Initial3DScene = require('./D3Scene');

export class D3Controller extends Component {

  constructor(props) {
    super(props);

    this.closeDataPoint = this.closeDataPoint.bind(this);
    this.showDataPoint = this.showDataPoint.bind(this);
    this.changeMenuImage = this.changeMenuImage.bind(this);

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
      dataPointViewVisible: false,
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

        {this.state.dataPointVisible && (//PointSheet
          <PointSheet dataPoint={{data:this.state.dataPoint}} 
            handlePressDataSheet={this.closeDataPoint}/>
          )
        }

        {this.state.dataPointViewVisible && (//PointSheet
          <PointSheetView dataPoint={{data:this.state.dataPoint}} 
            handlePressDataSheet={this.closeDataPoint}/>
          )
        }
        
        {this.state.switchButtomVisible && (
          <SwitchButtom handleSwitchClick={this.changeMenuImage} />
          )
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

  closeDataPoint(){
    if(!this.state.menuViews){
      this.setState({
        dataPointVisible : false,
      });
    }else{
      this.setState({
        dataPointViewVisible : false,
      });
    }
  }

  showDataPoint(data){
    if(!this.state.menuViews){
      this.setState({
        dataPointVisible : true,
        dataPoint : data,
      });
    }else{
      this.setState({
        dataPointViewVisible : true,
        dataPoint : data,
      });
    }
  }
}

export default D3Controller;
