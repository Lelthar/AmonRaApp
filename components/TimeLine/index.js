import React, {Component} from 'react'

import {Animated, Easing, FlatList, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import Image from 'react-native-scalable-image';

let defaultCircleSize = 8
let defaultCircleColor = '#A6A8AA'
let defaultLineWidth = 0.75
let defaultLineColor = '#E7E6E5'
let defaultTimeTextColor = 'black'
let defaultDotColor = 'white'
let defaultInnerCircle = 'none'
let defaultTitleFontSize = 16
let defaultTimeWidth = 55
import Dash from 'react-native-dash';
export default class Timeline extends Component {
  
  constructor(props, context) {
    super(props, context);
    const { data } = props;
    this.state = {
      data,
    }
  }
  keyExtractor = (item, index) => {
    return `${item.time}-${item.title}`
  }
  render() {
    const { styleContainer, data } = this.props;
    return (
      <View style={[styles.container, styleContainer]}>
        <FlatList
          style={[styles.listview]}
          data={data}
          renderItem={this.renderItem}
          automaticallyAdjustContentInsets={false}
          keyExtractor={this.keyExtractor}
          {...this.props}
        />
      </View>
    );
  }
  
  renderItem = ({ item, index }) => {
    let content = null
    let { columnFormat, rowContainerStyle, lineColor, lineWidth } = this.props;
    switch(columnFormat){
      case 'single-column-left':
      case 'single-column-right':
        content = (
          <View style={[styles.rowContainer,columnFormat === 'single-column-left' ? {} : {flexDirection: 'row-reverse', justifyContent: 'flex-start' }, rowContainerStyle]}>
            <View >
              {this.renderTime(item, index)}
            </View>
            <View>
              {this.renderCircleAndLineVertical(item, index)}
            </View>
            <View style={[{ flex: 1 }]}>
              {this.renderEvent(item, index)}
            </View>
          </View>
        )
        break
      case 'two-column':
        content = (
          <View style={[styles.rowContainer, index % 2 == 0 ? {} : { flexDirection: 'row-reverse'} , rowContainerStyle]}>
            <View style={{flex: 1}} >
              {this.renderTime(item, index)}
            </View>
            <View>
              {this.renderCircleAndLineVertical(item, index)}
            </View>
            <View style={{flex: 1 }}>
              {this.renderEvent(item, index)}
            </View>
          </View>
        )
    }
    lineWidth = item.lineWidth ? item.lineWidth : lineWidth
    lineColor = item.lineColor ? item.lineColor : lineColor
    let renderSeperateTotal = null
    if (item.renderSeperateTotal) {
      renderSeperateTotal = <Dash style={{flex: 1, marginBottom: 6}} dashColor={lineColor} dashThickness={lineWidth} />
    }
    return (
      <View>
        {content}
        {renderSeperateTotal}
      </View>
    );
  }
  renderTime = (item, index) => {
    let textStyle = {};
    let timeContainerWrapper = {};
    let { timeContainerStyle, timeStyle, timeMeridiumStyle, renderTimeBottom, showAmPm, timeFormat, columnFormat } = this.props;
    switch(columnFormat){
      case 'single-column-left':
          textStyle = styles.leftText
          timeContainerWrapper = { maxWidth: defaultTimeWidth }
          break
      case 'single-column-right':
          timeContainerWrapper = { maxWidth: defaultTimeWidth }
          break
      case 'two-column':
          textStyle = index % 2 == 0 ? styles.leftText : textStyle;
          break
    }
    renderTimeBottom = item.renderTimeBottom ? item.renderTimeBottom : renderTimeBottom;
    let hourFormat= null, amPmFormat=null;
    if (typeof(item.time) === 'string') {
      hourFormat = item.time
    }
    return (
      <View style={[styles.timeContainer, timeContainerWrapper, timeContainerStyle]}>
        <View>
          <Text style={[styles.timeText, textStyle, timeStyle ]}>
            {hourFormat}
          </Text>
          {amPmFormat
            ? <Text style={[styles.timeText, styles.timeMeridiem, textStyle, timeMeridiumStyle]}>
                {amPmFormat}
              </Text>
            : null
          }
        </View>
        <View style={{ flex: 1}}>
            {renderTimeBottom()}
        </View>
      </View>
    )
  }

  renderEvent = (item, index) => {
    let { onEventPress, detailContainerStyle } = this.props;
    detailContainerStyle = item.detailContainerStyle ? item.detailContainerStyle : detailContainerStyle
    return (
      <View>
        <TouchableOpacity
          disabled={onEventPress == null}
          style={[ detailContainerStyle]}
          onPress={() => onEventPress ? onEventPress(item):null}
        >
          <View style={{  marginBottom: 2}}>
            {this.renderDetail(item, index)}
          
          </View>
          {this.renderSeparator()
          }
        </TouchableOpacity>
      </View>
    )
  }

  renderDetail = (item, index) => {
    let { titleStyle, renderDetail, descriptionStyle } = this.props
    titleStyle = item.titleStyle ? item.titleStyle : titleStyle
    descriptionStyle = item.descriptionStyle ? item.descriptionStyle : descriptionStyle
    renderDetail = item.renderDetail ? item.renderDetail : renderDetail
    if (renderDetail) return renderDetail({ ...item, titleStyle: [styles.title, titleStyle], descriptionStyle, renderDetail }, index)
    return (
      <View style={styles.container}>
          <Text style={[styles.title, titleStyle]}>{item.title}</Text>
          { item.description
           ? <Text style={[styles.description, descriptionStyle]}>{item.description}</Text> 
           : null
          }
          { item.image != null
           ? <Image source={this.getTimeLineImage(item.image)} width={Dimensions.get('window').width * 0.7} resizeMode="contain"/> 
           : null
          }
      </View>
    )
  }

  renderCircleAndLineVertical = (item, index) => {
    let { lineWidth, lineColor, marginTopCircle, data, widthLineContainer, renderLine, dashLine } = this.props;
    lineWidth = item.lineWidth ? item.lineWidth : lineWidth
    lineColor = item.lineColor ? item.lineColor : lineColor
    dashLine = item.dashLine ? item.dashLine : dashLine
    renderLine = item.renderLine ? item.renderLine : renderLine
    let innerCircle = this.renderInnerCircle(item);
    let heightLineTop = marginTopCircle / 2;
    let renderTopLine = renderLine || index < 1  ? renderLine : <View style={[{width: lineWidth, height: heightLineTop, backgroundColor: data[index-1].lineColor ? data[index-1].lineColor : lineColor }]}/>;
    let renderBottomLine = renderLine ? renderLine : <View style={{ width: lineWidth, flex: 1, backgroundColor: lineColor}} />;
    if ( dashLine ) {
      renderBottomLine = <Dash style={{flex: 1 , flexDirection: 'column'}} dashColor={lineColor} dashThickness={lineWidth} />
    }
    return (
      <View style={{ alignItems: 'center', flex: 1, width: widthLineContainer }}>
        {
          index != 0
          ? renderTopLine
          : null
        }
        {this.renderCircle(item, index)}
        {renderBottomLine}
      </View>
    )
  }
  renderCircle (item, index) {
    let { renderIcon, circleStyle, circleColor, circleSize, spacingDot, marginTopCircle } = this.props;
    circleStyle = item.circleStyle ? item.circleStyle : circleStyle;
    circleSize = item.circleSize ? item.circleSize : circleSize
    circleColor = item.circleColor ? item.circleColor : circleColor
    renderIcon = item.renderIcon ? item.renderIcon : renderIcon;
    if (renderIcon) {
      return renderIcon()
    } else {
      let innerCircle = this.renderInnerCircle(item);
      return (
        <View style={[styles.circle, circleStyle, { backgroundColor: circleColor, width: circleSize, height: circleSize, marginTop: spacingDot, marginBottom: spacingDot } , index == 0 ? { marginTop: marginTopCircle } : {} ]}>
          {innerCircle}
        </View>
      )
    }
  }
  renderInnerCircle(item){
    let { dotSize, dotColor, innerCircleType } = this.props;
    console.log('props', this.props)
    innerCircleType = item.innerCircleType ? item.innerCircleType : innerCircleType
    dotSize = item.dotSize ? item.dotSize : dotSize
    dotColor = item.dotColor ? item.dotColor : dotColor
    let innerCircle = null;
    switch(innerCircleType){
      case 'dot':
        let dotStyle = {
          height: dotSize,
          width: dotSize,
          borderRadius: dotSize / 2,
          backgroundColor: dotColor
        }
        innerCircle = (<View style={[dotStyle]}/>)
        break;
    }
    return innerCircle;
  }
  renderSeparator(){
    const { isRenderSeperator, separatorStyle } = this.props;
    if(isRenderSeperator)
      return (
          <View><View style={[styles.separator, separatorStyle]}></View><View style={{padding:20}}></View></View>
      )
    else
      return null
  }

  getTimeLineImage(imageName){
    return (timeLine_images[imageName]) ? timeLine_images[imageName] : null;
  }
}

Timeline.defaultProps = {
    circleSize: defaultCircleSize,
    circleColor: defaultCircleColor,
    lineWidth: defaultLineWidth,
    lineColor: defaultLineColor,
    innerCircleType: defaultInnerCircle,
    columnFormat: 'single-column-left',
    dotSize: defaultCircleSize / 2,
    dotColor: defaultDotColor,
    renderTimeBottom: () => null,
    marginTopCircle: defaultTitleFontSize / 2,
    spacingDot: 4,
    showAmPm: true,
    timeFormat: 'hh.mm',
    renderIcon: null,
    renderDetail: null,
    isRenderSeperator: false,
    widthLineContainer: 30,
    renderLine: null,
    dashLine: false,
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
  '1947' : require('../../images/Images_TimeLine/1947.png'),
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
    minWidth: defaultTimeWidth,
    flex: 1,
  },
  time: {
    textAlign: 'right',
  //  color: defaultTimeTextColor,
  },
  timeText: {
    //color: defaultTimeTextColor,
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
    width: defaultCircleSize,
    height: defaultCircleSize,
    borderRadius: 100,
    backgroundColor: '#A6A8AA',
    // marginTop: 2,
    // marginBottom: 2,
    // position: 'absolute',
    // left: -8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: defaultTitleFontSize,
    fontWeight: 'bold',
  },
  description: {
  //  borderLeftWidth: defaultLineWidth,
    flexDirection: 'column',
    flex: 1,
    marginTop: 6,
  },
  separator: {
    height: 0.75,
    backgroundColor: '#aaa',
    marginTop: 6,
    marginBottom: 6
  }
});
