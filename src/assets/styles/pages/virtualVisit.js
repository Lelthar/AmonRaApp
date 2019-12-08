import { 
    StyleSheet, 
    PixelRatio, 
} from "react-native";

const imageRatio = PixelRatio.getPixelSizeForLayoutSize(60);
const fiveRatio = PixelRatio.getPixelSizeForLayoutSize(5);
const sevenRatio = PixelRatio.getPixelSizeForLayoutSize(7);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#ffffff",
    },
    body:{
        flex:25,
    },
    imageResizeAndFillParent: {
        flex: 1,
        resizeMode: "stretch",
    },
    title:  	{
        textAlign: "center",
        fontSize: 30,
        fontFamily: "Barlow-Regular",
        color: "#0C5B60",
        marginBottom: fiveRatio,
    },
    text: {
        color: '#6D6F70',
        fontSize: 20,
        textAlign: "justify",
        fontFamily: "Barlow-Regular",
        marginBottom: sevenRatio,
    },
    white_text:{
        color:"#FFFFFF",
        textAlign:"center",
        fontWeight: 'bold',
    },
    nav_button:{
        flex:1,
        backgroundColor:"#707070",
        justifyContent: 'center',
    },
    nav_button_selected:{
        flex:1,
        backgroundColor:"#42bff4",
        justifyContent: 'center',
    },
    navigation_bar:{
        height: "8%",
        flexDirection:"row",
        backgroundColor: "#000",
    },
    list_item:{
        height: imageRatio,
        width: "33.3%",
        padding: "2%",
        backgroundColor:"#ffffff",
    },
    list_style: {
        marginLeft: "4%",
        marginRight: "4%",
        paddingTop: "5%",
        width:"93%",
        justifyContent: "space-evenly",
    },
});

export default styles;