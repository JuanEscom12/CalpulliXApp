import React, { PureComponent } from 'react';
import { Header } from 'react-native-elements';
import LeftHeaderBack from './LeftHeaderBack';
import CenterHeader from './CenterHeader';
import RightHeader from './RightHeader';


export default class HeaderCalpulliXBack extends PureComponent {
    
  render() {
    const {
        navigation,
    } = this.props
    return (
          <Header
            containerStyle={{
              backgroundColor: '#F6A338',
              height: 100
            }}>
            <LeftHeaderBack navigation={navigation}/>
            <CenterHeader />
            <RightHeader />
          </Header>
    );
  }
}