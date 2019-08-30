import React, { PureComponent } from 'react';
import {
  ImageBackground,
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  Dimensions, 
  View
} from 'react-native';
import styles from './style'


const { height } = Dimensions.get('window');

onContentSizeChange = (contentWidth, contentHeight) => {
  this.setState({ screenHeight: (contentHeight + this.props.addHeight)});
};

export default class BackgroundScrollCalpulliX extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
          screenHeight: (height + props.addHeight)
        };
      }
 
  render() {
    const scrollEnabled = this.state.screenHeight > height;
    return (
      <ImageBackground
        source={require('./Splash_Bg.png')} style={styles.imageBackGround}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={styles.avoidingScroll} >
          <ScrollView
            style={styles.avoidingScroll}
            contentContainerStyle={styles.containerStyle}
            scrollEnabled={scrollEnabled}
            onContentSizeChange={this.onContentSizeChange}>
            <View style={{ width: '100%', height: this.state.screenHeight }} >
               {this.props.children}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}


