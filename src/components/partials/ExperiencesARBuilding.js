import React, { Component } from 'react';
import {
    View,
    Image,
    Text, 
    ScrollView,
  } from 'react-native';
import styles from "../../assets/styles/partials/experiencesARBuilding";

class ExperiencesARBuilding extends Component {
    constructor(props) {
        super(props);
        //this.navigation = this.props.navigation;
        this.state = {
            name: this.props.navigation.state.params.name,
            description: this.props.navigation.state.params.description,
            Image: this.props.navigation.state.params.image,
        }
    }

    render() { 
        return( 
            <View style={styles.container}>
                <Image 
                    style={styles.houseImage} 
                    source={{uri: this.state.image}}/>

                <Text style={styles.houseTittle}>{this.state.name}</Text>

                <ScrollView style={styles.scrollView}>
                    <Text style={styles.houseDescription}>
                        {this.state.description}
                    </Text>
                </ScrollView>
            </View>
        );
    }
}

export default (ExperiencesARBuilding);