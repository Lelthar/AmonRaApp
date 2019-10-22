import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
  } from 'react-native';

import Orientation from 'react-native-orientation-locker';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';  
  
export default class PointSheet extends Component {
    constructor(props) {
        super(props);
    }

    _onOrientationDidChange = (orientation) => {
        //console.log("Puto el que lo lea: "+orientation)
        if (orientation == 'LANDSCAPE-LEFT') {
          //do something with landscape left layout
        } else {
          //do something with portrait layout
        }
      };
    
    componentDidMount() {
    
      Orientation.getAutoRotateState((rotationLock) => this.setState({rotationLock}));
      //this allows to check if the system autolock is enabled or not.
  
      Orientation.lockToPortrait(); //this will lock the view to Portrait

      Orientation.addOrientationListener(this._onOrientationDidChange);
    }

    render() { 
        return( 
          <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>                
              <View style={localStyles.dataSheet}>
                <View style={localStyles.containerImages}>
                    <TouchableOpacity>
                        <Image  source={require('../../../../images/despliegaizq.png')} />
                    </TouchableOpacity>

                    <Image style={{width:200,height:150}} source={require('../res/gf2.png')} />

                    <TouchableOpacity>
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
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        width: wp('85%'),
        paddingHorizontal: 20,
        paddingTop:20,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    containerImages: {
        flexDirection: 'row', 
        alignItems: 'center',
        marginBottom: "2.5%",
        justifyContent: 'space-around'
    },
    title: {
        fontSize: 15,
        fontFamily: "Barlow-Regular",
        color: "#0C5B60",
        fontWeight: 'bold',
        textAlign: "center",
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
