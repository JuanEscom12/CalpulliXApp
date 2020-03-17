import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import stylesCommon from '../common/style';
import { NavigationEvents } from 'react-navigation';
import ApiCaller from '../api/ApiCaller';
import CONSTANTS from '../common/Constants';
import HeaderCalpulliXBack from "../common/HeaderCalpulliXBack";
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import CalpulliXTable from '../common/CalpulliXTable';
import Paginator from 'react-native-paginator';
import TabPromotions from './TabPromotions';


const headers = ['Id promoción', 'No. clientes', 'Ventas promoción', 'Caducidad promoción'];

export default class ProfilePromotions extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
            data: [],
            dataProfiles: [],
            itemCount: 0,
            page: 1,
            itemsPerPage: 1,
            numberCustomers: 0,
            profileName: '',
        };
        this.getAnalysisPromotion(CONSTANTS.ONE);
        this.getProfilesDetail();
    }

    getAnalysisPromotion = async (_page) => {
        console.log(':: Get Analysis promotion ');
        const result = await ApiCaller.callApi('/calpullix/analysis/products-clients/retrieve',
            this.getAnalysisPromotionRequest(_page),
            CONSTANTS.PORT_PROMOTIONS, CONSTANTS.POST_METHOD)
            .catch((error) => {
                console.log(error);
                this.setState({
                    errorMessage: 'Ocurrio un error, favor de intentar mas tarde.',
                });
            });
        if (result.promotionsProfile.length > CONSTANTS.ZERO) {
            this.setState({
                data: this.getData(result.promotionsProfile),
                itemCount: result.itemCount,
                profileName: result.profileName,
                numberCustomers: result.numberCustomers,
                errorMessage: '',
            });
        }
    }

    getData = (_promotionsProfile) => {
        var result = [];
        var row;
        for (let i = 0; i < _promotionsProfile.length; i++) {
            row = [];
            row.push(_promotionsProfile[i].promotionId);
            row.push(_promotionsProfile[i].numberCustomers);
            row.push(_promotionsProfile[i].earnings);
            row.push(_promotionsProfile[i].promotionDeadline);
            result.push(row);
        }
        return result;
    }

    getAnalysisPromotionRequest = (_page) => {
        const request = {
            "page": _page,
        };
        return request;
    }

    getProfilesDetail = async () => {
        console.log(':: Get Profiles Detail  ');
        const result = await ApiCaller.callApi('/calpullix/promotions/profile/detail/retrieve',
            this.getProfilesDetailRequest(),
            CONSTANTS.PORT_PROMOTIONS, CONSTANTS.POST_METHOD)
            .catch((error) => {
                console.log(error);
                this.setState({
                    errorMessage: 'Ocurrio un error, favor de intentar mas tarde.',
                });
            });
        if (result.profileDetail.length > CONSTANTS.ZERO) {
            this.setState({
                dataProfiles: result.profileDetail,
                errorMessage: '',
            });
        }
    }

    getProfilesDetailRequest = () => {
        var date = new Date().toDateString();
        const request = {
            "date": date,
        };
        console.log(':: Request Detail ', request);
        return request;
    }

    handlerPagination = (_page) => {
        console.log(':: Handler pagination ');
        this.getAnalysisPromotion(_page);
    }

    cleanInput = () => {
        if (this.props.navigation.state.params && 
            this.props.navigation.state.params.navigateFromMenu) {
            console.log(':: Clean Input ');
            this.getAnalysisPromotion(CONSTANTS.ONE);
            this.getProfilesDetail();
            this.setState({
                page: CONSTANTS.ONE,
            });
            this.props.navigation.state.params.navigateFromMenu = false;
        }
    }

    render() {
        return (
            <BackgroundScrollCalpulliX addHeight={720}>
                <HeaderCalpulliXBack
                    navigation={this.props.navigation}
                    title={'Promociones por perfil de clientes'} />
                <NavigationEvents
                    onWillFocus={() => {
                        this.cleanInput();
                    }} />
                <Text
                    id='errorMessagePromotions'
                    style={[stylesCommon.errorMessage, { marginTop: 5 }]}>
                    {this.state.errorMessage}
                </Text>
                <Text style={[stylesCommon.titleSectionStrong, { 
                    marginTop: 5, marginLeft: '5%' }]}>
                    Promociones para el perfil {this.state.profileName}.
                </Text>
                <Text style={[stylesCommon.titleSectionGreen, { 
                    marginTop: 5, marginLeft: '5%' }]}>
                    Total de clientes del perfil {this.state.profileName}
                    {': ' + this.state.numberCustomers}
                </Text>

                <CalpulliXTable
                    headers={headers}
                    data={this.state.data}
                    marginTop={15} />

                <Paginator
                    totalItems={this.state.itemCount}
                    onChange={numberPage => this.handlerPagination(numberPage)}
                    activePage={this.state.page}
                    disabled={false}
                    itemsPerPage={this.state.itemsPerPage}
                    buttonStyles={
                        {
                            marginTop: 15,
                            backgroundColor: '#F3F9FA',
                            color: '#156869',
                            borderColor: '#156869',
                        }
                    }
                    buttonActiveStyles={{
                        marginTop: 15,
                        backgroundColor: '#05AAAB',
                        color: '#F3F9FA',
                        borderColor: '#05AAAB'
                    }} />
                <Text style={[stylesCommon.titleSectionStrong, { marginTop: 10, marginLeft: '5%' }]}>
                    Detalle de los perfiles del cliente.
                </Text>

                <TabPromotions
                    profiles={this.state.dataProfiles}
                    navigation={this.props.navigation} />
                    
            </BackgroundScrollCalpulliX>
        );
    }
}

