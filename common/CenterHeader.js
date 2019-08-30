import React, { PureComponent } from 'react';
import { View, Image } from 'react-native';


export default class CenterHeader extends PureComponent {

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#F6A338', marginBottom: 100 }} >
        <Image
          style={{
            height: 100, marginLeft: 'auto', marginRight: 'auto',
            width: 410, resizeMode: 'cover', marginBottom: 100,
            transform: [
              { scaleX: 0.3 },
              { scaleY: 0.4 }
            ]
          }}
          source={require('./logo_CalpulliX.png')} />
      </View>);
  }

}

