import React, { PureComponent } from 'react';
import { View, TextInput, Text } from 'react-native';
import HeaderCalpulliXBack from '../common/HeaderCalpulliXBack';
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import stylesCommon from '../common/style'
import ButtonCalpulliX from '../common/ButtonCalpulliX';
import ApiCaller from '../api/ApiCaller';
import { NavigationEvents } from 'react-navigation';
import CONSTANTS from '../common/Constants';


export default class ForgotUserPassword extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      borderColorTextInput: "#F49315",
      backgroundColorUserInput: '#FDFDFD',
      headText: "Enviaremos una contraseña nueva a tu correo.",
      userText: "",
    };
  }

  handleOnFocus = () => {
    this.setState({
      borderColorTextInput: '#05AB50',
      backgroundColorUserInput: '#C1D9CC'
    })
  }

  handleOnBlur = () => {
    this.setState({
      borderColorTextInput: '#F49315',
      backgroundColorUserInput: '#FDFDFD'
    })
  }

  handleChangeUserText = (text) => {
    this.setState({
      userText: text
    })
  }

  restartPassword = async (e) => {
    if (this.isValidInput()) {
      const response = await ApiCaller.callApi('/calpullix/restartpassword',
        this.getRestartPasswordRequest(), CONSTANTS.PORT_RECOVER_PASSWORD, CONSTANTS.POST_METHOD)
        .catch((error) => {
          console.log(error);
          this.setState({
            errorMessage: 'Ocurrio un error, favor de intentar mas tarde'
          })
        });
      if (response.isValid) {
        this.setState({
          errorMessage: '',
          borderColorTextInput: '#F49315',
          headText: "Se ha enviado un correo con la nueva contraseña."
        });
      } else {
        this.setState({
          errorMessage: 'Ocurrio un error, favor de intentar mas tarde.'
        })
      }
    }
  }

  cleanInput = () => {
    this.setState({
      borderColorTextInput: "#F49315",
      backgroundColorUserInput: '#FDFDFD',
      headText: "Enviaremos una contraseña nueva a tu correo.",
      errorMessage: '',
      userText: '',
    });
  }

  isValidInput() {
    if (this.state.userText === '') {
      this.setState({
        errorMessage: 'El Usuario es requerido',
        headText: "Enviaremos una contraseña nueva a tu correo.",
        borderColorTextInput: '#F03000',
      });
      return false;
    } else {
      return true;
    }
  }

  getRestartPasswordRequest() {
    const request = {
      "user": this.state.userText
    };
    return request;
  }



  render() {
    return (
      <BackgroundScrollCalpulliX addHeight={0}>
        <NavigationEvents
          onWillFocus={() => {
            this.cleanInput();
          }} />
        <HeaderCalpulliXBack
          navigation={this.props.navigation} 
          backButton={true}
          screen={'Login'}
          title={"Recuperación de contraseña"}  />
        <View style={{ marginTop: 70, marginBottom: 15 }}>
          <Text
            id='errorMessageForgotPassword'
            style={stylesCommon.errorMessage}>{this.state.errorMessage}</Text>
          <Text style={{ fontSize: 13, textAlign: 'center', marginTop: 15 }}>
            {this.state.headText}
          </Text>
          <TextInput
            id='inputUserForgotPassword'
            style=
            {[
              stylesCommon.textInputCalpulliX,
              {
                borderColor: this.state.borderColorTextInput,
                backgroundColor: this.state.backgroundColorUserInput,
                marginTop: 25
              }
            ]}
            value={this.state.userText}
            onChangeText={(text) => this.handleChangeUserText(text)}
            onFocus={() => this.handleOnFocus()}
            onBlur={() => this.handleOnBlur()}
            placeholder='        Ingresa el nombre de tu usuario'
            placeholderTextColor='#9E9E9E' />
          <ButtonCalpulliX
            title={'Recuperar Contraseña'}
            id={'buttonRetrievePassword'}
            arrayColors={['#05AAAB', '#048585', '#048585']}
            onPress={this.restartPassword}
            width={'45%'}
            height={45}
            marginTop={40}
             />
        </View>
      </BackgroundScrollCalpulliX>
    );
  }
}


