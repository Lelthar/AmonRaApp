import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
  } from 'react-native';

  
export default class DataSheet extends Component {
    constructor(props) {
        super(props);
    }

    render() { 
        return( 
            <View style={{alignItems: 'center'}}>
                
                <View style={localStyles.dataSheet}>
                    <TouchableOpacity onPress={() => this.props.handlePress()}>
                    {//<Image source={require('../../images/icons/RA/close.png')}  style={localStyles.closeButton}/>
                    }
        
                    <Text style={localStyles.title}> Casa Saborío González (Casa Verde) {'\n'}</Text>
                    
                    <Text style={localStyles.title}> Motivos de la declaratoria: 
                        <Text style={localStyles.text}> El inmueble fue construido a principios del sigio XX. Durante la época del auge en los mercados mundiales de la exportación del café de Costa Rica por lo que presenta importantes valores históricos, culturales y contextuales {'\n'}</Text>
                    </Text>
                    
                    <Text style={localStyles.title}> Año de construcción: 
                        <Text style={localStyles.text}> 1913-1915 {'\n'}</Text>
                    </Text> 
                    
                    <Text style={localStyles.title}> Influencia: 
                        <Text style={localStyles.text}> Estilo Victoriano{'\n'}</Text>
                    </Text> 
                    
                    <Text style={localStyles.title}> Propietario actual: 
                        <Text style={localStyles.text}> Instituto Tecnológico de Costa Rica{'\n'}</Text>
                    </Text> 
            
                    <Text style={localStyles.title}> Fecha de la declaratoria: 
                        <Text style={localStyles.text}> 14/Dic/2017{'\n'}</Text>
                    </Text> 
                    
                    <Text style={localStyles.title}> Decreto N:
                        <Text style={localStyles.text}> 40662-C. La Gaceta N 232{'\n'}</Text>
                    </Text> 
                    </TouchableOpacity>
                </View>
                
            </View>
        );
    }

}


var localStyles = StyleSheet.create({
    dataSheet : {
        position: 'absolute', 
        justifyContent: 'center',
        backgroundColor: 'white',
        width: (Dimensions.get('window').width) * 0.9,
        height: (Dimensions.get('window').height) * 0.6,
        bottom: (Dimensions.get('window').height)/2 * 0.2,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 15,
        fontFamily: "Barlow-Regular",
        color: "#0C5B60",
        fontWeight: 'bold',
    },
    text: {
        fontWeight: 'normal',
        color: '#6D6F70',
        fontSize: 13,
        fontFamily: "Barlow-Regular",
    },
    closeButton: {
        justifyContent: 'flex-end',
        //position: 'absolute',
        width: 10,
        height: 10,
        left: (Dimensions.get('window').width)*0.8,

    }
});

  module.exports = DataSheet;