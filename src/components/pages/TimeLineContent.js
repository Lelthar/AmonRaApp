import React, {Component} from 'react'
import {Text, View, Dimensions, VirtualizedList} from 'react-native'
import Image from 'react-native-scalable-image';
import styles from "../../assets/styles/pages/timeline";

const INITIAL_NUM_TO_RENDER = 3;
const WINDOW_SIZE = 5;
const TOTAL_ITEMS = 77;

export default class Timeline extends Component {
  constructor(props) {
    super(props);
  }

  keyExtractor = (item) => {
    return `${item.time}-${item.title}`
  }

  render() {
    const { data } = this.props;
    return (
      <View style={styles.container}>
        <VirtualizedList
          INITIAL_NUM_TO_RENDER={INITIAL_NUM_TO_RENDER}
          WINDOW_SIZE={WINDOW_SIZE}
          data={data}
          getItemCount={(data) => TOTAL_ITEMS}
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
      <View style={styles.rowContainer}>
        <View>
          {this.renderTime(item, index)}
        </View>
        <View>
          {this.renderCircleAndLineVertical(item, index)}
        </View>
        <View style={styles.container}>
          {this.renderEvent(item, index)}
        </View>
      </View>
    );
  }

  renderTime = (item, index) => {
    return (
      <View style={styles.timeContainer}>
        <Text style={[styles.timeText]}>
          {item.time}
        </Text>
      </View>
    )
  }

  renderEvent = (item, index) => {
    return (
      <View>
        {this.renderDetail(item, index)}
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
      <View style={styles.circleLineContainer}>
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
    return (
      <View style={styles.dotStyle}/>
    );
  }

  renderSeparator(){
    return (
      <View style={[styles.separator]}/>
     );
  }
}

