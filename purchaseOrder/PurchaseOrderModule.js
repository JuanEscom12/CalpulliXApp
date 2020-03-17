import React, { PureComponent } from 'react';
import { Text, View, Alert } from 'react-native';
import stylesCommon from '../common/style';
import { NavigationEvents } from 'react-navigation';
import AccordionCalpulliX from '../common/AccordionCalpulliX';
import PickerCalpulliX from '../common/PickerCalpulliX';
import ButtonCalpulliX from '../common/ButtonCalpulliX';
import Paginator from 'react-native-paginator';
import DatePicker from 'react-native-datepicker'
import ApiCaller from '../api/ApiCaller';
import CommonAPI from '../api/CommonAPI';
import CONSTANTS from '../common/Constants';



var functionClearPicker;
var functionClearPickerStatus;
const initDate = '2000-01-01';
const labels = ['Nombre', 'Fecha', 'Descripcion orden de compra', 'Sucursal', 'Cantidad de productos en almacen',
    'Cantidad de productos en anaqueles', 'Estatus de la orden de compra'];

export default class PurchaseOrderModule extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: "",
            quantityItems: "",
            purchaseOrderList: [],
            branches: [],
            purchaseOrderStatus: [],
            purchaseOrderListApi: null,
            branchId: null,
            idStatus: null,
            page: 1,
            itemsPerPage: 5,
            itemCount: 0,
            date: initDate,
            endDate: initDate,
        };
        this.getBranchList();
        this.getPurchaseOrderStatus();
        this.getPurchaseOrderList(CONSTANTS.ONE);
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
        }
    }

    getPurchaseOrderStatus = async () => {
        const result = await ApiCaller.callApi('/calpullix/purchaseorder/status/retrieve',
            {}, CONSTANTS.PORT_PURCHASE_ORDER, CONSTANTS.POST_METHOD)
            .catch((error) => {
                console.log(error);
                this.setState({
                    errorMessage: 'Ocurrio un error, favor de intentar mas tarde.',
                });
            });
        console.log(':: Result API Purchase Order Status ', result);
        if (result.purchaseOrderStatus.length > CONSTANTS.ZERO) {
            this.setState({
                purchaseOrderStatus: result.purchaseOrderStatus,
            });
        } else {
            this.setState({
                errorMessage: 'Ocurrio un error, favor de intentar mas tarde.',
            });
        }
    }


    getPurchaseOrderFilters = () => {
        if (this.isValidInput()) {
            this.getPurchaseOrderList(CONSTANTS.ONE);
        } else {
            this.setState({
                errorMessage: 'Selecciona valores validos de busqueda.',
            });
        }
    }

    isValidInput = () => {
        if (this.state.branchId == null && 
            this.state.idStatus == null && 
            this.areInitialDates()) {
            return true;
        }
        if ((this.state.branchId !== null && this.areValidDatesAndStatus()) ||
            (this.state.branchId !== null && this.areInitialDates() || this.areValidDatesAndStatus()) ||
            (this.state.branchId == null && this.areValidDatesAndStatus()) ||
            (this.state.branchId !== null && this.areInitialDates()) ||
            (this.state.idStatus !== null && this.areInitialDates())) {
            result = true;
        } else {
            result = false;
        }
        return result;
    }

    areInitialDates  = () => {
        
        return this.state.date == initDate && this.state.endDate == initDate;
    }
    
    areValidDatesAndStatus = () => {
        var split = this.state.date.split("-");
        var month = parseInt(split[1], 10) - CONSTANTS.ONE;
        var firstDate = new Date(split[0], month, split[2]);
        split = this.state.endDate.split("-");
        month = parseInt(split[1], 10) - CONSTANTS.ONE;
        var endDate = new Date(split[0], month, split[2]);
        var today = new Date();
        
        return firstDate.getTime() <= endDate.getTime() &&
                endDate.getTime() <= today.getTime() && this.state.idStatus !== null;
    }

    getPurchaseOrderList = async (_numberPage) => {
        const result = await ApiCaller.callApi('/calpullix/retrieve/purchaseorder',
            this.getPurchaseOrderRequest(_numberPage),
            CONSTANTS.PORT_PURCHASE_ORDER, CONSTANTS.POST_METHOD)
            .catch((error) => {
                console.log(error);
                this.setState({
                    errorMessage: 'Ocurrio un error, favor de intentar mas tarde.',
                });
            });
        console.log(':: Result API Purchase Order ', result);
        if (result.purchaseOrder && result.purchaseOrder.length > CONSTANTS.ZERO) {
            this.setState({
                purchaseOrderListApi: result.purchaseOrder,
                itemCount: result.totalRows,
                errorMessage: '',
            });
            this.addItemsPurchaseOrderList(result.purchaseOrder);
        } else if (result.purchaseOrder === undefined) {
            this.setState({
                purchaseOrderListApi: [],
                purchaseOrderList: [],
                itemCount: 0,
                errorMessage: 'Ocurrio un error, favor de intentar mas tarde.',
            });
        } else if (result.purchaseOrder == null) {
            this.setState({
                purchaseOrderListApi: [],
                purchaseOrderList: [],
                itemCount: 0,
                errorMessage: 'No se encontraron resultados',
            });
        }
    }

    getPurchaseOrderRequest(_numberPage) {
        var date = null;
        var endDate = null;
        if (this.state.date !== initDate  || 
            this.state.endDate !== initDate) {
            date = this.state.date;
            endDate = this.state.endDate;
        }
        const request = {
            "branchId": this.state.branchId !== null ? this.state.branchId.id : null,
            "date": date,
            "endDate": endDate,
            "purchaseOrderStatus": this.state.idStatus !== null ? this.state.idStatus.id: null,
            "page": _numberPage
        };
        return request;
    }

    addItemsPurchaseOrderList(purchaseOrderListApi) {
        var fields = [];
        for (let i = 0; i < purchaseOrderListApi.length; i++) {
            var item = [];
            item.push(purchaseOrderListApi[i].idPurchaseOrder);
            item.push(purchaseOrderListApi[i].name);
            item.push(purchaseOrderListApi[i].date);
            item.push(purchaseOrderListApi[i].description);
            item.push(purchaseOrderListApi[i].branchName);
            item.push(purchaseOrderListApi[i].numberStockProducts);
            item.push(purchaseOrderListApi[i].numberShelfProducts);
            item.push(purchaseOrderListApi[i].status);
            item.push(purchaseOrderListApi[i].totalRows);
            item.push(purchaseOrderListApi[i].enabled);
            item.push(purchaseOrderListApi[i].index);
            fields.push(item);
        }
        this.setState({
            purchaseOrderList: fields,
        });
    }

    handlerPagination = (numberPage) => {
        this.setState({
            page: numberPage,
        });
        this.getPurchaseOrderList(numberPage);
    }

    cleanInput = () => {
        if (this.props.parentProps.navigation.state.params && 
            this.props.parentProps.navigation.state.params.navigateFromMenu) {
            functionClearPicker();
            functionClearPickerStatus();
            this.setState({
                purchaseOrderList: [],
                branchId: null,
                idStatus: null,
                date: initDate,
                endDate: initDate,
            });
            this.getPurchaseOrderList(CONSTANTS.ONE);
            this.props.parentProps.navigation.state.params.navigateFromMenu = false;
        }
    }

    updateState = (_value) => {
        this.setState({
            branchId: _value
        })
    }

    updateStateStatus = (_value) => {
        this.setState({
            idStatus: _value
        })
    }

    setFunctionClearPicker = (_clear) => {
        functionClearPicker = _clear;
    }

    setFunctionClearPickerStatus = (_clear) => {
        functionClearPickerStatus = _clear;
    }



    render() {
        return (
            <View style={{ marginTop: 5 }}>
                <NavigationEvents
                    onWillFocus={() => {
                        this.cleanInput();
                    }} />
                <Text
                    id='errorMessagePurchaseOrder'
                    style={[stylesCommon.errorMessage, { marginTop: 5 }]}>
                    {this.state.errorMessage}
                </Text>
                <Text style={[stylesCommon.labelText,
                { marginTop: 5, marginRight: '70%', fontSize: 13 }]}>
                    Sucursales
                    </Text>
                <PickerCalpulliX
                    data={this.state.branches}
                    updateState={this.updateState}
                    placeholder={'Seleccione la sucursal'}
                    functionClearPicker={this.setFunctionClearPicker} />
                <Text style={[stylesCommon.labelText,
                { marginTop: 5, marginRight: '48%', fontSize: 13 }]}>
                    Estatus orden de compra.
                    </Text>
                <PickerCalpulliX
                    data={this.state.purchaseOrderStatus}
                    updateState={this.updateStateStatus}
                    placeholder={'Seleccione un estatus'}
                    functionClearPicker={this.setFunctionClearPickerStatus} />
                <View style={{ flexDirection: 'row', }}>
                    <DatePicker
                        style={{ width: 160, marginTop: 20, }}
                        date={this.state.date}
                        mode="date"
                        placeholder="Select date"
                        format="YYYY-MM-DD"
                        minDate="1970-01-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                marginTop: 12,
                                position: 'absolute',
                                left: 0,
                                top: 9,
                                marginLeft: 53,
                                width: 20,
                                height: 20
                            },
                            dateInput: {
                                marginTop: 20,
                                marginLeft: 55,
                                borderRadius: 5,
                                borderWidth: 0.5,
                                borderColor: '#F49315',
                                backgroundColor: '#FDFDFD',
                            }
                        }}
                        onDateChange={(date) => { this.setState({ date: date }) }} />
                    <DatePicker
                        style={{ width: 160, marginTop: 20, }}
                        date={this.state.endDate}
                        mode="date"
                        placeholder="Select date"
                        format="YYYY-MM-DD"
                        minDate="1970-01-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                marginTop: 12,
                                position: 'absolute',
                                left: 0,
                                top: 9,
                                marginLeft: 53,
                                width: 20,
                                height: 20
                            },
                            dateInput: {
                                marginTop: 20,
                                marginLeft: 55,
                                borderRadius: 5,
                                borderWidth: 0.5,
                                borderColor: '#F49315',
                                backgroundColor: '#FDFDFD',
                            }
                        }}
                        onDateChange={(date) => { this.setState({ endDate: date }) }} />
                </View>

                <ButtonCalpulliX
                    title={'Buscar'}
                    id={'buttonSearchPurchaseOrder'}
                    arrayColors={['#05AAAB', '#048585', '#048585']}
                    onPress={this.getPurchaseOrderFilters}
                    width={'30%'}
                    height={40}
                    marginTop={20}
                    marginBottom={0} />

                <AccordionCalpulliX
                    content={this.state.purchaseOrderList}
                    labels={labels}
                    port={CONSTANTS.PORT_PURCHASE_ORDER}
                    navigation={this.props.parentProps.navigation}
                    renderDetailButton={true}
                    renderInputText={true}
                    titleButton={'Ver detalle'}
                    margintTop={10}
                    labelHeader={'Id de la orden de compra  '}
                    marginLeftRowHeader={'35%'}
                    path={'/calpullix/retrieve/purchaseorder/detail'}
                    screen={'PurchaseOrderDetail'}
                />
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
        );
    }
}