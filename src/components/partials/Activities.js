import React, { Component } from 'react';
import {
    View,
    Image,
    FlatList,
    TouchableHighlight,
  } from 'react-native';
import styles from "../../assets/styles/partials/tripleColFlatList";
import secretsInfo from "../../assets/files/actividades.json";

class Activities extends Component {
    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
    }

    render() { 
        return( 
            <View style={styles.container}>
                <FlatList
                    data={secretsInfo}
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
        console.log(item.secreto);
        this.props.navigation.navigate('CharacterDetail',{tittle: item.nombre, description: item.actividad, imgHeader: item.imagen});
    }
}

export default (Activities);
