import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import { NavigationEvents } from 'react-navigation';
import HeaderCalpulliXBack from '../common/HeaderCalpulliXBack';
import stylesCommon from '../common/style';
import ButtonCalpulliX from '../common/ButtonCalpulliX';
import PickerCalpulliX from '../common/PickerCalpulliX';
import AccordionCalpulliX from '../common/AccordionCalpulliX';
import Paginator from 'react-native-paginator';
import ApiCaller from '../api/ApiCaller';
import CommonAPI from '../api/CommonAPI';
import CONSTANTS from '../common/Constants';

var functionClearPicker;
const labels = ['Id', 'Descripcion', 'Marca', 'Status', 'Id de la sucursal'];

export default class ProductList extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      branches: [],
      branchId: null,
      errorMessage: '',
      productListApi: [],
      productList: [],
      page: 1,
      itemsPerPage: 5,
      itemCount: 0,
    };
    this.getBranchList();
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

  getItems = () => {
    if (this.isValidInput()) {
      this.getProductList();
    } else {
      this.setState({
        errorMessage: 'El campo sucursal es requerido.',
      });
    }
  }

  isValidInput() {
    return this.state.branchId !== null;
  }

  getProductList = async () => {
    const result = await ApiCaller.callApi('/calpullix/product/detail/retrieve',
      this.getProductListRequest(), CONSTANTS.PORT_PRODUCT_LIST, CONSTANTS.POST_METHOD)
      .catch((error) => {
        console.log(error);
        this.setState({
          errorMessage: 'Ocurrio un error, favor de intentar mas tarde',
        });
      });
    this.setState({
      productListApi: result.productDetail,
      itemCount: result.productDetail[CONSTANTS.ZERO].totalRows,
    });
    this.addItemsList();
    return result;
  }

  getProductListRequest() {
    const request = {
      'page': this.state.page,
      'branchId': this.state.branchId.id
    };
    return request;
  }

  addItemsList() {
    var fields = [];
    for (let i = 0; i < this.state.productListApi.length; i++) {
      var item = [];
      item.push(this.state.productListApi[i].id);
      item.push(this.state.productListApi[i].name);
      item.push(this.state.productListApi[i].description);
      item.push(this.state.productListApi[i].brand);
      item.push(this.state.productListApi[i].status);
      item.push(this.state.productListApi[i].branchId);
      fields.push(item);
    }
    this.setState({
      errorMessage: '',
      productList: fields,
    });
  }

  cleanInput = () => {
    functionClearPicker();
    this.setState({
      branchId: null,
    });
  }

  updateState = (_value) => {
    this.setState({
      branchId: _value
    })
  }

  setFunctionClearPicker = (_clear) => {
    functionClearPicker = _clear;
  }

  handlerPagination = (numberPage) => {
    this.setState({
      page: numberPage,
    });
    this.getProductList();
  }

  render() {
    return (
      <BackgroundScrollCalpulliX addHeight={300}>
        <NavigationEvents
          onWillFocus={() => {
            this.cleanInput();
          }} />
        <HeaderCalpulliXBack
          navigation={this.props.navigation}
          backButton={false}
          title={'Lista de productos'} />
        <View style={{ marginTop: 5 }}>
          <Text
            id='errorMessageListItems'
            style={[stylesCommon.errorMessage, { marginTop: 5 }]}>{this.state.errorMessage}
          </Text>
          <Text style={[stylesCommon.labelText, { marginTop: 5, marginRight: '70%', fontSize: 15 }]}>
            Sucursales
          </Text>
          <PickerCalpulliX
            data={this.state.branches}
            updateState={this.updateState}
            placeholder={'Seleccione la sucursal'}
            functionClearPicker={this.setFunctionClearPicker} />
          <ButtonCalpulliX
            title={'Buscar'}
            id={'buttonSearchItems'}
            arrayColors={['#05AAAB', '#048585', '#048585']}
            onPress={this.getItems}
            width={'35%'}
            height={45}
            marginTop={30} />
          <AccordionCalpulliX
            content={this.state.productList}
            path={'/calpullix/product/detail'}
            port={CONSTANTS.PORT_PRODUCT_LIST}
            screen={'ProductDetail'}
            navigation={this.props.navigation}
            renderDetailButton={true}
            titleButton={'Ver Detalle'}
            margintTop={25}
            labels={labels}
            labelHeader={'Id del producto  '}
            marginLeftRowHeader={'55%'} />
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
      </BackgroundScrollCalpulliX>
    );
  }
}

