import React, { Component } from 'react';
import {
    View,
    Switch,
    Text,
} from 'react-native';
import localStyles from "../../assets/styles/partials/switchButton";

const SWITCH_MSG = "Cambia el switch para ver detalles de elementos del glosario";
const SWITCH_MSG_WEB = "Dirígete a la web de Amón_RA para ver más detalles del glosario";                                                                                                                                                        

export default class SwitchButton extends Component {
    constructor(props) {
      super(props);

      this.state = {
          switchValue: false,
          text: SWITCH_MSG,
      };
    }
    
    toggleSwitch = (value) => {
      this.setState({ switchValue: value });
      this.props.handleSwitchClick(this.state.switchValue);

      if(this.state.switchValue == true){
        this.setState({
          text: SWITCH_MSG,
        });
      }else{
        this.setState({
          text: SWITCH_MSG_WEB,
        });
      }
    }
    
    render() {
      return (
        <View style={localStyles.container}>
          <Switch
            style={localStyles.switch}
            onValueChange={this.toggleSwitch}
            value={this.state.switchValue}
          />
          <Text style={localStyles.text }> {this.state.text} {'\n'}</Text> 
        </View>           
      );
    }
}

module.exports = SwitchButton;
