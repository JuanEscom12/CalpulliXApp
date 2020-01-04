import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './SideMenu.style';
import {NavigationActions} from 'react-navigation';
import {Image, Text, View} from 'react-native';
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import NavigatorCommons from '../navigation/NavigatorCommons';

class SideMenu extends Component {
  navigateToScreen = (_route) => () => {
    NavigatorCommons.navigateTo(this.props.navigation, _route, null);
  }

  render () {
    return (
      <BackgroundScrollCalpulliX 
      addHeight={200}>
          <View 
            style={{width: '100%', backgroundColor: '#F6A338', height: 60}}>
              <Text style={{color: '#FFF', fontSize: 17, textAlign: "center", marginTop: 20}}>
                Menú
              </Text>
          </View>
          <View style={{ width: '100%'}} >
                <Image
                    style={{
                        height: 60, marginLeft: 'auto', marginRight: 'auto',
                        marginTop: 20, width: '85%',
                        transform: [
                            { scaleX: 0.7 },
                            { scaleY: 0.7 }
                          ]
                    }}
                    source={require('../login/logo_CalpulliX.png')} />
            </View>

            <View style={[styles.sectionHeadingStyle, {marginTop: 20}]}>
              <Image
                        style={{ height: 25, width: 26, marginLeft: '5%', 
                        marginTop: 15, transform: [
                          { scaleX: 0.8 },
                          { scaleY: 0.8 }
                        ]}}
                        source={require('./product_list.png')} />
              <Text style={{marginTop: 15, marginBottom: 15, fontSize: 16, 
                marginLeft: '5%'}} onPress={this.navigateToScreen('ProductList')} >
                Lista de productos
              </Text>
            </View>

            <View style={[styles.sectionHeadingStyle]}>
              <Image
                        style={{ height: 25, width: 26, marginLeft: '5%', 
                        marginTop: 15, transform: [
                          { scaleX: 0.8 },
                          { scaleY: 0.8 }
                        ]}}
                        source={require('./purchase_order.png')} />
              <Text style={{marginTop: 15, marginBottom: 15, fontSize: 16, 
                marginLeft: '5%'}} onPress={this.navigateToScreen('ProductList')} >
                Ordenes de compra
              </Text>
            </View>
            <View style={[styles.sectionHeadingStyle]}>
              <Image
                        style={{ height: 25, width: 26, marginLeft: '5%', 
                        marginTop: 15, transform: [
                          { scaleX: 0.8 },
                          { scaleY: 0.8 }
                        ]}}
                        source={require('./promotions.png')} />
              <Text style={{marginTop: 15, marginBottom: 15, fontSize: 16, 
                marginLeft: '5%'}} onPress={this.navigateToScreen('ProductList')} >
                Promociones
              </Text>
            </View>
            <View style={[styles.sectionHeadingStyle]}>
              <Image
                        style={{ height: 25, width: 26, marginLeft: '5%', 
                        marginTop: 15, transform: [
                          { scaleX: 0.8 },
                          { scaleY: 0.8 }
                        ]}}
                        source={require('./branches.png')} />
              <Text style={{marginTop: 15, marginBottom: 15, fontSize: 16, 
                marginLeft: '5%'}} onPress={this.navigateToScreen('Offices')} >
                Sucursales
              </Text>
            </View>
            <View style={[styles.sectionHeadingStyle]}>
              <Image
                        style={{ height: 25, width: 26, marginLeft: '5%', 
                        marginTop: 15, transform: [
                          { scaleX: 0.8 },
                          { scaleY: 0.8 }
                        ]}}
                        source={require('./item_classification.png')} />
              <Text style={{marginTop: 15, marginBottom: 15, fontSize: 16, 
                marginLeft: '5%'}} onPress={this.navigateToScreen('ClassifyProducts')} >
                Clasificación de productos
              </Text>
            </View>
            <View style={[styles.sectionHeadingStyle]}>
              <Image
                        style={{ height: 25, width: 26, marginLeft: '5%', 
                        marginTop: 15, transform: [
                          { scaleX: 0.8 },
                          { scaleY: 0.8 }
                        ]}}
                        source={require('./costumer_classification.png')} />
              <Text style={{marginTop: 15, marginBottom: 15, fontSize: 16, 
                marginLeft: '5%'}} onPress={this.navigateToScreen('ClassifyUsers')} >
                Clasificación de clientes
              </Text>
            </View>
            <View style={[styles.sectionHeadingStyle]}>
              <Image
                        style={{ height: 25, width: 26, marginLeft: '5%', 
                        marginTop: 15, transform: [
                          { scaleX: 0.8 },
                          { scaleY: 0.8 }
                        ]}}
                        source={require('./sales.png')} />
              <Text style={{marginTop: 15, marginBottom: 15, fontSize: 16, 
                marginLeft: '5%'}} onPress={this.navigateToScreen('ProductList')} >
                Ventas
              </Text>
            </View>
            <View style={[styles.sectionHeadingStyle]}>
              <Image
                        style={{ height: 25, width: 26, marginLeft: '5%', 
                        marginTop: 15, transform: [
                          { scaleX: 0.8 },
                          { scaleY: 0.8 }
                        ]}}
                        source={require('./twitter.png')} />
              <Text style={{marginTop: 15, marginBottom: 15, fontSize: 16, 
                marginLeft: '5%'}} onPress={this.navigateToScreen('ProductList')} >
               Analísis de Twitter
              </Text>
            </View>
            <View style={[styles.sectionHeadingStyle]}>
              <Image
                        style={{ height: 25, width: 26, marginLeft: '5%', 
                        marginTop: 15, transform: [
                          { scaleX: 0.8 },
                          { scaleY: 0.8 }
                        ]}}
                        source={require('./statistics.png')} />
              <Text style={{marginTop: 15, marginBottom: 15, fontSize: 16, 
                marginLeft: '5%'}} onPress={this.navigateToScreen('ProductList')} >
                Estadisticas
              </Text>
            </View>
            <View style={[styles.sectionHeadingBottomStyle]}>
              <Image
                        style={{ height: 25, width: 26, marginLeft: '5%', 
                        marginTop: 15, transform: [
                          { scaleX: 0.8 },
                          { scaleY: 0.8 }
                        ]}}
                        source={require('./predictive_analysis.png')} />
              <Text style={{marginTop: 15, marginBottom: 15, fontSize: 16, 
                marginLeft: '5%'}} onPress={this.navigateToScreen('ProductList')} >
                Analisis predictivo
              </Text>
            </View>

            <View style={{height: 50, backgroundColor: '#D17E11', flexDirection: 'row', marginTop: 80}}>
              <Image
                        style={{ height: 25, width: 30, marginLeft: '5%', 
                        marginTop: 10, transform: [
                          { scaleX: 0.8 },
                          { scaleY: 0.8 }
                        ]}}
                        source={require('./sign_out.png')} />
              <Text style={{marginTop: 10, marginBottom: 10, fontSize: 16, 
                marginLeft: '5%', color: '#FFF'}} onPress={this.navigateToScreen('Login')} >
                Cerrar sesión
              </Text>
            </View>

       </BackgroundScrollCalpulliX>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;
