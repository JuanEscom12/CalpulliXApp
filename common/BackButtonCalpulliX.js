import React, { PureComponent } from 'react';
import { Image, TouchableHighlight } from 'react-native';
import NavigatorCommons from '../navigation/NavigatorCommons';



export default class BackButtonCalpulliX extends PureComponent {

    goBack = (_screen, _navigation) => {
        NavigatorCommons.navigateTo(this.props.navigation, _screen);
    }

    render() {
        const {
            id,
            width,
            height,
            marginTop,
            marginLeft,
            marginRight,
            screen,
            navigation,
        } = this.props

        return (
            <TouchableHighlight
                id={id}
                style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    backgroundColor: 'transparent',
                    height: height, width: width, marginTop: marginTop,
                    marginLeft: marginLeft, marginRight: marginRight
                }}
                onPress={() => this.goBack(screen, navigation)}
                underlayColor='#05AB50'>
                <Image
                    style={{ height: '100%', width: '100%' }}
                    source={require('./arrow_back.png')} />
            </TouchableHighlight>);
    }
}


