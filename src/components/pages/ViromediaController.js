import React, { Component } from 'react';

import VRController from './VRController';
import ARController from './ARController';
import D3Controller from './D3Controller';

const sharedProps = {
  apiKey:"30EA748C-7956-4E0E-87A3-0EB2B0CBE931",
}

const NAVIGATOR_TYPE_VR = "VR";
const NAVIGATOR_TYPE_AR = "AR";
const NAVIGATOR_TYPE_3D = "3D";

export class ViromediaController extends Component {

  constructor(props) {

    super(props);

    this.state = {
      sharedProps : sharedProps, 
      navigatorType : this.props.navigation.state.params.do,
      content: this.props.navigation.state.params.filename,
      focusedScreen: true,
    }
  }   

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('willFocus', () =>
      this.setState({ focusedScreen: true })
    );
    navigation.addListener('willBlur', () =>
      this.setState({ focusedScreen: false })
    );
  }

  render() { 
    if (this.state.navigatorType == NAVIGATOR_TYPE_AR && this.state.focusedScreen){
      return <ARController sharedProps={this.state.sharedProps} navigation={this.props.navigation}/>

    } else if (this.state.navigatorType == NAVIGATOR_TYPE_VR) {
      return <VRController sharedProps={this.state.sharedProps} content={this.state.content} navigation={this.props.navigation}/>

    } else if (this.state.navigatorType == NAVIGATOR_TYPE_3D) {
      return <D3Controller sharedProps={this.state.sharedProps} content={this.state.content} navigation={this.props.navigation}/>
      
    } else{
      return null
    }
  }
}

export default ViromediaController;
