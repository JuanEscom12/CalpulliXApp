import React, { PureComponent } from 'react';
import { Text, TouchableHighlight } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


export default class ButtonCalpulliX extends PureComponent {

    render() {
        const {
            title,
            id,
            width,
            height,
            onPress,
            arrayColors,
            marginTop,
            marginBottom,
        } = this.props

        return (
            <TouchableHighlight
                style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    backgroundColor: 'transparent',
                    height: height, width: width, marginTop: marginTop,
                    marginBottom: marginBottom
                }}
                onPress={onPress}
                underlayColor='#05AB50'>
                <LinearGradient
                    colors={arrayColors}
                    style={{
                        flex: 1,
                        borderRadius: 5,
                        width: '100%',
                        height: '100%',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}>
                    <Text id={id}
                        style={{
                            fontSize: 14,
                            marginTop: 10,
                            textAlign: 'center',
                            color: '#ffffff',
                            backgroundColor: 'transparent',
                            height: '100%'
                        }}>
                        {title}
                    </Text>
                </LinearGradient>
            </TouchableHighlight>);
    }
}


