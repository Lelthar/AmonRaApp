import React, {Component} from 'react'
import {StyleSheet, Text, View, Dimensions, VirtualizedList} from 'react-native'
import Image from 'react-native-scalable-image';


const totalItems = 77;

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
          { item.image_url != "null"
           ? <Image source={{uri: item.image_url}} width={Dimensions.get('window').width * 0.7} resizeMode="contain"/> 
           : null
          }
      </View>
    )
  }

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
  timeText: {
    color:'#006064',
    fontSize: 16,
    fontWeight: 'bold',
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
