import React from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Text
} from 'react-native';

import styles from "../../assets/styles/partials/briefInformation";

import {
  CLOSE_IMAGE,
  MORA_INFORMATION_IMAGE,
  NAVIGATION_IMAGE,
} from "../../assets/constants/briefInformation";

import { connect } from "react-redux";
import { showBriefInformationAction } from "../../redux/actions/briefInformationActions";

const mapStateToProps = state => {
  return {
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setInformationVisible: (data) => {
      dispatch(showBriefInformationAction(data));
    },
  };
};

const BriefInformation = (props) => {

  toggleInformation = () => {
    props.setInformationVisible(false);
  };

  return (
    <View style={styles.briefInformationContainer} >
      <View style={{flex:6}} >
        <View style={{flex:1, marginBottom:5}} >
          <Text style={{color:'white',fontSize: 17,fontWeight:"bold"}} >{props.marker.title}</Text>
        </View>
        <View style={{flex:1,marginBottom:5}} >
          <Text style={styles.briefInformationText} >{"Dirección: "+props.marker.direction}</Text>
          <Text style={styles.briefInformationText} >{"Tel: "+props.marker.tel}</Text>
            { props.marker.facebook != "" && (
              <Text style={styles.briefInformationText} >{"Facebook: "+props.marker.facebook}</Text>
            )}
        </View>
        <View style={{flex:0.5}} />
        { props.marker.category == "Realidad Aumentada" && (
          <View style={{flex:1}} >
            <Text style={{color:'white',fontSize: 13}}>{"Visita este lugar para descubrir más RA"}</Text>
          </View>
        )}
            
      </View>

      <View style={{flex:1}} >
        <View style={{flex:1}} >
          <TouchableOpacity style={{flex: 1, alignItems: 'flex-end'}} onPress={toggleInformation} >
            <Image source={CLOSE_IMAGE} />
          </TouchableOpacity>
        </View>
        <View style={{flex:1, marginTop: 20}} >
          <TouchableOpacity style={{flex: 1, alignItems: 'flex-end'}} onPress={()=> props.navigation.navigate('Place', {marker: props.marker})} >
            <Image source={MORA_INFORMATION_IMAGE} />
          </TouchableOpacity>
        </View>
        <View style={{flex:1}}>
          <TouchableOpacity style={{flex: 1,alignItems: 'flex-end'}} onPress={()=> console.log("Ir")} >
            <View style={{flexDirection: 'row'}} >
              <Text style={{color:'white',fontSize: 16}}>ir </Text>
              <Image source={NAVIGATION_IMAGE} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BriefInformation);