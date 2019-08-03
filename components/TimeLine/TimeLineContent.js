import React, {Component} from 'react'
import {StyleSheet, Text, View, Dimensions, VirtualizedList} from 'react-native'
import Image from 'react-native-scalable-image';
import Dash from 'react-native-dash';

const totalItems = 80;

export default class Timeline extends Component {
  constructor(props) {
    super(props);
  }

  keyExtractor = (item, index) => {
    return `${item.time}-${item.title}`
  }

  render() {
    const { data } = this.props;
    return (
      <View style={styles.container}>
        <VirtualizedList
          initialNumToRender={3}
          windowSize={5}
          style={[styles.listview]}
          data={data}
          getItemCount={(data) => totalItems}
          getItem={(data, index) => {return data[index];}}
          renderItem={this.renderItem}
          automaticallyAdjustContentInsets={false}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }
  
  renderItem = ({ item, index }) => {
    return (
      <View>
        <View style={styles.rowContainer}>
          <View >
            {this.renderTime(item, index)}
          </View>
          <View>
            {this.renderCircleAndLineVertical(item, index)}
          </View>
          <View style={{ flex: 1 }}>
            {this.renderEvent(item, index)}
          </View>
        </View>
        <Dash style={{flex: 1, marginBottom: 6}} dashColor={'#E7E6E5'} dashThickness={4} />
      </View>
    );
  }

  renderTime = (item, index) => {
    return (
      <View style={styles.timeContainer}>
        <Text style={[styles.timeText, styles.leftText]}>
          {item.time}
        </Text>
      </View>
    )
  }

  renderEvent = (item, index) => {
    return (
      <View>
        <View style={{  marginBottom: 2}}>
          {this.renderDetail(item, index)}
        
        </View>
        {this.renderSeparator()}
      </View>
    )
  }

  renderDetail = (item, index) => {
    return (
      <View style={styles.container}>
          <Text style={styles.title}>{item.title}</Text>
          { item.description
           ? <Text style={styles.description}>{item.description}</Text> 
           : null
          }
          { item.image != null
           ? <Image source={{uri: item.image_url}} width={Dimensions.get('window').width * 0.7} resizeMode="contain"/> 
           : null
          }
      </View>
    )
  }

  // <Image source={this.getTimeLineImage(item.image)} width={Dimensions.get('window').width * 0.7} resizeMode="contain"/> 

  renderCircleAndLineVertical = (item, index) => {
    return (
      <View style={{ alignItems: 'center', flex: 1, width: 30 }}>
        {this.renderCircle()}
        <View style={styles.verticalLineSeparator} />
      </View>
    )
  }

  renderCircle () {
    return (
      <View style={[styles.circle]}>
        {this.renderInnerCircle()}
      </View>
    )
  }

  renderInnerCircle(){
    return (<View style={styles.dotStyle}/>)
  }

  renderSeparator(){
    return (
      <View><View style={[styles.separator]}></View><View style={{padding:20}}></View></View>
     )
  }

  getTimeLineImage(imageName){
    return (timeLine_images[imageName]) ? timeLine_images[imageName] : null;
  }
}

let timeLine_images = {
  '1751' : require('../../images/Images_TimeLine/1751.png'),
  '1854' : require('../../images/Images_TimeLine/1854.png'),
  '1884' : require('../../images/Images_TimeLine/1884.png'),
  '1887' : require('../../images/Images_TimeLine/1887.png'),
  '1888' : require('../../images/Images_TimeLine/1888.png'),
 // '1892' : require('../../images/Images_TimeLine/1892.png'),
  '1895' : require('../../images/Images_TimeLine/1895.png'),
  '1897' : require('../../images/Images_TimeLine/1897.png'),
  '1899' : require('../../images/Images_TimeLine/1899.png'),
  '1900' : require('../../images/Images_TimeLine/1900.png'),
  '1902' : require('../../images/Images_TimeLine/1902.png'),
  '1910_1' : require('../../images/Images_TimeLine/1910_1.png'),
  '1910_2' : require('../../images/Images_TimeLine/1910_2.png'),
  '1913' : require('../../images/Images_TimeLine/1913.png'),
  '1919' : require('../../images/Images_TimeLine/1919.png'),
  '1920' : require('../../images/Images_TimeLine/1920.png'),
  '1921' : require('../../images/Images_TimeLine/1921.png'),
  '1927' : require('../../images/Images_TimeLine/1927.png'),
  '1929' : require('../../images/Images_TimeLine/1929.png'),
  '1930_1' : require('../../images/Images_TimeLine/1930_1.png'),
  //'1930_2' : require('../../images/Images_TimeLine/1930_2.png'),
  '1938' : require('../../images/Images_TimeLine/1938.png'),
  //'1947' : require('../../images/Images_TimeLine/1947.png'),
  '1949' : require('../../images/Images_TimeLine/1949.png'),
  '1950' : require('../../images/Images_TimeLine/1950.png'),
  //'1956' : require('../../images/Images_TimeLine/1956.png'),
  //'1960' : require('../../images/Images_TimeLine/1960.png'),
  '1970_1974' : require('../../images/Images_TimeLine/1970_1974.png'),
  '1973' : require('../../images/Images_TimeLine/1973.png'),
  '1982' : require('../../images/Images_TimeLine/1982.png'),
  '1990' : require('../../images/Images_TimeLine/1990.png'),
  '1993' : require('../../images/Images_TimeLine/1993.png'),
  '1993_1996' : require('../../images/Images_TimeLine/1993_1996.png'),
  '1998' : require('../../images/Images_TimeLine/1998.png'),
  '1999' : require('../../images/Images_TimeLine/1999.png'),
  '2000' : require('../../images/Images_TimeLine/2000.png'),
  '2009' : require('../../images/Images_TimeLine/2009.png'),
  '2010_1' : require('../../images/Images_TimeLine/2010_1.png'),
  '2010_2' : require('../../images/Images_TimeLine/2010_2.png'),
  '2014' : require('../../images/Images_TimeLine/2014.png')
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listview: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  timeContainer: {
    maxWidth: 55,
    minWidth: 55,
    flex: 1,
  },
  time: {
    textAlign: 'right',
  },
  timeText: {
    color:'#006064',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeMeridiem: {
    fontSize: 12,
    fontWeight: '200',
  },
  leftText: {
    textAlign: 'right'
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 100,
    backgroundColor: '#A6A8AA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    flexDirection: 'column',
    flex: 1,
    marginTop: 6,
  },
  separator: {
    height: 0.75,
    backgroundColor: '#aaa',
    marginTop: 6,
    marginBottom: 6
  },
  dotStyle:{
    height: 7,
    width: 7,
    borderRadius: 7 / 2,
    backgroundColor: 'white'
  },
  verticalLineSeparator:{
    width: 4, flex: 1, backgroundColor: '#E7E6E5'
  }

});
