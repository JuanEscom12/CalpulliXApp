import React, { PureComponent } from 'react';
import { Text, View } from "react-native";
import stylesCommon from '../common/style';
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import HeaderCalpulliXBack from '../common/HeaderCalpulliXBack';
import TabUserClassification from './TabUserClassification';

export default class ClassificationUsersDetail extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const apiResponse = this.props.navigation.state.params.responseApi;
        console.log(':: API RESPONSE ', apiResponse);
        return (
            <View>
                <HeaderCalpulliXBack
                    title={'Detalle clasificación de usuarios'}
                    navigation={this.props.navigation}
                    backButton={true}
                    screen={'ClassifyUsers'} />
                <BackgroundScrollCalpulliX addHeight={260}>
                    {!apiResponse &&
                        <Text
                            id='errorMessageUsersDetail'
                            style={[stylesCommon.errorMessage, { marginTop: 5 }]}>
                            Ocurrio un error favor de intentar mas tarde
                    </Text>}
                    <Text style={{ fontSize: 14, marginLeft: '5%', marginTop: 15, marginBottom: 10, color: '#F49315' }}>
                        Detalle del análisis de clientes
                    </Text>
                    <TabUserClassification
                        profiles={apiResponse}
                        navigation={this.props.navigation}
                    />
                </BackgroundScrollCalpulliX>
            </View>
        );
    }
}

