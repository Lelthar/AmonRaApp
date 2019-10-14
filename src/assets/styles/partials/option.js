import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  textOptions:{
		color: '#10535D',
		fontSize: 20,
		marginLeft: '5%',
	},
  line:{
		backgroundColor: '#10535D',
		height:3,
		width:'90%',
		marginLeft:'5%',
		marginRight: '5%',
	},
	description:{
		textAlign: "justify", 
		fontSize:18,
		color: "grey",
		margin:'5%',
  },
  arrow:{
  	marginRight:'5%',
  },
  row:{
  	flexDirection:'row', 
  	justifyContent:'space-between',
  },
});

export default styles;
