import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native'
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowContainer: {
        flexDirection: 'row',
    },
    timeContainer: {
        width: 55,
        backgroundColor: 'white'
    },
    timeText: {
        color:'#006064',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    circle: {
        width: 15,
        height: 15,
        borderRadius: 100,
        backgroundColor: '#A6A8AA',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        flexDirection: 'column',
        flex: 1,
        marginTop: 6,
    },
    separator: {
        height: 0.75,
        backgroundColor: '#aaa',
        marginTop: 6,
        marginBottom: 50,
    },
    dotStyle:{
        height: 7,
        width: 7,
        borderRadius: 7 / 2,
        backgroundColor: 'white'
    },
    verticalLineSeparator:{
        width: 4, 
        flex: 1, 
        backgroundColor: '#E7E6E5'
    },
    image:{
        width: Dimensions.get('window').width * 0.1,
        resizeMode: "contain",
    },
    circleLineContainer:{
        alignItems: 'center', 
        flex: 1, 
        width: 30,
    }
    
});

export default styles;