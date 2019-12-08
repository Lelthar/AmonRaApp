import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
  } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import styles from "../../assets/styles/partials/infoMenu";

//----------Backend--------------
import { 
    BRIEF_DESCRIPTIONS_URL,
    USER_DATA,
    ARCHITECTURE_DATA,
} from '../../../constants/constants';
  
import {
    makeBackendRequest,
} from '../../../helpers/helpers'
  
//-------------------------------

const BY_FEATURE_ID = "?feature_id=";
const BY_DATA_ID = "?data_id=";
const NOT_ARCHITECTURE_DETAILS_MESSAGE = "La vista no presenta información arquitectónica";
const DATA_SHEET_ICON = require('../../assets/images/augmentedReality/ficha-tecnica.png');
const VIVENCIAS_ICON = require('../../assets/images/augmentedReality/vivenciass.png');
const EXTRA_INFO_ICON = require('../../assets/images/augmentedReality/mas-info.png');

export default class ARViewMenu extends Component {
    constructor(props) {
        super(props);
    
        this.toggleDataSheet = this.toggleDataSheet.bind(this);

        this.navigation = this.props.navigation;

        this.state = {
            buildingARPressed: this.props.houseArPressed,
            informationText : null,
            userData: null,
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
                    
                    <TouchableOpacity style={styles.rowButton} onPress= {() => this.goToArchitectureDetails() }>
                        <Image  source={EXTRA_INFO_ICON} />
                        <Text style={styles.textButton}> Info</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    
    
    toggleDataSheet = () => {
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
        let URL_GET_INFO = BRIEF_DESCRIPTIONS_URL+BY_FEATURE_ID+this.props.houseArPressed;
        let response = await makeBackendRequest(URL_GET_INFO, "GET", this.state.userData);
        // ToDo: Ponerle la validacion de si hay respuesta cuando Gerald lo arregle.
        let responseJson = await response.json();
        if(responseJson != undefined){
            this.setState({
                informationText: responseJson.description,
            });  
        }
    } 

    async get_architecture_data_by_id(dataID){
        let URL_GET_INFO = ARCHITECTURE_DATA+BY_DATA_ID+dataID;
        let response = await makeBackendRequest(URL_GET_INFO, "GET", this.state.userData);
        if(response.ok){
            let responseJson = await response.json();
            this.navigation.navigate('ArchitectureDetail', {placeInfo: responseJson}) 
        }
        else{
            this.props.showErrorToast(NOT_ARCHITECTURE_DETAILS_MESSAGE);
        }
    } 

    async goToArchitectureDetails() {
        await this.get_user_data();
        this.props.architectureDataID == 0 
        ? await this.get_architecture_data_by_id(1)
        : this.props.showErrorToast(NOT_ARCHITECTURE_DETAILS_MESSAGE);
    }
}


module.exports = ARViewMenu;
