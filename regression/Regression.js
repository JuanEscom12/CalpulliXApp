import React, { PureComponent } from 'react';
import { Text, View, Image, Alert, Dimensions, TouchableOpacity } from 'react-native';
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import { NavigationEvents } from 'react-navigation';
import HeaderCalpulliXBack from '../common/HeaderCalpulliXBack';
import ApiCaller from '../api/ApiCaller';
import Autocomplete from 'react-native-autocomplete-input';
import stylesCommon from '../common/style';
import stylesAutoComplete from '../sales/styles';
import PickerCalpulliX from '../common/PickerCalpulliX';
import ButtonCalpulliX from '../common/ButtonCalpulliX';
import CommonAPI from '../api/CommonAPI';
import CONSTANTS from '../common/Constants';

var functionClearPickerBranches;
var functionClearPickerYears;
var functionClearPickerMonths;

export default class Regression extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            branches: [],
            branchId: null,
            years: this.getYears(),
            year: null,
            months: this.getMonths(),
            month: null,
            errorMessage: '',
            product: '',
            dataProducts: [],
            hideResults: true,
            images: [],
        };
        this.getBranchList();
    }

    getYears = () => {
        var result = [];
        var date = new Date();
        for (var year = date.getFullYear(); year >= date.getFullYear() - 40; year--) {
            result.push({ id: year, name: year });
        }
        return result;
    }

    getMonths = () => {
        var result = [];
        result.push({ id: 1, name: 'Enero' });
        result.push({ id: 2, name: 'Febrero' });
        result.push({ id: 3, name: 'Marzo' });
        result.push({ id: 4, name: 'Abril' });
        result.push({ id: 5, name: 'Mayo' });
        result.push({ id: 6, name: 'Junio' });
        result.push({ id: 7, name: 'Julio' });
        result.push({ id: 8, name: 'Agosto' });
        result.push({ id: 9, name: 'Septiembre' });
        result.push({ id: 10, name: 'Octubre' });
        result.push({ id: 11, name: 'Noviembre' });
        result.push({ id: 12, name: 'Diciembre' });
        return result;
    }

    getBranchList = async () => {
        const result = await CommonAPI.callBranches()
            .catch((error) => {
                console.log(error);
                this.setState({
                    errorMessage: 'Ocurrio un error (Sucursal), favor de intentar mas tarde',
                });
            });
        if (result) {
            this.setState({
                branches: result,
            });
        } else {
            this.setState({
                branches: [],
            });
        }
    }

    setFunctionClearPickerBranches = (_clear) => {
        functionClearPickerBranches = _clear;
    }

    setFunctionClearPickerYears = (_clear) => {
        functionClearPickerYears = _clear;
    }

    setFunctionClearPickerMonths = (_clear) => {
        functionClearPickerMonths = _clear;
    }

    cleanInput = () => {
        if (this.props.navigation.state.params && this.props.navigation.state.params.navigateFromMenu) {
            functionClearPickerBranches();
            functionClearPickerYears();
            functionClearPickerMonths();

            this.getBranchList();
            this.updateState(null);
            this.updateYear(null);
            this.updateState(null);

            this.setState({
                errorMessage: '',
                product: '',
                dataProducts: [],
                hideResults: true,
                images: [],
            });
            this.props.navigation.state.params.navigateFromMenu = false;
        }
    }

    updateState = (_value) => {
        if (_value) {
            this.setState({
                branchId: _value.id,
            });
        } else {
            this.setState({
                branchId: null,
            });
        }
    }

    updateYear = (_value) => {
        if (_value) {
            this.setState({
                year: _value.id
            });
        } else {
            this.setState({
                year: null,
            });
        }
    }

    updateMonth = (_value) => {
        if (_value) {
            this.setState({
                month: _value.id
            });
        } else {
            this.setState({
                month: null,
            });
        }
    }

    handleAutoComplete = async (_nameIdProduct) => {
        const response = await ApiCaller.callApi(
            '/calpullix/product-name/retrieve', this.getProductNameRequest(),
            CONSTANTS.PORT_PRODUCT_LIST, CONSTANTS.POST_METHOD)
            .catch((error) => {
                console.log(error);
                this.setState({
                    errorMessage: 'Hubo un error favor de intentar mas tarde.',
                });
            });
        console.log(':: TEXT ', _nameIdProduct, response.products);
        if (response.products && response.products.length > CONSTANTS.ZERO) {
            this.setState({
                dataProducts: response.products,
                hideResults: false,
                errorMessage: '',
            });
        }
        this.setState({
            product: _nameIdProduct,
        });
    }

    getProductNameRequest = (_nameIdProduct) => {
        var request = {
            name: _nameIdProduct
        };
        return request;
    }

    getForecast = async () => {
        if (!this.isValidInput()) {
            Alert.alert('Se debe capturar el año y la sucursal.');
            return;
        }
        const response = await ApiCaller.callApi(
            '/calpullix/retrieve/regression', this.getForecastRequest(),
            CONSTANTS.REGRESSION_PORT, CONSTANTS.POST_METHOD)
            .catch((error) => {
                console.log(error);
                this.setState({
                    errorMessage: 'Hubo un error favor de intentar mas tarde.',
                });
            });
        console.log(':: Regression  ', response);
        if (response.graphics.length > CONSTANTS.ZERO) {
            this.setState({
                images: this.getImages(response.graphics, response.forecast),
            });
        } else {
            this.setState({
                images: [],
            });
            Alert.alert('No se encontró información.');
        }
    }

    isValidInput = () => {
        return this.state.branchId !== null && this.state.year !== null;
    }

    getForecastRequest = () => {
        var request = {
            branchId: this.state.branchId,
            year: this.state.year,
            month: this.state.month,
            product: this.state.product,
        };
        console.log(':: Request ', request);
        return request;
    }

    getImages = (_images, _forecast) => {
        var result = [];
        var base64Image;
        result.push(
            <Text style={{ marginTop: 20, fontSize: 12, marginLeft: '5%' }}>
                {'La proyección es: '}
                <Text style={{ fontWeight: 'bold' }}>{'$' + _forecast}</Text>
            </Text>
        );
        for (var index = 0; index < _images.length; index++) {
            base64Image = CONSTANTS.PREFIX_BASE64 + _images[index];
            result.push(
                <Image
                    style={{
                        height: 230,
                        width: '90%',
                        borderWidth: 0.5,
                        borderColor: '#746F6F',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: 10,
                        borderRadius: 3,
                    }}
                    source={{ uri: base64Image }} />
            );
        }
        return result;
    }

    render() {
        return (
            <BackgroundScrollCalpulliX addHeight={930}>
                <NavigationEvents
                    onWillFocus={() => {
                        this.cleanInput();
                    }} />
                <HeaderCalpulliXBack
                    navigation={this.props.navigation}
                    backButton={false}
                    title={'Proyección de Ventas'} />

                <View style={{ marginTop: 0 }}>

                    <Text
                        id='errorMessageRegression'
                        style={[stylesCommon.errorMessage, { marginTop: 0 }]}>
                        {this.state.errorMessage}
                    </Text>

                    <PickerCalpulliX
                        data={this.state.branches}
                        updateState={this.updateState}
                        placeholder={'Seleccione la sucursal'}
                        functionClearPicker={this.setFunctionClearPickerBranches} />

                    <View style={{ marginTop: 5 }}>
                        <View style={[stylesAutoComplete.autocompleteContainer]} >
                            <Autocomplete
                                placeholder={'   Seleccione el producto'}
                                data={this.state.dataProducts}
                                defaultValue={this.state.product}
                                onChangeText={(text) => this.handleAutoComplete(text)}
                                hideResults={this.state.hideResults}
                                onBlur={() => this.setState({ hideResults: true })}
                                style={{
                                    borderWidth: 0,
                                    borderColor: '#F49315',
                                }}
                                inputContainerStyle={{
                                    borderColor: '#F49315', borderRadius: 5, borderWidth: 0.5, backgroundColor: '#FDFDFD',
                                }}
                                renderItem={({ item, i }) => (

                                    <TouchableOpacity
                                        onPress={() => {
                                            console.log(':: ON PRESS ', item)
                                            this.setState({ product: item, hideResults: true })
                                        }}>

                                        <Text style={{
                                            backgroundColor: '#FDFDFD',
                                            fontSize: 12,
                                            borderColor: '#F49315',
                                            borderWidth: 0.2,
                                        }}>{'\n  ' + item + '\n'}</Text>

                                    </TouchableOpacity>
                                )} />
                        </View>
                    </View>

                    <View style={{ marginTop: 60 }}>
                        <PickerCalpulliX
                            data={this.state.years}
                            updateState={this.updateYear}
                            placeholder={'Seleccione el año'}
                            functionClearPicker={this.setFunctionClearPickerYears} />
                    </View>

                    <View style={{ marginTop: 5 }}>
                        <PickerCalpulliX
                            data={this.state.months}
                            updateState={this.updateMonth}
                            placeholder={'Seleccione el mes'}
                            functionClearPicker={this.setFunctionClearPickerMonths} />
                    </View>

                    <ButtonCalpulliX
                        title={'Obtener proyección'}
                        id={'buttonRegression'}
                        arrayColors={['#05AAAB', '#048585', '#048585']}
                        onPress={() => this.getForecast()}
                        width={'35%'}
                        height={45}
                        marginTop={10}
                        marginBottom={0} />

                    {this.state.images}
                </View>
            </BackgroundScrollCalpulliX>
        );

    }


}