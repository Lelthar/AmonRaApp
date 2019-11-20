import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Switch,
    Text,
  } from 'react-native';

const SWITCH_MSG = "Cambia el switch para ver detalles de elementos del glosario";
const SWITCH_MSG_WEB = "Dirígete a la web de Amón_RA para ver más detalles del glosario";                                                                                                                                                        

export default class SwitchButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            switchValue: false,
            text: SWITCH_MSG,
        }
    }
    
    toggleSwitch = value => {
      //onValueChange of the switch this function will be called
      this.setState({ switchValue: value });
      this.props.handleSwitchClick(this.state.switchValue);
      //state changes according to switch
      if(this.state.switchValue == true){
        this.setState({
          text: SWITCH_MSG,
        });
      }else{
        this.setState({
          text: SWITCH_MSG_WEB,
        });
      }
    };
    
    render() {
      return (
        <View style={{position: 'absolute', bottom: "11%", justifyContent: 'center', alignItems: 'flex-start'}}>
          <Switch
            style={{ marginTop: 30 }}
            onValueChange={this.toggleSwitch}
            value={this.state.switchValue}
          />
          <Text style={localStyles.text  }> {this.state.text} {'\n'}</Text> 
        </View>           
      );
    }
}

var localStyles = StyleSheet.create({
  container : {
    position : 'absolute',
    marginLeft : 10,
  },
  imgContainer:{
    flex:5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareButton: {
    resizeMode:'contain',    
    flex:1,
    width: 40,
    height: 40,
  },
  text: {
    textAlign: "justify",
    color: '#6D6F70',
    fontSize: 13,
    fontFamily: "Barlow-Regular",
  },
});

module.exports = SwitchButton;
