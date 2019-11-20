import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
  } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

//----------Backend--------------
import { 
    BRIEF_DESCRIPTIONS_URL,
    USER_DATA,
} from '../../../constants/constants';
  
import {
    makeBackendRequest,
} from '../../../helpers/helpers'
  
//-------------------------------

const FEATURE_ID = "?feature_id=";
const dataSheetIcon = require('../../../images/icons/RA/ficha-tecnica.png');
const vivenciasIcon = require('../../../images/icons/RA/vivenciass.png');
const extraInfoIcon = require('../../../images/icons/RA/mas-info.png');
const dicArq = {
    name: "name" , 
    description: "description", 
    direction: "direction",
    phone_number: "phone_number",
    facebook: "facebook",
    images_url: ["image1_url", 
                "image2_url", 
                "image3_url"]
};

export default class InfoMenu extends Component {
    constructor(props) {
        super(props);
    
        this.toggleDataSheet = this.toggleDataSheet.bind(this);
        
        this.state = {
            buildingARPressed: this.props.houseArPressed,
            informationText : null,
        }
    }

    componentDidMount(){
        this.get_backend_data();
    }

    render() { 
        return (
            <View style={localStyles.infoContainer}>
                {this.props.descriptionVisible && (
                    <Text style={localStyles.textDescription}>{this.state.informationText}</Text>
                )}

                <View style={localStyles.buttonsContainer}>
                    <TouchableOpacity style={localStyles.rowButton} onPress={() => this.toggleDataSheet()} >
                        <Image source={dataSheetIcon} />
                        <Text style={localStyles.textButton}> Ficha técnica</Text>
                    </TouchableOpacity>
            
                    <TouchableOpacity style={localStyles.rowButton}>
                        <Image source={vivenciasIcon} />
                        <Text style={localStyles.textButton}> Vivencias</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={localStyles.rowButton} onPress= {() => this.props.navigation.navigate('ArchitectureDetail',{goToScreen: this.props.navigation, placeInfo: dicArq}) }>
                        <Image  source={extraInfoIcon} />
                        <Text style={localStyles.textButton}> Info</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    
    
    toggleDataSheet(){
        this.props.handlePressDataSheet();
    }

    async get_backend_data() {
        await this.get_user_data()
        await this.get_brief_description();
    }

    async get_user_data() {
        const user_data_storage = await AsyncStorage.getItem(USER_DATA);
        this.setState({userData: JSON.parse(user_data_storage)});
    }

    async get_brief_description(){
        let URL_GET_INFO = BRIEF_DESCRIPTIONS_URL+FEATURE_ID+this.props.houseArPressed;
        let response = await makeBackendRequest(URL_GET_INFO, "GET", this.state.userData);
        let responseJson = await response.json();
        if(responseJson != undefined){
            this.setState({
                informationText: responseJson.description,
            });  
        }
    } 
}

var localStyles = StyleSheet.create({
    infoContainer : {
        padding:15, 
        bottom: 0,
        position:"absolute",
        backgroundColor:'rgba(54, 145, 160, 0.8)',
        width: (Dimensions.get('window').width),
    },
    buttonsContainer : {
        flexDirection: "row", 
        justifyContent: 'space-around',
    },
    rowButton : {
        flexDirection: "row", 
    },
    textButton:{
        color:"#1a606b",
        fontSize: 14,
    },
    textDescription:{
        color:'white',
        fontSize: 16, 
        marginBottom: 15,
    },
});

module.exports = InfoMenu;