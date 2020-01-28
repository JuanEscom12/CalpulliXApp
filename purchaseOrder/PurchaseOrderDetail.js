import React, { PureComponent } from 'react';
import { Alert, Text, TextInput, View, Image, Switch } from 'react-native';
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import HeaderCalpulliXBack from '../common/HeaderCalpulliXBack';
import ButtonCalpulliX from '../common/ButtonCalpulliX';
import { NavigationEvents } from 'react-navigation';
import ApiCaller from '../api/ApiCaller';
import stylesCommon from '../common/style';
import styles from './styles';
import CONSTANTS from '../common/Constants';


const labels =
{
    'Marca:': 'brand',
    'Precio por unidad:': 'unitPrice',
    'Proveedor:': 'vendor',
    'Contacto del proveedor:': 'vendorContact',
};
const condition = new RegExp(/^\d+$/);

export default class PurchaseOrderDetail extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            borderColorTextInput: "#F49315",
            backgroundColorUserInput: 'transparent',
            totalPrice: props.navigation.state.params.responseApi['totalPrice'],
            unitPrice: props.navigation.state.params.responseApi['unitPrice'],
            quantityItems: props.navigation.state.params.responseApi['quantityItems'] + '',
            idPurchaseOrder: props.navigation.state.params.responseApi['idPurchaseOrder'],
            enabledQuantity: props.navigation.state.params.responseApi['isActive'],
            errorMessage: '',

        }
    }

    buildContent(_label, _apiResponse, _backGroundColor) {
        return <View style={{ backgroundColor: _backGroundColor, width: '100%' }} >
            <Text style={{ marginLeft: '5%', fontSize: 12, width: '100%' }}>{'\n' + _label}</Text>
            <Text style={{ marginLeft: '5%', fontSize: 12, width: '100%' }}>{'\n' + _apiResponse + '\n'}</Text>
        </View>;
    }

    getContent(_apiResponse) {
        var content = [];
        var index = 0;
        for (let key in labels) {
            if ((index + 1) % 2 === 0) {
                content.push(
                    this.buildContent(key, _apiResponse[labels[key]], '#F3F9FA')
                );
            } else {
                content.push(
                    this.buildContent(key, _apiResponse[labels[key]], '#EDEDED')
                );
            }
            index++;
        }

        content.push(
            <View style={
                [styles.content, { width: '100%' }]} >
                <Text style={{ marginLeft: '5%', fontSize: 12, width: '50%' }}>{'\n' + 'Precio total:'}</Text>
                <Text style={{ marginLeft: '5%', fontSize: 12, width: '50%' }}>
                    {'\n' + this.state.totalPrice + '\n'}
                </Text>
            </View>
        );

        const img64 = _apiResponse['picture'];
        const base64Image = 'data:image/jpg;base64,' + img64;
        content.push(
            <View style={
                [styles.contentLight, { width: '100%' }]}>
                <Image
                    style={{
                        height: 200, marginLeft: 'auto', marginRight: 'auto',
                        marginTop: 10, marginBottom: 10, width: '95%',
                    }}
                    source={{ uri: base64Image }} />
            </View>
        );

        content.push(
            <View style={
                [styles.content, { width: '100%' }]} >
                <Text style={[stylesCommon.labelText,
                    { marginTop: 5, marginRight: '40%', fontSize: 15 }]}>
                        Numero de unidades
                    </Text>
                <TextInput
                    id={'inputPurchaseOrderDetail'}
                    style=
                    {[
                        stylesCommon.textInputCalpulliX,
                        {
                            borderColor: this.state.borderColorTextInput,
                            backgroundColor: this.state.backgroundColorUserInput,
                            width: '80%'
                        }
                    ]}
                    value={this.state.quantityItems}
                    editable={this.state.enabledQuantity}
                    onChangeText={(text) =>
                        this.handleChangeQuantityItemText(text)}
                    onFocus={() => this.handleOnFocus()}
                    onBlur={() => this.handleOnBlur()}
                    placeholder='     Ingresa la cantidad de productos'
                    placeholderTextColor='#9E9E9E'
                    maxLength={8} />
            </View>);

        if (_apiResponse['isActive']) {
            content.push(
                <View style={
                    [styles.content, { width: '100%' }]} >
                    <ButtonCalpulliX
                        title={'Generar orden'}
                        id={'buttonDetail'}
                        arrayColors={['#05AAAB', '#048585', '#048585']}
                        onPress={() => this.sendPurchaseOrder()}
                        width={'30%'}
                        height={40}
                        marginTop={10}
                        marginBottom={10}
                        disabled={!this.state.enabledQuantity} />
                </View>);
        }

        return content;
    }

    handleChangeQuantityItemText = (text) => {
        console.log(':: CHANGE TEXT EVENT ', text, condition.test(text));
        var units = 1;
        if (condition.test(text)) {
            units = parseInt(text);
        }
        this.setState({
            quantityItems: text,
            totalPrice: this.state.unitPrice * units,
        });
    }

    sendPurchaseOrder = async () => {
        console.log(':: Send Purchase Order ', this.state.quantityItems, condition.test(this.state.quantityItems));
        if (this.state.quantityItems == '' || !condition.test(this.state.quantityItems)) {
            this.setState({
                errorMessage: 'La cantidad de productos debe tener un valor numerico.'
            });
            return;
        }
        const response = await ApiCaller.callApi(
            '/calpullix/update/purchaseorder', this.getUpdatePurchaseOrderRequest(),
            CONSTANTS.PORT_PURCHASE_ORDER, 'POST')
            .catch((error) => {
                console.log(error);
                this.setState({
                    errorMessage: 'Hubo un error favor de intentar mas tarde.',
                });
            });
        if (response != null && response != undefined) {
            Alert.alert('La orden de compra ' + this.state.idPurchaseOrder + ' ha sido enviada.');
            this.setState({
                enabledQuantity: false,
                errorMessage: '',
            });
        }
    }

    getUpdatePurchaseOrderRequest = () => {
        return {
            'idPurchaseOrder': this.state.idPurchaseOrder,
            'quantityItems': this.state.quantityItems,
            'totalPrice': this.state.totalPrice,
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


    restartInput = () => {
        console.log(':: Restart ');
        this.setState({
            enabledQuantity: this.props.navigation.state.params.responseApi['isActive'],
            idPurchaseOrder: this.props.navigation.state.params.responseApi['idPurchaseOrder'],
            quantityItems: this.props.navigation.state.params.responseApi['quantityItems'] + '',
            totalPrice: this.props.navigation.state.params.responseApi['totalPrice'],
            unitPrice: this.props.navigation.state.params.responseApi['unitPrice'],
        });
    }


    render() {
        const apiResponse = this.props.navigation.state.params.responseApi;
        var content = this.getContent(apiResponse);
        return (
            <BackgroundScrollCalpulliX addHeight={320}>
                <HeaderCalpulliXBack
                    navigation={this.props.navigation}
                    backButton={true}
                    screen={'PurchaseOrder'}
                    title={"Detalle orden de compra"} />
                <NavigationEvents
                    onWillFocus={() => {
                        this.restartInput();
                    }} />
                <Text
                    id='errorMessagePurchaseOrderDetail'
                    style={[stylesCommon.errorMessage, { marginTop: 5 }]}>{this.state.errorMessage}
                </Text>
                <Text
                    id='titlePurchaseOrderDetail'
                    style={{ marginTop: 5, textAlign: 'center' }}>
                    Orden de compra No. {this.state.idPurchaseOrder}
                </Text>
                <View style={{
                    borderColor: '#F49315', borderWidth: 0.5, width: '90%',
                    marginLeft: 'auto', marginRight: 'auto', marginTop: 10
                }}>
                    {content}
                </View>
            </BackgroundScrollCalpulliX>
        );
    }
}

