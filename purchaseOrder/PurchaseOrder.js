import React, { PureComponent } from 'react';
import HeaderCalpulliXBack from "../common/HeaderCalpulliXBack";
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import PurchaseOrderModule from './PurchaseOrderModule';

export default class PurchaseOrder extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BackgroundScrollCalpulliX addHeight={700}>
                <HeaderCalpulliXBack
                    navigation={this.props.navigation}
                    title={"Ordenes de compra"} />
                <PurchaseOrderModule
                    parentProps={this.props} />
            </BackgroundScrollCalpulliX>
        );
    }
}