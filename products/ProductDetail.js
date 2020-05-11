import React, { PureComponent } from 'react';
import { Text, View, Image, Switch } from 'react-native';
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import HeaderCalpulliXBack from '../common/HeaderCalpulliXBack';
import ApiCaller from '../api/ApiCaller';
import CONSTANTS from '../common/Constants';
import Modal from "react-native-modal";
import ButtonCalpulliX from '../common/ButtonCalpulliX';

const labels =
{
    'Empaquetado individual ': 'isIndividualPackaging',
    'Permiso COFEPRIS': 'isCofeprisPermission',
    'Material delicado': 'isFragileMaterial',
    'Existencias': 'quantity',
    'Proveedor': 'provider',
    'Precio de compra': 'purchasePrice',
    'Ganancia Neta': 'netIncome',
    'Porcentaje rentabilidad': 'profitabilityPercentage',
    'Impuestos': 'taxes',
    'Categoría': 'category',
    'Unidades': 'quantity',
    'Medidas': 'measurements',
    'Clasificación': 'productClassification',
};

export default class ProductDetail extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            showDetailPromotion: false,
            contentDetailPromotion: [],
        };
    }

    buildContent(_label, _apiResponse, _backGroundColor, _borderRadius) {
        if (typeof (_apiResponse) === 'boolean') {
            return <View style={{
                flexDirection: 'row', backgroundColor: _backGroundColor, width: '100%',
                borderTopLeftRadius: _borderRadius, borderTopRightRadius: _borderRadius
            }} >
                <Text style={{ marginLeft: '5%', fontSize: 11, width: '50%' }}>{'\n' + _label + '\n'}</Text>
                <View style={{ width: '50%', alignContent: "center" }}>
                    <Switch
                        style={{ marginRight: '30%', borderColor: '', borderWidth: 0.5 }}
                        disabled={true}
                        value={_apiResponse}
                        thumbColor={'#FFF'}
                        trackColor={{ true: '#9ADDDF', false: '#9E9E9E' }} />
                </View>
            </View>;
        } else {
            return <View style={{
                flexDirection: 'row', backgroundColor: _backGroundColor, width: '100%',
                borderTopLeftRadius: _borderRadius, borderTopRightRadius: _borderRadius
            }} >
                <Text style={{ marginLeft: '5%', fontSize: 11, width: '50%' }}>{'\n' + _label + '\n'}</Text>
                <Text style={{ marginRight: '5%', fontSize: 11, width: '50%', textAlign: "center" }}>{'\n' + _apiResponse + '\n'}</Text>
            </View>;
        }
    }

    getDataSheetRequest = () => {
        return {
            "id": this.props.navigation.state.params.responseApi.id,
        };
    }

    openDataSheet = async () => {
        const result = await ApiCaller.callApi('/calpullix/product/data-sheet/retrieve',
            this.getDataSheetRequest(),
            CONSTANTS.PORT_PRODUCT_LIST, CONSTANTS.POST_METHOD)
            .catch((error) => {
                console.log(error);
                this.setState({
                    errorMessage: 'Ocurrio un error, favor de intentar mas tarde.',
                });
            });
        if (result && result.length > CONSTANTS.ZERO) {
            var content = [];
            var detail = [];
            detail.push(
                <Text style={{ fontSize: 14, width: '100%', textAlign: 'center', color: '#F6A338', fontWeight: 'bold' }}>{'\n Ficha técnica \n '}</Text>
            );
            for (var index = 0; index < result.length; index++) {
                detail.push(
                    <View style={{ backgroundColor: (index + 1) % 2 === 0 ? '#F3F9FA' : '#EDEDED', flexDirection: 'row' }}>
                        <Text style={{ fontSize: 11, width: '50%', textAlign: 'center' }}>{'\n ' + result[index].component + '\n '}</Text>
                        <Text style={{ fontSize: 11, width: '50%', textAlign: 'center' }}>{'\n ' + result[index].quantity + ' ' + result[index].unit + '\n '}</Text>
                    </View>);
            }
            content.push(
                <View style={{
                    backgroundColor: '#F3F9FA', borderColor: '#F49315',
                    borderWidth: 1, padding: 10, height: 350, borderRadius: 5
                }}>
                    {detail}
                    <ButtonCalpulliX
                        title={'Aceptar'}
                        id={'buttonCloseDataSheet'}
                        arrayColors={['#05AAAB', '#048585', '#048585']}
                        onPress={this.closeModalScreen}
                        width={'30%'}
                        height={35}
                        marginTop={20} />
                </View>
            );
            this.setState({
                showDetailPromotion: true,
                contentDetailPromotion: content,
            });
        } else {
            this.setState({
                showDetailPromotion: false,
                contentDetailPromotion: [],
            });
        }
    }

    closeModalScreen = () => {
        this.setState({ showDetailPromotion: false });
    }


    getContent(_apiResponse) {
        var content = [];
        var index = 0;
        for (let key in labels) {
            if ((index + 1) % 2 === 0) {
                content.push(
                    this.buildContent(key, _apiResponse[labels[key]], '#F3F9FA', index == 0 ? 5 : 0)
                );
            } else {
                content.push(
                    this.buildContent(key, _apiResponse[labels[key]], '#EDEDED', index == 0 ? 5 : 0)
                );
            }
            index++;
        }
        content.push(
            <View style={{ width: '100%', backgroundColor: '#F3F9FA', }} >
                <Text style={{ marginLeft: '5%', fontSize: 12, width: '50%', color: 'blue', textDecorationLine: 'underline' }}
                    onPress={() => this.openDataSheet()}>
                    {'\n Ver ficha técnica \n'}
                </Text>

            </View>
        );
        const base64Image = 'data:image/jpg;base64,' + _apiResponse['pictureResult'];
        content.push(
            <View style={{
                width: '100%', backgroundColor: '#EDEDED',
                borderBottomLeftRadius: 5, borderBottomRightRadius: 5
            }}>
                <Image
                    style={{
                        height: 100,
                        width: 100,
                        marginLeft: 'auto', marginRight: 'auto',
                        marginTop: 10, marginBottom: 10,
                    }}
                    source={{ uri: base64Image }} />
            </View>
        );
        return content;
    }

    render() {
        const apiResponse = this.props.navigation.state.params.responseApi;
        var content = this.getContent(apiResponse);
        return (
            <View>
                <HeaderCalpulliXBack
                    navigation={this.props.navigation}
                    backButton={true}
                    screen={'ProductList'}
                    title={'Detalle del producto'} />
                <BackgroundScrollCalpulliX addHeight={200}>
                    <View style={{
                        borderColor: '#F49315', borderWidth: 0.5, width: '90%',
                        marginLeft: 'auto', marginRight: 'auto', marginTop: 30, borderRadius: 5,
                    }}>
                        <View style={{ flex: 1, height: '100%' }}>
                            <Modal isVisible={this.state.showDetailPromotion} >
                                {this.state.contentDetailPromotion}
                            </Modal>
                        </View>

                        {content}
                    </View>
                </BackgroundScrollCalpulliX>
            </View>
        );
    }
}

