import { 
    StyleSheet, 
    PixelRatio,
} from "react-native";
import * as constants from '../../constants/constants';
import * as colors from '../../constants/colors';

const modalMarginSides = PixelRatio.getPixelSizeForLayoutSize(12);

const styles = StyleSheet.create({
    modal: {
        marginLeft: modalMarginSides,
        marginRight: modalMarginSides,
    },
    modalBody:{
        backgroundColor: "white",
        padding: 22,
        alignItems: "center",
    },
    checkbox:{
        flex:1,
    },
    checkImage:{
        resizeMode: 'contain',
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalLogoImage:{
        height: 42,
        width: 150,
        resizeMode: 'contain',
    },
    modalTextContainer:{
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalCheckboxContainer:{
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalButtonContainer:{
        flexDirection: 'row',
    },
    modalText:{
        fontFamily: 'Barlow-Regular',
        fontSize: constants.FONT_SIZE,
    },
    okButton:{
        backgroundColor:colors.TURQUOISE,
        margin:10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    okBtn:{
        color:"white",
        fontSize:constants.FONT_SIZE,
    },
});

export default styles;
