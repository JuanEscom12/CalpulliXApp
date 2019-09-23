import React, { PureComponent } from 'react';
import {
    View, Image, Text, TextInput, StyleSheet
} from 'react-native';
import ButtonCalpulliX from '../common/ButtonCalpulliX';
import NavigatorCommons from '../navigation/NavigatorCommons';
import stylesCommon from '../common/style'
import { NavigationEvents } from 'react-navigation';

export default class MiddleLogin extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            borderColorTextInput: "#F49315",
            borderColorTextInputPass: "#F49315",
            backgroundColorUserInput: 'transparent',
            backgroundColorPassInput: 'transparent',
            colorLink: '#000000',
            userText: "",
            passText: "",
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
            backgroundColorUserInput: 'transparent'
        })
    }

    handleOnFocusPass = () => {
        this.setState({
            borderColorTextInputPass: '#05AB50',
            backgroundColorPassInput: '#C1D9CC'
        })
    }

    handleOnBlurPass = () => {
        this.setState({
            borderColorTextInputPass: '#F49315',
            backgroundColorPassInput: 'transparent'
        })
    }

    handleForgotPasswordOrUser = () => {
        this.setState({
            colorLink: '#9E9E9E'
        })
        NavigatorCommons.navigateTo(this.props.navigation, 'ProductList', 0);
        this.props.cleanInput();
    }
    
    handleRegisterAccount = () => {
        this.setState({
            colorLink: '#9E9E9E'
        })
        NavigatorCommons.navigateTo(this.props.navigation, 'RegisterAccount', 0);
        this.props.cleanInput();
    }
    

    handleChangeUserText = (text) => {
        this.setState({
            userText: text,
        })
        this.props.hanlderInput(this.state);
    }

    handleChangePassText = (text) => {
        this.setState({
            passText: text,
        })
        this.props.hanlderInput(this.state);
    }

    cleanInput = () => {
        this.setState({
            borderColorTextInput: "#F49315",
            borderColorTextInputPass: "#F49315",
            backgroundColorUserInput: 'transparent',
            backgroundColorPassInput: 'transparent',
            colorLink: '#000000',
            userText: "",
            passText: "",            
        })
    }
    
    render() {
        const {
            doLogin,
            marginTop
        } = this.props
        return (
            <View style={{ width: '100%', height: 330, marginTop: 20 }} >
                <NavigationEvents
                  onWillFocus={() => {
                    this.cleanInput();
                  }}/>
                <View style={{ flexDirection: 'row' }}>
                    <Image
                        style={{ height: 25, width: 22, marginLeft: '17%' }}
                        source={require('./icon_user.png')} />
                    <Text style={{ marginLeft: '5%', fontSize: 15 }}>
                        Usuario
              </Text>
                </View>

                <TextInput
                    id='inputUser'
                    style=
                    {[
                        stylesCommon.textInputCalpulliX,
                        {
                            borderColor: this.state.borderColorTextInput,
                            backgroundColor: this.state.backgroundColorUserInput
                        }
                    ]}
                    value={this.state.userText}
                    onChangeText={(text) => this.handleChangeUserText(text)}
                    onFocus={() => this.handleOnFocus()}
                    onBlur={() => this.handleOnBlur()}
                    placeholder='        Ingresa el nombre de tu usuario'
                    placeholderTextColor='#9E9E9E' />

                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Image
                        style={{ height: 25, width: 26, marginLeft: '17%' }}
                        source={require('./key-solid.png')} />
                    <Text style={{ marginLeft: '5%', fontSize: 15 }}>
                        Contraseña
                    </Text>
                </View>

                <TextInput
                    id='inputPassword'
                    style={{
                        height: 45, width: '75%', marginLeft: 'auto', marginRight: 'auto', marginTop: 6,
                        borderColor: this.state.borderColorTextInputPass, borderWidth: 1, borderRadius: 5,
                        backgroundColor: this.state.backgroundColorPassInput
                    }}
                    onChangeText={(text) => this.handleChangePassText(text)}
                    value={this.state.passText}
                    onFocus={() => this.handleOnFocusPass()}
                    onBlur={() => this.handleOnBlurPass()}
                    placeholder='        Ingresa tu contraseña'
                    placeholderTextColor='#9E9E9E'
                    secureTextEntry={true} />

                <View style={{ height: 120 }}>
                    <Text
                        style={{
                            fontSize: 13, marginTop: 25, textAlign: 'center', textDecorationLine: 'underline',
                            color: this.state.colorLink
                        }}
                        onPress={() => this.handleForgotPasswordOrUser()}>
                        Olvidaste tu contraseña
                  </Text>
                    <Text
                        style={{
                            fontSize: 13, marginTop: 15, textAlign: 'center', textDecorationLine: 'underline',
                            color: this.state.colorLink
                        }}
                        onPress={() => this.handleRegisterAccount()}>
                        Registrate
                  </Text>

                    <ButtonCalpulliX
                        title={'Iniciar Sesion'}
                        id={'buttonLogin'}
                        arrayColors={['#05AAAB', '#048585', '#048585']}
                        onPress={doLogin}
                        width={'50%'}
                        height={45}
                        marginTop={marginTop} />

                </View>
            </View>

        );
    }
}



