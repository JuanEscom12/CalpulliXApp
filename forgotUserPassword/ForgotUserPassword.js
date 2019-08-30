import React, { PureComponent } from 'react';
import { View } from 'react-native';
import BackButtonCalpulliX from '../common/BackButtonCalpulliX';

export default class ForgotUserPassword extends PureComponent {

  render() {
    return (
      <View style={{ backgroundColor: 'yellow', width: '100%', height: '100%' }}>
        <BackButtonCalpulliX
          id={'buttonBackForgotUserPassword'}
          height={22}
          width={22}
          marginTop={20}
          marginLeft='10%'
          marginRight='auto'
          screen='Login' 
          navigation={this.props.navigation}/>
      </View>

    );
  }
}


