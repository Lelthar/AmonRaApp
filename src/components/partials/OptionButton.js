import React from 'react';
import {
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

const OptionButton = (props) => {
  return (
    <View>
      <TouchableOpacity style={props.style} onPress={props.goTo} >
        <Image source={props.image} />
      </TouchableOpacity> 
    </View>
  );
};

export default OptionButton;
