import React, { PureComponent } from 'react';
import { Header } from 'react-native-elements';
import LeftHeader from './LeftHeader';
import CenterHeader from './CenterHeader';
import RightHeader from './RightHeader';


export default class HeaderCalpulliX extends PureComponent {
    
  render() {
    return (
          <Header
            containerStyle={{
              backgroundColor: '#F6A338',
              height: 100
            }}>
            <LeftHeader />
            <CenterHeader />
            <RightHeader />
          </Header>
    );
  }
}