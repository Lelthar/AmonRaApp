import { StyleSheet } from "react-native";
import * as constants from '../../constants/constants';
import * as colors from '../../constants/colors';

const styles = StyleSheet.create({
    ButtonRegister:{
        alignItems:'stretch',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        marginLeft:50,
        marginRight: 50,
        marginTop: 20 //Si se agrega el boton de Facebook se debe eliminar este margen
    },
    ButtonText:{
        flex: 4,
        color: '#FFFFFF',
        fontFamily: 'Barlow-Regular',
        fontSize: constants.FONT_SIZE,
        alignSelf: 'center',
    },
    FacebookStyle: {
        backgroundColor: '#485a96',
        marginTop:25,
        marginLeft:50,
        marginRight: 50,
    },
      ImageIconStyle: {
        width: '100%',
        height: 53,
        resizeMode : 'contain',
    },
    LogoContainer:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    LogoRegisterScreen: {
        resizeMode: 'center',
        aspectRatio: 0.72,
        marginTop: 40,
    },
    RegisterButtonText:{
        color: "#6D6E71",
        fontFamily: 'Barlow-Regular',
        fontSize: constants.FONT_SIZE,
        padding:15,
        textAlign: 'center',
    },
    TextStyle :{
        color: "#FFF",
        marginBottom : 4,
        marginRight :20,
        fontFamily: 'Barlow-Regular',
        fontSize: constants.FONT_SIZE,
        paddingTop: 15,
        paddingRight: 15,
        paddingBottom: 15,
        paddingLeft: 5,
    },
});

export default styles;
