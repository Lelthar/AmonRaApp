import { StyleSheet, Dimensions} from "react-native";

const styles = StyleSheet.create({
    infoContainer : {
        padding:15, 
        bottom: 0,
        position:"absolute",
        backgroundColor:'rgba(54, 145, 160, 0.8)',
        width: (Dimensions.get('window').width),
    },
    buttonsContainer : {
        flexDirection: "row", 
        justifyContent: 'space-around',
    },
    rowButton : {
        flexDirection: "row", 
    },
    textButton:{
        color:"#1a606b",
        fontSize: 14,
    },
    textDescription:{
        color:'white',
        fontSize: 16, 
        marginBottom: 15,
    },
});

export default styles;