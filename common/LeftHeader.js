import React, { PureComponent } from 'react';
import { View } from 'react-native';


export default class LeftHeader extends PureComponent {

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
    return (
      <View style={{ flex: 1, backgroundColor: '#F6A338'}} />
    );
  }

}