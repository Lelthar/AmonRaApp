import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import CheckBox from 'react-native-check-box'
import Image from 'react-native-scalable-image'

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

import { connect } from "react-redux";

import {
  filterMenuAction,
  activeFiltersAction,
  menuResetAction,
} from "../../redux/actions/menuDataActions";

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

class FilterMenu extends Component{

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
      //activeFilters: this.props.data.ACTIVEFILTERS,
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

  render() {
      return (
        
        <View style={styles.container}>
          <View style={styles.menu}>

            <View style={styles.closeFilter}>
              <TouchableOpacity onPress={() => this.props.resetAll()} >
                <Icon
                  name='times'
                  size={20}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>

            <FlatList
              style={styles.menuBox}
              data={this.state.filters}
              renderItem={({item}) => 
                <CheckBox
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
                                  source={require('../../../images/icons-temp/check.png')}
                              />}
                  unCheckedImage={<Image
                                    width={20}
                                    source={require('../../../images/icons-temp/uncheck.png')}
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
    position: 'absolute', 
    left: 0,
    bottom: 0,
  },
  menu: {
    flex: 1,
    backgroundColor: 'rgba(0, 162, 181, 0.99)',
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
    marginRight: 20,
  },
  closeFilter: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 5,
    marginRight: 10,
  }
});

const filterMenuComponent = connect(mapStateToProps, mapDispatchToProps)(FilterMenu);
export default filterMenuComponent;