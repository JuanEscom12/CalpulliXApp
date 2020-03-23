import React, { PureComponent } from 'react';
import { View, TextInput, Text } from 'react-native';
import HeaderCalpulliXBack from '../common/HeaderCalpulliXBack';
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import stylesCommon from '../common/style'
import ButtonCalpulliX from '../common/ButtonCalpulliX';
import ApiCaller from '../api/ApiCaller';
import { NavigationEvents } from 'react-navigation';
import CONSTANTS from '../common/Constants';
import Validator from '../validation/Validator';


const idRegexp = /^\d/;

export default class ForgotUserPassword extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      borderColorTextInput: "#F49315",
      backgroundColorUserInput: '#FDFDFD',
      headText: "Enviaremos una contraseña nueva a tu correo",
      userText: "",
      showChangePassword: false,
      oldPassword: "",
      newPassword: "",
      newPasswordRepeated: "",
      headTextChangePass: "",
      userChangePassword: "",
      errorMessageChangePasword: '',
      borderColorUserChangePasswordInput: "#F49315",
      backgroundColorUserChangePasswordInput: '#FDFDFD',
      borderColorOldPasswordTextInput: "#F49315",
      backgroundColorOldPasswordInput: '#FDFDFD',
      borderColorNewPasswordInput: "#F49315",
      backgroundColorNewPasswordInput: '#FDFDFD',
      borderColorNewPasswordRepInput: "#F49315",
      backgroundColorNewPasswordRepInput: '#FDFDFD',
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

  restartPassword = async () => {
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
          headText: "Se te ha enviado un correo con la nueva contraseña"
        });
      } else {
        this.setState({
          errorMessage: 'El usuario es incorrecto'
        })
      }
    }
  }

  cleanInput = () => {
    this.setState({
      borderColorTextInput: "#F49315",
      backgroundColorUserInput: '#FDFDFD',
      headText: "Enviaremos una contraseña nueva a tu correo",
      errorMessage: '',
      userText: '',
      oldPassword: "",
      newPassword: "",
      newPasswordRepeated: "",
      userChangePassword: "",
      showChangePassword: false,
      errorMessageChangePasword: '',
      headTextChangePass: '',
      borderColorUserChangePasswordInput: "#F49315",
      backgroundColorUserChangePasswordInput: '#FDFDFD',
      borderColorOldPasswordTextInput: "#F49315",
      backgroundColorOldPasswordInput: '#FDFDFD',
      borderColorNewPasswordInput: "#F49315",
      backgroundColorNewPasswordInput: '#FDFDFD',
      borderColorNewPasswordRepInput: "#F49315",
      backgroundColorNewPasswordRepInput: '#FDFDFD',
    });
  }

  isValidInput() {
    if (this.state.userText === '') {
      this.setState({
        borderColorTextInput: '#F03000',
        errorMessage: 'El Usuario es requerido',
      });
      return false;
    } else if (!Validator.isValidRegExp(this.state.userText, idRegexp, false)) {
      this.setState({
          borderColorTextInput: '#F03000',
          errorMessage: 'Introduce un Id de usuario valido',
      });
  }
     else {
      return true;
    }
  }

  getRestartPasswordRequest() {
    const request = {
      "id": this.state.userText
    };
    return request;
  }


  handleOnFocusUser = () => {
    this.setState({
      borderColorUserChangePasswordInput: '#05AB50',
      backgroundColorUserChangePasswordInput: '#C1D9CC'
    });
  }

  handleOnBlurUser = () => {

    this.setState({
      borderColorUserChangePasswordInput: '#F49315',
      backgroundColorUserChangePasswordInput: '#FDFDFD'
    });
  }

  handleOnFocusOldPass = () => {
    this.setState({
      borderColorOldPasswordTextInput: '#05AB50',
      backgroundColorOldPasswordInput: '#C1D9CC'
    })
  }

  handleOnBlurOldPass = () => {
    this.setState({
      borderColorOldPasswordTextInput: '#F49315',
      backgroundColorOldPasswordInput: '#FDFDFD'
    })
  }

  handleOnFocusPass = () => {
    this.setState({
      borderColorNewPasswordInput: '#05AB50',
      backgroundColorNewPasswordInput: '#C1D9CC'
    })
  }

  handleOnBlurPass = () => {
    this.setState({
      borderColorNewPasswordInput: '#F49315',
      backgroundColorNewPasswordInput: '#FDFDFD'
    })
  }

  handleOnFocusPassRep = () => {
    this.setState({
      borderColorNewPasswordRepInput: '#05AB50',
      backgroundColorNewPasswordRepInput: '#C1D9CC'
    })
  }

  handleOnBlurPassRep = () => {
    this.setState({
      borderColorNewPasswordRepInput: '#F49315',
      backgroundColorNewPasswordRepInput: '#FDFDFD'
    })
  }


  handleChangeOldPasswordText = (text) => {
    this.setState({
      oldPassword: text
    })
  }

  handleChangeNewPasswordText = (text) => {
    this.setState({
      newPassword: text
    })
  }

  handleChangeNewPasswordRepeatedText = (text) => {
    this.setState({
      newPasswordRepeated: text
    })
  }

  handleUserChangePasswordText = (text) => {
    this.setState({
      userChangePassword: text
    })
  }

  getChangePasswordRequest() {
    const request = {
      "id": this.state.userChangePassword,
      "oldPassword": this.state.oldPassword,
      "newPassword": this.state.newPassword
    };
    return request;
  }


  changePassword = async () => {
    if (this.isValidChangePasswordInput()) {
      const response = await ApiCaller.callApi('/calpullix/change-password',
        this.getChangePasswordRequest(), CONSTANTS.PORT_RECOVER_PASSWORD, CONSTANTS.POST_METHOD)
        .catch((error) => {
          console.log(error);
          this.setState({
            errorMessage: 'Ocurrio un error, favor de intentar mas tarde'
          })
        });
      if (response.isValid) {
        this.setState({
          errorMessageChangePasword: '',
          borderColorUserChangePasswordInput: "#F49315",
          borderColorOldPasswordTextInput: "#F49315",
          borderColorNewPasswordInput: "#F49315",
          borderColorNewPasswordRepInput: "#F49315",
          headTextChangePass: "Se ha cambiado la nueva contraseña con éxito",
          userChangePassword: '',
          oldPassword: '',
          newPassword: '',
          newPasswordRepeated: '',
        });
      } else {
        this.setState({
          errorMessage: 'El usuario o la contraseña son incorrectos'
        })
      }
    }
  }


