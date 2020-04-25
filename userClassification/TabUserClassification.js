import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import CONSTANTS from '../common/Constants';
import styles from './styles';
import CalpulliXTable from '../common/CalpulliXTable';
import PromotionsProductDetail from './PromotionsProductDetail';
import UsersRegression from './UsersRegression';

const headerKNearest = ['Perfil', 'Cantidad'];
const headersProducts = ['Id', 'Nombre', '$ Venta', '$ Compra'];
const headersPromotions = ['Nombre', 'F. Inicio', 'F. Termino', 'No. Clientes'];
const headersUsersRegression = ['Id cliente', 'Clasif.'];
var isFirstRender = false;

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
                height: 270,
                width: '91%',
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
            <Text style={{ fontSize: 11, marginLeft: '5%', color: '#4C4C4C' }}>
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

buildKNearest = (_graphic, _date, _lastRows, _currentRows, _kNeighbor) => {
    var result = [];
    var detail = [];
    const base64Image = CONSTANTS.PREFIX_BASE64 + _graphic;
    detail.push(
        <View style={{ backgroundColor: '#EDEDED' }}>
            <Text style={{ fontSize: 12, marginLeft: '5%', marginTop: 20, color: '#F49315' }}>
                {'Clasificación por K-Nearest'}
            </Text>
            <Text style={{ fontSize: 12, marginLeft: '5%', marginTop: 10, color: '#F49315' }}>
                {'Hora de termino del proceso: ' + _date}
            </Text>
            <Text style={{ fontSize: 12, marginLeft: '5%', marginTop: 10, marginBottom: 20, color: '#F49315' }}>
                {'Valor K-Neighbor óptimo: ' + _kNeighbor}
            </Text>
        </View>
    );
    detail.push(
        <Text style={{ fontSize: 10, marginLeft: '5%', marginTop: 15 }}>
            {'Precisión de los valores de K-Neighbors: '}
        </Text>
    );
    detail.push(
        <Image
            style={{
                height: 225,
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
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <Text style={{ fontSize: 10, marginLeft: '5%' }}>
                {'Clasificación Previa'}
            </Text>
            <Text style={{ fontSize: 10, marginLeft: '33%' }}>
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


buildRegression = (_confusion, _date, _quantityLeftLast, _quantityLoyalLast, _quantityLeftCurrent, _quantityLoyalCurrent, _itemCountLast, _itemCountCurrent, _rowsLast, _rowsCurrent, _id) => {
    var result = [];
    var detail = [];
    detail.push(
        <View style={{ backgroundColor: '#EDEDED' }}>
            <Text style={{ fontSize: 12, marginLeft: '5%', marginTop: 20, color: '#F49315' }}>
                {'Clientes clasificados'}
            </Text>
            <Text style={{ fontSize: 12, marginLeft: '5%', marginTop: 10, marginBottom: 20, color: '#F49315' }}>
                {'Hora del último proceso: ' + _date}
            </Text>
        </View>
    );

    detail.push(
        <Text style={{ fontSize: 10, color: '#4C4C4C', marginTop: 10, marginLeft: '10%' }}>
            Matriz de confusión (resultados del entrenamiento)
        </Text>
    );
    var base64Image = CONSTANTS.PREFIX_BASE64 + _confusion;
    detail.push(
        <Image
            style={{
                height: 225,
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
        <View style={{ flexDirection: 'row',  marginTop: 15, }}>
            <Text style={{ fontSize: 10, color: '#4C4C4C', marginLeft: '10%' }}>
                Última clasificación
            </Text>
            <Text style={{ fontSize: 10, color: '#4C4C4C', marginLeft: '25%' }}>
                Clasificación actual
            </Text>
        </View>
    );


    detail.push(
        <View style={{ flexDirection: 'row', }}>
            <UsersRegression
                rows={_rowsLast}
                apiPath={'/calpullix/client/users/regression/retrieve'}
                id={_id}
                headers={headersUsersRegression}

                itemCount={_itemCountLast}
            />
            <UsersRegression
                rows={_rowsCurrent}
                apiPath={'/calpullix/client/users/regression/retrieve'}
                id={_id}
                headers={headersUsersRegression}

                itemCount={_itemCountCurrent}
            />
        </View>
    );



    detail.push(
        <View style={{ marginTop: 15, marginLeft: '3%', flexDirection: 'row', }}>
            <View>
                <Text style={{ fontSize: 10, color: '#4C4C4C',  }}>
                    {_quantityLeftLast}
                </Text>
                <Text style={{ fontSize: 10, color: '#4C4C4C', marginTop: 3,  }}>
                    {_quantityLoyalLast}
                </Text>
            </View>
            <View style={{ marginLeft: '8%' }}>
                <Text style={{ fontSize: 10, color: '#4C4C4C',  }}>
                    {_quantityLeftCurrent}
                </Text>
                <Text style={{ fontSize: 10, color: '#4C4C4C', marginTop: 3, }}>
                    {_quantityLoyalCurrent}
                </Text>
            </View>
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
        title={'Productos a ser recomendados por perfil del cliente'}
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

    if (isFirstRender && index > 0) {
        const setCount = (i) => {
            setIndex(index - i);
            props.time = false;
        };
        setCount(index);
    }
    isFirstRender = false;

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
                props.data.lastKNearest, props.data.currentKNearest, props.data.kneighbor),

            regression: () => buildRegression(props.data.confusionRegression, props.data.regressionDate,
                props.data.quantityLeftLast, props.data.quantityLoyalLast, props.data.quantityLeftCurrent,
                props.data.quantityLoyalCurrent, props.data.itemCountLast, props.data.itemCountCurrent,
                props.data.rowsLast, props.data.rowsCurrent, props.data.id),

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
        isFirstRender = true;
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
