import React, { Component } from 'react';
import { View, Text, Alert } from "react-native";
import ButtonCalpulliX from '../common/ButtonCalpulliX';
import PickerCalpulliX from '../common/PickerCalpulliX';
import { NavigationEvents } from 'react-navigation';
import CommonAPI from '../api/CommonAPI';

var functionClearPicker;
var functionClearPickerYears;
var functionClearPickerMonths;

export default class OfficesForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            branches: [],
            borderColorTextInput: "#F49315",
            backgroundColorUserInput: '#FDFDFD',
            year: null,
            month: null,
            officeNameText: '',
            branchId: null,
            years: this.getYears(),
            months: this.getMonths(),
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

    handleOnFocus = () => {
        this.setState({
            borderColorTextInput: '#05AB50',
            backgroundColorUserInput: '#C1D9CC'
        })
    }

    handleOnBlur = () => {
        this.setState({
            borderColorTextInput: '#F49315',
            backgroundColorUserInput: '#FDFDFD'
        })
    }


    setFunctionClearPickerYears = (_clear) => {
        functionClearPickerYears = _clear;
    }

    setFunctionClearPicker = (_clear) => {
        functionClearPicker = _clear;
    }

    setFunctionClearPickerMonths = (_clear) => {
        functionClearPickerMonths = _clear;
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

    updateState = (_value) => {
        if (_value) {
            this.setState({
                branchId: _value.id,
            });
            this.props.setBranchId(_value.id);
        } else {
            this.setState({
                branchId: null,
            });
            this.props.setBranchId(null);
        }
        
    }

    updateYear = (_value) => {
        if (_value) {
            this.setState({
                year: _value.id
            });
            this.props.setYear(_value.id);
        } else {
            this.setState({
                year: null,
            });
            this.props.setYear(null);
        }
        
    }

    updateMonth = (_value) => {
        if (_value) {
            this.setState({
                month: _value.id
            });
            this.props.setMonth(_value.id);
        } else {
            this.setState({
                month: null,
            });
            this.props.setMonth(null);
        }
       
    }

    cleanInput = () => {
        if (this.props.navigationParent.state.params &&
            this.props.navigationParent.state.params.navigateFromMenu) {
            functionClearPicker();
            functionClearPickerYears();
            functionClearPickerMonths();
            this.updateYear(null);
            this.updateMonth(null);
            this.updateState(null);
            this.getBranchList();
            this.props.navigationParent.state.params.navigateFromMenu = false;
        }
    }

    searchBranches = () => {
        if (this.isInputValid()) {
            this.props.doSearch(this.getSearchBranchRequest());
        } else {
            Alert.alert("El año es requerido.");
        }
    }

    isInputValid = () => {
        var result;
        if (this.state.year !== null) {
            result = true;
        } else {
            result = false;
        }
        return result;
    }

    getSearchBranchRequest() {
        const request = {
            "id": this.state.branchId,
            "year": this.state.year,
            "month": this.state.month,
            "page": this.props.page
        };
        return request;
    }

    render() {
        return (
            <View>
                <NavigationEvents onWillFocus={() => {
                    this.cleanInput();
                }} />
                <View style={{ marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ marginLeft: '5%', fontSize: 13 }}>
                            Año
                        </Text>
                        <Text style={{ marginLeft: '45%', fontSize: 13 }}>
                            Mes
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View
                            style={{ marginLeft: '2.5%', width: '44%', }} >
                            <PickerCalpulliX
                                data={this.state.years}
                                updateState={this.updateYear}
                                placeholder={'Seleccione el año'}
                                functionClearPicker={this.setFunctionClearPickerYears} />
                        </View>
                        <View style={{ marginLeft: '6%', width: '44%', }} >
                            <PickerCalpulliX
                                data={this.state.months}
                                updateState={this.updateMonth}
                                placeholder={'Seleccione el mes'}
                                functionClearPicker={this.setFunctionClearPickerMonths} />
                        </View>
                    </View>
                    <View >
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Text style={{ marginLeft: '5%', fontSize: 13 }} >
                                Sucursal
                            </Text>
                        </View>

                        <PickerCalpulliX
                            data={this.state.branches}
                            updateState={this.updateState}
                            placeholder={'Seleccione la sucursal'}
                            functionClearPicker={this.setFunctionClearPicker} />


                        <View style={{ flexDirection: 'row', height: 70 }} >
                            <ButtonCalpulliX
                                title={'Buscar'}
                                id={'buttonSearch'}
                                arrayColors={['#05AAAB', '#048585', '#048585']}
                                onPress={this.searchBranches}
                                width={'35%'}
                                height={45}
                                marginTop={20}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}