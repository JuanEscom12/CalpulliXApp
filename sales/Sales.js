import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity, Alert, Dimensions } from 'react-native';
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import { NavigationEvents } from 'react-navigation';
import HeaderCalpulliXBack from '../common/HeaderCalpulliXBack';
import PickerCalpulliX from '../common/PickerCalpulliX';
import ButtonCalpulliX from '../common/ButtonCalpulliX';
import CommonAPI from '../api/CommonAPI';
import Autocomplete from 'react-native-autocomplete-input';
import styles from './styles';
import stylesCommon from '../common/style';
import ApiCaller from '../api/ApiCaller';
import CONSTANTS from '../common/Constants';
import NavigatorCommons from '../navigation/NavigatorCommons';
import {
    LineChart,
    BarChart,
} from "react-native-chart-kit";


var functionClearPickerBranches;
var functionClearPickerYears;
var functionClearPickerMonths;
const lineColors = [`rgba(233, 251, 88, 1)`, 
                    `rgba(34, 151, 238, 1)`,
                    `rgba(4, 133, 133, 1)`, 
                    `rgba(118, 12, 19, 1)`, 
                    `rgba(178, 87, 151, 1)`];
const months = ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

export default class Sales extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
            branches: [],
            branchId: null,
            years: this.getYears(),
            year: null,
            months: this.getMonths(),
            month: null,
            product: '',
            dataProducts: [],
            hideResults: true,
            salesInformation: [],
            barChart: [],
            lineChart: [],
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
                    errorMessage: 'Ocurrio un error, favor de intentar mas tarde',
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

    cleanInput = () => {
        if (this.props.navigation.state.params && 
            this.props.navigation.state.params.navigateFromMenu) {

            functionClearPickerBranches();
            functionClearPickerYears();
            functionClearPickerMonths();
            this.getBranchList();

            this.updateMonth(null);
            this.updateYear(null);
            this.updateState(null);

            this.setState({
                errorMessage: '',
                product: '',
                dataProducts: [],
                hideResults: true,
                salesInformation: [],
                barChart: [],
                lineChart: [],
            });
            this.props.navigation.state.params.navigateFromMenu = false;
            
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

    findSales = async () => {
        if (this.isValidInput()) {
            const response = await ApiCaller.callApi(
                '/calpullix/sales/retrieve', this.getRequestSales(),
                CONSTANTS.PORT_SALES, CONSTANTS.POST_METHOD)
                .catch((error) => {
                    console.log(error);
                    this.setState({
                        errorMessage: 'Hubo un error favor de intentar mas tarde.',
                    });
                });
            console.log(':: SALES ', response);
            if (response) {
                const width = Dimensions.get("window").width - 10;
                var content = this.getDetailSales(response);
                var barChart = this.getBarChart(response, width);
                var lineChart = this.getLineChart(response, width);
                this.setState({
                    salesInformation: content,
                    barChart: barChart,
                    lineChart: lineChart,
                    errorMessage: '',
                });
            }
        } else {
            Alert.alert('La sucursal o el producto y el año o el mes son requeridos');
        }
    }

    getDetailSales = (_response) => {
        var result = [];
        var detail = [];
        detail.push(
            <View style={{
                backgroundColor: '#EDEDED', width: '100%', borderTopLeftRadius: 5,
                borderTopRightRadius: 10,
            }} >
                <Text style={{ fontSize: 11, }} >{'\n' + '  Artículos vendidos' + ' \n'}</Text>
                <Text style={{ fontSize: 11, }} >{'  $' + _response.totalAmountSoldOut + ' (Monto), ' +
                    _response.totalAmountItemsSoldOut + ' (Número artículos)\n'}</Text>
            </View>);
        detail.push(
            <View style={{
                backgroundColor: '#F3F9FA', width: '100%',
            }} >
                <Text style={{ fontSize: 11, }} >{'\n' + '  Monto ganancias' + ' \n'}</Text>
                <Text style={{ fontSize: 11, }} >{'  $' + _response.totalAmonuntSales + '\n'}</Text>
            </View>);
        detail.push(
            <View style={{
                backgroundColor: '#EDEDED', width: '100%'
            }} >
                <Text style={{ fontSize: 11, }} >{'\n' + '  Monto insumos' + ' \n'}</Text>
                <Text style={{ fontSize: 11, }} >{'  $' + _response.totalAmountSupplies + '\n'}</Text>
            </View>
        );
        detail.push(
            <View style={{
                backgroundColor: '#F3F9FA', width: '100%'
            }} >
                <Text style={{ fontSize: 11, }} >{'\n' + '  Monto perdidas' + ' \n'}</Text>
                <Text style={{ fontSize: 11, }} >{'  $' + _response.totalAmountLosses + '\n'}</Text>
            </View>
        );
        detail.push(
            <View style={{
                backgroundColor: '#EDEDED', width: '100%'
            }} >
                <Text style={{ fontSize: 11, }} >{'\n' + '  Monto merma' + ' \n'}</Text>
                <Text style={{ fontSize: 11, }} >{'  $' + _response.totalAmmountCaducousPurchasePrice + ' (Compra), $' +
                    _response.totalAmmountCaducousSalePrice + ' (Venta) \n'}</Text>
            </View>
        );
        detail.push(
            <View style={{
                backgroundColor: '#F3F9FA', width: '100%'
            }} >
                <Text style={{ fontSize: 11, }} >{'\n' + '  Monto aparadores' + ' \n'}</Text>
                <Text style={{ fontSize: 11, }} >{'  $' + _response.totalAmmountStoredPurchasePrice + ' (Compra), $' +
                    _response.totalAmmountStoredSalePrice + ' (Venta) \n'}</Text>
            </View>
        );
        detail.push(
            <View style={{
                backgroundColor: '#EDEDED', width: '100%'
            }} >
                <Text style={{ fontSize: 11, }} >{'\n' + '  Monto robo/extravío' + ' \n'}</Text>
                <Text style={{ fontSize: 11, }} >{'  $' + _response.totalAmmountStolePurchasePrice + ' (Compra), $' +
                    _response.totalAmmountStoleSalePrice + ' (Venta) \n'}</Text>
            </View>
        );
        detail.push(
            <View style={{
                backgroundColor: '#F3F9FA', width: '100%',
                borderBottomLeftRadius: 5, borderBottomRightRadius: 5
            }}>
                <Text style={{ fontSize: 11, }} >{'\n' + '  Artículos en aparador' + ' \n'}</Text>
                <Text style={{ fontSize: 11, }} >{'  $' + _response.totalAmmountSideboardPurchasePrice + ' (Compra), $'
                    + _response.totalAmmountSideboardSalePrice + ' (Venta) \n'}</Text>
            </View>);

        result.push(
            <View style={{
                marginTop: 10, borderWidth: 0.8, borderColor: '#F49315',
                width: '90%', marginLeft: 'auto', marginRight: 'auto', borderRadius: 5
            }}>
                {detail}
            </View>);
        return result;
    }

    getBarChart = (_response, _width) => {
        var barChart = [];
        var barChartDetail = [];
        var axis;
        var axisSecond = [];
        var isYear = false;
        var dataSales;
        var dateSalesSecond;
        if (this.state.month !== null && this.state.month !== 2) {
            axis = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5'];
            dataSales = this.getDataSales(_response.monthlySales);
        } else if (this.state.month !== null && this.state.month === 2) {
            axis = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];
            dataSales = this.getDataSales(_response.monthlySales);
        } else {
            isYear = true;
            axis = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];
            axisSecond = ['Julio', 'Agosto', 'Septiembre', 'Octubre', 'Nov', 'Dic'];
            var chunks = this.chunkArray(_response.yearlySales, _response.yearlySales.length / 2);
            dataSales = this.getDataSales(chunks[0]);
            dateSalesSecond = this.getDataSales(chunks[1]);
        }
        barChartDetail.push(this.getComponentBarChar(axis, dataSales, _response.suffix, _width));
        if (isYear) {
            barChartDetail.push(this.getComponentBarChar(axisSecond, dateSalesSecond, _response.suffix, _width));
        }
        barChart.push(
            <View style={{ marginTop: 15, marginLeft: 5, }}>
                <Text style={{ fontSize: 12 }}>Ventas del periodo:</Text>
                {barChartDetail}
            </View>
        );
        return barChart;
    }

    getComponentBarChar = (_label, _data, _suffix, _width) => {
        return (
            <BarChart
                style={{
                    marginVertical: 8,
                    borderRadius: 5,
                    borderWidth: 0.5,
                    borderColor: '#5c5c59',
                    width: (_width + 1),
                }}
                data={{
                    labels: _label,
                    datasets: [
                        {
                            data: _data
                        }
                    ]
                }}
                width={_width}
                height={250}
                yAxisLabel="$"
                yAxisSuffix={_suffix}
                chartConfig={{
                    backgroundColor: "#FDFDFD",
                    backgroundGradientFrom: "#FDFDFD",
                    backgroundGradientTo: "#FDFDFD",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(190, 14, 27, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(36, 36, 35, ${opacity})`,
                    style: {
                        borderRadius: 8,
                        marginTop: 15,
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    },
                    propsForLabels: {
                        fontSize: 8,
                    },
                }} />);
    }

    getLineChart = (_salesInformation, _width) => {
        var result = [];
        var labels = [];
        if (this.state.month !== null) {
            for (var index = 1; index < 5; index++) {
                labels.push('Semana ' + index);
            }
            if (this.state.month !== 2) {
                labels.push('Semana 5');
            }
        } else {
            labels = months;
        }
        var dataSets = this.getDataSets(_salesInformation.bestProduct);
        var dataSetsWorst = this.getDataSets(_salesInformation.worstProduct);
        var data = this.getData(dataSets, labels);
        var dataWorst = this.getData(dataSetsWorst, labels);
        console.log(':: Data ', data, dataWorst);
        result.push(
            <View style={{ marginTop: 15, marginLeft: 5, }}>
                <Text style={{ fontSize: 12, }}>Top 5 productos:</Text>
                {this.getColorBar(_salesInformation.bestProduct)}
                {this.getNumberItems(_salesInformation.numberItems)}
                {this.getLineChartComponent(data, _salesInformation.suffixBest, _width)}
                <Text style={{ fontSize: 12, marginTop: 15 }}>Top-Down 5 productos:</Text>
                {this.getColorBar(_salesInformation.worstProduct)}
                {this.getNumberItems(_salesInformation.numberItemsWorst)}
                {this.getLineChartComponent(dataWorst, _salesInformation.suffixWorst, _width)}
                <ButtonCalpulliX
                        title={'Ver Estadísticas'}
                        id={'buttonStatistics'}
                        arrayColors={['#05AAAB', '#048585', '#048585']}
                        onPress={() => this.showStatistics()}
                        width={'35%'}
                        height={40}
                        marginTop={10} />
            </View>
        );
        return result;
    }

    getNumberItems = (_numberItems) => {
        var result = [];
        console.log(':: Number items ', _numberItems);
        result.push(
            <View style={{ marginTop: 5, marginLeft: 5, flexDirection: 'row', marginBottom: 5 }}>
                <Text style={{ fontSize: 10 }}>Número de productos Vendidos:</Text>
                <Text style={{ fontSize: 10, fontWeight: 'bold' }} >{' ['}</Text>
                {_numberItems.map((item, index) =>
                    this.getNumber(item, index))}
                <Text style={{ fontSize: 10, fontWeight: 'bold' }} >{' ]'}</Text>
            </View>
        );
        return result;
    }

    getNumber = (_numberItem, _index) => {
        var result;
        if (_index == 0) {
            result = (<Text style={{ fontSize: 10, fontWeight: 'bold' }} key={_index}>{' ' + _numberItem}</Text>);
        } else {
            result = (<Text style={{ fontSize: 10, fontWeight: 'bold' }} key={_index}>{', ' + _numberItem}</Text>);
        }
        return result;
    }

    getColorBar = (_list) => {
        var result = [];
        var detail = [];
        for (var index = 0; index < _list.length; index++) {
            detail.push(
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 10 }}>{'  ' + _list[index].name}</Text>
                    <View style={{ height: 5, width: 5, backgroundColor: lineColors[index], marginLeft: 15 }} />
                </View>
            );
        }
        result.push(
            <View style={{
                marginTop: 5,
                borderWidth: 0.5,
                borderColor: 'grey',
                marginLeft: 5,
                width: '33%',
                padding: 5,
                borderRadius: 5,
                backgroundColor: '#FDFDFD',
                marginBottom: 5,
            }}>
                {detail}
            </View>
        );
        return result;
    }

    getDataSets = (_list) => {
        var result = [];
        var dataSet = [];
        for (var index = 0; index < _list.length; index++) {
            dataSet.push(_list[index].ammountIncome);
        }
        result.push(dataSet);
        return result;
    }

    getData = (_datasets, _labels) => {
        var dataset = [];
        for (var index = 0; index < _datasets[CONSTANTS.ZERO].length; index++) {
            const color = lineColors[index];
            dataset.push({
                data: _datasets[CONSTANTS.ZERO][index],
                strokeWidth: 3,
                color: () => color,
            });
        }
        var result = {
            color: (opacity = 1) => `rgba(190, 14, 27, ${opacity})`,
            labels: _labels,
            datasets: dataset,
        };
        return result;
    }

    getLineChartComponent = (_data, _suffix, _width) => {
        return (
            <LineChart
                style={{
                    borderWidth: 0.5,
                    borderRadius: 5,
                    borderColor: '#5c5c59',
                    width: (_width + 1),
                }}
                data={_data}
                width={_width}
                height={220}
                yAxisLabel="$"
                yAxisSuffix={_suffix}
                chartConfig={{
                    backgroundColor: "#FDFDFD",
                    backgroundGradientFrom: "#FDFDFD",
                    backgroundGradientTo: "#FDFDFD",
                    color: (opacity = 1) => `rgba(190, 14, 27, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(36, 36, 35, ${opacity})`,
                    strokeWidth: 0.5,
                    barPercentage: 0.5,
                    propsForDots: {
                        r: "4",
                        strokeWidth: "1",
                        stroke: "#ffa726"
                    },
                    propsForLabels: {
                        fontSize: 8,
                    },
                }} />
        );
    }

    chunkArray = (myArray, chunk_size) => {
        let results = [];
        while (myArray.length) {
            results.push(myArray.splice(CONSTANTS.ZERO, chunk_size))
        }
        return results;
    }

    getDataSales = (_sales) => {
        var result = [];
        for (var index = 0; index < _sales.length; index++) {
            result.push(
                _sales[index].amount
            );
        }
        return result;
    }

    isValidInput = () => {
        return ((this.state.branchId !== null || this.state.product !== '') &&
            (this.state.year !== null || this.state.month !== null));
    }

    getRequestSales = () => {
        var request = {
            idBranch: this.state.branchId,
            product: this.state.product,
            year: this.state.year,
            month: this.state.month,
        };
        return request;
    }


    showStatistics = async () => {
        const response = await ApiCaller.callApi(
            "/calpullix/statistics/retrieve", this.getRequestSales(), CONSTANTS.STATISTICS_PORT,
            CONSTANTS.POST_METHOD)
            .catch((error) => {
                console.log(error);
            });
        NavigatorCommons.navigateTo(this.props.navigation, "Statistics",
            { 'responseApi': response });
    }

    render() {
        return (
            <BackgroundScrollCalpulliX addHeight={1700}>
                <NavigationEvents
                    onWillFocus={() => {
                        this.cleanInput();
                    }} />
                <HeaderCalpulliXBack
                    navigation={this.props.navigation}
                    backButton={false}
                    title={'Detalle de Ventas'} />
                <View style={{ marginTop: 0 }}>
                    <Text
                        id='errorMessageSales'
                        style={[stylesCommon.errorMessage, { marginTop: 0 }]}>
                        {this.state.errorMessage}
                    </Text>
                    <PickerCalpulliX
                        data={this.state.branches}
                        updateState={this.updateState}
                        placeholder={'Seleccione la sucursal'}
                        functionClearPicker={this.setFunctionClearPickerBranches}  />


                    <View style={{ marginTop: 5 }}>
                        <View style={[styles.autocompleteContainer]} >
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
                        title={'Buscar'}
                        id={'buttonSales'}
                        arrayColors={['#05AAAB', '#048585', '#048585']}
                        onPress={() => this.findSales()}
                        width={'30%'}
                        height={38}
                        marginTop={10}
                        marginBottom={10} />

                    {this.state.salesInformation}
                    {this.state.barChart}
                    {this.state.lineChart}

                </View>
            </BackgroundScrollCalpulliX >
        );
    }
}