import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        position:'absolute', 
        left: 0,
        bottom: 0,
    },
    menuBox: {
        backgroundColor: 'rgba(0, 162, 181, 0.8)',
    },
    filterStyle: {
        flex: 1,
        width: 220,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 15,
        marginRight: 20,
    },
    rightText:{
        color:'white',
        fontSize: 16,
    }
});

export default styles;