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
    Text
} from 'react-native';
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import CONSTANTS from '../common/Constants';


/* Quitar al solucionar bug TypeError: Network request failed*/

const dummyBestBranch = {
    "branch": [
        {
            "id": 0,
            "content": "\nLatitud                                                19.349106\n\nLongitud                                               -99.0942395\n\nTotal de ventas                                         9.0942395\n\nTotal de perdidas                                       99.0942395\n\nBalance                                                 23.90\n",
            "balance": 10,
            "latitude": "19.349106",
            "longitude": "-99.0942395",
            "totalLosses": 10,
            "totalSales": 10
        },
        {
            "id": 1,
            "content": "\nLatitud                                                19.349106\n\nLongitud                                               -99.0942395\n\nTotal de ventas                                         9.0942395\n\nTotal de perdidas                                       99.0942395\n\nBalance                                                 23.90\n",
            "balance": 10,
            "latitude": "19.349106",
            "longitude": "-99.0942395",
            "totalLosses": 10,
            "totalSales": 10
        },
        {
            "id": 2,
            "content": "\nLatitud                                                19.349106\n\nLongitud                                               -99.0942395\n\nTotal de ventas                                         9.0942395\n\nTotal de perdidas                                       99.0942395\n\nBalance                                                 23.90\n",
            "balance": 10,
            "latitude": "19.349106",
            "longitude": "-99.0942395",
            "totalLosses": 10,
            "totalSales": 10
        },
        {
            "id": 3,
            "content": "\nLatitud                                                19.349106\n\nLongitud                                               -99.0942395\n\nTotal de ventas                                         9.0942395\n\nTotal de perdidas                                       99.0942395\n\nBalance                                                 23.90\n",
            "balance": 10,
            "latitude": "19.349106",
            "longitude": "-99.0942395",
            "totalLosses": 10,
            "totalSales": 10
        },
        {
            "id": 4,
            "content": "\nLatitud                                                19.349106\n\nLongitud                                               -99.0942395\n\nTotal de ventas                                         9.0942395\n\nTotal de perdidas                                       99.0942395\n\nBalance                                                 23.90\n",
            "balance": 10,
            "latitude": "19.349106",
            "longitude": "-99.0942395",
            "totalLosses": 10,
            "totalSales": 10
        }
    ]
};


const dummyBranchSearched = {
    "id": 1,
    "content": "\nLatitud                                                19.349106\n\nLongitud                                               -99.0942395\n\nTotal de ventas                                        9.0942395\n\nTotal de perdidas                                      99.0942395\n\nBalance                                                23.90\n",
    "balance": 10,
    "latitude": "19.349106",
    "longitude": "-99.0942395",
    "totalLosses": 10,
    "totalSales": 10
}

export default class Offices extends PureComponent {

    constructor(props) {
        // Call API.
        super(props);
        this.state = {
            errorMessage: '',
            officeName: '',
            year: '',
            month: '',
            officesList: [],
            regions: this.getInitialRegion(),
            markers: this.getInitialMarkers(),
            // Initial Branch Name, 
            // Initial Branch Address 
        };
        this.doSearch = this.doSearch.bind(this);
    }

    getInitialMarkers() {
        return [
            { latitude: 19.53, longitude: -99.10 },
            { latitude: 19.43, longitude: -99.10 },
            { latitude: 19.33, longitude: -99.12 },
        ];
    }


    getInitialRegion() {
        return {
            latitude: 19.39623,
            longitude: -99.03682,
            longitudeDelta: 1,
            latitudeDelta: 1,
        }
    }

    componentDidMount() {
        this.getBestOffices(null);
    }

    getBestOffices = async (e) => {
        /*var sucessfullCall = true;
        const response = await ApiCaller.callApiGET('/calpullix/best/branch',
            null, CONSTANTS.PORT_BRANCH, CONSTANTS.GET_METHOD
        ).catch( (error) => {
            console.log(error);
            sucessfullCall = false;
            this.setState({
                errorMessage:'Ocurrió un error al comunicarse con el servidor, intenta más rarde'
            });
        });
        if(sucessfullCall){
                this.setState({ officesList: response.branch});
        }*/
        this.setState({
            officesList: dummyBestBranch.branch,
        });

    }

