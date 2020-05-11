import React, { PureComponent } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import CONSTANTS from '../common/Constants';
import commonStyles from '../common/style';
idValue = 0;

export default class AccordionTwitterCalpulliX extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      activeSections: [],
      collapsed: true,
    };
  }

  setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  renderHeader = (_section, _, isActive) => {
    var image;
    if (isActive) {
      image =
        <Image
          style={{
            height: 25, width: 26, marginLeft: this.props.marginLeftRowHeader, transform: [
              { scaleX: 0.5 },
              { scaleY: 0.5 }
            ]
          }}
          source={require('./down_arrow.png')} />
    } else {
      image =
        <Image
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
        style={[commonStyles.header, isActive ? commonStyles.active : commonStyles.inactive]}
        transition="backgroundColor" >
        <Text style={isActive ? commonStyles.headerText : commonStyles.headerTextInactive}>
          {_section[CONSTANTS.ZERO].header}
        </Text>
        {image}
      </Animatable.View>
    );
  };

  renderContent(_section, _, isActive) {
    var messages = [];
    for (var index = CONSTANTS.ZERO; index < _section.length; index++) {
      messages.push(
        <View style={[commonStyles.contentTextLight]}>
          <View style={{ marginTop: 10, backgroundColor: '#F3F9FA', }}>
            <Text style={{ fontSize: 10, fontWeight: "bold", marginLeft: 10 }}>{_section[index].name}</Text>


            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 8, color: '#9E9E9E', marginLeft: 10, width: '80%' }}>{_section[index].atName}</Text>
              <Image
                style={{
                  height: 25, width: 25, 
                }}
                source={require('./twitter-icon.jpg')} />
            </View>


            <View style={{ marginTop: 5, }}>
              <Text style={{
                padding: 3, width: '95%', height: 60, marginLeft: 'auto', marginRight: 'auto',
                borderColor: '#29B4B5', borderWidth: 0.5, fontSize: 10, color: '#9E9E9E', borderRadius: 5,
              }}>
                {_section[index].message}
              </Text>
              <Text style={{ marginLeft: '68%', color: '#9E9E9E', fontSize: 10, marginBottom: 10 }} >
                {_section[index].date}
              </Text>
            </View>
          </View>
          <View style={{ width: '100%', borderWidth: 0.2, borderColor: '#727171' }} />
        </View>
      );
    }
    return (
      <Animatable.View
        duration={50}
        style={[commonStyles.contentLight]}
        transition="backgroundColor" >
        {messages}
      </Animatable.View>
    );
  }

  render() {
    const { activeSections } = this.state;
    const {
      content,
      margintTop,
    } = this.props
    return (
      <View>
        <View style={{ marginTop: margintTop, marginBottom: 15 }}>
          <Accordion
            activeSections={activeSections}
            sections={content}
            touchableComponent={TouchableOpacity}
            expandMultiple={true}
            renderHeader={this.renderHeader}
            renderContent={(section, _, isActive) =>
              this.renderContent(section, _, isActive)
            }
            duration={50}
            onChange={this.setSections} />
        </View>
      </View>
    );
  }
}
