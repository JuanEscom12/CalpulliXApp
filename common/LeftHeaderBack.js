import React, { PureComponent } from 'react';
import { View } from 'react-native';
import BackButtonCalpulliX from '../common/BackButtonCalpulliX';


export default class LeftHeaderBack extends PureComponent {

  constructor() {
    super()
    this.state = {
      isOpen: false
    }
    this.toggleSideMenu = this.toggleSideMenu.bind(this)
  }

  toggleSideMenu() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const {
      navigation,
      screen,
      backButton,
    } = this.props
    var button;
    if (backButton) {
      button =
      <View style={{  }}>
        <BackButtonCalpulliX
          id={'buttonBackCommonHeader'}
          height={22}
          width={22}
          marginTop={50}
          marginLeft='10%'
          marginRight='auto'
          screen={ screen }
          navigation={navigation}
           />
        </View>
    } else {
      button = <View />
    }
    return (
      
      <View style={{ backgroundColor: '#F6A338', marginBottom: 27}} >
        {button}
       
      </View>
      
    );
  }

}