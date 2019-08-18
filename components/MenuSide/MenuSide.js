import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    AppRegistry,
    TouchableOpacity,
    FlatList
} from 'react-native';

export default class MenuSide extends Component {

    constructor(props){

        super(props);

        key_discover_neighborhood = "Descubrí Barrio Amón";
        key_origin_neighborhood = "• Origen del Barrio";
        key_experiences = "• Vivencias";
        key_architecture = "• Arquitectura";
        key_more_amonra = "Más de Amón_RA";
        key_use_guide = "Guía de uso";

        this.state = {
            options: [
                {
                    key: key_discover_neighborhood,
                    subOptions: [
                        { key:  key_origin_neighborhood},
                        { key: key_experiences },
                        { key: key_architecture }
                    ],
                    active: false
                },
                {
                    key: key_more_amonra
                },
                {
                    key: key_use_guide
                }
            ],
            containerDinamicStyles: {
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "flex-end"
            }
        }
    }

    /*goTo(option, options){

        var tmpOptions = options.slice()

        for(optionIndex in tmpOptions){
            if (tmpOptions[optionIndex].key === option){
                if (typeof tmpOptions[optionIndex].active != 'undefined'){
                    tmpOptions[optionIndex].active = !(tmpOptions[optionIndex].active);
                }
                else {
                    // Change to real screen name
                    if(option == key_origin_neighborhood ){
                      this.setState({color: false})
                      return this.props.goToScreen('Origin', [])
                    }
                    if(option == key_experiences ){
                      return this.props.goToScreen('Experiences', {goToScreen: this.props.goToScreen})
                    }
                    if(option == key_architecture ){
                      return this.props.goToScreen('Architecture', {goToScreen: this.props.goToScreen})
                    }
                    if(option == key_more_amonra){
                      return this.props.goToScreen('MoreAmonRA', {goToScreen: this.props.goToScreen})
                    }
                    if(option == key_use_guide){
                      this.props.toggleShowGuide();
                      return;
                    }
                }
            }
        }
        this.setState ({
            options: tmpOptions
        })
    }*/

    render() {

        return (
            <View style={this.state.containerDinamicStyles}>
                <View style={styles.menu}>
                    <FlatList
                        style={styles.menu_box}
                        data={this.state.options}
                        renderItem={({item}) => {
                            let parentData = item;
                            return (
                                <View style={styles.option}>
                                    <TouchableOpacity style={[styles.options_style, item.active && styles.options_style_active]}
                                        onPress={() => console.log("nothing")}>
                                        <Text style={styles.letters_appereance}>
                                            {item.key}
                                        </Text>
                                    </TouchableOpacity>
                                    {item.active  &&
                                        <View>
                                            <FlatList
                                                data={item.subOptions}
                                                renderItem={({item}) =>
                                                        <TouchableOpacity style={styles.suboptions_style}
                                                            onPress={() => console.log("nothing")}>
                                                            <Text style={styles.letters_appereance}>
                                                                {item.key}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    }
                                            />
                                        </View>
                                    } 
                                </View>
                            )}
                        }
                    />
                </View>
            </View>

        );
    }
}


const styles = StyleSheet.create( {
    menu: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flex: 1
    },

    menu_box: {
        opacity: 0.8
    },

    options_style: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 45,
        paddingRight: 35,
        borderBottomWidth: 1,
        borderBottomColor: "#13535C"
    },

    options_style_active: {
        backgroundColor : "#13535C"
    },

    suboptions_style: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 65,
        backgroundColor : "#008a99",
        borderBottomWidth: 1,
        borderBottomColor: "#13535C"
    },

    option: {
        backgroundColor: '#00A2B5'
    },

    letters_appereance: {
        color:'#fff',
        fontSize: 20
    }

});

AppRegistry.registerComponent('MenuSide', () => MenuSide);