import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity, Alert, Dimensions, Image } from 'react-native';
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import { NavigationEvents } from 'react-navigation';
import HeaderCalpulliXBack from '../common/HeaderCalpulliXBack';
import CONSTANTS from '../common/Constants';
import CalpulliXTable from '../common/CalpulliXTable';

export default class Statistics extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            statistics: [],
        }
    }

    buildStatisticsView = () => {
        var statisticsView = [];
        const responseApi = this.props.navigation.state.params.responseApi;
        console.log(':: RESPONSE API ', responseApi);
        statisticsView.push(this.getLabels(responseApi));
        statisticsView.push(this.getBloxPlotCategiricalVariables(responseApi));
        statisticsView.push(this.getCommonStatisticsTable(responseApi));
        statisticsView.push(this.getGroupByVariablesTable(responseApi));
        statisticsView.push(this.getHeatMapGraphic(responseApi));
        statisticsView.push(this.getCorrelationCausationTable(responseApi));
        statisticsView.push(this.getAnovaDetail(responseApi));
        this.setState({
            statistics: statisticsView,
        });
    }

    getLabels = (_responseApi) => {
        var result = [];
        var detail = [];
        if (_responseApi.idProduct !== null) {
            detail.push(
                <Text style={{ fontSize: 11 }} >
                    {"Id de producto: "}
                    <Text style={{ fontWeight: 'bold' }} >{_responseApi.idProduct}</Text>
                </Text>
            );
            detail.push(
                <Text style={{ fontSize: 11, marginTop: 5 }} >
                    {"Nombre del producto: "}
                    <Text style={{ fontWeight: 'bold' }} >{_responseApi.name}</Text>
                </Text>
            );
        }
        if (_responseApi.branch !== null) {
            detail.push(
                <Text style={{ fontSize: 11, marginTop: 5 }} >
                    {"Sucursal: "}
                    <Text style={{ fontWeight: 'bold' }} >{_responseApi.branch}</Text>
                </Text>
            );
        }
        result.push(
            <View style={{ marginLeft: '5%' }}>
                {detail}
            </View>
        );
        return result;
    }

    getBloxPlotCategiricalVariables = (_responseApi) => {
        var result = [];
        var base64Image;
        for (var index = 0; index < _responseApi.boxPlot.length; index++) {
            base64Image = CONSTANTS.PREFIX_BASE64 + _responseApi.boxPlot[index].boxPlot;
            result.push(
            <Text style={{ fontSize: 10, marginTop: 10, marginLeft: '5%', fontWeight: 'bold' }} >
                {_responseApi.boxPlot[index].headerDetail}
            </Text>);
            result.push(
                <Image
                    style={{
                        height: 200,
                        width: '90%',
                        borderWidth: 1,
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

    getCommonStatisticsTable = (_responseApi) => {
        var result = [];
        result.push(
            <Text style={{ fontSize: 10, marginTop: 15, marginLeft: '5%', fontWeight: 'bold' }} >
                {_responseApi.labelStatisticsTable}
            </Text>
        );
        result.push(
            <CalpulliXTable
                    headers={_responseApi.headersStatistics}
                    data={_responseApi.rowsStatistics}
                    marginTop={5}
                    textStyle={{
                        margin: 5,
                        fontSize: 10,
                     }} />
        );
        return result;
    }

    getGroupByVariablesTable = (_responseApi) => {
        var result = [];
        result.push(
            <Text style={{ fontSize: 10, marginTop: 15, marginLeft: '5%', fontWeight: 'bold' }} >
                {_responseApi.labelGroupByTable}
            </Text>
        );
        result.push(
            <CalpulliXTable
                    headers={_responseApi.headersGroupBy}
                    data={_responseApi.rowsGroupBy}
                    marginTop={5}
                    textStyle={{
                        margin: 5,
                        fontSize: 10,
                     }} />
        );
        return result;
    }

    getHeatMapGraphic = (_responseApi) => {
        var result = [];
        const base64Image = CONSTANTS.PREFIX_BASE64 + _responseApi.heatMap;
        result.push(
        <Text style={{ fontSize: 10, marginTop: 10, marginLeft: '5%', fontWeight: 'bold' }} >
            {_responseApi.labelHeatMap}
        </Text>);
        result.push(
            <Image
                style={{
                    height: 200,
                    width: '90%',
                    borderWidth: 1,
                    borderColor: '#746F6F',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 5,
                    borderRadius: 3,
                }}
                source={{ uri: base64Image }} />
        );
        return result;
    }

    getCorrelationCausationTable = (_responseApi) => {
        var result = [];
        result.push(
            <Text style={{ fontSize: 10, marginTop: 15, marginLeft: '5%', fontWeight: 'bold' }} >
                {_responseApi.labelCausationCorrelation}
            </Text>
        );
        result.push(
            <CalpulliXTable
                    headers={_responseApi.headersCorrelationCausation}
                    data={_responseApi.rowsCorrelationCausation}
                    marginTop={5}
                    textStyle={{
                        margin: 5,
                        fontSize: 10,
                     }} />
        );
        return result;
    }

    getAnovaDetail = (_responseApi) => {
        var result = [];
        var detail = [];
        detail.push(
            <Text style={{ fontSize: 11, fontWeight: 'bold', marginTop: 5 }} >
                ANOVA Analísis:
            </Text>
        );
        for (var index = 0; index < _responseApi.anovaDetail.length; index++) {
            detail.push(
                <Text style={{ fontSize: 11, marginTop: 5, fontWeight: 'bold' }} >
                    {_responseApi.anovaDetail[index].nameVariable}
                </Text>
            );
            detail.push(
                <Text style={{ fontSize: 10, fontWeight: 'normal' }} >
                    {'F-Test-Score: '}
                    <Text style={{ fontWeight: 'bold' }} >{_responseApi.anovaDetail[index].ftestScore}</Text>
                </Text>
            );
            detail.push(
                <Text style={{ fontSize: 10, fontWeight: 'normal' }} >
                    {'P-Value: '}
                    <Text style={{ fontWeight: 'bold' }} >{_responseApi.anovaDetail[index].pvalue}</Text>
                </Text>
            );
        }
        result.push(
            <View style={{ marginLeft: 'auto', marginRight: 'auto', width: '90%', borderRadius: 5,
                           borderWidth: 1, borderColor: '#9ADDDF', backgroundColor: '#FDFDFD', marginTop: 15,
                           paddingLeft: 10, paddingBottom: 10, }}>
                {detail}
            </View>
        );
        return result;
    }

    cleanInput = () => {
        if (this.props.navigation && this.props.navigation.state.params.responseApi) {
            this.buildStatisticsView();
        }
    }

    render() {
        return (
            <BackgroundScrollCalpulliX addHeight={1250}>
                <NavigationEvents
                    onWillFocus={() => {
                        this.cleanInput();
                    }} />
                <HeaderCalpulliXBack
                    navigation={this.props.navigation}
                    backButton={true}
                    screen={'Sales'}
                    title={'Estadísticas Descriptivas'} />
                <View style={{ marginTop: 10 }}>
                    {this.state.statistics}
                </View>
            </BackgroundScrollCalpulliX>
        );
    }

}