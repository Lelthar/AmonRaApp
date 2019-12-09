import { StyleSheet } from "react-native";
import * as colors from '../../constants/colors';

const styles = StyleSheet.create({
    okButton:{
        height : '7%',
        backgroundColor:colors.TURQUOISE,
        justifyContent: 'center',
        alignItems: 'center',
     },
    okBtn:{
        color:"white",
        fontSize: 16,
    },
});

export default styles;
