import React, { Component } from 'react';
import {
  View,
} from 'react-native'; 

import {
  ViroARSceneNavigator,
} from 'react-viro';

import DataSheet from "./js/AR_Components/DataSheet";
import InfoMenu from "./js/AR_Components/InfoMenu";
import Toast from './js/AR_Components/Toast';

const InitialARScene = require('./js/ARScene');

export class ARController extends Component {

  constructor(props) {
    super(props);

    this._getARNavigator = this._getARNavigator.bind(this);
    this.toggleDataSheet = this.toggleDataSheet.bind(this);
    this.showInfoMenu = this.showInfoMenu.bind(this);
    this.showToast = this.showToast.bind(this);

    this.state = {
      sharedProps : this.props.sharedProps, 
      viroAppProps: {setInformation: this.showInfoMenu},
      infoMenuVisible : false,
      dataSheetVisible : false,
      descriptionVisible : true,
      houseArPressed: null,
      toastVisible: false,
    }
  }   

  render() { 
      return this._getARNavigator();
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() { 
    return (
      <View style={{flex:1}}>
        <ViroARSceneNavigator 
          {...this.state.sharedProps}
          initialScene={{scene: InitialARScene}} 
          onExitViro={this._exitViro} 
          viroAppProps={this.state.viroAppProps} />
                                
        {this.state.infoMenuVisible && (
          <InfoMenu 
            handlePressDataSheet={this.toggleDataSheet} 
            descriptionVisible={this.state.descriptionVisible} 
            houseArPressed={this.state.houseArPressedID} 
            navigation={this.props.navigation}/> 
        )}

        {this.state.dataSheetVisible && (
          <DataSheet 
            handlePressDataSheet={this.toggleDataSheet} 
            houseArPressedID={this.state.houseArPressedID} 
            houseArPressedName={this.state.houseArPressedName} 
            showErrorToast={this.showToast}/>
        )}

        {this.state.toastVisible && (
          <Toast visible={this.state.toastVisible} message={this.state.toastMessage}/>
        )}
      </View>
    );
  }

  showToast(message){
    this.setState({
      toastVisible : !this.state.toastVisible,
      toastMessage : message,
    });
  }

  // Enable or Disable DataSheet
  toggleDataSheet(){
    this.setState({
      dataSheetVisible : !this.state.dataSheetVisible,
      descriptionVisible : !this.state.descriptionVisible,
    });
  }

  // Show extra information of a building.
  showInfoMenu(place){ 
    this.setState({
      infoMenuVisible : true,
      houseArPressed: place,
    });
  }

}

export default ARController;
