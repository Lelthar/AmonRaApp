import React, { Component } from 'react';
import {
    View,
    Image,
    FlatList,
    TouchableHighlight,
  } from 'react-native';
import styles from "../../assets/styles/partials/tripleColFlatList";
import charactersInfo from "../../assets/files/personajes.json";

class Secrets extends Component {
    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
    }

    render() { 
        return( 
            <View style={styles.container}>
                <FlatList
                    data={charactersInfo}
                    numColumns={3}
                    keyExtractor={(item, index) => index}
                    contentContainerStyle={styles.list_style}
                    renderItem={({item}) => (
                        <TouchableHighlight style= {styles.list_item}
                            onPress={() => this.handleClick(item)}>
                            <Image source={{uri: item.buttonLink}} style={styles.image} />
                    </TouchableHighlight>
                    )}
                />
            </View>
        );
    }

    handleClick = (item) => {
        console.log(item.personaje);
        this.props.navigation.navigate('CharacterDetail',{tittle: "Jose Figueres Ferrer", description: item.personaje, imgHeader: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/Personajes%2FCabeceras%2F4.%20JOSE%20MAR%C3%8DA%20FIGUERES%20FERRER.png?alt=media&token=c82206c2-0c2f-4989-8b7f-6a12645ee984"});
    }
}

export default (Secrets);
