import React, { Component } from 'react';
import ButtonCalpulliX from '../common/ButtonCalpulliX';

export default class AcceptPromotionsButton extends Component {

    render() {
        const {doAcceptPromos,marginTop} = this.props;
        return (
            <ButtonCalpulliX
                title={'Aceptar promociones'}
                id={'buttonSearch'}
                arrayColors={['#05AAAB', '#048585', '#048585']}
                onPress={doAcceptPromos}
                width={'50%'}
                height={45}
                marginTop={marginTop}
            />
        );
    }
}