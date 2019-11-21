import React, { Component } from 'react';
import {
    View,
    Image,
    Text, 
    ScrollView,
  } from 'react-native';
import styles from "../../assets/styles/partials/experiencesARBuilding";

class ExperiencesDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imgHeader : this.props.navigation.state.params.imgHeader,
            tittle : this.props.navigation.state.params.tittle,
            description : this.props.navigation.state.params.description
        };
    }

    render() { 
        return( 
            <View style={styles.container}>
                <Image style={styles.houseImage} 
                       source={{uri: this.state.imgHeader}}/>

                <Text style={styles.houseTittle}>{this.state.tittle}</Text>

                <ScrollView style={styles.scrollView}>
                    <Text style={styles.houseDescription}>{this.state.description}</Text>
                </ScrollView>
            </View>
        );
    }
}

export default (ExperiencesDetail);