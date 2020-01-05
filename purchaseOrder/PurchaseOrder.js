import React, { PureComponent } from 'react';
import { Alert, Text, View } from 'react-native';
import stylesCommon from '../common/style';
import HeaderCalpulliXBack from "../common/HeaderCalpulliXBack";
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import ApiCaller from '../api/ApiCaller';
import CONSTANTS from '../common/Constants';


export default class PurchaseOrder extends PureComponent {

    render() {
        const { promosList,showAccept } = this.state;
        const { page,navigation} = this.props;
        return (
            <BackgroundScrollCalpulliX addHeight={500}>
                <View >
                <HeaderCalpulliXBack
                    navigation={this.props.navigation}
                    backButton={true} 
                    screen={'ClassifyUsers'}/>
                </View>
            </BackgroundScrollCalpulliX>
        );
    }
}