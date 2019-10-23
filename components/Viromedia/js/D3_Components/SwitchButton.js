import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Switch,
  } from 'react-native';

export default class SwitchButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            switchValue: false,
        }
    }
    
    toggleSwitch = value => {
      //onValueChange of the switch this function will be called
      this.setState({ switchValue: value });
      this.props.handleSwitchClick(this.state.switchValue);
      //state changes according to switch
    };
    
    render() {
      return (
        <View style={localStyles.container}>
          <Switch
            style={{ marginTop: 30 }}
            onValueChange={this.toggleSwitch}
            value={this.state.switchValue}
          />
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
});

module.exports = SwitchButton;
