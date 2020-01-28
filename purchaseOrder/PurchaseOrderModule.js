import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
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
const initDate = '2000-01-01';
const labels = ['Nombre', 'Descripcion', 'Sucursal', 'Numero de productos en almacen',
    'Numero de productos en anaqueles', 'Cantidad'];

export default class PurchaseOrderModule extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: "",
            quantityItems: "",
            purchaseOrderList: [],
            branches: [],
            purchaseOrderListApi: null,
            branchId: null,
            page: 1,
            itemsPerPage: 5,
            itemCount: 0,
            date: initDate,
            endDate: initDate,
        };
        this.getBranchList();
        this.getPurchaseOrderList();
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

    getPurchaseOrderFilters = () => {
        if (this.isValidInput()) {
            this.getPurchaseOrderList();
        } else {
            this.setState({
                errorMessage: 'Selecciona valores validos de busqueda.',
            });
        }
    }

    isValidInput = () => {
        return this.state.branchId !== null ||
            (this.state.date !== initDate && this.state.endDate !== initDate);
    }

    getPurchaseOrderList = async () => {
        const result = await ApiCaller.callApi('/calpullix/retrieve/purchaseorder',
            this.getPurchaseOrderRequest(),
            CONSTANTS.PORT_PURCHASE_ORDER, CONSTANTS.POST_METHOD)
            .catch((error) => {
                console.log(error);
                this.setState({
                    errorMessage: 'Ocurrio un error, favor de intentar mas tarde.',
                });
            });
        console.log(':: Result API Purchase Order ', result);
        if (result.purchaseOrder.length > CONSTANTS.ZERO) {
            this.setState({
                purchaseOrderListApi: result.purchaseOrder,
                itemCount: result.purchaseOrder[CONSTANTS.ZERO].totalRows,
                errorMessage: '',
            });
            this.addItemsPurchaseOrderList();
        }
    }

    getPurchaseOrderRequest() {
        var branchId = 0;
        if (this.state.branchId) {
            branchId = this.state.branchId.id;
        }
        var date = '';
        var endDate = '';
        if (this.state.date !== initDate && this.state.endDate !== initDate) {
            date = this.state.date;
            endDate = this.state.endDate;
        }
        const request = {
            "branchId": branchId,
            "page": this.state.page,
            "date": date,
            "endDate": endDate,
        };
        return request;
    }

    addItemsPurchaseOrderList() {
        var fields = [];
        for (let i = 0; i < this.state.purchaseOrderListApi.length; i++) {
            var item = [];
            item.push(this.state.purchaseOrderListApi[i].idProduct);
            item.push(this.state.purchaseOrderListApi[i].name);
            item.push(this.state.purchaseOrderListApi[i].description);
            item.push(this.state.purchaseOrderListApi[i].branchName);
            item.push(this.state.purchaseOrderListApi[i].numberStockProducts);
            item.push(this.state.purchaseOrderListApi[i].numberShelfProducts);
            item.push(this.state.purchaseOrderListApi[i].suggestedNumberItems);
            item.push(this.state.purchaseOrderListApi[i].totalRows);
            item.push(this.state.purchaseOrderListApi[i].enabled);
            item.push(this.state.purchaseOrderListApi[i].index);
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
        this.getPurchaseOrderList();
    }

    cleanInput = () => {
        console.log(':: CLEAN INPUT ', this.props.parentProps.navigation.state.params.navigateFromMenu);
        functionClearPicker();
        this.setState({
            branchId: null,
            date: initDate,
            dateEnd: initDate,
        });
        if (this.props.parentProps.navigation.state.params && this.props.parentProps.navigation.state.params.navigateFromMenu) {
            this.setState({
                purchaseOrderList: [],
            });
            this.getPurchaseOrderList();
            this.props.parentProps.navigation.state.params.navigateFromMenu = false;
        }
    }

    updateState = (_value) => {
        this.setState({
            branchId: _value
        })
    }

    setFunctionClearPicker = (_clear) => {
        functionClearPicker = _clear;
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
                    { marginTop: 5, marginRight: '70%', fontSize: 15 }]}>
                        Sucursales
                    </Text>
                    <PickerCalpulliX
                        data={this.state.branches}
                        updateState={this.updateState}
                        placeholder={'Seleccione la sucursal'}
                        functionClearPicker={this.setFunctionClearPicker} />
                    <View style={{ flexDirection: 'row' }}>
                        <DatePicker
                            style={{ width: 180, margintTop: 20 }}
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
                                    top: 4,
                                    marginLeft: 40,
                                },
                                dateInput: {
                                    marginTop: 20,
                                    marginLeft: 36,
                                    borderRadius: 5,
                                    borderWidth: 0.5,
                                    borderColor: '#F49315',
                                    backgroundColor: '#FDFDFD',
                                }
                            }}
                            onDateChange={(date) => { this.setState({ date: date }) }} />
                        <DatePicker
                            style={{ width: 180, margintTop: 20, }}
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
                                    top: 4,
                                    marginLeft: 40,
                                },
                                dateInput: {
                                    marginTop: 20,
                                    marginLeft: 36,
                                    borderRadius: 5,
                                    borderWidth: 0.5,
                                    borderColor: '#F49315',
                                    backgroundColor: '#FDFDFD',
                                }
                            }}
                            onDateChange={(date) => { this.setState({ dateEnd: date }) }} />
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
                        labelHeader={'Id del producto  '}
                        marginLeftRowHeader={'55%'}
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