import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    AppRegistry,
    FlatList
} from 'react-native';
import CheckBox from 'react-native-check-box'
import Image from 'react-native-scalable-image'

const data = require('../../data/data.json');

const features = [
    "Patrimonio Arquitectónico",
    "Pasado perdido",
    "Secretos",
    "Naturaleza",
    "Cultura y arte",
    "Gastronomía",
    "Institucional",
    "Hospedaje",
    "Fotos 360°",
    "Modelos 3D",
    "Realidad Aumentada"
]

export default class FilterMenu extends Component{

    constructor(props){
        super(props);
        let categories = features;
        let filter_categories = []
        //fetches each category from data.json and makes an array of objects with each category
        for (category in categories){
            filter_categories.push({key: categories[category], active: false});
        }
        this.state = {
            filters: [],
            activeFilters: this.props.activeFilters,
            filters: filter_categories,
            allowDragging: true
        }
    }

    // It is called after the constructor
    componentDidMount(){
        this.setFilters()
    }

    // Sets the available filters
    setFilters(){

        var activeFilters = this.state.activeFilters.slice()
        var filters = this.state.filters.slice()

        for (activeIndex in activeFilters){
            if (activeFilters[activeIndex].active == true){
                for (filterIndex in filters){
                    if (filters[filterIndex].key === activeFilters[activeIndex].key){
                        filters[filterIndex].active = true
                    }
                }
            }
        }

        this.setState({
            filters: filters
        })
    }

    // Sets the state of the filter to active/innactive
    toggleFilter(key){

        var tmpFilters = this.state.filters.slice()

        for(i in tmpFilters){
            if (tmpFilters[i].key === key){
                tmpFilters[i].active = !tmpFilters[i].active

                this.setState({
                    filters: tmpFilters
                })

                this.sendActiveFilters()
                return 1
            }
        }
        return -1
    }

    // Sends a list with the active filters to Navigator
    sendActiveFilters(){

        var tmpFilters = this.state.filters.slice()
        var activeFilters = []

        for(i in tmpFilters){
            if (tmpFilters[i].active == true){
                activeFilters.push(tmpFilters[i])
            }
        }

        this.setState({
            activeFilter: activeFilters
        })

        this.props.getActiveFilters(activeFilters)
    }

    render() {

        return (
          
            <View style={styles.container}>
                <View style={styles.menu}>                   

                    <FlatList
                        style={styles.menuBox}
                        data={this.state.filters}
                        renderItem={({item}) => <CheckBox
                                                    style={ styles.filterStyle }
                                                    rightText={item.key}
                                                    rightTextStyle={{
                                                        color:'white',
                                                        fontSize: 16
                                                    }}
                                                    isChecked={item.active}
                                                    onClick={() => this.toggleFilter(item.key)}
                                                    checkedImage={<Image
                                                                        width={20}
                                                                        source={require('../../images/icons-temp/check.png')}
                                                                />}
                                                    unCheckedImage={<Image
                                                                        width={20}
                                                                        source={require('../../images/icons-temp/uncheck.png')}
                                                                    />}
                                                />}
                    />
                    
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 5,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    menu: {
        flexDirection: 'column',
        width: "34%",
        height: "67%",
        marginTop: "19.5%"
    },
    menuBox: {
        backgroundColor: 'rgba(0, 162, 181, 0.8)',
    },
    filterStyle: {
        flex: 1,
        width: 220,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 15,
        marginRight: 20
    }
});

AppRegistry.registerComponent('FilterMenu', () => FilterMenu);
