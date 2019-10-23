import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 10,
    right:10,
  },
  container: {
    width: wp('85%'),
    backgroundColor: "#10535D",
    opacity: 0.8,
    alignItems: 'center',
  },
  descriptionSection: {
    marginTop: 30,
  },
  descriptionText: {
    fontFamily: 'Barlow-Regular',
    fontSize: 18,
    color: '#ffffff',
    textAlign: "center",
  },
  finalSection: {
    marginTop: 30,
    marginBottom: 50,
  },
  finalSectionBottom: {
    flexDirection: "row",
  },
  finalText: {
    fontFamily: 'Barlow-Regular',
    fontSize: 18,
    color: '#ffffff',
    textAlign: "center",
  },
  titleSection: {
    flexDirection: "row",
    marginTop: 50,
    alignItems: "center",
  },
  titleText: {
    fontFamily: 'Barlow-Regular',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: "center",
    marginLeft: 5,
  },
});

export default styles;