isValidChangePasswordInput = () => {
  var result = true;
  if (Validator.isEmpty(this.state.userChangePassword)) {
    this.setState({
      borderColorUserChangePasswordInput: '#F03000',
    });
    result = false;
  }
  
  if (Validator.isEmpty(this.state.oldPassword)) {
    this.setState({
      borderColorOldPasswordTextInput: '#F03000',
    });
    result = false;
  }
  if (Validator.isEmpty(this.state.newPassword)) {
    this.setState({
      borderColorNewPasswordInput: '#F03000',
    });
    result = false;
  }
  if (Validator.isEmpty(this.state.newPasswordRepeated)) {
    this.setState({
      borderColorNewPasswordRepInput: '#F03000',
    });
    result = false;
  }
  if (!result) {
    this.setState({
      errorMessageChangePasword: 'Todos los campos son requeridos',
    });
  }
  if (result && this.state.newPassword !== this.state.newPasswordRepeated) {
    this.setState({
      errorMessageChangePasword: 'La nueva contraseña no coincide',
      borderColorNewPasswordInput: '#F03000',
      borderColorNewPasswordRepInput: '#F03000',
    });
    result = false;
  }
  if (result && !Validator.isValidRegExp(this.state.userChangePassword, idRegexp, false) ) {
    this.setState({
      errorMessageChangePasword: 'Ingresa un usuario valido',
      borderColorUserChangePasswordInput: '#F03000',
    });
    result = false;
  }
  if (result && this.state.newPassword.length < 8 ) {
    this.setState({
      errorMessageChangePasword: 'La nueva contraseña debe contener al menos 8 caracteres',
      borderColorNewPasswordInput: '#F03000',
      borderColorNewPasswordRepInput: '#F03000',
    });
    result = false;
  }
  return result;
}

