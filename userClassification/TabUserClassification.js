import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import CONSTANTS from '../common/Constants';
import styles from './styles';
import CalpulliXTable from '../common/CalpulliXTable';
import PromotionsProductDetail from './PromotionsProductDetail';

const headerKNearest = ['Perfil', 'Cantidad'];
const headersProducts = ['Id', 'Nombre', '$ Venta', '$ Compra'];
const headersPromotions = ['Nombre', 'F. Inicio', 'F. Termino', 'No. Clientes'];

buildKMeans = (_graphic, _date, _classificationLabel, _color) => {
    var result = [];
    var detail = [];
    const base64Image = CONSTANTS.PREFIX_BASE64 + _graphic;
    detail.push(
        <View style={{ backgroundColor: '#EDEDED' }}>
            <Text style={{ fontSize: 12, marginLeft: '5%', marginTop: 20, color: '#F49315' }}>
                {'Clusterización por k-Means'}
            </Text>
            <Text style={{ fontSize: 12, marginLeft: '5%', marginTop: 10, marginBottom: 30, color: '#F49315' }}>
                {'Hora de termino del proceso: ' + _date}
            </Text>
        </View>
    );
    detail.push(
        <Image
            style={{
                height: 200,
                width: '90%',
                borderWidth: 1,
                borderColor: '#746F6F',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 35,
                borderRadius: 3,
            }}
            source={{ uri: base64Image }} />
    );
    detail.push(
        <View style={{ flexDirection: 'row', marginTop: 40 }}>
            <Text style={{ fontSize: 10, marginLeft: '5%', fontWeight: 'bold' }}>
                {'Clasificación ' + _classificationLabel}
            </Text>
            <View style={{
                backgroundColor: _color, width: 10, height: 10, marginTop: 2,
                borderWidth: 0.5, borderColor: '#9E9E9E', marginLeft: 7
            }} />
        </View>
    );
    result.push(
        <View style={[styles.scene, { backgroundColor: '#F3F9FA' }]} >
            {detail}
        </View>
    );
    return result;
}

buildKNearest = (_graphic, _date, _lastRows, _currentRows) => {
    var result = [];
    var detail = [];
    const base64Image = CONSTANTS.PREFIX_BASE64 + _graphic;
    detail.push(
        <View style={{ backgroundColor: '#EDEDED' }}>
            <Text style={{ fontSize: 12, marginLeft: '5%', marginTop: 20, color: '#F49315' }}>
                {'Clasificación por K-Nearest'}
            </Text>
            <Text style={{ fontSize: 12, marginLeft: '5%', marginTop: 10, marginBottom: 20, color: '#F49315' }}>
                {'Hora de termino del proceso: ' + _date}
            </Text>
        </View>
    );
    detail.push(
        <Text style={{ fontSize: 8, marginLeft: '5%', marginTop: 15 }}>
            {'Valor K-Neighbors óptimo'}
        </Text>
    );
    detail.push(
        <Image
            style={{
                height: 120,
                width: '90%',
                borderWidth: 1,
                borderColor: '#746F6F',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 5,
                borderRadius: 3,
            }}
            source={{ uri: base64Image }} />
    );

    detail.push(
        <View style={{ flexDirection: 'row', marginTop: 30 }}>
            <Text style={{ fontSize: 8, marginLeft: '5%' }}>
                {'Clasificación Previa'}
            </Text>
            <Text style={{ fontSize: 8, marginLeft: '33%' }}>
                {'Última clasificación'}
            </Text>
        </View>
    );
    detail.push(
        <View style={{ flexDirection: 'row' }}>
            <CalpulliXTable
                headers={headerKNearest}
                data={_lastRows}
                marginTop={5}
                width={'45%'}
                textStyle={{
                    margin: 5,
                    fontSize: 10,
                }} />

            <CalpulliXTable
                headers={headerKNearest}
                data={_currentRows}
                marginTop={5}
                width={'45%'}
                marginLeft={'5%'}
                textStyle={{
                    margin: 5,
                    fontSize: 10,
                }} />

        </View>
    );

    result.push(
        <View style={[styles.scene, { backgroundColor: '#F3F9FA' }]} >
            {detail}
        </View>
    );

    return result;
}

