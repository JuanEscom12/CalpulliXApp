import React, { PureComponent } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import ButtonCalpulliX from '../common/ButtonCalpulliX';
import NavigatorCommons from '../navigation/NavigatorCommons';
import ApiCaller from '../api/ApiCaller';
import styles from './style';
import { NavigationEvents } from 'react-navigation';
import analytics from '@react-native-firebase/analytics';
idValue = 0;


export default class AccordionCalpulliX extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      activeSections: [],
      collapsed: true,
    };
  } 

  openDetail = async () => {
    analytics().logEvent(
      'screen_view', {
          screen_name: this.props.screen,
          screen_view: this.props.screen,
          app_name: 'CalpulliXApp'
    });
    const response = await ApiCaller.callApi(
      this.props.path, this.getDetailRequest(), this.props.port, 'POST')
      .catch((error) => {
        console.log(error);
      });
    NavigatorCommons.navigateTo(this.props.navigation, this.props.screen,
      { 'responseApi': response });
  }

  setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  getDetailRequest = () => {
    var result;
    if (this.props.requestParameter) {
      result = {
        "id": idValue,
        "parameter": this.props.requestParameter,
      };
    } else {
      result = {
        "id": idValue
      };
    }
    return result;
  }

  renderHeader = (section, _, isActive) => {
    var image;
    if (isActive) {
      image = <Image
        style={{
          height: 25, width: 26, marginLeft: this.props.marginLeftRowHeader, transform: [
            { scaleX: 0.5 },
            { scaleY: 0.5 }
          ]
        }}
        source={require('./down_arrow.png')} />
    } else {
      image = <Image
        style={{
          height: 25, width: 26, marginLeft: this.props.marginLeftRowHeader, transform: [
            { scaleX: 0.5 },
            { scaleY: 0.5 }
          ]
        }}
        source={require('./up_arrow.png')} />
    }
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor" >
        <Text style={isActive ? styles.headerText : styles.headerTextInactive}>
          {this.props.labelHeader + section[0]}
        </Text>
        {image}
      </Animatable.View>
    );
  };

  renderContent(section, _, isActive, _renderDetailButton, _onPress, _titleButton,
    _labels, _renderInputText, _handlerInputTextInformation) {
    if (isActive) {
      idValue = section[0];
    }
    var text = [];
    for (let i = 0; i < _labels.length; i++) {
      text.push(
        <Animatable.Text
          id={section[0] + '' + i}
          animation={isActive ? 'bounceIn' : undefined}
          style={[i % 2 === 0 ? styles.contentText : styles.contentTextLight]}>
          {'\n     ' + _labels[i] + '\n\n     ' + section[i + 1] + '\n'}
        </Animatable.Text>
      );
    }
  if (_renderDetailButton) {
      return (
      <Animatable.View
        duration={50}
        style={[_labels.length % 2 === 0 ? styles.content : styles.contentLight]}
        transition="backgroundColor" >
        {text}
        <ButtonCalpulliX
          title={_titleButton}
          id={'buttonDetail'}
          arrayColors={['#05AAAB', '#048585', '#048585']}
          onPress={_onPress}
          width={'30%'}
          height={40}
          marginTop={10}
          marginBottom={10} />
      </Animatable.View>);
    } else {
      return (
        <Animatable.View
          duration={50}
          style={[_labels.length % 2 === 0 ? styles.content : styles.contentLight]}
          transition="backgroundColor" >
          {text}
        </Animatable.View>
      );
    }
  }

  closeSections = () => {
    this.setState({
      //activeSections: [],
    });
  }

  render() {
    const { activeSections } = this.state;
    const {
      content,
      renderDetailButton,
      titleButton,
      margintTop,
      labels,
      handlerInputTextInformation,
      renderInputText,
    } = this.props
    return (
      <View>
        <View style={{ marginTop: margintTop, marginBottom: 15 }}>
        <NavigationEvents
          onWillFocus={() => {
            this.closeSections();
          }} />
          <Accordion
            activeSections={activeSections}
            sections={content}
            touchableComponent={TouchableOpacity}
            expandMultiple={false}
            renderHeader={this.renderHeader}
            renderContent={(section, _, isActive) =>
              this.renderContent(section, _, isActive,
                renderDetailButton, this.openDetail, titleButton, labels,
                renderInputText, handlerInputTextInformation)}
            duration={50}
            onChange={this.setSections} />
        </View>
      </View>
    );
  }
}
