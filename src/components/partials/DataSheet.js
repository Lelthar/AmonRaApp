import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    ToastAndroid,
  } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

//----------Backend--------------
import { 
    DATA_SHEET_URL,
    USER_DATA,
} from '../../../constants/constants';

import {
    makeBackendRequest,
} from '../../../helpers/helpers';

//-------------------------------

const FEATURE_ID = "?feature_id=";
const defaultErrorMessage = "La edificación no presenta Ficha Técnica";

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
        this.props.showErrorToast(defaultErrorMessage);
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

var localStyles = StyleSheet.create({
    container : {
        alignItems: 'center',
    },
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
        width: 10,
        height: 10,
        left: (Dimensions.get('window').width)*0.8,
    },
});

module.exports = DataSheet;