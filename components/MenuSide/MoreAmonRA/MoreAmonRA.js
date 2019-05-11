import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    AppRegistry,
    Button,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import Swiper from 'react-native-swiper';
const { width } = Dimensions.get('window')




export default class MoreAmonRA extends Component{

    constructor(props){
        super(props);
        // Se le pasa el controlador de la navegación a App.js
        // para controlar la navegación desde Navigator.js
        this.props.screenProps.getNavigationProp(this.props.navigation)
        this.state ={
          principal:true,
          project:false,
          neighbors:false
        }
    }

    goTo(screen){
        var goToScreen = this.props.navigation.state.params.goToScreen
        goToScreen(screen, [])
    }

    render() {

        return (
            <View style={styles.container}>

            {/* Navigator uses flex 10. 1 up, 1 down, 8 body */}
               <View style={styles.barMargin} />

                {/* Full body container. Flex 8. Hay 23 flexes en el full body */}
                <View style={styles.body}>

                  {/* Swiper Flex 9*/}
                  <View style={styles.swiper}>

                    <Swiper style={styles.wrapper}  loop>
                      <View style={styles.slide}>
                        <Image tyle={styles.image} source={require('../../../images/Dir1.jpg')} />
                      </View>
                      <View style={styles.slide}>
                        <Image resizeMode='stretch' style={styles.image} source={require('../../../images/Dir2.jpg')} />
                      </View>
                      <View style={styles.slide}>
                        <Image resizeMode='stretch' style={styles.image} source={require('../../../images/Dir3.jpg')} />
                      </View>
                    </Swiper>

                    {/* Ends Swiper Flex 9*/}
                  </View>

                    <View style={styles.contentUnderSwiper}>

                      <View style={{flex:1}}/>
                      <View style={styles.buttonsRow}>
                        <View style={{flex:2}}/>

                        <TouchableOpacity style={styles.squareButton} onPress={() => this.goTo('InfoAmon_RA')}  >
                            <Image style={styles.imageResizeAndFillParent} source={require('../../../images/icons/MoreAmonRA/info-gris.png')} />
                        </TouchableOpacity>

                        <View style={{flex:1}}/>

                        <TouchableOpacity style={styles.squareButton} onPress={() =>  this.goTo('AsociacionVecinos')} >
                            <Image style={styles.imageResizeAndFillParent}   source={require('../../../images/icons/MoreAmonRA/asociacion-gris.png')} />
                        </TouchableOpacity>

                        <View style={{flex:2}}/>

                      {/* Ends flex 5. Half 14*/}
                      {/* ,  borderWidth: 2, borderColor: '#000000'*/}
                      </View>
                      <View style={{flex:1}}/>

                      <View style={styles.buttonsRow}>

                      {/* Ends flex 5. Half 14*/}
                      </View>

                      <View style={{flex:2}}/>

                    {/* Ends flex 14*/}
                    </View>


                {/* Ends full body flex 8*/}
                </View>
                <View style={styles.barMargin}/>


            </View>

        );
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  barMargin:{
    flex:2
  },
  body:{
    flex:23
  },
  swiper:{
    flex: 9
  },
  contentUnderSwiper:{
    flex:14
  },
  buttonsRow:{
    flex:5,
    flexDirection: "row"
  },
  wrapper: {
  },
  squareButton:{
    flex:5
  },
  imageResizeAndFillParent: {
    flex: 1,
    width: null,
    height: null
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  image: {
    width,
    flex: 1
  }
});

AppRegistry.registerComponent('MoreAmonRA', () => MoreAmonRA);
