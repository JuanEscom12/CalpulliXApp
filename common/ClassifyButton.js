import React, { Component } from 'react';
import ButtonCalpulliX from '../common/ButtonCalpulliX';

export default class ClassifyButton extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const {doProductClassification,marginTop, width} = this.props;
        return (
            <ButtonCalpulliX
                title={'Clasificar'}
                id={'buttonSearch'}
                arrayColors={['#05AAAB', '#048585', '#048585']}
                onPress={doProductClassification}
                width={width}
                height={45}
                marginTop={marginTop}
            />
        );
    }
}