buildRegression = (_graphic, _confusion, _date, _descClassA, _descClassB, _quantityClassA, _quantityClassB, _colorA, _colorB) => {
    var result = [];
    var detail = [];
    var base64Image = CONSTANTS.PREFIX_BASE64 + _graphic;
    detail.push(
        <View style={{ backgroundColor: '#EDEDED' }}>
            <Text style={{ fontSize: 12, marginLeft: '5%', marginTop: 20, color: '#F49315' }}>
                {'Regresión logística'}
            </Text>
            <Text style={{ fontSize: 12, marginLeft: '5%', marginTop: 10, marginBottom: 20, color: '#F49315' }}>
                {'Hora del último proceso: ' + _date}
            </Text>
        </View>
    );
    
    detail.push(
        <Text style={{ fontSize: 8, color: '#4C4C4C', marginTop: 10, marginLeft: '15%' }}>
            Matriz de confusión del entrenamiento
        </Text>
    );
    base64Image = CONSTANTS.PREFIX_BASE64 + _confusion;
    detail.push(
        <Image
            style={{
                height: 120,
                width: '70%',
                borderWidth: 1,
                borderColor: '#746F6F',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 5,
                borderRadius: 3,
            }}
            source={{ uri: base64Image }} />
    );
    detail.push(
        <Text style={{ fontSize: 8, color: '#4C4C4C', marginTop: 10, marginLeft: '15%' }}>
            Regresión lógistica
        </Text>
    );
    base64Image = CONSTANTS.PREFIX_BASE64 + _graphic;
    detail.push(
        <Image
            style={{
                height: 130,
                width: '70%',
                borderWidth: 1,
                borderColor: '#746F6F',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 10,
                borderRadius: 3,
            }}
            source={{ uri: base64Image }} />
    );
    detail.push(
        <View style={{ marginTop: 20, marginLeft: '5%', flexDirection: 'row' }}>
            <Text style={{ fontSize: 8, color: '#F49315', fontWeight: 'bold' }}>
                {_descClassA}
            </Text>
            <View style={{
                backgroundColor: _colorA, width: 10, height: 10, marginTop: 2,
                borderWidth: 0.5, borderColor: '#9E9E9E', marginLeft: 7
            }} />
        </View>
    );

    detail.push(
        <View style={{ marginTop: 3, marginLeft: '5%', flexDirection: 'row' }}>
            <Text style={{ fontSize: 8, color: '#F49315', marginTop: 3, fontWeight: 'bold' }}>
                {_descClassB}
            </Text>
            <View style={{
                backgroundColor: _colorB, width: 10, height: 10, marginTop: 2,
                borderWidth: 0.5, borderColor: '#9E9E9E', marginLeft: 7
            }} />
        </View>
    );

    detail.push(
        <View style={{ marginTop: 10, marginLeft: '5%' }}>
            <Text style={{ fontSize: 8, color: '#F49315', fontWeight: 'bold' }}>
                {_quantityClassA}
            </Text>
            <Text style={{ fontSize: 8, color: '#F49315', marginTop: 3, fontWeight: 'bold' }}>
                {_quantityClassB}
            </Text>
        </View>
    );
    result.push(
        <View style={[styles.scene, { backgroundColor: '#F3F9FA' }]} >
            {detail}
        </View>
    );
    return result;
}

buildProductRecomendations = (_rows, _date, _itemCount, _id) => {
    return (<PromotionsProductDetail 
                headers={headersProducts}
                rows={_rows}
                date={_date}
                itemCount={_itemCount}
                title={'Productos recomendados'}
                id={_id}
                apiPath={'/calpullix/client/recomendation/product/retrieve'} />);
}

buildProductPromotions = (_rows, _date, _itemCount, _id) => {
    return (<PromotionsProductDetail 
                headers={headersPromotions}
                rows={_rows}
                date={_date}
                itemCount={_itemCount}
                title={'Promociones recomendadas'}
                id={_id}
                apiPath={'/calpullix/client/recomendation/promotions/retrieve'} />);
}


const TabPromotionsFunc = (props) => {
    const [index, setIndex] = React.useState(0);
    const renderTabBar = tabBarProps => (
        <TabBar
            {...tabBarProps}
            indicatorStyle={{ backgroundColor: '#05AAAB' }}
            style={[styles.tabBar]}
            labelStyle={{ color: 'black', fontSize: 8 }} />
    );
    if (props.data) {
        [routes] = React.useState([
            { key: 'kMeans', title: 'K-Means' },
            { key: 'kNearest', title: 'K-Nearest' },
            { key: 'regression', title: 'Regresión' },
            { key: 'products', title: 'Productos' },
            { key: 'promotions', title: 'Promociones' },
        ]);

        renderScene = SceneMap({
            kMeans: () => buildKMeans(props.data.kmeansGraphic, props.data.kmeansDate,
                props.data.label, props.data.graphicColor),
            kNearest: () => buildKNearest(props.data.knearestGraphic, props.data.knearestDate,
                props.data.lastKNearest, props.data.currentKNearest),
            regression: () => buildRegression(props.data.regressionGraphic, props.data.confusionRegression,
                props.data.regressionDate, props.data.regressionClassA, props.data.regressionClassB,
                props.data.quantityRegressionClassA, props.data.quantityRegressionClassB, props.data.colorClassA,
                props.data.colorClassB),
            products: () => buildProductRecomendations(props.data.productsProfile, props.data.productsDate, 
                props.data.itemCountProducts, props.data.id),
            promotions: () => buildProductPromotions(props.data.promotionsProfile, props.data.promotionsDate, 
                props.data.itemCountPromotions, props.data.id),
        });
    }
    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={renderTabBar}
            style={[styles.tabView]}
             />
    );
}

export default class TabUserClassification extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { profiles, navigation } = this.props;
        console.log(':: Profile detail ', profiles);
        var result;
        navigate = navigation;
        if (profiles) {
            result = (
                <TabPromotionsFunc data={profiles} />
            );
        } else {
            result = (
                <View />
            );
        }
        return result;
    }

}
