import React, { PureComponent } from 'react';
import HeaderCalpulliXBack from "../common/HeaderCalpulliXBack";
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import PurchaseOrderModule from './PurchaseOrderModule';
import { View } from 'react-native';

export default class PurchaseOrder extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <HeaderCalpulliXBack
                    navigation={this.props.navigation}
                    title={"Ordenes de compra"} />
                <BackgroundScrollCalpulliX addHeight={700}>
                    <PurchaseOrderModule
                        parentProps={this.props} />
                </BackgroundScrollCalpulliX>
            </View>
        );
    }
}