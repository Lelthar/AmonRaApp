import React, { Component } from 'react';
import {
    View,
    FlatList,
} from 'react-native';
import CheckBox from 'react-native-check-box'
import Image from 'react-native-scalable-image'
import { connect } from "react-redux";
import {
  filterMenuAction,
  activeFiltersAction,
  menuResetAction,
} from "../../redux/actions/menuDataActions";
import styles from "../../assets/styles/pages/filterMenu";

const mapStateToProps = state => {
  return {
    activeFilters: state.menuDataReducer.ACTIVEFILTERS,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFilterMenu: (data) => {
      dispatch(filterMenuAction(data));
    },
    setActiveFilters: (data) => {
      dispatch(activeFiltersAction(data));
    },
    resetAll: () => {
      dispatch(menuResetAction());
    },
  }
};

const CHECK_ICON = require('../../assets/images/icons/check.png');
const UNCHECK_ICON = require('../../assets/images/icons/uncheck.png');
const FEATURES_LIST = [
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
    "Realidad Aumentada",
];

class FilterMenu extends Component{

    constructor(props){
        super(props);

        let categories = FEATURES_LIST;
        let filter_categories = [];

        //fetches each category from data.json and makes an array of objects with each category
        for (category in categories){
            filter_categories.push({key: categories[category], active: false});
        };

        this.state = {
            filters: [],
            filters: filter_categories,
            allowDragging: true,
        }
    }

    componentDidMount(){
        this.setFilters()
    }

    // Sets the available filters
    setFilters(){
        let activeFilters = this.props.activeFilters.slice()
        let filters = this.state.filters.slice()

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
        let tmpFilters = this.state.filters.slice()

        for(i in tmpFilters){
            if (tmpFilters[i].key === key){
                tmpFilters[i].active = !tmpFilters[i].active

                this.setState({
                    filters: tmpFilters
                })

                this.sendActiveFilters();
                return 1
            }
        }
        return -1
    }

    // Sends a list with the active filters to Navigator
    sendActiveFilters(){
        let tmpFilters = this.state.filters.slice()
        let activeFilters = []

        for(i in tmpFilters){
            if (tmpFilters[i].active == true){
                activeFilters.push(tmpFilters[i])
            }
        }

        this.props.setActiveFilters(activeFilters);
    }

    getSelectionImage(source){
        return (
            <Image width={20} source={source} />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View>                   
                    <FlatList
                        style={styles.menuBox}
                        data={this.state.filters}
                        renderItem = {({item}) => 
                            <CheckBox
                                style={ styles.filterStyle }
                                rightText={item.key}
                                rightTextStyle={styles.rightText}
                                isChecked={item.active}
                                onClick={() => this.toggleFilter(item.key)}
                                checkedImage={this.getSelectionImage(CHECK_ICON)}
                                unCheckedImage={this.getSelectionImage(UNCHECK_ICON)}
                            />}
                    />
                    
                </View>
            </View>
        );
    }
}

const filterMenuComponent = connect(mapStateToProps, mapDispatchToProps)(FilterMenu);
export default filterMenuComponent;
