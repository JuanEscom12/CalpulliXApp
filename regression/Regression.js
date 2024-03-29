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
import CalpulliXTable from '../common/CalpulliXTable';
import CommonAPI from '../api/CommonAPI';
import CONSTANTS from '../common/Constants';

var functionClearPickerBranches;
var functionClearPickerYears;
var functionClearPickerMonths;

const headers = ['Mes', 'Predicción'];

export default class Regression extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            branches: [],
            branchId: null,
            years: this.getYears(),
            year: null,
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
        for (var year = date.getFullYear(); year <= date.getFullYear() + 5; year++) {
            result.push({ id: year, name: year });
        }
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

    handleAutoComplete = async (_nameIdProduct) => {
        const response = await ApiCaller.callApi(
            '/calpullix/product-name/retrieve', this.getProductNameRequest(_nameIdProduct),
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
            Alert.alert('Se debe capturar el año, el producto y la sucursal');
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
        if (response.graphics !== null &&
            response.graphics.length > CONSTANTS.ZERO) {
            this.setState({
                images: this.getImages(response),
            });
        } else {
            this.setState({
                images: [],
            });
            Alert.alert('No se encontró información.');
        }
    }

    isValidInput = () => {
        return this.state.branchId !== null && this.state.year !== null && this.state.product !== '';
    }

    getForecastRequest = () => {
        var request = {
            branchId: this.state.branchId,
            year: this.state.year,
            product: this.state.product,
        };
        console.log(':: Request ', request);
        return request;
    }

    getImages = (_apiResponse, _forecast) => {
        var result = [];
        var base64Image;
        result.push(
            <Text style={{ marginTop: 20, fontSize: 12, marginLeft: '5%' }}>
                {'RMSE predicción: '}
                <Text style={{ fontWeight: 'bold' }}>{_apiResponse.rmsePrediction}</Text>
            </Text>
        );

        result.push(
            <Text style={{ marginTop: 10, fontSize: 12, marginLeft: '5%' }}>
                {'RMSE entrenamiento: '}
                <Text style={{ fontWeight: 'bold' }}>{_apiResponse.rmseTraining}</Text>
            </Text>
        );

        result.push(
            <Text style={{ marginTop: 10, fontSize: 12, marginLeft: '5%' }}>
                {'Configuración óptima ARIMA: '}
                <Text style={{ fontWeight: 'bold' }}>{_apiResponse.bestArima}</Text>
            </Text>
        );

        result.push(
            <CalpulliXTable
                headers={headers}
                data={_apiResponse.rowsPredictions}
                marginTop={15}
                marginBottom={20}
                textStyle={{
                    margin: 6,
                    fontSize: 10
                }} />
        );

        for (var index = 0; index < _apiResponse.graphics.length; index++) {
            result.push(
                <Text style={{ fontSize: 13, color: 'black', marginTop: 30, marginLeft: '5%' }} >
                    {_apiResponse.labelGraphics[index]}
                </Text>
            );
            base64Image = CONSTANTS.PREFIX_BASE64 + _apiResponse.graphics[index];
            result.push(
                <Image
                    style={{
                        height: 230,
                        width: '90%',
                        borderWidth: 0.5,
                        borderColor: '#746F6F',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: 5,
                        borderRadius: 3,
                    }}
                    source={{ uri: base64Image }} />
            );
        }
        return result;
    }

    render() {
        return (
            <View>
                <HeaderCalpulliXBack
                    navigation={this.props.navigation}
                    backButton={false}
                    title={'Proyección de Ventas'} />
                <BackgroundScrollCalpulliX addHeight={1700}>
                    <NavigationEvents
                        onWillFocus={() => {
                            this.cleanInput();
                        }} />
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


                        <View style={{ marginTop: 10 }}>
                            <PickerCalpulliX
                                data={this.state.years}
                                updateState={this.updateYear}
                                placeholder={'Seleccione el año'}
                                functionClearPicker={this.setFunctionClearPickerYears} />
                        </View>

                        <View style={{ marginTop: 5 }}>
                            <View style={[stylesAutoComplete.autocompleteContainer]} >
                                <Autocomplete
                                    placeholder={'   Introduzca el producto'}
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
                                        borderColor: '#F49315', borderRadius: 5,
                                        borderWidth: 0.5, backgroundColor: '#FDFDFD',
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

                        <ButtonCalpulliX
                            title={'Obtener proyección'}
                            id={'buttonRegression'}
                            arrayColors={['#05AAAB', '#048585', '#048585']}
                            onPress={() => this.getForecast()}
                            width={'38%'}
                            height={45}
                            marginTop={65}
                            marginBottom={0} />

                        {this.state.images}
                    </View>
                </BackgroundScrollCalpulliX>
            </View>
        );

    }


}