import React, { Component } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Modal from "react-native-modal";
import CheckBox from 'react-native-check-box'
import styles from "../../assets/styles/pages/confidencialityAlertModal";
import * as constants from '../../assets/constants/constants';

const BRAND_IMAGE = require("../../assets/images/amonraBrand/marca-01.png");
const CHECK_ICON = require('../../assets/images/icons/check.png');
const UNCHECK_ICON = require('../../assets/images/icons/uncheck.png');

export default class ConfidencialityAlertModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: true,
    };
  }

  toggleCheck(){
    this.setState({
      isChecked: !this.state.isChecked,
    });
  }

  renderCheckbox(){
    return (
      <CheckBox
        style={styles.checkbox}
        onClick={()=>{this.toggleCheck()}}
        isChecked={this.state.isChecked}
        checkedImage={
          <Image source={CHECK_ICON} style={styles.checkImage} />
        }
        unCheckedImage={
          <Image source={UNCHECK_ICON} style={styles.checkImage} />
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
                <Image source={BRAND_IMAGE} style={styles.modalLogoImage}/>
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
    );
  }
}
