import React, { PureComponent } from 'react';
import {
    View, Image, StyleSheet
} from 'react-native';

export default class TopLogin extends PureComponent {

    render() {
        return (
            <View style={{ width: '100%', height: 110 }} >
                <Image
                    style={{
                        height: 84, marginLeft: 'auto', marginRight: 'auto',
                        marginTop: 40, width: '95%',
                        transform: [
                            { scaleX: 0.7 },
                            { scaleY: 0.7 }
                          ]
                    }}
                    source={require('./logo_CalpulliX.png')} />
            </View>

        );
    }
}

