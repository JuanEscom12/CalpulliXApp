import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import ButtonCalpulliX from '../common/ButtonCalpulliX';
import NavigatorCommons from '../navigation/NavigatorCommons';
import ApiCaller from '../api/ApiCaller';
import CONSTANTS from '../common/Constants';
import styles from './styles';
import analytics from '@react-native-firebase/analytics';

var navigate;

const labels =
{
    'Edad promedio:': 'age',
    'Entidad federativa con mayor peso demográfico:': 'state',
    'Consumo promedio mensual en promociones:': 'averagePromotions',
    'Distribución de clientes por género:': 'sex',
    'Promoción mas recurrente:': 'preferredPromotion',
    'Artículo de la promoción mas recurrente:': 'preferredItem',
    'Precio de venta del artículo: de la promoción mas recurrente': 'salePriceItem',
    'Precio de compra del artículo de la promoción mas recurrente:': 'purchasePriceItem',
    'Vigencia de la promoción mas recurrente:': 'lifePromotion',
    'Clasificación del producto de la promoción mas recurrente:': 'itemClassification',
    'Departamento del producto de la promoción mas recurrente:': 'department'
};
var isFirstRender = false;

buildTabDetail = (profileObject) => {
    var result = [];
    var detail = [];
    var index = 0;
    for (let key in labels) {
        if ((index + 1) % 2 === 0) {
            detail.push(
                this.buildContent('#F3F9FA', '\n' + key + '\n', profileObject[labels[key]] + '\n')
            );
        } else {
            detail.push(
                this.buildContent('#EDEDED','\n' + key + '\n', profileObject[labels[key]] + '\n')
            );
        }
        index++;
    }
    var backgroundButton;
    if (index % 2 == 0) {
        backgroundButton = '#EDEDED';
    } else {
        backgroundButton = '#F3F9FA';
    }
    result.push(
    <View style={[styles.scene]} >
        {detail}
        <View style={{ backgroundColor: backgroundButton, height: 100 }}>
        <ButtonCalpulliX
            title={'Elegir promociones'}
            id={'buttonDetailPromotions'}
            arrayColors={['#05AAAB', '#048585', '#048585']}
            onPress={() => this.showPromotions(profileObject['idProfile'])}
            width={'40%'}
            height={40}
            marginTop={15}
            marginBottom={50} />
        </View>
    </View>);
    return result;
}

buildContent = (_backgroundColor, _header, _detail) => {
    return (
        <View style={{ backgroundColor: _backgroundColor }}>
            <Text style={[styles.textDetail]} >{_header}</Text>
            <Text style={[styles.textDetail]}>{_detail}</Text>
        </View>
    );
}

showPromotions = async (_idProfile) => {
    console.log(':: Show Promotions ', _idProfile); 
    const response = await ApiCaller.callApi(
        '/calpullix/promotions/image/retrieve', this.getImagesPromotionRequest(_idProfile), 
        CONSTANTS.PORT_PROMOTIONS, CONSTANTS.POST_METHOD)
        .catch((error) => {
          console.log(error);
        });
    analytics().logEvent(
        'view_item_list', {
        items: response.promotions
    });
    NavigatorCommons.navigateTo(navigate, 'DetailPromotions',
    { 'responseApi': response });
}

getImagesPromotionRequest = (_idProfile) => {
    const request = {
        'idProfile': _idProfile,
        'page': 1,
    };
    console.log(':: Request Detail ', request);
    return request;
}

const TabPromotionsFunc = (props) => {
    const [index, setIndex] = React.useState(0)

    if (isFirstRender && index > 0) {
        const setCount = (i) => {
            setIndex(index -  i);
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
            labelStyle={{ color: 'black', fontSize: 9 }} />
    );
    if (props.data.length > 0) {
        [routes] = React.useState([
            { key: 'profile1', title: props.data[0].label },
            { key: 'profile2', title: props.data[1].label },
            { key: 'profile3', title: props.data[2].label },
            { key: 'profile4', title: props.data[3].label }
        ]);
        renderScene = SceneMap({
            profile1: () => buildTabDetail(props.data[0]),
            profile2: () => buildTabDetail(props.data[1]),
            profile3: () => buildTabDetail(props.data[2]),
            profile4: () => buildTabDetail(props.data[3]),
        });
    }
    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={renderTabBar}
            style={[styles.tabView]} />
    );
}

export default class TabPromotions extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const { profiles, navigation } = this.props;
        console.log(':: Profile detail ', profiles);
        var result;
        navigate = navigation;
        isFirstRender = true;
        if (profiles.length > 0) {
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
