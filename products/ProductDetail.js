import React, { PureComponent } from 'react';
import { Text, View, Image, Switch } from 'react-native';
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import HeaderCalpulliXBack from '../common/HeaderCalpulliXBack';

const labels = 
    {"Fecha de Caducidad": "sellByDate", 'Caja con mas productos ': 'hasMoreProducts', 'Numero de productos': 'numberProducts', 
    'Id paquete padre': 'parentPackageId', 'Codigo de barras': 'barCode', 'Provedor': 'provider', 'Precio Original': 'originalPrice', 
    'Precio Tienda': 'priceStore', 'Porcentaje de ganancia': 'percentageProfit', 'Ganancia neta': 'netIncome', 'Tamaño': 'size', 
    'Unidades': 'units', 'Categoria': 'category', 'Material': 'material', 'Clasificacion del producto': 'productClassification'};

export default class ProductDetail extends PureComponent {

    buildContent(_label, _apiResponse, _backGroundColor) {
        if (typeof(_apiResponse) === 'boolean') {   
            return <View style={{ flexDirection: 'row', backgroundColor: _backGroundColor, width: '100%' }} >
                <Text style={{ marginLeft: '5%', fontSize: 11, width: '50%' }}>{ '\n' + _label  + '\n'}</Text>
                <View style={{width: '50%', alignContent: "center"}}>
                    <Switch 
                        style={{marginRight: '30%', borderColor: '', borderWidth: 0.5}}
                        disabled={true}
                        value={_apiResponse}
                        thumbColor={'#FFF'}
                        trackColor={{true: '#9ADDDF', false: '#9E9E9E'}} />
                </View>
            </View>;
        } else {
            return <View style={{ flexDirection: 'row', backgroundColor: _backGroundColor, width: '100%' }} >
                <Text style={{ marginLeft: '5%', fontSize: 11, width: '50%' }}>{ '\n' + _label  + '\n'}</Text>
                <Text style={{ marginRight: '5%', fontSize: 11, width: '50%', textAlign: "center" }}>{ '\n' + _apiResponse  + '\n' }</Text>
            </View>;
        }
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
        const img64 = _apiResponse['pictureResult'];
        const base64Image = 'data:image/jpg;base64,' + img64;
        content.push(
            <View style={{width: '100%', backgroundColor: '#F3F9FA'}}>
            <Image
                    style={{
                        height: 200, marginLeft: 'auto', marginRight: 'auto',
                        marginTop: 10, marginBottom: 10, width: '95%',
                    }}
                    source={{uri: base64Image}} />
            </View>
        );

        return content;
    }

    render() {
        const apiResponse = this.props.navigation.state.params.responseApi;
        var content = this.getContent(apiResponse);
        return (
            <BackgroundScrollCalpulliX addHeight={320}>
                <HeaderCalpulliXBack
                    navigation={this.props.navigation}
                    backButton={true}
                    screen={'ProductList'} />
                <View style={{
                    borderColor: '#F49315', borderWidth: 0.5, width: '90%',
                    marginLeft: 'auto', marginRight: 'auto', marginTop: 30 }}>
                    {content}
                </View>
            </BackgroundScrollCalpulliX>
        );
    }
}

