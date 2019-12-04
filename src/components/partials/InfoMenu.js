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
import styles from "../../assets/styles/partials/infoMenu";

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
const DATA_SHEET_ICON = require('../../assets/images/augmentedReality/ficha-tecnica.png');
const VIVENCIAS_ICON = require('../../assets/images/augmentedReality/vivenciass.png');
const EXTRA_INFO_ICON = require('../../assets/images/augmentedReality/mas-info.png');
const DIC_ARQ = {
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
            <View style={styles.infoContainer}>
                {this.props.descriptionVisible && (
                    <Text style={styles.textDescription}>{this.state.informationText}</Text>
                )}

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.rowButton} onPress={() => this.toggleDataSheet()} >
                        <Image source={DATA_SHEET_ICON} />
                        <Text style={styles.textButton}> Ficha técnica</Text>
                    </TouchableOpacity>
            
                    <TouchableOpacity style={styles.rowButton}>
                        <Image source={VIVENCIAS_ICON} />
                        <Text style={styles.textButton}> Vivencias</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.rowButton} onPress= {() => this.props.navigation.navigate('ArchitectureDetail',{goToScreen: this.props.navigation, placeInfo: DIC_ARQ}) }>
                        <Image  source={EXTRA_INFO_ICON} />
                        <Text style={styles.textButton}> Info</Text>
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
        console.log("Response",response);
        
        let responseJson = await response.json();
        console.log("JSON",responseJson);
        if(responseJson != undefined){
            this.setState({
                informationText: responseJson.description,
            });  
        }
    } 
}

module.exports = InfoMenu;