import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
  } from 'react-native';
  
export default class PointSheet extends Component {
    constructor(props) {
        super(props);
    }

    render() { 
        return( 
            <View style={{alignItems: 'center'}}>                
                <View style={localStyles.dataSheet}>
                    <View style={localStyles.containerImages}>
                        <TouchableOpacity style={localStyles.containerLeft} onPress={() => this.changeImage3D(1)}>
                            <Image  source={require('../../../../images/despliegaizq.png')} />
                        </TouchableOpacity>
                        <View style>
                        <   Image style={{width:200,height:150}} source={require('../../../../images/amon1.jpg')} />
                        </View>
                        <TouchableOpacity style={localStyles.containerRight} onPress={() => this.changeImage3D(2)}>
                            <Image source={require('../../../../images/despliegader.png')} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => this.props.handlePressDataSheet()}>
                    {//<Image source={require('../../images/icons/RA/close.png')}  style={localStyles.closeButton}/>
                    }
                    
                    <Text style={localStyles.title}> Casa Saborío González (Casa Verde) {'\n'}</Text>

                    <Text style={localStyles.text}> "Forma y modo de disponer, tallar, y enlazar los materiales constructivos" {'\n'}</Text>
                    
                    <Text style={localStyles.text}> "A soga: las piezas están colocadas de forma que su lado es paralelo a la pared"{'\n'}</Text>

                    <Text style={localStyles.text}> "De espiga: ladrillo colocado en forma de especina o espega"{'\n'}</Text>

                    <Text style={localStyles.text}> (De la plaza, Morales, Bermejo, y Martinez, 2012, p.65){'\n'}</Text>
 
                    </TouchableOpacity>
                </View>
                
            </View>
        );
    }

}


var localStyles = StyleSheet.create({
    dataSheet : {
        flex:1,
        position: 'absolute', 
        justifyContent: 'center',
        backgroundColor: 'rgba(155, 155, 155, 0.2)',
        width: (Dimensions.get('window').width) * 0.9,
        bottom: (Dimensions.get('window').height) * 0.2,
        paddingHorizontal: 20,
        paddingTop:20,
    },
    containerImages: {
        flexDirection: 'row', 
        alignItems: 'center'
        
    },
    containerLeft:{
        flex:1,
        alignItems: 'center',
    },
    containerMiddle:{
        flex:5,
        alignItems: 'center',
    },
    containerRight:{
        flex:1,
        alignItems: 'center',
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

  module.exports = PointSheet;