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

        {this.state.dataPointVisible && (
          <PointSheet dataPoint={{data:this.state.dataPoint}} 
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

  // <D3Controller sharedProps={this.state.sharedProps} content={this.state.content} navigation={this.props.navigation}/>

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

export default D3Controller;
