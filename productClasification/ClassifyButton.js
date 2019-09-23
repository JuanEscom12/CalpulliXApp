import React, { Component } from 'react';
import ButtonCalpulliX from '../common/ButtonCalpulliX';

export default class ClassifyButton extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }





    render() {
        const {doProductClassification,marginTop} = this.props;
        return (
            <ButtonCalpulliX
                title={'Clasificar'}
                id={'buttonSearch'}
                arrayColors={['#05AAAB', '#048585', '#048585']}
                onPress={doProductClassification}
                width={'50%'}
                height={45}
                marginTop={marginTop}
            />
        );
    }
}