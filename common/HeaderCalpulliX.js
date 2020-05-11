import React, { PureComponent } from 'react';
import { Header } from 'react-native-elements';
import LeftHeader from './LeftHeader';
import CenterHeader from './CenterHeader';
import RightHeader from './RightHeader';
import LinearGradient from 'react-native-linear-gradient';


export default class HeaderCalpulliX extends PureComponent {
    
  render() {
    return (
          <Header
          ViewComponent={LinearGradient} 
          linearGradientProps={{
              colors: ['#F6A338', '#ffb858'],
              start: { x: 0, y: 1 },
              end: {  x: 1, y: 1 },
            }}
            containerStyle={{
              height: 100,
            }}>
            <LeftHeader />
            <CenterHeader />
            <RightHeader />
          </Header>
    );
  }
}