    getRegionOfBranch(branch) {
        const coords = {
            latitude: Number(branch.latitude),
            longitude: Number(branch.longitude),
            longitudeDelta: 1,
            latitudeDelta: 1,
        };
        return coords;
    }

    getMarkerOfBranch(branch) {

        const marker = {
            latitude: Number(branch.latitude),
            longitude: Number(branch.longitude),
        };

        return marker;
    }



    doSearch = async (e) => {
        if (this.isValidOfficeSearch()) {
            /* const response = await ApiCaller.callApi('/calpullix/branch', 
                this.getSearchBranchRequest(), CONSTANTS.PORT_BRANCH, CONSTANTS.POST_METHOD)
                .catch((error) => {
                console.log(error);
                this.setState({
                    errorMessage: 'Ocurrio un error, intenta más tarde'
                })
            });
            if(response.isValid){
                //Renderizar resultado en componente acordeon
                this.setState({
                    officesList : response
                });
            }*/
            this.clearSearch();
            this.setState({
                officesList: [dummyBranchSearched],
                regions: this.getRegionOfBranch(dummyBranchSearched),
                markers: [this.getMarkerOfBranch(dummyBranchSearched)],
            });
        }
    }

    handlerSearchInput = (_State) => {
        this.setState({
            officeName: _State.officeNameText,
            year: _State.yearText,
            month: _State.monthText,
        });
    }

    getSearchBranchRequest() {
        const { officeName, year, month } = this.state;
        const request = {
            "name": officeName,
            "year": year,
            "month": month
        };
        return request;
    }

    isValidOfficeSearch() {
        const { year, month, officeName } = this.state;
        if ((year != '' || month != '') && officeName === '') {
            this.setState({
                errorMessage: 'El nombre de la oficina es requerido también.'
            });
            return false;
        } else
            if ((year === '' && month === '') && officeName === '') {
                this.setState({
                    errorMessage: 'El nombre de la sucursal es requerido.'
                });
                return false;
            } else {
                return true;
            }
    }

    clearSearch = () => {
        this.setState({
            officeName: '',
            year: '',
            month: '',
        });
    }

    render() {
        const { officesList } = this.state;
        let branchMarkers = this.state.markers.map((marker, index) => {
            return <MapView.Marker key={index} coordinate={marker} title={'Nombre de la sucursal'} description={'Direccion'} />;
        });
        return (
            <BackgroundScrollCalpulliX addHeight={800}>
                <View >
                    <HeaderCalpulliXBack
                         title={'Sucursales'} />
                    <Text
                        id='errorMessage'
                        style={stylesCommon.errorMessage}>
                        {this.state.errorMessage}
                    </Text>
                    <SearchingOffice
                        doSearch={(e) => this.doSearch(e)}
                        handlerSearchInput={this.handlerSearchInput}
                        cleanSearch={this.cleanSearch}
                        marginTop={10}
                    />
                    <View style={{
                        borderWidth: 0.2,
                        borderColor: 'grey',
                        marginRight: 10,
                        marginLeft: 10,
                        marginBottom: 20,
                    }} />
                    <Text style={[stylesCommon.headerText]} style={{ fontSize: 20, marginLeft: '5%', color: '#F49315' }}>Resultados</Text>
                    <ResultOffices
                        labelNames={
                            { "balance": "Balance", "latitude": "Latitud", "longitude": "Longitud", "totalLosses": "Pérdidas Totales", "totalSales": "Ventas Totales" }}
                        officesList={officesList}
                    />

                    <View style={styles.container}>
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            style={styles.map}
                            region={{
                                latitude: 37.78825,
                                longitude: -122.4324,
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.0121,
                            }}
                            region={this.state.regions}
                            zoomEnabled={true}
                            minZoomLevel={11} >
                            {branchMarkers}
                        </MapView>
                    </View>

                </View>
            </BackgroundScrollCalpulliX>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: 400,
        borderColor: '#F49315',
        borderWidth: 0.5,
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