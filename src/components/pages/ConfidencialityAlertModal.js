import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Text,
  PixelRatio,
  Dimensions
} from 'react-native';

import * as constants from '../../../data/constants'
import * as colors from '../../../data/colors'

import Modal from "react-native-modal";
import CheckBox from 'react-native-check-box'

const modalMarginSides = PixelRatio.getPixelSizeForLayoutSize(12);
const modalMargins =  PixelRatio.getPixelSizeForLayoutSize(5);

export default class ConfidencialityAlertModal extends Component {
constructor(props) {
 super(props)
 this.state={
   isChecked:true
 }
 }

renderCheckbox(){
   return (
     <CheckBox
     style={styles.checkbox}
     onClick={()=>{
       this.setState({
         isChecked:!this.state.isChecked
       })
     }}
     isChecked={this.state.isChecked}
     checkedImage={
       <Image source={require('../../../images/icons/check.png')} style={styles.checkImage} />
     }
     unCheckedImage={
       <Image source={require('../../../images/icons/uncheck.png')} style={styles.checkImage} />
     }
     />
   );
 }

render() {
 return (
   <Modal isVisible={this.props.isVisible}>
     <View style={styles.modal}>

       

       <View style={styles.modalBody} >

           {<View style={styles.modalImageContainer}>
             <Image source={require("../../../images/marca-01.png")} style={styles.modalLogoImage}/>
           </View>}

           <View style={styles.modalTextContainer}>
             <Text style={styles.modalText}> {constants.ALERTA_DE_CONFIDENCIALIDAD} </Text>
           </View>

           <View style={styles.modalCheckboxContainer}>
             {this.renderCheckbox()}
             <Text style={[{flex: 9}, styles.modalText]}> {constants.RECIBIR_MAS_INFO} </Text>
           </View>

           <View style={styles.modalButtonContainer}>
             {/* espaciador horizontal */}
               <View style={{flex:5}}/>
               <TouchableOpacity
                 style={styles.okButton}
                 onPress={this.props.okAction}>
                 <Text style={styles.okBtn}> OK </Text>
               </TouchableOpacity>
           </View>

       </View>

       

     </View>
   </Modal>
 )
 }
}

const styles = StyleSheet.create({
  modal: {
    //flex: 1,
    marginLeft: modalMarginSides,
    marginRight: modalMarginSides
  },
  modalBody:{
    //flex:1.5,
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
    alignItems: 'center'
  },
  modalLogoImage:{
    height: 42,
    width: 150,
    resizeMode: 'contain',
  },
  modalImageContainer:{
    //flex:1,
  },
  modalTextContainer:{
    //flex: 2.5,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalCheckboxContainer:{
    //flex: 1.25,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalButtonContainer:{
    flexDirection: 'row',
  },
  modalText:{
    fontFamily: 'Barlow-Regular',
    fontSize: constants.FONT_SIZE,
  },
  okButton:{
    //flex:1,
    backgroundColor:colors.TURQUOISE,
    margin:10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  okBtn:{
    color:"white",
    fontSize:constants.FONT_SIZE
  },
});
