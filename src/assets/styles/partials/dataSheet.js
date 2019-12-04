import { StyleSheet, Dimensions} from "react-native";

const styles = StyleSheet.create({
    container : {
        alignItems: 'center',
    },
    dataSheet : {
        position: 'absolute', 
        justifyContent: 'center',
        backgroundColor: 'white',
        width: (Dimensions.get('window').width) * 0.9,
        height: (Dimensions.get('window').height) * 0.6,
        bottom: (Dimensions.get('window').height)/2 * 0.2,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 15,
        fontFamily: "Barlow-Regular",
        color: "#0C5B60",
        fontWeight: 'bold',
    },
    text: {
        fontWeight: 'normal',
        color: '#6D6F70',
        fontSize: 13,
        fontFamily: "Barlow-Regular",
    },
    closeButton: {
        justifyContent: 'flex-end',
        width: 10,
        height: 10,
        left: (Dimensions.get('window').width)*0.8,
    },
});

export default styles;