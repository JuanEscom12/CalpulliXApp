import React, { PureComponent } from 'react';
import { View, TextInput, Text } from 'react-native';
import HeaderCalpulliXBack from '../common/HeaderCalpulliXBack';
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import stylesCommon from '../common/style';
import ButtonCalpulliX from '../common/ButtonCalpulliX';
import ApiCaller from '../api/ApiCaller';
import { NavigationEvents } from 'react-navigation';
import CONSTANTS from '../common/Constants';

export default class RegisterAccount extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            borderColorUserTextInput: "#F49315",
            backgroundColorUserInput: '#FDFDFD',
            borderColorNameTextInput: "#F49315",
            backgroundColorNameInput: '#FDFDFD',
            borderColorLastNameTextInput: "#F49315",
            backgroundColorLastNameInput: '#FDFDFD',
            borderColorEmailTextInput: "#F49315",
            backgroundColorEmailInput: '#FDFDFD',
            borderColorPhoneTextInput: "#F49315",
            backgroundColorPhoneInput: '#FDFDFD',
            errorMessage: '',
            headText: "Regístrate",
            userText: "",
            nameText: "",
            lastNameText: "",
            emailText: "",
            phoneText: "",
        };
    }

    handleUserOnFocus = () => {
        this.setState({
            borderColorUserTextInput: '#05AB50',
            backgroundColorUserInput: '#C1D9CC'
        })
    }

    handleUserOnBlur = () => {
        this.setState({
            borderColorUserTextInput: '#F49315',
            backgroundColorUserInput: '#FDFDFD'
        })
    }

    handleNameOnFocus = () => {
        this.setState({
            borderColorNameTextInput: '#05AB50',
            backgroundColorNameInput: '#C1D9CC'
        })
    }

    handleNameOnBlur = () => {
        this.setState({
            borderColorNameTextInput: '#F49315',
            backgroundColorNameInput: '#FDFDFD'
        })
    }

    handleLastNameOnFocus = () => {
        this.setState({
            borderColorLastNameTextInput: '#05AB50',
            backgroundColorLastNameInput: '#C1D9CC'
        })
    }

    handleLastNameOnBlur = () => {
        this.setState({
            borderColorLastNameTextInput: '#F49315',
            backgroundColorLastNameInput: '#FDFDFD'
        })
    }

    handleEmailOnFocus = () => {
        this.setState({
            borderColorEmailTextInput: '#05AB50',
            backgroundColorEmailInput: '#C1D9CC'
        })
    }

    handleEmailOnBlur = () => {
        this.setState({
            borderColorEmailTextInput: '#F49315',
            backgroundColorEmailInput: '#FDFDFD'
        })
    }

    handlePhoneOnFocus = () => {
        this.setState({
            borderColorPhoneTextInput: '#05AB50',
            backgroundColorPhoneInput: '#C1D9CC'
        })
    }

    handlePhoneOnBlur = () => {
        this.setState({
            borderColorPhoneTextInput: '#F49315',
            backgroundColorPhoneInput: '#FDFDFD'
        })
    }

    handleChangeUserText = (text) => {
        this.setState({
            userText: text
        })
    }

    handleChangeNameText = (text) => {
        this.setState({
            nameText: text
        })
    }

    handleChangeLastNameText = (text) => {
        this.setState({
            lastNameText: text
        })
    }

    handleChangeEmailText = (text) => {
        this.setState({
            emailText: text
        })
    }

    handleChangePhoneText = (text) => {
        this.setState({
            phoneText: text
        })
    }

    registerUser = async (e) => {
        if (this.isValidInput()) {
            const response = await ApiCaller.callApi('/calpullix/register/user',
                this.getRegisterUserRequest(), 
                CONSTANTS.PORT_REGISTER_USER, CONSTANTS.POST_METHOD)
                .catch((error) => {
                    console.log(error);
                    this.setState({
                        errorMessage: 'Ocurrio un error, favor de intentar mas tarde'
                    })
                });
            this.cleanInput();
            if (response.isValid) {
                this.setState({
                    errorMessage: '',
                    borderColorTextInput: '#F49315',
                    headText: "Se ha enviado un correo para confirmar su registro."
                });
            } else {
                this.setState({
                    errorMessage: 'Ocurrio un error, favor de intentar mas tarde.'
                })
            }
        }
    }

    isValidInput() {
        result = true;
        if (this.state.userText === '') {
            this.setState({
                borderColorUserTextInput: '#F03000',
            });
            result = false;
        }
        if (this.state.nameText === '') {
            this.setState({
                borderColorNameTextInput: '#F03000',
            });
            result = false;
        }
        if (this.state.lastNameText === '') {
            this.setState({
                borderColorLastNameTextInput: '#F03000',
            });
            result = false;
        }
        if (this.state.emailText === '') {
            this.setState({
                borderColorEmailTextInput: '#F03000',
            });
            result = false;
        }
        if (this.state.phoneText === '') {
            this.setState({
                borderColorPhoneTextInput: '#F03000',
            });
            result = false;
        }
        if (!result) {
            this.setState({
                errorMessage: 'Todos los campos son requeridos.',
                headText: "Regístrate",
            });
        }
        return result;
    }

    getRegisterUserRequest() {
        const request = {
            "user": this.state.userText,
            "name": this.state.nameText,
            "lastName": this.state.lastNameText,
            "email": this.state.emailText,
            "phone": this.state.phoneText
        };
        return request;
    }


    cleanInput = () => {
        this.setState({
            borderColorUserTextInput: "#F49315",
            backgroundColorUserInput: '#FDFDFD',
            borderColorNameTextInput: "#F49315",
            backgroundColorNameInput: '#FDFDFD',
            borderColorLastNameTextInput: "#F49315",
            backgroundColorLastNameInput: '#FDFDFD',
            borderColorEmailTextInput: "#F49315",
            backgroundColorEmailInput: '#FDFDFD',
            borderColorPhoneTextInput: "#F49315",
            backgroundColorPhoneInput: '#FDFDFD',
            errorMessage: '',
            headText: "Regístrate",
            userText: "",
            nameText: "",
            lastNameText: "",
            emailText: "",
            phoneText: "",
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
                    title={'Registro de usuarios'} />
                <View style={{ marginTop: 5 }}>
                    <Text
                        id='errorMessageUserRegister'
                        style={stylesCommon.errorMessage}>{this.state.errorMessage}</Text>
                    <Text style={[stylesCommon.labelText, { marginTop: 5, fontSize: 15 }]}>
                        {this.state.headText}
                    </Text>
                    <TextInput
                        id='inputUserRegisterUser'
                        style=
                        {[
                            stylesCommon.textInputCalpulliX,
                            {
                                borderColor: this.state.borderColorUserTextInput,
                                backgroundColor: this.state.backgroundColorUserInput,
                                marginTop: 20
                            }
                        ]}
                        value={this.state.userText}
                        onChangeText={(text) => this.handleChangeUserText(text)}
                        onFocus={() => this.handleUserOnFocus()}
                        onBlur={() => this.handleUserOnBlur()}
                        placeholder='        Ingresa tu Id'
                        placeholderTextColor='#9E9E9E' />
                    <TextInput
                        id='inputNameRegisterUser'
                        style=
                        {[
                            stylesCommon.textInputCalpulliX,
                            {
                                borderColor: this.state.borderColorNameTextInput,
                                backgroundColor: this.state.backgroundColorNameInput,
                                marginTop: 20
                            }
                        ]}
                        value={this.state.nameText}
                        onChangeText={(text) => this.handleChangeNameText(text)}
                        onFocus={() => this.handleNameOnFocus()}
                        onBlur={() => this.handleNameOnBlur()}
                        placeholder='        Ingresa tu nombre'
                        placeholderTextColor='#9E9E9E' />
                    <TextInput
                        id='inputLastNameRegisterUser'
                        style=
                        {[
                            stylesCommon.textInputCalpulliX,
                            {
                                borderColor: this.state.borderColorLastNameTextInput,
                                backgroundColor: this.state.backgroundColorLastNameInput,
                                marginTop: 20
                            }
                        ]}
                        value={this.state.lastNameText}
                        onChangeText={(text) => this.handleChangeLastNameText(text)}
                        onFocus={() => this.handleLastNameOnFocus()}
                        onBlur={() => this.handleLastNameOnBlur()}
                        placeholder='        Ingresa tu apellido'
                        placeholderTextColor='#9E9E9E' />

                    <TextInput
                        id='inputEmailRegisterUser'
                        style=
                        {[
                            stylesCommon.textInputCalpulliX,
                            {
                                borderColor: this.state.borderColorEmailTextInput,
                                backgroundColor: this.state.backgroundColorEmailInput,
                                marginTop: 20
                            }
                        ]}
                        value={this.state.emailText}
                        onChangeText={(text) => this.handleChangeEmailText(text)}
                        onFocus={() => this.handleEmailOnFocus()}
                        onBlur={() => this.handleEmailOnBlur()}
                        placeholder='        Ingresa tu email'
                        placeholderTextColor='#9E9E9E' />

                    <TextInput
                        id='inputPhoneRegisterUser'
                        style=
                        {[
                            stylesCommon.textInputCalpulliX,
                            {
                                borderColor: this.state.borderColorPhoneTextInput,
                                backgroundColor: this.state.backgroundColorPhoneInput,
                                marginTop: 20
                            }
                        ]}
                        value={this.state.phoneText}
                        onChangeText={(text) => this.handleChangePhoneText(text)}
                        onFocus={() => this.handlePhoneOnFocus()}
                        onBlur={() => this.handlePhoneOnBlur()}
                        placeholder='        Ingresa tu telefono'
                        placeholderTextColor='#9E9E9E' />

                    <ButtonCalpulliX
                        title={'Registrar Usuario'}
                        id={'buttonRegisterUser'}
                        arrayColors={['#05AAAB', '#048585', '#048585']}
                        onPress={this.registerUser}
                        width={'45%'}
                        height={45}
                        marginTop={40} />
                </View>
            </BackgroundScrollCalpulliX>
        );
    }
}


