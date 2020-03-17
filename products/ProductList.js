import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
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
import stylesAutoComplete from '../sales/styles';
import Autocomplete from 'react-native-autocomplete-input';

var functionClearPicker;
const labels = ['Descripción', 'Nombre', 'Marca', 'Status', 'Sucursal', 'Precio venta',
                'Promedio ventas mensuales', 'Promedio ventas diario', 'Gramaje'];

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
      dataProducts: [],
      product: '',
      hideResults: true,
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

  getItems = () => {
    if (this.isValidInput()) {
      this.getProductList(CONSTANTS.ONE);
    } else {
      this.setState({
        errorMessage: 'El campo sucursal es requerido.',
      });
    }
  }

  isValidInput() {
    return this.state.branchId !== null;
  }

  getProductList = async (_numberPage) => {
    const result = await ApiCaller.callApi('/calpullix/product/list/retrieve',
      this.getProductListRequest(_numberPage), CONSTANTS.PORT_PRODUCT_LIST, CONSTANTS.POST_METHOD)
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

  getProductListRequest(_numberPage) {
    const request = {
      'page': _numberPage,
      'branchId': this.state.branchId.id,
      "product": this.state.product,
    };
    return request;
  }

  addItemsList() {
    var fields = [];
    for (let i = 0; i < this.state.productListApi.length; i++) {
      var item = [];
      item.push(this.state.productListApi[i].id);
      item.push(this.state.productListApi[i].description);
      item.push(this.state.productListApi[i].name);
      item.push(this.state.productListApi[i].brand);
      item.push(this.state.productListApi[i].status);
      item.push(this.state.productListApi[i].branch);
      item.push(this.state.productListApi[i].salePrice);
      item.push(this.state.productListApi[i].monthlyAverageSales);
      item.push(this.state.productListApi[i].dailyAverageSales);
      item.push(this.state.productListApi[i].weight);
      item.push();
      fields.push(item);
    }
    this.setState({
      errorMessage: '',
      productList: fields,
    });
  }

  cleanInput = () => {
    if (this.props.navigation.state.params && 
        (this.props.navigation.state.params.navigateFromMenu || 
         this.props.navigation.state.params.navigateFromLogin)) {
      functionClearPicker();
      this.setState({
        errorMessage: '',
        branchId: null,
        dataProducts: [],
        product: '',
        hideResults: true,
        itemCount: 0,
        productList: [],
      });
      this.getBranchList();
      this.props.navigation.state.params.navigateFromMenu = false;
      this.props.navigation.state.params.navigateFromLogin = false;
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

  handlerPagination = (numberPage) => {
    this.setState({
      page: numberPage,
    });
    this.getProductList(numberPage);
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

  render() {
    return (
      <BackgroundScrollCalpulliX addHeight={900}>
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
          <Text style={[stylesCommon.labelText, { marginTop: 5, marginRight: '70%', fontSize: 13 }]}>
            Sucursales
          </Text>
          <PickerCalpulliX
            data={this.state.branches}
            updateState={this.updateState}
            placeholder={'Seleccione la sucursal'}
            functionClearPicker={this.setFunctionClearPicker} />

          <Text style={[stylesCommon.labelText, { marginTop: 5, marginRight: '73%', fontSize: 13 }]}>
            Producto
          </Text>
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
            title={'Buscar'}
            id={'buttonSearchItems'}
            arrayColors={['#05AAAB', '#048585', '#048585']}
            onPress={this.getItems}
            width={'35%'}
            height={45}
            marginTop={70} />
          <AccordionCalpulliX
            content={this.state.productList}
            requestParameter={this.state.branchId ? this.state.branchId.id : this.state.branchId}
            path={'/calpullix/product/detail/retrieve'}
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

