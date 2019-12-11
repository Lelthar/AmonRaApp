import { StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container : {
        position: 'absolute', 
        top: "1%",
        right: 10,
        justifyContent: 'center', 
        alignItems: 'flex-start',
    },
    closeButton: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        width: 20,
        height:20,
    },
  });

export default styles;
