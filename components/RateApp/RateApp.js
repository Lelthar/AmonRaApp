import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    AppRegistry,
    Button,
    TextInput,
    FlatList,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

import Image from 'react-native-scalable-image'
import {addComment} from '../../firebase/functions';

export default class RateApp extends Component{

    constructor(props){
        super(props);

        this.state = {
            text: "",
            stars: [
                { key: '1', active: false },
                { key: '2', active: false },
                { key: '3', active: false },
                { key: '4', active: false },
                { key: '5', active: false }
            ]
        }
    }

    activateStars(num){
        var tmpStars = this.state.stars.slice()

        for(i in tmpStars){
            if (tmpStars[i].key <= num){
                tmpStars[i].active = true
            }
            else{
                tmpStars[i].active = false
            }
        }

        this.setState({
            stars: tmpStars
        })
    }

    countStars(){
        var tmpStars = this.state.stars.slice()
        var qtyStars = 0

        for(i in tmpStars){
            if (tmpStars[i].active === true){
                qtyStars += 1
            }
        }

        return qtyStars
    }

    omitRate(){
        message = {
            action: "omit"
        }
        this.props.makeAnAction(message)
    }

    async sendRate(comment){
        var stars = this.countStars();

        var message = {
            action: "send",
            email: await AsyncStorage.getItem('userEmail'),
            comment: comment,
            rate: stars
        }

        console.log("comentario")
        console.log(comment)

        this.props.makeAnAction(message);
        addComment(message);
    }

    render() {

        return (
            <View style={styles.container}>

                <View style={styles.contentStyle} >
                    <View style={styles.boxStyle}>
                        <Text style={styles.titleStyle}>Califica este app</Text>
                    </View>
                    <View style={styles.boxStyle}>
                        <FlatList
                            contentContainerStyle={styles.starsBox}
                            data={this.state.stars}
                            renderItem={({item}) =>{
                                    let imgSource = '';

                                    if (item.active === true){
                                        imgSource = require('../../images/icons-temp/star_selected.png');
                                    }
                                    else {
                                        imgSource = require('../../images/icons-temp/star_unselected.png');
                                    }
                                    return(
                                        <TouchableOpacity onPress={() => this.activateStars(item.key)} >
                                            <Image width={20} source={imgSource} />
                                        </TouchableOpacity>
                                    )
                                }
                            }
                        />
                    </View>
                    <View style={styles.boxStyle}>
                        <TextInput
                            style={styles.commentStyle}
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={(text) => this.setState({text})}
                            placeholder={"Dejanos un comentario"}/>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Button
                            title="Saltar"
                            onPress={() => this.omitRate()}
                        />
                        <View style={{flex:0.15}}/>
                        <Button
                            title="Enviar"
                            onPress={() => this.sendRate(this.state.text)}
                        />
                    </View>
                </View>

            </View>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...StyleSheet.absoluteFillObject
    },
    contentStyle:{
        flex:1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent:'center',
        alignItems:'center'
    },
    boxStyle: {
        marginBottom: 20,
        flexDirection: 'row'
    },
    titleStyle: {
        color:'white',
        fontSize: 20
    },
    starsBox: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    commentStyle: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        width: 300,
        height: 100,
        maxHeight: 100
    }
});

AppRegistry.registerComponent('RateApp', () => RateApp);
