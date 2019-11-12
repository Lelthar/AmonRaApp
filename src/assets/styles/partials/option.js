import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  textOptions:{
    flex:0.9,
    color: '#10535D',
    fontSize: 20,
    marginLeft: '5%',
  },
  line:{
    backgroundColor: '#10535D',
    height:1,
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
    flex:1,
  	flexDirection:'row', 
  	justifyContent:'space-between',
  },
  iconStyle:{
    flex:0.1,
    marginRight:'1%'
  },
});

export default styles;
