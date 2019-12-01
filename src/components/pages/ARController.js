import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native'; 

import {
  ViroARSceneNavigator,
  ViroUtils,
} from 'react-viro';

import DataSheet from "../partials/DataSheet";
import InfoMenu from "../partials/InfoMenu";
import Toast from '../partials/Toast';
import ARNoSupport from '../partials/ARNoSupport';

const AR_SCENE = require('./ARScene');

const isARSupportedOnDevice = ViroUtils.isARSupportedOnDevice;

export class ARController extends Component {

  constructor(props) {
    super(props);

    this._getARNavigator = this._getARNavigator.bind(this);
    this.toggleDataSheet = this.toggleDataSheet.bind(this);
    this.showInfoMenu = this.showInfoMenu.bind(this);
    this.showToast = this.showToast.bind(this);

    this._getArNoSupport = this._getArNoSupport.bind(this);

    this._handleARNotSupported = this._handleARNotSupported.bind(this);
    this._handleARSupported = this._handleARSupported.bind(this);

    this.state = {
      sharedProps : this.props.sharedProps, 
      viroAppProps: {setInformation: this.showInfoMenu, updateWatchCount: this.updateWatchCount},
      infoMenuVisible : false,
      dataSheetVisible : false,
      descriptionVisible : true,
      houseArPressedID: null,
      houseArPressedName: null,
      toastVisible: false,
      scenaSource : true,
      watchCount: 0,
    }
    
  }   

  componentWillMount() {
    isARSupportedOnDevice(this._handleARNotSupported, this._handleARSupported);
  }

  _handleARSupported() {
    this.setState({
      scenaSource : true,
    });
  }

  _handleARNotSupported(reason) {
    this.setState({
      scenaSource : false, 
    });
  }

  render() { 
    return (this.state.scenaSource ? this._getARNavigator() : this._getArNoSupport());
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() { 
    return (
      <View style={{flex:1}}>
        <ViroARSceneNavigator 
          {...this.state.sharedProps}
          initialScene={{scene: AR_SCENE}} 
          onExitViro={this._exitViro} 
          viroAppProps={this.state.viroAppProps} />

        <Text> {this.state.watchCount}</Text>        
                                
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
  showInfoMenu(place, tittle){ 
    this.setState({
      infoMenuVisible : true,
      houseArPressedID: place,
      houseArPressedName: tittle,
    });
  }

  updateWatchCount = () => {
    this.setState({
      watchCount: this.state.watchCount + 1,
    })
  }

  // Returns the ViroSceneNavigator which will start the VR experience
  _getArNoSupport() {
    return (
      <ARNoSupport />
    );
  }

}

export default ARController;
