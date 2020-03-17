import React, { PureComponent } from 'react';
import { View, Text, Alert } from "react-native";
import ClassifyButton from '../common/ClassifyButton'
import UnclasifiedUsers from './UnclassifiedUsers';
import stylesCommon from '../common/style';
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import Paginator from 'react-native-paginator';
import ApiCaller from '../api/ApiCaller';
import CONSTANTS from '../common/Constants';
import HeaderCalpulliXBack from '../common/HeaderCalpulliXBack';
import { NavigationEvents } from 'react-navigation';


export default class Users extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            itemsPerPage: 5,
            itemCount: 0,
            page: 1,
            errorMessage: '',
            lastClassificationDate: '',
            usersList: []
        };
        this.getProfilelUsers(CONSTANTS.ONE);
    }

    getProfilelUsers = async (_pageNumber) => {
        const response = await ApiCaller.callApi(
            '/calpullix/clients/retrieve', this.getProfileCustomers(_pageNumber),
            CONSTANTS.PORT_CUSTOMERS, CONSTANTS.POST_METHOD)
            .catch((error) => {
                console.log(error);
                this.setState({
                    errorMessage: 'Hubo un error favor de intentar mas tarde.',
                });
            });
        console.log(':: Initial users: ', response.clients);
        if (response.clients && response.clients.length > CONSTANTS.ZERO) {
            this.setState({
                itemCount: response.itemCount > CONSTANTS.ZERO ?
                    response.itemCount : this.state.itemCount,
                usersList: response.clients,
                errorMessage: '',
                lastClassificationDate: response.lastClassificationDate,
            });
        } else {
            this.setState({
                itemCount: 0,
                usersList: [],
                errorMessage: '',
                lastClassificationDate: '',
            });   
        }
    }

    getProfileCustomers = (_page) => {
        var date = new Date();
        var request = {
            date: date,
            page: _page
        };
        return request;
    }

    handlerPageChange = (_pageNumber) => {
        this.setState({
            page: _pageNumber
        });
        this.getProfilelUsers(_pageNumber);
    }

    startUserClassification = async () => {
        const response = await ApiCaller.callApi(
            '/calpullix/update/clients/classify', this.getProfileCustomers(this.state.page),
            CONSTANTS.PORT_CUSTOMERS, CONSTANTS.POST_METHOD)
            .catch((error) => {
                console.log(error);
                this.setState({
                    errorMessage: 'Hubo un error favor de intentar mas tarde.',
                });
            });
        console.log(':: Update: ', response.isUpdated);
        if (response.isUpdated) {
            Alert.alert("El proceso se ha iniciado de forma satisfactoria!");
            this.setState({
                errorMessage: '',
            });
        }
    }

    cleanInput = () => {
        if (this.props.navigation.state.params && 
            this.props.navigation.state.params.navigateFromMenu) {
            this.setState({
                page: 1,
                errorMessage: '',
                itemCount: 0,
                lastClassificationDate: '',
            });
            this.getProfilelUsers(CONSTANTS.ONE);
            this.props.navigation.state.params.navigateFromMenu = false;
        }
    }

    render() {
        const { page, errorMessage, itemCount, itemsPerPage, usersList, lastClassificationDate } = this.state;
        return (
            <BackgroundScrollCalpulliX addHeight={650}>
                <NavigationEvents onWillFocus={() => {
                    this.cleanInput();
                }} />
                <View >
                    <HeaderCalpulliXBack
                        title={'Clasificación de usuarios'} />
                    <Text
                        id='errorMessage'
                        style={[stylesCommon.errorMessage, {marginTop: 5}]}>
                        {errorMessage}
                    </Text>
                    <ClassifyButton
                        doProductClassification={() => {
                            this.startUserClassification()
                        }}
                        marginTop={10}
                        width={'40%'}
                        style={{ marginBottom: '5%' }}
                    />
                    <View style={{
                        borderWidth: 0.2,
                        borderColor: 'grey',
                        marginRight: 10,
                        marginLeft: 10,
                        marginTop: 20,
                    }} />
                    
                    {usersList.length !== 0 &&
                        <View style={{ marginLeft: '5%', }}>
                            <Text style={[stylesCommon.headerText]} style={{ fontSize: 17, marginTop: 15, color: '#F49315' }}>
                                Perfiles del cliente
                            </Text>
                            <Text style={[stylesCommon.headerText]} style={{ fontSize: 12, marginTop: 10, color: '#F49315' }}>
                                {'Fecha del análisis: ' + lastClassificationDate}
                            </Text>
                        </View>
                    }

                    <UnclasifiedUsers
                        navigation={this.props.navigation}
                        labelNames={{
                            "classification": "Clasificación:", // Distribucion de la clasificación
                            "branch": "Sucursales de mayor peso:", // (3) sucursales
                            "schoolingLevel": "Nivel de escolaridad mas frecuente:", 
                            "employment": "Ocupación mas frecuente:",
                            "bestProducts": "Productos de mayor consumo:", // 3 productos
                            "state": "Estados mas frecuentes:", // --> Estados (3)
                            "municipality": "Municipios mas frecuentes:", // Municipios (5)
                            "monthlyPurchases": "Promedio mensual de compras:" // --> Compras en general
                        }}
                        usersList={usersList}
                        page={page}
                        handlerNextPage={this.handlerNextPage} />

                    <Paginator
                        totalItems={itemCount}
                        onChange={pageNumber => this.handlerPageChange(pageNumber)}
                        activePage={page}
                        disabled={false}
                        itemsPerPage={itemsPerPage}
                        buttonStyles={
                            {
                                backgroundColor: '#F3F9FA',
                                color: '#156869',
                                borderColor: '#156869',
                            }
                        }
                        buttonActiveStyles={{
                            backgroundColor: '#05AAAB',
                            color: '#F3F9FA',
                            borderColor: '#05AAAB'
                        }} />
                </View>
            </BackgroundScrollCalpulliX>
        );
    }

}