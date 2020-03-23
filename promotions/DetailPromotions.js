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
import Paginator from 'react-native-paginator';
import styles from './styles';


const labels =
{
    'Nombre': 'name',
    'Producto': 'product',
    'Descripción': 'description',
    'Precio original': 'originalPrice',
    'Precio descuento': 'discountPrice',
    'Porcentaje descuento': 'percentageDiscount',
    'Impuestos': 'taxes',
    'Ganancia Neta': 'netIncome',
    'Proveedor': 'vendor',
    'Fechas de la promoción': 'dates',
};
export default class DetailPromotions extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            showDetailPromotion: false,
            contentDetailPromotion: [],
            images: null,
            checkValue: this.getCheckValues(
                this.props.navigation.state.params.responseApi.promotions),
            borderColorImages: this.getBorderColorImages(
                this.props.navigation.state.params.responseApi.promotions),
            promotionsImages: this.getImages(
                this.props.navigation.state.params.responseApi.promotions),
            promotionsName: this.props.navigation.state.params.responseApi.promotions,
            selectPromotions: null,
            itemCount: this.props.navigation.state.params.responseApi.itemCount,
            page: 1,
            itemsPerPage: 5,
        }
        console.log(':: Constructor ');
    }

    getImages = (_promotions) => {
        var base64Image;
        var result = [];
        for (var index = 0; index < _promotions.length; index++) {
            base64Image = CONSTANTS.PREFIX_BASE64 + _promotions[index].image;
            result.push(base64Image);
        }
        return result;
    }

    getCheckValues = (_promotions) => {
        var result = [];
        for (var index = 0; index < _promotions.length; index++) {
            result.push(_promotions[index].selected);
        }
        return result;
    }

    getBorderColorImages = (_promotions) => {
        var result = [];
        for (var index = 0; index < _promotions.length; index++) {
            if (_promotions[index].selected) {
                result.push("#e53c3c");
            } else {
                result.push("#048585");
            }
        }
        return result;
    }

    getPromotions = async (_idProfile, _page) => {
        console.log(':: Call Promotions ', _idProfile, _page);
        const result = await ApiCaller.callApi(
            '/calpullix/promotions/image/retrieve', this.getImagesPromotionRequest(_idProfile, _page),
            CONSTANTS.PORT_PROMOTIONS, CONSTANTS.POST_METHOD)
            .catch((error) => {
                console.log(error);
                this.setState({
                    errorMessage: 'Ocurrio un error, intenta mas tarde por favor',
                    checkValue: null,
                    borderColorImages: null,
                });
            });
        return result;
    }

    getImagesPromotionRequest = (_idProfile, _page) => {
        const request = {
            'idProfile': _idProfile,
            'page': _page,
        };
        console.log(':: Request Detail ', request);
        return request;
    }

    getDragDropImages = (_numberPage) => {
        var promotions = this.getPromotions(
            this.props.navigation.state.params.responseApi.idProfile, _numberPage);
        Promise.all([promotions]).then((responses) => {
            this.setState({
                checkValue: this.getCheckValues(
                    responses[CONSTANTS.ZERO].promotions),
                borderColorImages: this.getBorderColorImages(
                    responses[CONSTANTS.ZERO].promotions),
                promotionsImages: this.getImages(
                    responses[CONSTANTS.ZERO].promotions),
                promotionsName: responses[CONSTANTS.ZERO].promotions,
            });
        });
    }

    buildImages = (promotions, _itemCount) => {
        if (!promotions || promotions.length == CONSTANTS.ZERO) {
            return;
        }
        var content = [];
        var result = [];
        const x = 5;
        const yInic = 30;
        var y;
        for (var index = 0; index < promotions.length; index++) {
            const idPromotion = promotions[index].idPromotion;
            y = yInic + 80 * index;
            content.push(
                <Draggable key={'draggable' + index} x={x} y={y} shouldReverse={true} >
                    <DoubleClick onClick={() => this.handleDetailPromotion(idPromotion)}>
                        <Image
                            style={{
                                height: 70,
                                width: 120,
                                borderWidth: 2.5,
                                borderColor: this.state.borderColorImages[index],
                            }}
                            source={{ uri: this.state.promotionsImages[index] }} />
                    </DoubleClick>
                </Draggable>
            );
        }
        result.push(<View>{content}</View>);
        return result;
    }

    buildSelectPromotionSection = () => {
        var content = [];
        const yInic = 50;
        var y;
        for (var index = 0; index < this.state.promotionsName.length; index++) {
            if (index > 0) {
                y = yInic + 5;
            } else {
                y = yInic;
            }
            const indexSwitch = index;
            content.push(
                <View style={{ flexDirection: 'row', marginTop: y, width: '100%' }} >
                    <Text style={[stylesCommon.titleSectionGreen, {
                        marginLeft: 0, fontSize: 11, marginTop: 4,
                        width: "80%"
                    }]} >
                        {this.state.promotionsName[index].name}
                    </Text>
                    <Switch
                        id={'switchImage' + indexSwitch}
                        value={this.state.checkValue[indexSwitch]}
                        style={{ width: '20%' }}
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
        if (result !== null && result.response !== undefined) {
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
                        marginTop: 20,
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
                <BackgroundScrollCalpulliX addHeight={110}>
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
                errorMessage: '',
            });
        } else {
            this.setState({
                errorMessage: 'No existen datos',
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
        var promotions;
        if (this.state.page == CONSTANTS.ONE) {
            promotions = this.props.navigation.state.params.responseApi.promotions;
        } else {
            promotions = this.state.promotionsName;
        }
        var detail = [];
        promotions.map((data, index) => {
            var promotion = {
                idPromotion: data.idPromotion,
                statusPromotion: this.state.checkValue[index],
            };
            detail.push(promotion);
        });
        var result = {
            idProfile: this.props.navigation.state.params.responseApi.idProfile,
            promotions: [{ detail }]
        };
        console.log(':: Request Update ', result);
        return result;
    }

    closeModalScreen = () => {
        this.setState({ showDetailPromotion: false });
    }


    cleanInput = () => {
        console.log(':: Clean input ', this.props.navigation.state.params.responseApi.itemCount);
        this.setState({
            checkValue: this.getCheckValues(
                this.props.navigation.state.params.responseApi.promotions),
            borderColorImages: this.getBorderColorImages(
                this.props.navigation.state.params.responseApi.promotions),
            promotionsImages: this.getImages(
                this.props.navigation.state.params.responseApi.promotions),
            promotionsName: this.props.navigation.state.params.responseApi.promotions,
            images: null,
            selectPromotions: null,
            itemCount: this.props.navigation.state.params.responseApi.itemCount,
            page: 1,
        });
    }

    handlerPagination = (numberPage) => {
        this.setState({
            page: numberPage,
        });
        this.getDragDropImages(numberPage);
    }

    render() {

        var imagesContent = this.buildImages(this.props.navigation.state.params.responseApi.promotions,
            this.props.navigation.state.params.responseApi.promotions.itemCount);
        var selectImages = this.buildSelectPromotionSection();

        return (
            <BackgroundScrollCalpulliX addHeight={100}>
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

                <View style={{ height: '100%', width: '100%' }}>
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
                            title={'Confirmar promociones'}
                            id={'buttonUpdatePromotions'}
                            arrayColors={['#05AAAB', '#048585', '#048585']}
                            onPress={this.updatePromotions}
                            width={'45%'}
                            height={40}
                            marginTop={20} />
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', marginBottom: 20, }}>
                        <View style={{ width: '50%' }}>
                            {imagesContent}
                        </View>
                        <View style={{ width: '50%' }}>
                            {selectImages}
                        </View>
                    </View>

                    <Paginator
                        totalItems={this.state.itemCount}
                        onChange={numberPage => this.handlerPagination(numberPage)}
                        activePage={this.state.page}
                        disabled={false}
                        itemsPerPage={this.state.itemsPerPage}

                        buttonStyles={
                            {
                                backgroundColor: '#F3F9FA',
                                color: '#156869',
                                borderColor: '#156869',
                            }
                        }
                        buttonActiveStyles={{
                            backgroundColor: '#05AAAB',
                            color: '#F3F9FA',
                            borderColor: '#05AAAB'
                        }} />

                </View>
            </BackgroundScrollCalpulliX>);
    }
}