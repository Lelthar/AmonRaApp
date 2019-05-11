import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    AppRegistry,
    Button
} from 'react-native';
import ModelView from 'react-native-gl-model-view';

export default class Model extends Component{

    constructor(props){
        super(props);
        // Se le pasa el controlador de la navegación a App.js
        // para controlar la navegación desde Navigator.js
        //this.props.screenProps.getNavigationProp(this.props.navigation)
    }

    render() {

        return (

            <ModelView
                model="castilloDelMoro.fbx"

                scale={0.01}

                translateZ={-2}
                rotateZ={270}

                style={{flex: 1}}
            />

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

AppRegistry.registerComponent('Model', () => Model);
