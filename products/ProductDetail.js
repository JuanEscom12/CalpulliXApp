import React, { PureComponent } from 'react';
import { Alert, Text, View, Image, Switch } from 'react-native';
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import HeaderCalpulliXBack from '../common/HeaderCalpulliXBack';


const labels = ['Fecha de Caducidad', 'Caja con mas productos ', 'Numero de productos', 'Id paquete padre', 'Codigo de barras',
    'Provedor', 'Precio Original', 'Precio Tienda', 'Porcentaje de ganancia', 'Ganancia neta', 'Tamaño', 'Unidades', 'Categoria',
    'Material', 'Clasificacion del producto'];

const apiResponse = [
    ' Value 1', true, ' Value 1', ' Value 1', ' Value 1', ' Value 1', ' Value 1', ' Value 1',
    ' Value 1', ' Value 1', ' Value 1', ' Value 1', ' Value 1', ' Value 1', ' Value 1', ' Value 1'
]

export default class ProductDetail extends PureComponent {

    getContent(_label, _apiResponse, _backGroundColor) {
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

    render() {
        var content = [];
        for (let index = 0; index < labels.length; index++) {
            if ((index + 1) % 2 === 0) {
                content.push(
                    this.getContent(labels[index], apiResponse[index], '#F3F9FA')
                );
            } else {
                content.push(
                    this.getContent(labels[index], apiResponse[index], '#EDEDED')
                );
            }
        }
        content.push(
            <View style={{width: '100%', backgroundColor: '#F3F9FA'}}>
            <Image
                    style={{
                        height: 200, marginLeft: 'auto', marginRight: 'auto',
                        marginTop: 10, marginBottom: 10, width: '95%',
                    }}
                    source={require('./item.jpg')} />
            </View>
        );
        return (
            <BackgroundScrollCalpulliX addHeight={320}>

                <HeaderCalpulliXBack
                    navigation={this.props.navigation}
                    backButton={true}
                    screen={'ProductList'} />
                <View style={{
                    borderColor: '#F49315', borderWidth: 0.5, width: '90%',
                    marginLeft: 'auto', marginRight: 'auto', marginTop: 30
                }}>
                    {content}
                </View>
            </BackgroundScrollCalpulliX>
        );
    }
}

