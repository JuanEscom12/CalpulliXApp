import React, { PureComponent } from 'react';
import { Alert, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import { NavigationEvents } from 'react-navigation';
import HeaderCalpulliXBack from '../common/HeaderCalpulliXBack';
import stylesCommon from '../common/style';
import  ButtonCalpulliX  from '../common/ButtonCalpulliX';
import  PickerCalpulliX  from '../common/PickerCalpulliX';
import AccordionCalpulliX from '../common/AccordionCalpulliX';


const apiResponse = [
  {
    id: 'Item  1',
    name: 'Articulo XXXX',
    description: 'Row ',
    brand: 'Marca ',
    status: 'Estatus ',
    branchId: 'Id sucursal '
  },
  {
    id: 'Item  1',
    name: 'Articulo ',
    description: 'Row \n',
    brand: 'Marca \n',
    status: 'Estatus \n',
    branchId: 'Id sucursal \n'
  },
  {
    id: 'Item  1',
    name: 'Articulo ',
    description: 'Row \n',
    brand: 'Marca \n',
    status: 'Estatus \n',
    branchId: 'Id sucursal \n'
  },
  {
    id: 'Item  1',
    name: 'Articulo ',
    description: 'Row \n',
    brand: 'Marca \n',
    status: 'Estatus \n',
    branchId: 'Id sucursal \n'
  },
  {
    id: 'Item  1',
    name: 'Articulo ',
    description: 'Row \n',
    brand: 'Marca \n',
    status: 'Estatus \n',
    branchId: 'Id sucursal \n'
  },
];

var functionClearPicker;

const labels = ['Id', 'Descripcion', 'Marca', 'Status', 'Id de la sucursal'];

export default class ProductList extends PureComponent {

  constructor(props) {
    super(props);
    // Call api getBranchList.
    const branches = [
      {
        name: 'Sucursal Margaritas',
        value: 1
      },
      {
        name: 'Sucursal Guadalajara',
        value: 2
      }]
    this.state = {
      branches: branches,
      branchId: null,
      errorMessage: '',
      productList: [],
    }
  }
  getItems = async (e) => {
    if (this.isValidInput()) {
      // Consult API getProductList.
      var fields = [];
      var item = [];
      for (let i = 0; i < apiResponse.length; i++) {
        item.push(apiResponse[i].id);
        item.push(apiResponse[i].name);
        item.push(apiResponse[i].description);
        item.push(apiResponse[i].brand);
        item.push(apiResponse[i].status);
        item.push(apiResponse[i].branchId);
        fields.push(item);
      }
      this.setState({
        errorMessage: '',
        productList: fields,
      });
    } else {
      this.setState({
        errorMessage: 'El campo sucursal es requerido.',
      });
    }
  }

  isValidInput() {
    return this.state.branchId !== null;
  }

  cleanInput = () => {
    functionClearPicker();
    this.setState({
      branchId: null,
      errorMessage: '',
      productList: [],
    });
  }

  updateState = (value) => {
    this.setState({
      branchId: value
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
            placeholder={'Selecciona la sucursal'}
            labelFunction={item => item.name}
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
              screen={'ProductDetail'}
              navigation={this.props.navigation} 
              renderDetailButton={true}
              titleButton={'Ver Detalle'} 
              margintTop={25}
              labels={labels}/>

        </View>
      </BackgroundScrollCalpulliX>
    );
  }
}

