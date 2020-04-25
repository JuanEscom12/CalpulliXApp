import React, { PureComponent } from 'react';
import { View, Image, Text } from 'react-native';


export default class CenterHeader extends PureComponent {

  render() {
    return (
      <View style={{ flex: 2, flexDirection: 'column', backgroundColor: '#F6A338', marginBottom: 100 }} >
        
        <Image
          style={{
           
            height: 50, marginLeft: 'auto', marginRight: 'auto',
            width: 250, resizeMode: 'cover', 
            alignContent: 'center',
            transform: [
              { scaleX: 0.4 },
              { scaleY: 0.5 }
            ]
          }}
          source={require('./logo_CalpulliX.png')} />
           <Text 
              style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 16,
              height: 50,
              width: 250
            }}>
            {this.props.title}
          </Text>
          
      </View>);
  }

}