import React from 'react';
import {
  TouchableOpacity,
  View,
  Text
} from 'react-native';

import styles from "../../assets/styles/partials/briefInformation";

import Icon from 'react-native-vector-icons/FontAwesome';

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

  getPropsFromMarker = (marker) => {
    return {
      title: marker.title,
      description: marker.description,
      direction: marker.direction,
      phone_number: marker.tel,
      facebook: marker.facebook,
      images_url_1: marker.images_url[0], 
      images_url_2: marker.images_url[1], 
      images_url_3: marker.images_url[2],
      hasTitle: true,
      category: marker.category,
    };
  }

  return (
    <View style={styles.briefInformationContainer} >
      <View style={{flex:6}} >
        <View style={{flex:1, marginBottom:5}} >
          <Text style={{color:'white',fontSize: 17,fontWeight:"bold"}} >{props.marker.title}</Text>
        </View>
        <View style={{flex:1,marginBottom:5}} >
          { props.marker.direction != "" && (
            <Text style={styles.briefInformationText} >{"Dirección: "+props.marker.direction}</Text>
          )}
          { props.marker.tel != "" && (
            <Text style={styles.briefInformationText} >{"Tel: "+props.marker.tel}</Text>
          )}
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

        { props.marker.category == "Fotos 360°" && (
          <View style={{flex:1}} >
            <Text style={{color:'white',fontSize: 13}}>{"Dirígete a la sección Visita Virtual para ver Fotos 360"}</Text>
          </View>
        )}

        { props.marker.category == "Modelos 3D" && (
          <View style={{flex:1}} >
            <Text style={{color:'white',fontSize: 13}}>{"Dirígete a la sección Visita Virtual para ver Modelo 3D"}</Text>
          </View>
        )}
            
      </View>

      <View style={{flex:1}} >
        <View style={{flex:1}} >
          <TouchableOpacity style={{flex: 1, alignItems: 'flex-end'}} onPress={toggleInformation} >
            <Icon
              name='times'
              size={22}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
        <View style={{flex:1, marginTop: 20}} >
          <TouchableOpacity style={{flex: 1, alignItems: 'flex-end'}} onPress={()=> props.navigation.navigate('SeeMore', getPropsFromMarker(props.marker))} >
            <Icon
              name='plus-circle'
              size={30}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BriefInformation);
