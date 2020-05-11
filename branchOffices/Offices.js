import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import ResultOffices from './ResultOffices';
import SearchingOffice from './SearchingOffice';
import ApiCaller from '../api/ApiCaller';
import React, { PureComponent } from 'react';
import stylesCommon from '../common/style'
import HeaderCalpulliXBack from '../common/HeaderCalpulliXBack';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import CONSTANTS from '../common/Constants';
import { NavigationEvents } from 'react-navigation';
import Carousel from 'react-native-snap-carousel';
import Paginator from 'react-native-paginator';


const branchesInformation = {
    "name": "Nombre",
    "manager": "Gerente",
    "address": "Dirección",
    "contact": "Contacto",
    "state": "Estado",
    "municipality": "Municipio",
    "postalCode": "Código Postal",
    "region": "Región",
    "numberEmployes": "Número de empledaos",
    "periodPayroll": "Nómina Mensual",
    "periodIsr": "I.S.R. mensual",
    "monthlyRent": "Renta mensual",
    "periodDeductions": "Deducciones del periodo",
    "periodPurchases": "Compras del periodo",
    "periodSales": "Ventas del periodo",
    "periodLosses": "Merma del periodo",
    "periodThefts": "Perdidas del periodo",
    "periodBalance": "Balance del periodo",
    "periodServices": "Servicios de internet y teléfono del periodo",
    "periodMaintenance": "Total de mantenimiento del periodo",
    "periodElectricity": "Servicio de electricidad del periodo",
};

