import { 
    StyleSheet,
    Dimensions,
} from "react-native";

const styles = StyleSheet.create({
    houseImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.25,
    },
    container:{
        backgroundColor: 'white',
        justifyContent: 'center',
        flexDirection: "column",
        flex:1,
    },
    houseTittle: {
        textAlign: "center", 
        fontSize: 20,
        fontFamily: "vincHand",
        color: "#0C5B60",
        fontWeight: 'bold',
        marginTop: 10,
    },
    houseDescription:{
        textAlign: "justify", 
        fontSize: 17,
        color: "grey",
    },
    scrollView:{
        margin: 15,
    }
    
});

export default styles;