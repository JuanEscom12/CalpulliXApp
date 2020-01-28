import React, { PureComponent } from 'react';
import { View, Text, Image, Alert, CheckBox, TouchableOpacity, Switch } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import Draggable from 'react-native-draggable';
import HeaderCalpulliXBack from "../common/HeaderCalpulliXBack";
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import stylesCommon from '../common/style';
import ButtonCalpulliX from '../common/ButtonCalpulliX';
import CONSTANTS from '../common/Constants';
import DoubleClick from 'react-native-double-click';
import Modal from "react-native-modal";
import ApiCaller from '../api/ApiCaller';
import styles from './styles';


const labels =
{
    'Nombre': 'name',
    'Id producto': 'idProduct',
    'Descripción': 'description',
    'Precio original': 'originalPrice',
    'Precio descuento': 'discountPrice',
    'Porcentaje descuento': 'percentageDiscount',
    'Impuestos': 'taxes',
    'Ganancia Neta': 'netIncome',
    'Proveedor': 'vendor',
    'Fechas de la promoción': 'dates',
    'Proyección de exito': 'amountProfit'
};
export default class DetailPromotions extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            showDetailPromotion: false,
            contentDetailPromotion: [],
            checkValue: this.getCheckValues(),
            borderColorImages: this.getBorderColorImages(),
        }
        console.log(':: Constructor ');
    }

    getCheckValues = () => {
        var result = [];
        const promotions = this.props.navigation.state.params.responseApi.promotions;
        for (var index = 0; index < promotions.length; index++) {
            result.push(promotions[index].selected);
        }
        return result;
    }

    getBorderColorImages = () => {
        var result = [];
        const promotions = this.props.navigation.state.params.responseApi.promotions;
        for (var index = 0; index < promotions.length; index++) {
            if (promotions[index].selected) {
                result.push("#e53c3c");
            } else {
                result.push("#048585");
            }
        }
        return result;
    }

    getDragDropImages = () => {
        console.log(':: getDragDropImages ');
        var promotions = this.props.navigation.state.params.responseApi.promotions;
        var content = [];
        var result = [];
        var img64;
        var base64Image;
        const x = 30;
        const yInic = 30;
        var y;
        for (var index = 0; index < promotions.length; index++) {
            img64 = promotions[index].image;
            base64Image = CONSTANTS.PREFIX_BASE64 + img64;
            const idPromotion = promotions[index].idPromotion;
            y = yInic + 90 * index;
            content.push(
                <Draggable key={'draggable' + index} x={x} y={y} shouldReverse={true} >
                    <DoubleClick onClick={() => this.handleDetailPromotion(idPromotion)}>
                        <Image
                            style={{
                                height: 70,
                                width: 120,
                                borderWidth: 1.5,
                                borderColor: this.state.borderColorImages[index],
                            }}
                            source={{ uri: base64Image }} />
                    </DoubleClick>
                </Draggable>
            );
        }
        result.push(<View>{content}</View>);
        return result;
    }

    handleDetailPromotion = async (_idPromotion) => {
        const result = await ApiCaller.callApi('/calpullix/detail/promotion/retrieve',
            this.getDetailRequest(_idPromotion),
            CONSTANTS.PORT_PROMOTIONS, CONSTANTS.POST_METHOD)
            .catch((error) => {
                console.log(error);
                this.setState({
                    errorMessage: 'Ocurrio un error, favor de intentar mas tarde.',
                });
            });
        if (result.response !== undefined) {
            var content = [];
            var detail = [];
            var index = 0;
            for (let key in labels) {
                if ((index + 1) % 2 === 0) {
                    detail.push(
                        this.buildContent('#F3F9FA', '\n' + key + '\n', result.response[labels[key]] + '\n')
                    );
                } else {
                    detail.push(
                        this.buildContent('#EDEDED', '\n' + key + '\n', result.response[labels[key]] + '\n')
                    );
                }
                index++;
            }
            var backgroundButton;
            if (index % 2 == 0) {
                backgroundButton = '#EDEDED';
            } else {
                backgroundButton = '#F3F9FA';
            }
            detail.push(
                <View style={{
                    backgroundColor: backgroundButton, height: 100,
                }}>
                    <TouchableOpacity style={{
                        marginLeft: '42%',
                        marginTop: 25,
                        backgroundColor: backgroundButton,
                        height: 35,
                        width: 35,
                    }}
                        activeOpacity={0.5}
                        onPress={this.closeModalScreen} >
                        <Image
                            source={require('./close.png')}
                            style={{
                                height: 55,
                                width: 55,
                                resizeMode: 'stretch',
                            }}
                        />
                    </TouchableOpacity>
                </View>);
            content.push(
                <BackgroundScrollCalpulliX addHeight={150}>
                    <View style={{
                        height: '100%', backgroundColor: '#F3F9FA', borderColor: '#F49315',
                        borderWidth: 1
                    }}>
                        {detail}
                    </View>
                </BackgroundScrollCalpulliX>);
            this.setState({
                showDetailPromotion: true,
                contentDetailPromotion: content,
            });
        }
    }

    getDetailRequest = (_idPromotion) => {
        var request = {
            'idPromotion': _idPromotion
        };
        return request;
    }

    buildContent = (_backgroundColor, _header, _detail) => {
        return (
            <View style={{ backgroundColor: _backgroundColor }}>
                <Text style={[styles.textDetail]} >{_header}</Text>
                <Text style={[styles.textDetail]}>{_detail}</Text>
            </View>
        );
    }

    updatePromotions = async () => {
        const result = await ApiCaller.callApi('/calpullix/promotions/profile/update',
            this.getUpdatePromotionsRequest(),
            CONSTANTS.PORT_PROMOTIONS, CONSTANTS.POST_METHOD)
            .catch((error) => {
                console.log(error);
                this.setState({
                    errorMessage: 'Ocurrio un error, favor de intentar mas tarde.',
                });
            });
        if (result.isUpdate) {
            Alert.alert(' Se han actualizado las promociones ');
        }
    }

    getUpdatePromotionsRequest = () => {
        const promotions = this.props.navigation.state.params.responseApi.promotions;
        var detail = [];
        promotions.map((data, index) => {
            var promotion = { 
                idPromotion: data.idPromotion,
                statusPromotion: this.state.checkValue[index],
            };
            detail.push(promotion); 
        });
        var result = {
            promotions: [{detail}]
        };
        console.log(':: Request Update ', result);
        return result;
    }

    closeModalScreen = () => {
        this.setState({ showDetailPromotion: false });
    }

    buildSelectPromotionSection = () => {
        var content = [];
        const promotions = this.props.navigation.state.params.responseApi.promotions;
        const yInic = 50;
        var y;
        for (var index = 0; index < promotions.length; index++) {
            if (index > 0) {
                y = yInic + 15;
            } else {
                y = yInic;
            }
            const indexSwitch = index;

            content.push(
                <View style={{ flexDirection: 'row', marginTop: y }} >
                    <Text style={[stylesCommon.titleSectionGreen, { fontSize: 11, marginTop: 4 }]} >
                        {promotions[index].name}
                    </Text>
                    <Switch
                        id={'switchImage' + index}
                        style={{ borderColor: '', }}
                        value={this.state.checkValue[indexSwitch]}
                        thumbColor={'#FFF'}
                        trackColor={{ true: '#9ADDDF', false: '#9E9E9E' }}
                        onValueChange={(value) => this.toggleSwitch(value, indexSwitch)} />
                </View>
            );
        }
        return content;
    }

    toggleSwitch = (value, index) => {
        var checkValue = [...this.state.checkValue];
        checkValue[index] = value;
        var borderColor = [...this.state.borderColorImages];
        if (value) {
            borderColor[index] = '#e53c3c';
        } else {
            borderColor[index] = '#048585';
        }
        this.setState({
            checkValue: checkValue,
            borderColorImages: borderColor,
        });
        console.log(':: Changing check ', value, index, checkValue);
    }

    cleanInput = () => {
        console.log(':: Clean input ');
        this.setState({
            checkValue: this.getCheckValues(),
            borderColorImages: this.getBorderColorImages(),
        });
    }

    render() {
        console.log(':: RENDER ');
        var images = this.getDragDropImages();
        var content = this.buildSelectPromotionSection();
        return (
            <BackgroundScrollCalpulliX addHeight={0}>
                <HeaderCalpulliXBack
                    navigation={this.props.navigation}
                    title={'Detalle de promociones del perfil'}
                    backButton={true}
                    screen={'ProfilePromotions'} />

                <NavigationEvents
                    onWillFocus={() => {
                        this.cleanInput();
                    }} />

                <View style={{ flex: 1, height: '100%' }}>
                    <Modal isVisible={this.state.showDetailPromotion} >
                        {this.state.contentDetailPromotion}
                    </Modal>
                </View>

                <View style={{ height: '100%' }}>
                    <View style={{ marginTop: 20, }}>
                        <Text style={[stylesCommon.titleSectionStronger, {
                            fontSize: 14, textAlign: "center", marginLeft: 0
                        }]}>
                            Seleccionar promociones
                        </Text>
                    </View>
                    <View style={{
                        borderWidth: 0.3, borderColor: '#F49315', width: '100%',
                        marginTop: 15
                    }} />

                    <View>
                        <ButtonCalpulliX
                            title={'Actualizar promociones'}
                            id={'buttonUpdatePromotions'}
                            arrayColors={['#05AAAB', '#048585', '#048585']}
                            onPress={this.updatePromotions}
                            width={'43%'}
                            height={40}
                            marginTop={20} />
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', }}>
                        <View>
                            {images}
                        </View>
                        <View style={{ marginLeft: 195 }}>
                            {content}
                        </View>
                    </View>

                </View>
            </BackgroundScrollCalpulliX>);
    }
}