import React, { PureComponent } from 'react';
import { Alert, Text, View } from 'react-native';
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import { NavigationEvents } from 'react-navigation';
import HeaderCalpulliXBack from '../common/HeaderCalpulliXBack';
import stylesCommon from '../common/style';
import  ButtonCalpulliX  from '../common/ButtonCalpulliX';
import  PickerCalpulliX  from '../common/PickerCalpulliX';
import AccordionCalpulliX from '../common/AccordionCalpulliX';
import ApiCaller from '../api/ApiCaller';
import CONSTANTS from '../common/Constants';

var functionClearPicker;
const labels = ['Id', 'Descripcion', 'Marca', 'Status', 'Id de la sucursal'];

export default class ProductList extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      branches:  [],
      branchId: null,
      errorMessage: '',
      productListApi: [],
      productList: [],
    };  
    this.getBranchList();
  }

  getBranchList  = async () => {
    const result = await ApiCaller.callApi('/calpullix/branch/list', null, 
    CONSTANTS.PORT_BRANCH, CONSTANTS.GET_METHOD)
      .catch((error) => {
        console.log(error);
        this.setState({
          errorMessage: 'Ocurrio un error, favor de intentar mas tarde',
        });
      });
      this.setState({
        branches:  result.branch,
      });
      return result.branch;
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

  getProductList  = async () => {
    const result = await ApiCaller.callApi('/calpullix/product/list', 
    this.getProductListRequest(), CONSTANTS.PORT_PRODUCT_LIST, CONSTANTS.POST_METHOD)
      .catch((error) => {
        console.log(error);
        this.setState({
          errorMessage: 'Ocurrio un error, favor de intentar mas tarde',
        });
      });
      this.setState({
        productListApi:  result.productDetail,
      });
      this.addItemsList();
      return result;
  }

  getProductListRequest() {
    const request = {
      "branchId": this.state.branchId.id
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
      errorMessage: '',
      productList: [],
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

  render() {
    return (
      <BackgroundScrollCalpulliX addHeight={300}>
        <NavigationEvents
          onWillFocus={() => {
            this.cleanInput();
          }} />
        <HeaderCalpulliXBack
          navigation={this.props.navigation}
          backButton={false} />
        <View style={{ marginTop: 5 }}>
          <Text
            id='errorMessageListItems'
            style={[stylesCommon.errorMessage, {marginTop: 10}]}>{this.state.errorMessage}
          </Text>
          <Text style={[stylesCommon.labelText, { marginTop: 10, marginRight: '70%', fontSize: 15 }]}>
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
            width={'40%'}
            height={45}
            marginTop={30} />
           <AccordionCalpulliX 
              content={this.state.productList}
              path={'/calpullix/product/detail'}
              port={'8080'}
              screen={'ProductDetail'}
              navigation={this.props.navigation} 
              renderDetailButton={true}
              titleButton={'Ver Detalle'} 
              margintTop={25}
              labels={labels}
              labelHeader={'Id del producto  '}
              marginLeftRowHeader={'55%'}/>
        </View>
      </BackgroundScrollCalpulliX>
    );
  }
}

