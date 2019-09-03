import React, { PureComponent } from 'react';
import {
  StyleSheet,
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
import styles from './style'

idValue = 0;

export default class AccordionCalpulliX extends PureComponent {
  state = {
    activeSections: [],
    collapsed: true,
  };

  openDetail = async () => {
    console.log(':: ID VALUE: ' + idValue);
    const response = await ApiCaller.callApi(this.props.path, this.getDetailRequest())
      .catch((error) => {
        console.log(error);
      });
    NavigatorCommons.navigateTo(this.props.navigation, this.props.screen);
  }

  setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  getDetailRequest = () => {
    return {
      "id": idValue
    }; 
  } 

  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor" >
        <Text style={styles.headerText}>{section.id}</Text>
        <Image
          style={{
            height: 25, width: 26, marginLeft: '80%', transform: [
              { scaleX: 0.5 },
              { scaleY: 0.5 }
            ]
          }}
          source={require('./right-arrow.png')} />
      </Animatable.View>
    );
  };

  renderContent(section, _, isActive, _renderDetailButton, _onPress, _titleButton) {
    if (isActive) {
      idValue = section.id;
    }
    
    if (_renderDetailButton) {
      return (
        <Animatable.View
          duration={50}
          style={[styles.content, isActive ? styles.active : styles.inactive]}
          transition="backgroundColor" >
          <Animatable.Text
            animation={isActive ? 'bounceIn' : undefined}
            style={[styles.content, isActive ? styles.activeText : styles.inactiveText]}>
            {section.content}
          </Animatable.Text>
          <ButtonCalpulliX
            title={_titleButton}
            id={'buttonDetail'}
            arrayColors={['#05AAAB', '#048585', '#048585']}
            onPress={_onPress}
            width={'30%'}
            height={40}
            marginTop={10}
            marginBottom={10} />
        </Animatable.View>
      );
    } else {
      return (
        <Animatable.View
          duration={50}
          style={[styles.content, isActive ? styles.active : styles.inactive]}
          transition="backgroundColor" >
          <Animatable.Text
            animation={isActive ? 'bounceIn' : undefined}
            style={[styles.content, isActive ? styles.activeText : styles.inactiveText]}>
            {section.content}
          </Animatable.Text>
        </Animatable.View>
      );
    }

  }

  render() {
    const { activeSections } = this.state;
    const {
        content,
        renderDetailButton,
        titleButton,
    } = this.props
    
    return (
        <View>
          <View style={{ marginTop: 15, marginBottom: 15 }}>
            <Accordion
              activeSections={activeSections}
              sections={content}
              touchableComponent={TouchableOpacity}
              expandMultiple={false}
              renderHeader={this.renderHeader}
              renderContent={(section, _, isActive) => 
                this.renderContent(section, _, isActive, 
                  renderDetailButton, this.openDetail, titleButton)}
              duration={50}
              onChange={this.setSections} />
          </View>
        </View>
    );
  }
}
