import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
  } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import localStyles from "../../assets/styles/partials/dataSheet";
import { 
    DATA_SHEET_URL,
    USER_DATA,
} from '../../../constants/routesAPI';
import {
    makeBackendRequest,
} from '../../../helpers/helpers';

const FEATURE_ID = "?feature_id=";
const DEFAULT_ERROR_MESSAGE = "La edificación no presenta Ficha Técnica";

export default class DataSheet extends Component {
    constructor(props) {
        super(props);

        this.showDataSheet = this.showDataSheet.bind(this);
        this.showNoDataSheet = this.showNoDataSheet.bind(this);
        
        this.state = {
            informationText: "",
            build_year: "",
            current_owner: "",
            declaration_date: "",
            declaration_reason: "",
            decree_number: "",
            influence: "",
            dataSheetVisible: false,
            userData: null,
        }
    }

    componentDidMount(){
        this.get_backend_data();
    }

    render() { 
        return(      
            this.state.dataSheetVisible && (
                this.showDataSheet()
            )      
        );
    }

    showNoDataSheet(){
        this.props.handlePressDataSheet();
        this.props.showErrorToast(DEFAULT_ERROR_MESSAGE);
    }

    showDataSheet(){
        return (
        <View style={localStyles.container}>
        <View style={localStyles.dataSheet}>
            <TouchableOpacity onPress={() => this.props.handlePressDataSheet()}>
                <Text style={localStyles.title}> {this.props.houseArPressedName} {'\n'}</Text>
                
                <Text style={localStyles.title}>Motivos de la declaratoria: 
                    <Text style={localStyles.text}> {this.state.declaration_reason} {'\n'}</Text>
                </Text>
                
                <Text style={localStyles.title}>Año de construcción: 
                    <Text style={localStyles.text}> {this.state.build_year} {'\n'}</Text>
                </Text> 
                
                <Text style={localStyles.title}>Influencia: 
                    <Text style={localStyles.text}> {this.state.influence} {'\n'}</Text>
                </Text> 
                
                <Text style={localStyles.title}>Propietario actual: 
                    <Text style={localStyles.text}> {this.state.current_owner} {'\n'}</Text>
                </Text> 
        
                <Text style={localStyles.title}>Fecha de la declaratoria: 
                    <Text style={localStyles.text}> {this.state.declaration_date} {'\n'}</Text>
                </Text> 
                
                <Text style={localStyles.title}>Decreto N:
                    <Text style={localStyles.text}> {this.state.decree_number} {'\n'}</Text>
                </Text> 
            </TouchableOpacity>
        </View>
        </View>
        );
    }

    async get_backend_data() {
        await this.get_user_data();
        await this.get_brief_description();
    }

    async get_user_data() {
        const user_data_storage = await AsyncStorage.getItem(USER_DATA);
        this.setState({userData: JSON.parse(user_data_storage)});
    }

    async get_brief_description(){
        let URL_GET_INFO = DATA_SHEET_URL+FEATURE_ID+this.props.houseArPressedID;
        let response = await makeBackendRequest(URL_GET_INFO, "GET", this.state.userData);
        let responseJson = await response.json();
        if(responseJson != undefined){
            this.setState({
                informationText: responseJson.description,
                build_year: responseJson.build_year,
                current_owner: responseJson.current_owner,
                declaration_date: responseJson.declaration_date,
                declaration_reason: responseJson.declaration_reason,
                decree_number: responseJson.decree_number,
                influence: responseJson.influence,
                dataSheetVisible: true,
            });
        }else{
            this.showNoDataSheet();
        }
    } 
}

module.exports = DataSheet;