import React, { PureComponent } from 'react';
import { Header } from 'react-native-elements';
import LeftHeaderBack from './LeftHeaderBack';
import CenterHeader from './CenterHeader';
import RightHeader from './RightHeader';
import LinearGradient from 'react-native-linear-gradient';


export default class HeaderCalpulliXBack extends PureComponent {
    
  render() {
    const {
        navigation,
        backButton,
        screen,
        title,
    } = this.props
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
            <LeftHeaderBack 
                navigation={navigation}
                screen={screen}
                backButton={backButton} />
            <CenterHeader 
                title={title}/>
            <RightHeader />
          </Header>
    );
  }
}