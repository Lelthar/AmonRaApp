import { StyleSheet, Dimensions} from 'react-native';

const { width } = Dimensions.get('window').width;
const styles = StyleSheet.create({
    newSquare:{
      height:'35%',
      width:'35%',
      margin:'5%',
    },
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
    },
    contentUnderSwiper:{
      flex:0.65,
      flexDirection:'row',
      flexWrap:'wrap',
      alignItems:'center',
      justifyContent: 'center',
    },
    wrapper: {
    },
    imageResizeAndFillParent: {
      flex: 1,
      width: null,
      height: null,
    },
    slide: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    image: {
      width,
      flex: 1,
    },
  });

  export default styles;