showChangePassword = () => {
  this.setState({
    showChangePassword: true,
  });
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
        title={"Cambiar contraseña"} />
      <View style={{ marginTop: 10, marginBottom: 15 }}>
        <Text
          id='errorMessageForgotPassword'
          style={stylesCommon.errorMessage}>{this.state.errorMessage}</Text>
        <Text style={{ fontSize: 13, textAlign: 'center', marginTop: 5, color: '#F6A338' }}>
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
              marginTop: 15
            }
          ]}
          value={this.state.userText}
          onChangeText={(text) => this.handleChangeUserText(text)}
          onFocus={() => this.handleOnFocus()}
          onBlur={() => this.handleOnBlur()}
          placeholder='        Ingresa el id de tu usuario'
          placeholderTextColor='#9E9E9E' />
        <ButtonCalpulliX
          title={'Recuperar Contraseña'}
          id={'buttonRetrievePassword'}
          arrayColors={['#05AAAB', '#048585', '#048585']}
          onPress={this.restartPassword}
          width={'45%'}
          height={45}
          marginTop={20} />

        <Text
          id='errorMessageChangePassword'
          style={stylesCommon.errorMessage}>
          {this.state.errorMessageChangePasword}
        </Text>
        <Text style={{ fontSize: 13, textAlign: 'center', marginTop: 5, color: '#F6A338' }}>
          {this.state.headTextChangePass}
        </Text>
        <Text style={{
          textAlign: 'center', fontSize: 14, marginTop: 3,
          color: '#F6A338', textDecorationLine: 'underline',
        }}
          onPress={() => this.showChangePassword()}>
          Cambia tu contraseña
            </Text>
        {this.state.showChangePassword &&
          <View style={{ marginTop: 10 }} >
            <TextInput
              id='inputUserChangePassword'
              style=
              {[
                stylesCommon.textInputCalpulliX,
                {
                  borderColor: this.state.borderColorUserChangePasswordInput,
                  backgroundColor: this.state.backgroundColorUserChangePasswordInput,
                  marginTop: 5
                }
              ]}
              value={this.state.userChangePassword}
              onChangeText={(text) => this.handleUserChangePasswordText(text)}
              onFocus={() => this.handleOnFocusUser()}
              onBlur={() => this.handleOnBlurUser()}
              placeholder='        Ingresa tu usuario'
              placeholderTextColor='#9E9E9E' />

            <TextInput
              id='inputOldPassword'
              style=
              {[
                stylesCommon.textInputCalpulliX,
                {
                  borderColor: this.state.borderColorOldPasswordTextInput,
                  backgroundColor: this.state.backgroundColorOldPasswordInput,
                  marginTop: 10
                }
              ]}
              value={this.state.oldPassword}
              onChangeText={(text) => this.handleChangeOldPasswordText(text)}
              onFocus={() => this.handleOnFocusOldPass()}
              onBlur={() => this.handleOnBlurOldPass()}
              placeholder='        Ingresa tu contraseña anterior'
              placeholderTextColor='#9E9E9E' />
            <TextInput
              id='inputNewPassword'
              style=
              {[
                stylesCommon.textInputCalpulliX,
                {
                  borderColor: this.state.borderColorNewPasswordInput,
                  backgroundColor: this.state.backgroundColorNewPasswordInput,
                  marginTop: 10
                }
              ]}
              value={this.state.newPassword}
              onChangeText={(text) => this.handleChangeNewPasswordText(text)}
              onFocus={() => this.handleOnFocusPass()}
              onBlur={() => this.handleOnBlurPass()}
              placeholder='        Ingresa tu nueva contraseña'
              placeholderTextColor='#9E9E9E'
              secureTextEntry={true} />
            <TextInput
              id='inputNewPasswordRepeated'
              style=
              {[
                stylesCommon.textInputCalpulliX,
                {
                  borderColor: this.state.borderColorNewPasswordRepInput,
                  backgroundColor: this.state.backgroundColorNewPasswordRepInput,
                  marginTop: 10
                }
              ]}
              value={this.state.newPasswordRepeated}
              onChangeText={(text) => this.handleChangeNewPasswordRepeatedText(text)}
              onFocus={() => this.handleOnFocusPassRep()}
              onBlur={() => this.handleOnBlurPassRep()}
              placeholder='        Repite tu nueva contraseña'
              placeholderTextColor='#9E9E9E'
              secureTextEntry={true} />

            <ButtonCalpulliX
              title={'Cambiar Contraseña'}
              id={'buttonChangePassword'}
              arrayColors={['#05AAAB', '#048585', '#048585']}
              onPress={this.changePassword}
              width={'45%'}
              height={40}
              marginTop={15} />

          </View>
        }
      </View>
    </BackgroundScrollCalpulliX>
  );
}
}


