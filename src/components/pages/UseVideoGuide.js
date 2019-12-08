import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import VideoPlayer from 'react-native-video-player';
import styles from "../../assets/styles/pages/useVideoGuide";

const VIMEO_ID = '366017529';

export default class UseGuide extends Component {

  constructor() {
    super();

    this.state = {
      video: { width: undefined, height: undefined, duration: undefined },
      thumbnailUrl: undefined,
      videoUrl: undefined,
    };
  }

  componentDidMount() {
    global.fetch(`https://player.vimeo.com/video/${VIMEO_ID}/config`)
      .then(res => res.json())
      .then(res => this.setState({
        thumbnailUrl: res.video.thumbs['640'],
        videoUrl: res.request.files.hls.cdns[res.request.files.hls.default_cdn].url,
        video: res.video,
      }));
  }

  stop(){
    this.player.setState({
      isPlaying: false,
      progress: 0,
    });
    this.player.showControls();

    this.props.navigation.navigate('MainApp');
  }

  render() {
    return (
      <View>
        <VideoPlayer
          endWithThumbnail
          thumbnail={{ uri: this.state.thumbnailUrl }}
          video={{ uri: this.state.videoUrl }}
          videoWidth={this.state.video.width}
          videoHeight={this.state.video.height}
          duration={this.state.video.duration/* I'm using a hls stream here, react-native-video
            can't figure out the length, so I pass it here from the vimeo config */}
          ref={r => this.player = r}
          style={{height: '93%'}}
        />
        <TouchableOpacity
          style={styles.okButton}
          onPress={() => this.stop()}>
          <Text style={styles.okBtn}> Continuar </Text>
        </TouchableOpacity>
        
      </View>
    );
  }
}

AppRegistry.registerComponent('UseGuide', () => UseGuide);
