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
import CenterHeader from './CenterHeader';

idValue = 0;

const accordionStyles = StyleSheet.create({
  accordionHeader: {
    backgroundColor: '#F3F9FA',
    padding: 10,
    borderColor: '#F49315',
    width: '90%',
    borderWidth: 0.5,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    borderRadius: 5,
    flexDirection: 'row',
  },
  accordionActiveHeader: {
    backgroundColor: '#F6A338',
  },
  accordionHeaderText: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '500',
  },
  accordionActiveRow: {
    backgroundColor: '#EDEDED'
  },
  accordionInactiveRow: {
    backgroundColor: '#F3F9FA'
  },
  accordionRow: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 0,
    padding: '5%',
  },
});

export default class GenericAccordion extends PureComponent {
  state = {
    activeSections: [],
    collapsed: true,
  };

  openDetail = async () => {
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
    return {
      "id": idValue
    };
  }

  renderHeader = (section, _, isActive) => {
    const headerLabel = this.props.headerLabel != undefined ? this.props.headerLabel : null;
    const sourceImage = isActive ? require('./up_arrow.png') : require('./down_arrow.png');
    return (
      <Animatable.View
        duration={400}
        style={[accordionStyles.accordionHeader, (isActive ? accordionStyles.accordionActiveHeader : '')]}
        transition="backgroundColor" >
        <Text style={accordionStyles.accordionHeaderText}
          style={{ color: (isActive ? '#FFFFFF' : '#000000') }}>{(headerLabel != null ? headerLabel : "") + " " + (section.header)}</Text>
        <Image
          style={{
            position: 'absolute', height: 17, width: 10, marginLeft: '90%', marginTop: '2%', transform: [
              { scaleX: 0.5 },
              { scaleY: 0.5 }
            ]
          }}
          source={sourceImage} />
      </Animatable.View>
    );
  };

  getPropertyLabelName(property) {
    let labelName = property;
    const { labelNames } = this.props;
    if (labelNames != undefined)
      for (let key in labelNames)
        if (key == property)
          labelName = labelNames[key];
    return labelName;
  }

  mapObjectToRow(filteredProps, object) {
    let rows = [];
    for (let property in object)
      if (!filteredProps.includes(property))
        rows.push(this.getPropertyLabelName(property) + "\t \n \n" + object[property]);

    return rows;
  }

  renderContent(section, _, isActive, _renderDetailButton, _onPress, _titleButton) {
    let highlightRow = false;
    let filteredContent = this.mapObjectToRow(this.props.filteredProperties, section).map((row, index) => {
      highlightRow = !highlightRow;

      return (
        <Animatable.Text
          key={index}
          animation={isActive ? 'bounceIn' : undefined}
          style={[accordionStyles.accordionRow, highlightRow ? accordionStyles.accordionActiveRow : accordionStyles.accordionInactiveRow]}>
          {row}
        </Animatable.Text>
      );
    });

    if (isActive) {
      idValue = section.id;
    }

    if (_renderDetailButton) {
      return (
        <Animatable.View
          duration={50}
          style={[styles.content, isActive ? styles.active : styles.inactive]}
          transition="backgroundColor" >
          {filteredContent}
          <Animatable.View
            animation={isActive ? 'bounceIn' : undefined}
            style={[accordionStyles.accordionRow, !highlightRow ? accordionStyles.accordionActiveRow : accordionStyles.accordionInactiveRow]}>
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
        </Animatable.View>
      );
    } else {
      return (
        <Animatable.View
          duration={50}
          style={[styles.content, isActive ? styles.active : styles.inactive]}
          transition="backgroundColor" >
          {filteredContent}
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
        <View style={{ marginTop: 10, marginBottom: 15 }}>
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
