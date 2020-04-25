import React, { PureComponent } from 'react';
import {
  View,
  Text,
} from 'react-native';
import TopLogin from './TopLogin';
import MiddleLogin from './MiddleLogin';
import BottomLogin from './BottomLogin';
import ApiCaller from '../api/ApiCaller';
import NavigatorCommons from '../navigation/NavigatorCommons';
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import styles from './style'
import stylesCommon from '../common/style'
import CONSTANTS from '../common/Constants';
import Validator from '../validation/Validator';
import analytics from '@react-native-firebase/analytics';

var user = '';
var pass = '';
const idRegexp = /^\d/;

export default class CalpulliX extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
    };
  }

  doLogin = async (e) => {
    if (this.isValidInput()) {
      analytics().logEvent(
        'login', {
            description: 'Login of user ' + user
      });
      const response = await ApiCaller.callApi('/calpullix/login', 
        this.getLoginRequest(), CONSTANTS.PORT_LOGIN, CONSTANTS.POST_METHOD)
        .catch((error) => {
          console.log(error);
          this.setState({
            errorMessage: 'Ocurrio un error, favor de intentar mas tarde'
          })
        });
      
      if (response.isValid) {
        this.setState({
          errorMessage: ''
        });
        NavigatorCommons.navigateTo(this.props.navigation, 'ProductList', { 'navigateFromLogin': true });
      } else {
        this.setState({
          errorMessage: 'El usuario o la contraseña son invalidos'
        })
      }
    }
  }

  isValidInput() {
    if (user === '' || pass === '') {
      this.setState({
        errorMessage: 'El Usuario y Contraseña son requeridos'
      });
      return false;
    } else if (!Validator.isValidRegExp(user, idRegexp, false)) {
      this.setState({
        errorMessage: 'Ingresa un Usuario valido'
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

  hanlderInputUser = (_user) => {
    user = _user;
  }

  hanlderInputPass = (_pass) => {
    pass = _pass;
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
            hanlderInputUser={this.hanlderInputUser}
            hanlderInputPass={this.hanlderInputPass}
            marginTop={30}
            navigation={this.props.navigation}
            cleanInput={this.cleanInput} />
          <BottomLogin />
        </View>
      </BackgroundScrollCalpulliX>
    );
  }
}



