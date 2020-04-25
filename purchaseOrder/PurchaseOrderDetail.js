import React, { PureComponent } from 'react';
import { Alert, Text, TextInput, View, Image, TouchableOpacity, Platform } from 'react-native';
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import HeaderCalpulliXBack from '../common/HeaderCalpulliXBack';
import ButtonCalpulliX from '../common/ButtonCalpulliX';
import { NavigationEvents } from 'react-navigation';
import ApiCaller from '../api/ApiCaller';
import stylesCommon from '../common/style';
import styles from './styles';
import CONSTANTS from '../common/Constants';
import openMap from 'react-native-open-maps';
import NavigatorCommons from '../navigation/NavigatorCommons';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import analytics from '@react-native-firebase/analytics';

const labels =
{
    'Marca:': 'brand',
    'Contacto del proveedor:': 'vendorContact',
    "RFC del proveedor": "rfc",
    'Precio por unidad:': 'unitPrice',
};

const condition = new RegExp(/^\d+$/);

export default class PurchaseOrderDetail extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            borderColorTextInput: "#F49315",
            backgroundColorUserInput: 'white',
            totalPrice: props.navigation.state.params.responseApi['totalPrice'],
            unitPrice: props.navigation.state.params.responseApi['unitPrice'],
            quantityItems: props.navigation.state.params.responseApi['quantityItems'] + '',
            idPurchaseOrder: props.navigation.state.params.responseApi['idPurchaseOrder'],
            enabledQuantity: props.navigation.state.params.responseApi['isActive'],
            errorMessage: '',

        }
    }

    buildContent = (_label, _apiResponse, _backGroundColor, _index) => {
        var borderRadius = 0;
        if (_index == 0) {
            borderRadius = 10;
        }
        return (
            <View style={{
                backgroundColor: _backGroundColor, width: '100%',
                borderTopLeftRadius: borderRadius, borderTopRightRadius: borderRadius
            }} >
                <Text style={{ marginLeft: '5%', fontSize: 12, width: '100%' }}>{'\n' + _label}</Text>
                <Text style={{ marginLeft: '5%', fontSize: 12, width: '100%' }}>{'\n' + _apiResponse + '\n'}</Text>
            </View>);
    }

    goToMaps = (_ubication) => {
        console.log(':: Opening google maps ', _ubication);
        analytics().logEvent(
            'goto_maps', {
               description: 'Opening gmaps vendor location ' + _ubication
        });
        openMap({ query: _ubication });
    }

    openPdf = (_pdfUrl) => {
        console.log(':: URL Pdf ', _pdfUrl);
        analytics().logEvent(
            'open_pdf_purchaseorder_report', {
               description: 'Opening pdf report ' + _pdfUrl
        });
        const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.pdf`;
        const options = {
          fromUrl: _pdfUrl,
          toFile: localFile
        };
        RNFS.downloadFile(options).promise
        .then(() => FileViewer.open(localFile))
        .then(() => {
        })
        .catch(error => {
            console.log(error);
        });
    }

    getContent = (_apiResponse) => {
        var content = [];
        var index = 0;
        for (let key in labels) {
            if ((index + 1) % 2 === 0) {
                content.push(
                    this.buildContent(key, _apiResponse[labels[key]], '#F3F9FA', index)
                );
            } else {
                content.push(
                    this.buildContent(key, _apiResponse[labels[key]], '#EDEDED', index)
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

        content.push(
            <View style={
                [styles.contentLight, { width: '100%' }]} >
                <Text style={{ marginLeft: '5%', fontSize: 12, width: '50%' }}>{'\n' + 'Ubicación del proveedor:'}</Text>

                <Text style={{ marginLeft: '5%', fontSize: 12, width: '50%', color: 'blue', textDecorationLine: 'underline' }}
                    onPress={() => this.goToMaps(_apiResponse['mapsQuery'])}>
                    {'\n' + _apiResponse['vendor'] + '\n'}
                </Text>


            </View>
        );
      
        content.push(
            <View style={
                [styles.content, { width: '100%' }]} >
                <Text style={{ marginLeft: '5%', fontSize: 12, width: '50%' }}>{'\n' + 'Documento orden de compra: \n'}</Text>
                <TouchableOpacity style={{
                    marginLeft: '5%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                    borderWidth: 0.5,
                    borderColor: '#fff',
                    height: 50,
                    width: 50,
                    borderRadius: 5,
                    marginBottom: 20,
                }} activeOpacity={0.5}
                onPress={() => this.openPdf(_apiResponse['pdfUrl'])}>
                    <Image
                        source={require('./pdf_icon.png')}
                        style={{
                            padding: 5,
                            height: 50,
                            width: 50,
                            resizeMode: 'stretch',
                        }} />
                </TouchableOpacity>
            </View>
        );

        const img64 = _apiResponse['picture'];
        const base64Image = 'data:image/jpg;base64,' + img64;
        content.push(
            <View style={
                [styles.contentLight, { width: '100%' }]}>
                <Image
                    style={{
                        height: 100, marginLeft: 'auto', marginRight: 'auto',
                        marginTop: 10, marginBottom: 10, width: 50,
                        transform: [
                            { scaleX: 0.9 },
                            { scaleY: 0.9 }
                        ]
                    }}
                    source={{ uri: base64Image }} />
            </View>
        );

        var borderRadius = 0;
        if (!_apiResponse['isActive']) {
            borderRadius = 10;
        }
        content.push(
            <View style={
                [styles.content, {
                    width: '100%', borderBottomLeftRadius: borderRadius,
                    borderBottomRightRadius: borderRadius
                }]} >
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
                            width: '80%',
                            marginBottom: 20,
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
                    [styles.content, {
                        width: '100%', borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10
                    }]} >
                    <ButtonCalpulliX
                        title={'Generar orden'}
                        id={'buttonDetail'}
                        arrayColors={['#05AAAB', '#048585', '#048585']}
                        onPress={() => this.sendPurchaseOrder()}
                        width={'30%'}
                        height={40}
                        marginTop={10}
                        marginBottom={20}
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
        analytics().logEvent(
            'generate_lead', {
               value: this.state.idPurchaseOrder,
               description: 'Create purchase order'
        });
        const response = await ApiCaller.callApi(
            '/calpullix/update/purchaseorder', this.getUpdatePurchaseOrderRequest(),
            CONSTANTS.PORT_PURCHASE_ORDER, 'POST')
            .catch((error) => {
                console.log(error);
                this.setState({
                    errorMessage: 'Ocurrio un error, favor de intentar mas tarde.',
                });
            });
        if (response != null && response.updated) {
            Alert.alert('La orden de compra ' + this.state.idPurchaseOrder + ' ha sido enviada con éxito.');
            this.setState({
                enabledQuantity: false,
                errorMessage: '',
            });
        } else {
            this.setState({
                errorMessage: 'Ocurrio un error, favor de intentar mas tarde',
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
            backgroundColorUserInput: 'white'
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
            <BackgroundScrollCalpulliX addHeight={370}>
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
                    style={{ marginTop: 5, textAlign: 'center', color: '#F49315' }}>
                    Orden de compra No. {this.state.idPurchaseOrder}
                </Text>
                <View style={{
                    borderColor: '#F49315', borderWidth: 0.5, width: '90%',
                    marginLeft: 'auto', marginRight: 'auto', marginTop: 10,
                    borderRadius: 10
                }}>
                    {content}
                </View>
            </BackgroundScrollCalpulliX>
        );
    }
}

