import React, { Component } from 'react';
import {
    View,
    Image,
    Text, 
    ScrollView,
  } from 'react-native';
import styles from "../../assets/styles/partials/experiencesARBuilding";

const HOUSE_IMAGE = "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FAlianzaCulturalFrancoCostarricense%2F1-02.png?alt=media&token=65186a23-6631-41d6-b036-030b6512397a";

class ExperiencesARBuilding extends Component {
    constructor(props) {
        super(props);
        //this.navigation = this.props.navigation;
    }

    render() { 
        return( 
            <View style={styles.container}>
                <Image 
                    style={styles.HOUSE_IMAGE} 
                    source={{uri: HOUSE_IMAGE}}/>

                <Text style={styles.houseTittle}>Default Tittle</Text>

                <ScrollView style={styles.scrollView}>
                    <Text style={styles.houseDescription}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                        It has survived not only five centuries, but also the leap into electronic typesetting, 
                        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
                        containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker 
                        including versions of Lorem Ipsum.
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                        It has survived not only five centuries, but also the leap into electronic typesetting, 
                        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
                        containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker 
                        including versions of Lorem Ipsum.
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                        It has survived not only five centuries, but also the leap into electronic typesetting, 
                        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
                        containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker 
                        including versions of Lorem Ipsum.
                    </Text>
                </ScrollView>
            </View>
        );
    }
}

export default (ExperiencesARBuilding);