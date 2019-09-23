import React, { PureComponent } from 'react';
import { Alert, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import { NavigationEvents } from 'react-navigation';
import HeaderCalpulliXBack from '../common/HeaderCalpulliXBack';
import stylesCommon from '../common/style';
import { CustomPicker } from 'react-native-custom-picker'
import ButtonCalpulliX from '../common/ButtonCalpulliX';
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
      productList: null,
    }
  }

  
  renderField(settings) {
    const { selectedItem, defaultText, getLabel, clear } = settings
    return (
      <View style={styles.container}>
        <View>
          {!selectedItem && <Text style={[styles.text, { color: 'grey' }]}>{defaultText}</Text>}
          {selectedItem && (
            <View style={styles.innerContainer}>
              <TouchableOpacity style={styles.clearButton} onPress={clear}>
                <Text style={{ color: '#fff' }}>Clear</Text>
              </TouchableOpacity>
              <Text style={[styles.text]}>
                {getLabel(selectedItem)}
              </Text>
            </View>
          )}
        </View>
      </View>
    )
  }

  renderOption(settings) {
    const { item, getLabel } = settings
    return (
      <View style={styles.optionContainer}>
        <View style={styles.innerContainer}>
          <Text style={{ alignSelf: 'flex-start', marginLeft: '5%', color: '#4C4C4C' }}>{getLabel(item)}</Text>
        </View>
      </View>
    )
  }

  getItems = async (e) => {
    if (this.isValidInput()) {
      // Consult API getProductList.
      this.setState({
        productList: CONTENT,
      });
      // Update View.
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
  
    this.setState({
      branchId: null,
      errorMessage: '',
      productList: null,
    });

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
          <CustomPicker
            placeholder={'Selecciona la sucursal'}
            options={this.state.branches}
            getLabel={item => item.name}
            fieldTemplate={this.renderField}
            optionTemplate={this.renderOption}
            onValueChange={value => {
              this.setState({
                branchId: value
              })
            }} />

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
              titleButton={'Ver Detalle'} />

        </View>
      </BackgroundScrollCalpulliX>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#F49315',
    borderWidth: 0.5,
    borderRadius: 5,
    height: 50,
    marginTop: 5,
    padding: 15,
    backgroundColor: '#FDFDFD',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  text: {
    fontSize: 14
  },
  headerFooterContainer: {
    padding: 10,
    alignItems: 'center'
  },
  clearButton: {
    backgroundColor: '#9E9E9E',
    borderRadius: 5,
    marginRight: 10,
    padding: 3,
    marginBottom: 10
  },
  optionContainer: {
    padding: 10,
    borderBottomColor: '#EDEDED',
    borderBottomWidth: 0.5,
    marginBottom: 20,
  },
  optionInnerContainer: {
    flex: 1,
    flexDirection: 'row'
  }
})

