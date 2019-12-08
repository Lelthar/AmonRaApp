import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';  
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    dataSheet : {
        flex:1,
        position: 'absolute', 
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        width: wp('85%'),
        paddingHorizontal: 15,
        paddingTop: 15,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
      },
    containerImages: {
        flexDirection: 'row', 
        alignItems: 'center',
        marginBottom: "2.5%",
        justifyContent: 'space-around',
    },
    title: {
        fontSize: 15,
        fontFamily: "Barlow-Regular",
        color: "#0C5B60",
        fontWeight: 'bold',
        textAlign: "center",
    },
    text: {
        textAlign: "justify",
        color: '#6D6F70',
        fontSize: 13,
        fontFamily: "Barlow-Regular",
    },
    textInf:{
        textAlign: "justify",
        alignSelf: 'center',
        color: '#6D6F70',
        fontSize: 12,
        fontFamily: "Barlow-Regular",
        fontWeight: 'bold',
    },
    closeButton: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        width: 20,
        height:20,
    },
    image:{
        width:200,
        height:150,
    },
});

export default styles;
