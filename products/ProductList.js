import React, { PureComponent } from 'react';
import { Alert, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import { NavigationEvents } from 'react-navigation';
import HeaderCalpulliXBack from '../common/HeaderCalpulliXBack';
import stylesCommon from '../common/style';
import { CustomPicker } from 'react-native-custom-picker'
import  ButtonCalpulliX  from '../common/ButtonCalpulliX';
import  PickerCalpulliX  from '../common/PickerCalpulliX';
import AccordionCalpulliX from '../common/AccordionCalpulliX';


const BACON_IPSUM =
  '\n   Row 1                                                       100$ \n' +
  '\n   Row 2                                                       100$ \n' +
  '\n   Row 3                                                       100$ \n' +
  '\n   Row 4                                                       100$ \n' +
  '\n   Row 5                                                       100$ \n' +
  '\n   Row 6                                                       100$ \n' +
  '\n   Row 7                                                       100$ \n' +
  '\n   Row 8                                                       100$ \n' +
  '\n   Row 9                                                       100$ \n';

const CONTENT = [
  {
    id: 'Item                    1',
    content: BACON_IPSUM,
  },
  {
    id: 'Item                    2',
    content: BACON_IPSUM,
  },
  {
    id: 'Item                    3',
    content: BACON_IPSUM,
  },
  {
    id: 'Item                    4',
    content: BACON_IPSUM,
  },
  {
    id: 'Item                    5',
    content: BACON_IPSUM,
  },
];

var functionClearPicker;

export default class ProductList extends PureComponent {

  constructor(props) {
    super(props);
    // Call api Sucursal.
    const branches = [
      {
        color: '#2660A4',
        name: 'Sucursal Margaritas',
        value: 1
      },
      {
        color: '#FF6B35',
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
      this.setState({
        errorMessage: '',
        productList: CONTENT,
      });
      // Update Accordion.
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
      <BackgroundScrollCalpulliX addHeight={0}>

        <NavigationEvents
          onWillFocus={() => {
            this.cleanInput();
          }} />

        <HeaderCalpulliXBack
          navigation={this.props.navigation} />

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
              margintTop={25}/>

        </View>
      </BackgroundScrollCalpulliX>
    );
  }
}

