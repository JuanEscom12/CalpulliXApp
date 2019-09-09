import React, { PureComponent } from 'react';
import {
  View,
  Text
} from 'react-native';
import TopLogin from './TopLogin';
import MiddleLogin from './MiddleLogin';
import BottomLogin from './BottomLogin';
import ApiCaller from '../api/ApiCaller';
import NavigatorCommons from '../navigation/NavigatorCommons';
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import styles from './style'
import stylesCommon from '../common/style'

var user = '';
var pass = '';

export default class CalpulliX extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
    };
  }

  doLogin = async (e) => {
    if (this.isValidInput()) {
      const response = await ApiCaller.callApi('/calpullix/login', this.getLoginRequest())
        .catch((error) => {
          console.log(error);
          this.setState({
            errorMessage: 'Ocurrio un error, favor de intentar mas tarde'
          })
        });
      if (response.isValid) {
        NavigatorCommons.navigateTo(this.props.navigation, 'Home');
      }
      this.cleanInput();
    }
  }

  isValidInput() {
    if (user === '' || pass === '') {
      this.setState({
        errorMessage: 'El Usuario y Contraseña son requeridos'
      });
      return false;
    } else {
      return true;
    }
  }

  getLoginRequest() {
    const request = {
      "user": user,
      "password": pass
    };
    return request;
  }

  hanlderInput = (_State) => {
    user = _State.userText;
    pass = _State.passText;
  }

  cleanInput = () => {
    user = '';
    pass = '';
  }

  render() {
    return (
      <BackgroundScrollCalpulliX 
      addHeight={50}>
        <View style={styles.mainView} >
          <TopLogin />
          <Text
            id='errorMEssage'
            style={stylesCommon.errorMessage}>{this.state.errorMessage}</Text>
          <MiddleLogin doLogin={(e) => this.doLogin(e)}
            hanlderInput={this.hanlderInput}
            marginTop={30}
            navigation={this.props.navigation}
            cleanInput={this.cleanInput} />
          <BottomLogin />
        </View>
      </BackgroundScrollCalpulliX>
    );
  }
}



