import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity, Alert, Dimensions } from 'react-native';
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import { NavigationEvents } from 'react-navigation';
import HeaderCalpulliXBack from '../common/HeaderCalpulliXBack';
import PickerCalpulliX from '../common/PickerCalpulliX';
import ButtonCalpulliX from '../common/ButtonCalpulliX';
import stylesCommon from '../common/style';
import CommonAPI from '../api/CommonAPI';
import Autocomplete from 'react-native-autocomplete-input';
import styles from './styles';
import ApiCaller from '../api/ApiCaller';
import CONSTANTS from '../common/Constants';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";


var functionClearPickerBranches;
var functionClearPickerYears;
var functionClearPickerMonths;
const opacity = 1;
const lineColors = [`rgba(233, 251, 88, ${opacity})`, `rgba(34, 151, 238, ${opacity})`, 
`rgba(4, 133, 133, ${opacity})`, `rgba(118, 12, 19, ${opacity})`, `rgba(178, 87, 151, ${opacity})`];

export default class Sales extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
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
        this.setState({
            branches: result,
        });
    }

    cleanInput = () => {
        if (this.props.navigation.state.params && this.props.navigation.state.params.navigateFromMenu) {
            functionClearPickerBranches();
            functionClearPickerYears();
            functionClearPickerMonths();
            this.getBranchList();
            this.setState({
                branchId: null,
                year: null,
                month: null,
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
                var content = [];
                var detail = [];
                detail.push(
                    <View style={{
                        backgroundColor: '#EDEDED', width: '100%', borderTopLeftRadius: 5,
                        borderTopRightRadius: 10,
                    }} >
                        <Text style={{ fontSize: 11, }} >{'\n' + '  Artículos vendidos' + ' \n'}</Text>
                        <Text style={{ fontSize: 11, }} >{'  ' + response.totalAmountSoldOut + ', ' + response.totalAmountItemsSoldOut + '\n'}</Text>
                    </View>);
                detail.push(
                    <View style={{
                        backgroundColor: '#F3F9FA', width: '100%',
                    }} >
                        <Text style={{ fontSize: 11, }} >{'\n' + '  Monto ganancias' + ' \n'}</Text>
                        <Text style={{ fontSize: 11, }} >{'  ' + response.totalAmonuntSales + '\n'}</Text>
                    </View>);
                detail.push(
                    <View style={{
                        backgroundColor: '#EDEDED', width: '100%'
                    }} >
                        <Text style={{ fontSize: 11, }} >{'\n' + '  Monto insumos' + ' \n'}</Text>
                        <Text style={{ fontSize: 11, }} >{'  ' + response.totalAmountSupplies + '\n'}</Text>
                    </View>
                );
                detail.push(
                    <View style={{
                        backgroundColor: '#F3F9FA', width: '100%'
                    }} >
                        <Text style={{ fontSize: 11, }} >{'\n' + '  Monto perdidas' + ' \n'}</Text>
                        <Text style={{ fontSize: 11, }} >{'  ' + response.tmountLosses + '\n'}</Text>
                    </View>
                );
                detail.push(
                    <View style={{
                        backgroundColor: '#EDEDED', width: '100%'
                    }} >
                        <Text style={{ fontSize: 11, }} >{'\n' + '  Monto merma' + ' \n'}</Text>
                        <Text style={{ fontSize: 11, }} >{'  ' + response.totalAmmountCaducousPurchasePrice + ' (Compra), ' +
                            response.totalAmmountCaducousSalePrice + ' (Venta) \n'}</Text>
                    </View>
                );
                detail.push(
                    <View style={{
                        backgroundColor: '#F3F9FA', width: '100%'
                    }} >
                        <Text style={{ fontSize: 11, }} >{'\n' + '  Monto aparadores' + ' \n'}</Text>
                        <Text style={{ fontSize: 11, }} >{'  ' + response.totalAmmountStoredPurchasePrice + ' (Compra), ' +
                            response.totalAmmountStoredSalePrice + '(Venta) \n'}</Text>
                    </View>
                );
                detail.push(
                    <View style={{
                        backgroundColor: '#EDEDED', width: '100%'
                    }} >
                        <Text style={{ fontSize: 11, }} >{'\n' + '  Monto robo o extravío' + ' \n'}</Text>
                        <Text style={{ fontSize: 11, }} >{'  ' + response.totalAmmountStolePurchasePrice + ' (Compra), ' +
                            response.totalAmmountStoleSalePrice + '(Venta) \n'}</Text>
                    </View>
                );
                detail.push(
                    <View style={{
                        backgroundColor: '#F3F9FA', width: '100%',
                        borderBottomLeftRadius: 5, borderBottomRightRadius: 5
                    }}>
                        <Text style={{ fontSize: 11, }} >{'\n' + '  Artículos en aparador' + ' \n'}</Text>
                        <Text style={{ fontSize: 11, }} >{'  ' + response.totalAmmountSideboardPurchasePrice + ' (Compra), '
                            + response.totalAmmountSideboardSalePrice + ' (Venta) \n'}</Text>
                    </View>);
                content.push(
                    <View style={{
                        marginTop: 10, borderWidth: 0.8, borderColor: '#F49315',
                        width: '90%', marginLeft: 'auto', marginRight: 'auto', borderRadius: 5
                    }}>
                        {detail}
                    </View>);

                const width = Dimensions.get("window").width - 10;
                const suffix = response.suffix;
                var barChart = [];
                var barChartDetail = [];
                var axis;
                var axisSecond = [];
                var isYear = false;
                var dataSales;
                var dateSalesSecond;

                if (this.state.month !== null && this.state.month !== 2) {
                    axis = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5'];
                    dataSales = this.getDataSales(response.monthlySales);
                } else if (this.state.month !== null && this.state.month === 2) {
                    axis = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];
                    dataSales = this.getDataSales(response.monthlySales);
                } else {
                    isYear = true;
                    axis = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];
                    axisSecond = ['Julio', 'Agosto', 'Septiembre', 'Octubre', 'Nov', 'Dic'];
                    var chunks = this.chunkArray(response.yearlySales, response.yearlySales.length / 2);
                    dataSales = this.getDataSales(chunks[0]);
                    dateSalesSecond = this.getDataSales(chunks[1]);
                }

                barChartDetail.push(
                    <BarChart
                        style={{
                            marginVertical: 8,
                            borderRadius: 5,
                            borderWidth: 0.5,
                            borderColor: '#5c5c59',
                            width: (width + 1),
                        }}
                        data={{
                            labels: axis,
                            datasets: [
                                {
                                    data: dataSales,
                                }
                            ]
                        }}
                        width={width}
                        height={250}
                        yAxisLabel="$"
                        yAxisSuffix={suffix}

                        chartConfig={{
                            backgroundColor: "#FDFDFD",
                            backgroundGradientFrom: "#FDFDFD",
                            backgroundGradientTo: "#FDFDFD",
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(190, 14, 27, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(36, 36, 35, ${opacity})`,
                            style: {
                                borderRadius: 8,
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726",
                            },
                            propsForLabels: {
                                fontSize: 8,
                            },
                        }} />
                );
                if (isYear) {
                    barChartDetail.push(<BarChart
                        style={{
                            marginVertical: 8,
                            borderRadius: 5,
                            borderWidth: 0.5,
                            borderColor: '#5c5c59',
                            width: (width + 1),
                        }}
                        data={{
                            labels: axisSecond,
                            datasets: [
                                {
                                    data: dateSalesSecond
                                }
                            ]
                        }}
                        width={width}
                        height={250}
                        yAxisLabel="$"
                        yAxisSuffix={suffix}
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
                barChart.push(
                    <View style={{ marginTop: 15, marginLeft: 5, }}>
                        <Text style={{ fontSize: 12 }}>Ventas del periodo:</Text>
                        {barChartDetail}
                    </View>
                );

                var lineChart = this.getLineChart(response);
                this.setState({ barChart: barChart, salesInformation: content, lineChart: lineChart });
            }
        } else {
            Alert.alert('La sucursal o el producto y el año o el mes son requeridos');
        }
    }

    getLineChart = (_salesInformation) => {
        console.log('******************************************** SALES INFORMATION ', _salesInformation);
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
            labels = ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
        }
        var dataSets = this.getDataSets(_salesInformation.bestProduct);
        var dataSetsWorst = this.getDataSets(_salesInformation.worstProduct);
        console.log('******************************************** DATA SETS ', dataSets[0][0]);

        var data = this.getData(dataSets, labels);
        var dataWorst = this.getData(dataSetsWorst, labels);
        console.log(':::::::::::::::::::::::::::::::: DATA ', data, dataWorst);
        result.push(
            <View style={{ marginTop: 15, marginLeft: 5, }}>
                <Text style={{ fontSize: 12 }}>Top 5 productos:</Text>
                {this.getLineChart(data, _salesInformation.suffixBest)}
                <Text style={{ fontSize: 12 }}>Top-Down 5 productos:</Text>
                {this.getLineChart(dataWorst, _salesInformation.suffixWorst)}
            </View>
        );
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
        for (var index = 0; index < _datasets.length; index++) {
            dataset.push({
                data: dataSets[CONSTANTS.ZERO][index],
                strokeWidth: 3,
                color: () => lineColors[index],
            });
        }
        var result = {
            color: (opacity = 1) => `rgba(190, 14, 27, ${opacity})`,
            labels: _labels,
            datasets: [dataset],
        };
        return result;
    }

    getLineChart = (_data, _suffix) => {
        return (
            <LineChart
            style={{
                marginLeft: 5,
                borderWidth: 0.5,
                borderRadius: 5,
                borderColor: '#5c5c59',
                width: (width + 1),
            }}
            data={_data}
            width={width}
            height={220}
            yAxisLabel="$"
            yAxisSuffix={_suffix}
            chartConfig={{
                backgroundColor: "#FDFDFD",
                backgroundGradientFrom: "#FDFDFD",
                backgroundGradientTo: "#FDFDFD",
                color: (opacity = 1) => `rgba(190, 14, 27, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(36, 36, 35, ${opacity})`,
                strokeWidth: 2, 
                barPercentage: 0.5,
                propsForDots: {
                    r: "5",
                    strokeWidth: "1",
                    stroke: "#ffa726"
                },
                propsForLabels: {
                    fontSize: 8,
                },
              }}/>
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



    render() {
        const width = Dimensions.get("window").width - 10;
        return (
            <BackgroundScrollCalpulliX addHeight={900}>
                <NavigationEvents
                    onWillFocus={() => {
                        this.cleanInput();
                    }} />
                <HeaderCalpulliXBack
                    navigation={this.props.navigation}
                    backButton={false}
                    title={'Resumen de Ventas'} />
                <View style={{ marginTop: 5 }}>

                    <PickerCalpulliX
                        data={this.state.branches}
                        updateState={this.updateState}
                        placeholder={'Seleccione la sucursal'}
                        functionClearPicker={this.setFunctionClearPickerBranches} />

                    <View style={{ marginTop: 5 }}>
                        <View style={[styles.autocompleteContainer]} >
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
                        title={'Buscar Ventas'}
                        id={'buttonSales'}
                        arrayColors={['#05AAAB', '#048585', '#048585']}
                        onPress={() => this.findSales()}
                        width={'35%'}
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