import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';  
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
        marginTop: "2%",
        marginBottom: "5%",
        height:hp('25%'),
        justifyContent: 'space-around',
    },
      closeButton: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        width: 17,
        height:17,
    },
});

export default styles;
