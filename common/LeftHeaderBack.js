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
        navigation
    } = this.props
    return (
      <View style={{ flex: 1, backgroundColor: '#F6A338'}} >
        <BackButtonCalpulliX
          id={'buttonBackCommonHeader'}
          height={22}
          width={22}
          marginTop={20}
          marginLeft='10%'
          marginRight='auto'
          screen='Login' 
          navigation={navigation}/>
      </View>
    );
  }

}