import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    menuContainer: {
        flex:1, 
        flexDirection: 'row', 
        padding:3,
        paddingTop:7,
        paddingBottom:7, 
        bottom: 0,
        position:"absolute",
        backgroundColor: "#00A2B5",
        opacity: 0.8,
    },
    extremesContainer: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    middleContainer: {
        flex:2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerContainer: {
        flex:3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    photoMain: {
        height: "110%",
        width: "95%",
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFFFFF",
    },
    photoAux: {
        height: 65,
        width: "95%",
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: "#FFFFFF",
     },
    displaybotomRight: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    displaybotomLeft: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default styles;