export default class Offices extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
            officesList: [],
            region: null,
            markers: null,
            imagesReferenceCarousel: [],
            imagesCarousel: [],
            year: null,
            month: null,
            branchId: null,
            itemCount: 0,
            page: 1,
            itemsPerPage: 5,
        };
        this.getOffices(this.getBranchrequest(CONSTANTS.ONE));
    }

    getOffices = async (_request) => {
        const response = await ApiCaller.callApi('/calpullix/branch/retrieve',
            _request, CONSTANTS.PORT_BRANCH, CONSTANTS.POST_METHOD
        ).catch((error) => {
            console.log(error);
            this.setState({
                errorMessage: 'Ocurrio un error, favor de intentar mas tarde'
            });
        });
        if (response.branches.length > CONSTANTS.ZERO) {
            this.setState({
                officesList: response.branches,
                region: this.getRegion(response),
                markers: this.getMarkers(response),
                imagesReferenceCarousel: this.getImagesReferenceCarousel(response),
                imagesCarousel: this.getImagesCarousel(response),
                itemCount: response.itemCount,
                errorMessage: '',
            });
        } else {
            this.setState({
                officesList: [],
                region: null,
                markers: null,
                imagesReferenceCarousel: [],
                imagesCarousel: [],
                itemCount: 0,
            });
        }
    }

    getImagesReferenceCarousel = (_response) => {
        var result = [];
        for (var index = 0; index < _response.branches.length; index++) {
            result.push({
                title: _response.branches[index].name,
            });
        }
        return result;
    }

    getImagesCarousel = (_response) => {
        var result = [];
        for (var index = 0; index < _response.pictures.length; index++) {
            result.push(CONSTANTS.PREFIX_BASE64 + _response.pictures[index]);
        }
        return result;
    }

    getBranchrequest = (_page) => {
        return {
            "page": _page
        };
    }

    getRegion = (_responseApi) => {
        return {
            latitude: Number(_responseApi.latitudeRegion),
            longitude: Number(_responseApi.longitudeRegion),
            longitudeDelta: 1,
            latitudeDelta: 1,
        };
    }

    getMarkers = (_responseApi) => {
        var result = [];
        for (var index = 0; index < _responseApi.markers.length; index++) {
            var marker = {
                latitude: Number(_responseApi.markers[index].latituide),
                longitude: Number(_responseApi.markers[index].longitude)
            };
            result.push(
                <MapView.Marker key={index} coordinate={marker} title={_responseApi.markers[index].name}
                    description={_responseApi.markers[index].address} />
            );
        }
        return result;
    }

    cleanInput = () => {
        if (this.props.navigation.state.params &&
            this.props.navigation.state.params.navigateFromMenu) {
            this.getOffices(this.getBranchrequest(CONSTANTS.ONE));
            this.setState({
                year: null,
                month: null,
                branchId: null,
                page: 1,
            });
        }
    }

    _renderItem = ({ item, index }) => {
        return (
            <View style={{
                backgroundColor: 'transparent', height: 140, width: 310,
                marginLeft: 'auto', marginRight: 'auto', marginBottom: 30,
                borderWidth: 0, marginTop: 15,
            }}>
                <Image
                    style={{
                        height: 110,
                        width: 310,
                        borderWidth: 1,
                        borderColor: '#746F6F',
                        resizeMode: 'stretch',
                        borderWidth: 0.5,
                        borderColor: '#F6A338',
                    }}
                    source={{ uri: this.state.imagesCarousel[index] }} />
                <View style={{ backgroundColor: '#4C4C4C', height: 30, width: 310, }}>
                    <Text style={{
                        fontSize: 10,
                        color: 'white',
                        top: 5,
                        textAlign: 'center',
                    }} >
                        {item.title}
                    </Text>
                </View>
            </View>
        );
    }

    handleSnapToItem(index) {
        console.log("snapped to ", index)
    }


    setYear = (_year) => {
        this.setState({
            year: _year,
        });
    }

    setMonth = (_month) => {
        this.setState({
            month: _month,
        });
    }

    setBranchId = (_branchId) => {
        this.setState({
            branchId: _branchId,
        });
    }

    handlerPagination = (numberPage) => {
        this.setState({
            page: numberPage,
        });
        this.getOffices(this.getPaginatorRequest(numberPage));
    }

    getPaginatorRequest = (_page) => {
        var result = {
            "id": this.state.branchId,
            "year": this.state.year,
            "month": this.state.month,
            "page": _page,
        };
        return result;
    }


    render() {
        const { officesList, markers } = this.state;

        return (
            <View>
                <HeaderCalpulliXBack
                    title={'Sucursales'} />
                <BackgroundScrollCalpulliX addHeight={2100}>
                    <View >
                        <NavigationEvents onWillFocus={() => {
                            this.cleanInput();
                        }} />
                        <Text
                            id='errorMessage'
                            style={[stylesCommon.errorMessage, { marginTop: 5 }]}>
                            {this.state.errorMessage}
                        </Text>
                        <SearchingOffice
                            doSearch={this.getOffices}
                            marginTop={5}
                            navigationParent={this.props.navigation}
                            setYear={this.setYear}
                            setMonth={this.setMonth}
                            setBranchId={this.setBranchId}
                            page={this.state.page} />

                        <View style={{
                            borderWidth: 0.2,
                            borderColor: 'grey',
                            marginRight: 10,
                            marginLeft: 10,
                            marginBottom: 20,
                        }} />
                        <Text style={[stylesCommon.headerText]} style={{ fontSize: 16, marginLeft: '5%', color: '#F49315' }}>
                            Sucursales
                    </Text>

                        <ResultOffices
                            labelNames={branchesInformation}
                            officesList={officesList} />

                        <Paginator
                            totalItems={this.state.itemCount}
                            onChange={numberPage => this.handlerPagination(numberPage)}
                            activePage={this.state.page}
                            disabled={false}
                            itemsPerPage={this.state.itemsPerPage}
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

                        <Carousel
                            ref={(c) => { this._carousel = c; }}
                            data={this.state.imagesReferenceCarousel}
                            renderItem={this._renderItem.bind(this)}
                            onSnapToItem={this.handleSnapToItem.bind(this)}
                            sliderWidth={350}
                            itemWidth={320}
                            firstItem={0}
                            layout={'tinder'} />


                        <View style={styles.container}>
                            <MapView
                                provider={PROVIDER_GOOGLE}
                                style={styles.map}
                                region={this.state.region}
                                zoomEnabled={true}
                                minZoomLevel={12} >
                                {markers}
                            </MapView>
                        </View>

                    </View>
                </BackgroundScrollCalpulliX>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: 550,
        borderColor: '#F49315',
        borderWidth: 0.5,
        marginTop: 20,

    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',

    },
});