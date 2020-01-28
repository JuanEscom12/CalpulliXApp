import React, { PureComponent } from 'react';
import { View, Text } from "react-native";
import ClassifyButton from '../common/ClassifyButton'
import UnclasifiedUsers from './UnclassifiedUsers';
import stylesCommon from '../common/style';
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import Paginator from 'react-native-paginator';
import ApiCaller from '../api/ApiCaller';
import CONSTANTS from '../common/Constants';
import HeaderCalpulliXBack from '../common/HeaderCalpulliXBack';


const dummyUsersList = {
    "clients": [
        {
            "id": 0,
            "name": "Nombre XX",
            "age": 25,
            "gender": "Masculino",
            "job": "Ingeniero",
            "postalCode": "59200",
            "contact": "5524789078",
            "sales": 900.0,
            "content": "\nId                                                      2245       \n\nNombre                                                  Nombre XX  \n\nEdad                                                    25         \n\nSexo                                                    Masculino  \n\nOcupacion                                               Ingeniero  \n\nC.P.                                                    59200      \n\nContacto                                                5524789078 \n\nCompras                                                 900 $      \n\nClasificacion:                                          10         \n",
            "classification": null
        },
        {
            "id": 1,
            "name": "Nombre XX",
            "age": 25,
            "gender": "Masculino",
            "job": "Ingeniero",
            "postalCode": "59200",
            "contact": "5524789078",
            "sales": 900.0,
            "content": "\nId                                                      2245       \n\nNombre                                                  Nombre XX  \n\nEdad                                                    25         \n\nSexo                                                    Masculino  \n\nOcupacion                                               Ingeniero  \n\nC.P.                                                    59200      \n\nContacto                                                5524789078 \n\nCompras                                                 900 $      \n\nClasificacion:                                          10         \n",
            "classification": null
        },
        {
            "id": 2,
            "name": "Nombre XX",
            "age": 25,
            "gender": "Masculino",
            "job": "Ingeniero",
            "postalCode": "59200",
            "contact": "5524789078",
            "sales": 900.0,
            "content": "\nId                                                      2245       \n\nNombre                                                  Nombre XX  \n\nEdad                                                    25         \n\nSexo                                                    Masculino  \n\nOcupacion                                               Ingeniero  \n\nC.P.                                                    59200      \n\nContacto                                                5524789078 \n\nCompras                                                 900 $      \n\nClasificacion:                                          10         \n",
            "classification": null
        },
        {
            "id": 3,
            "name": "Nombre XX",
            "age": 25,
            "gender": "Masculino",
            "job": "Ingeniero",
            "postalCode": "59200",
            "contact": "5524789078",
            "sales": 900.0,
            "content": "\nId                                                      2245       \n\nNombre                                                  Nombre XX  \n\nEdad                                                    25         \n\nSexo                                                    Masculino  \n\nOcupacion                                               Ingeniero  \n\nC.P.                                                    59200      \n\nContacto                                                5524789078 \n\nCompras                                                 900 $      \n\nClasificacion:                                          10         \n",
            "classification": null
        },
        {
            "id": 4,
            "name": "Nombre XX",
            "age": 25,
            "gender": "Masculino",
            "job": "Ingeniero",
            "postalCode": "59200",
            "contact": "5524789078",
            "sales": 900.0,
            "content": "\nId                                                      2245       \n\nNombre                                                  Nombre XX  \n\nEdad                                                    25         \n\nSexo                                                    Masculino  \n\nOcupacion                                               Ingeniero  \n\nC.P.                                                    59200      \n\nContacto                                                5524789078 \n\nCompras                                                 900 $      \n\nClasificacion:                                          10         \n",
            "classification": null
        }
    ]
};


