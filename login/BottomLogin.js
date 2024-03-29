import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import analytics from '@react-native-firebase/analytics';

export default class BottomLogin extends PureComponent {
  videoPlayer;
 
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      duration: 0,
      isFullScreen: false,
      isLoading: false,
      paused: true,
      playerState: PLAYER_STATES.PAUSED,
      screenType: 'content',
    };
  }
 
  onSeek = seek => {
    //Handler for change in seekbar
    this.videoPlayer.seek(seek);
  };
 
  onPaused = playerState => {
    //Handler for Video Pause
    analytics().logEvent(
      'on_paused_video', {
          description: 'Pause video' + (!this.state.paused).toString()
    });
  
    this.setState({
      paused: !this.state.paused,
      playerState,
    });
  };
 
  onReplay = () => {
    //Handler for Replay
    this.setState({ playerState: PLAYER_STATES.PLAYING });
    this.videoPlayer.seek(0);
    analytics().logEvent(
      'on_replay_video', {
          description: 'Replay video ' + PLAYER_STATES.PLAYING
    });
  };
 
  onProgress = data => {
    const { isLoading, playerState } = this.state;
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({ currentTime: data.currentTime });
    }
  };
  
  onLoad = data => this.setState({ duration: data.duration, isLoading: false });
  
  onLoadStart = data => this.setState({ isLoading: false });
  
  onEnd = () => this.setState({ playerState: PLAYER_STATES.ENDED });
  
  onError = () => alert('Oh! ', error);
  
  exitFullScreen = () => {
    alert('Exit full screen');
    analytics().logEvent(
      'exit_fullscreen_video', {
          description: 'Exit full screeen video'
    });
  };
  
  enterFullScreen = () => {
    analytics().logEvent(
      'on_fullscreen_video', {
          description: 'Full screeen video'
    });
  };
  
  onFullScreen = () => {
    if (this.state.screenType == 'content')
      this.setState({ screenType: 'cover' });
    else this.setState({ screenType: 'content' });
  };
  
  onSeeking = currentTime => this.setState({ currentTime });
 
  render() {
    return (
      <View style={styles.container}>
        <Video
          onEnd={this.onEnd}
          onProgress={this.onProgress}
          paused={this.state.paused}
          ref={videoPlayer => (this.videoPlayer = videoPlayer)}
          resizeMode={this.state.screenType}
          onFullScreen={this.state.isFullScreen}
          source={require('./Retail.mp4')}
          style={styles.mediaPlayer}
          volume={10} />
        <MediaControls
          duration={this.state.duration}
          isLoading={this.state.isLoading}
          mainColor="#333"
          onFullScreen={this.onFullScreen}
          onPaused={this.onPaused}
          onReplay={this.onReplay}
          onSeek={this.onSeek}
          onSeeking={this.onSeeking}
          playerState={this.state.playerState}
          progress={this.state.currentTime} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 190, 
    width: '85%', 
    marginLeft: 'auto', 
    marginRight: 'auto',
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    height: 190, 
    marginTop: 10,
    width: '100%', 
    marginLeft: 'auto', 
    marginRight: 'auto',
    backgroundColor: 'black',
  },
});