export default class Users extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            itemsPerPage: 5,
            itemCount: 30,
            page: 1,
            errorMessage: '',
            usersList: []
        };

        this.doUserClassification = this.doUserClassification.bind(this);
    }

    componentDidMount() {
        this.getInitialUsers(null);
    }

    getUsersClassifyRequest() {
        const request = {
            page: this.state.page,
            usersToClassify: this.state.usersList.map((user) => { return user.id; }),
        };

        return request;
    }


    getInitialUsers = async (e) => {
        /*var sucessfullCall = true;
        const response = await ApiCaller.callApi('/calpullix/clients',
        this.getUsersClassifyRequest(), CONSTANTS.PORT_CUSTOMERS, CONSTANTS.POST_METHOD)
        .catch( (error) => {
            console.log(error);
            sucessfullCall = false;
            this.setState({
                errorMessage:'Ocurrió un error al comunicarse con el servidor, intenta más rarde'
            });
        });
        if(sucessfullCall){
                this.setState({ usersList: response.clients});
        }*/
        this.setState({
            usersList: dummyUsersList.clients,
        });
    }

    getNewUsers = async (e) => {
        /*var sucessfullCall = true;
        const response = await ApiCaller.callApi('/calpullix/clients',
            this.getUsersClassifyRequest(), , CONSTANTS.PORT_CUSTOMERS, CONSTANTS.POST_METHOD)
            .catch( (error) => {
            console.log(error);
            sucessfullCall = false;
            this.setState({
                errorMessage:'Ocurrió un error al comunicarse con el servidor, intenta más rarde'
            });
        });
        if(sucessfullCall){
                this.setState({ usersList: response.clients,itemCount:response.itemCount});
        }*/
        this.setState({
            usersList: dummyUsersList.clients,
        });
        //setTimeout(() => {this.setState({productsList:dummyUsersList.clients})},500);
    }

    doUserClassification = async (e) => {
        /*var sucessfullCall = true;
        const response = await ApiCaller.callApi('/calpullix/update/clients/classify',
        this.getUsersClassifyRequest(), CONSTANTS.PORT_CUSTOMERS, CONSTANTS.POST_METHOD)
        .catch( (error) => {
            console.log(error);
            sucessfullCall = false;
            this.setState({
                errorMessage:'Ocurrió un error al comunicarse con el servidor, intenta más rarde'
            });
        });
        if(sucessfullCall){
                this.setState({ usersList: response.clients});
        }*/
        this.setState({
            usersList: dummyUsersList.clients,
        });
    }


    handlerPageChange = (pageNumber) => {
        this.setState({
            page: pageNumber,
        });
        this.getNewUsers(null);
    }


    render() {
        const { page, errorMessage, itemCount, itemsPerPage, usersList } = this.state;
        return (
            <BackgroundScrollCalpulliX addHeight={500}>
                <View >
                    <HeaderCalpulliXBack 
                        title={'Clasificación de usuarios'} />
                    <Text
                        id='errorMessage'
                        style={stylesCommon.errorMessage}>
                       {errorMessage} 
                    </Text>
                    <ClassifyButton
                        doProductClassification={(e) => { this.doUserClassification(e) }}
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
                    {usersList.length != 0 &&
                        <Text style={[stylesCommon.headerText]} style={{ fontSize: 20, marginLeft: '5%', marginTop: 30, color: '#F49315' }}>Usuarios sin clasificar</Text>
                    }
                    <UnclasifiedUsers
                        navigation={this.props.navigation}
                        labelNames={{
                            "name": "Nombre", "age": "Edad", "gender": "Sexo", "job": "Ocupación",
                            "postalCode": "Código Postal", "contact": "Contacto", "sales": "Ventas", "classification": "Clasificación"
                        }}
                        usersList={usersList}
                        page={page}
                        handlerNextPage={this.handlerNextPage}
                    />
                    <Paginator
                        totalItems={itemCount}
                        onChange={pageNumber => this.handlerPageChange(pageNumber)}
                        activePage={page}
                        disabled={false}
                        itemsPerPage={itemsPerPage}
                        buttonStyles = {
                            {
                               backgroundColor:'#F3F9FA',
                               color:'#156869',
                               borderColor:'#156869',
                               
                           }
                       }
                       buttonActiveStyles = {{
                           backgroundColor:'#05AAAB',
                           color:'#F3F9FA',
                           borderColor:'#05AAAB'
                       }} />
                </View>
            </BackgroundScrollCalpulliX>
        );
    }

}