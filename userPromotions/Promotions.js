import React, { PureComponent } from 'react';
import { View, Text } from "react-native";
import AcceptPromosButton from './AcceptPromotionsButton';
import OfferedPromos from './OfferedPromotions';
import stylesCommon from '../common/style';
import HeaderCalpulliX from "../common/HeaderCalpulliX";
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';


/* Quitar al solucionar bug TypeError: Network request failed*/
const dummyPromosList = {
    "promotions": [
        {
            "id": 0,
            "content": "\nId                                                      2245       \n\nNombre                                                  Promo XX   \n\nDescripcion:                                            Desc. Promo\n",
            "name": "Promo XX",
            "description": "Descripción de promoción",
            "accepted": false
        },
        {
            "id": 1,
            "content": "\nId                                                      2245       \n\nNombre                                                  Promo XX   \n\nDescripcion:                                            Desc. Promo\n",
            "name": "Promo XX",
            "description": "Descripción de promoción",
            "accepted": false
        },
        {
            "id": 2,
            "content": "\nId                                                      2245       \n\nNombre                                                  Promo XX   \n\nDescripcion:                                            Desc. Promo\n",
            "name": "Promo XX",
            "description": "Descripción de promoción",
            "accepted": false
        },
        {
            "id": 3,
            "content": "\nId                                                      2245       \n\nNombre                                                  Promo XX   \n\nDescripcion:                                            Desc. Promo\n",
            "name": "Promo XX",
            "description": "Descripción de promoción",
            "accepted": false
        },
        {
            "id": 4,
            "content": "\nId                                                      2245       \n\nNombre                                                  Promo XX   \n\nDescripcion:                                            Desc. Promo\n",
            "name": "Promo XX",
            "description": "Descripción de promoción",
            "accepted": false
        }
    ]
};

export default class Promotions extends PureComponent {
    
    constructor(props) {
        super(props);
        this.state = {
            userId:1,
            errorMessage: '',
            promosList: []
        };

        this.doAcceptPromos = this.doAcceptPromos.bind(this);
    }

    componentDidMount() {
        this.getInitialPromos(null);
    }

    getPromosRequest() {
        const request = {
            id:this.state.userId,
        };

        return request;
    }

    getInitialPromos = async (e) => {
        /*var sucessfullCall = true;
        const response = await ApiCaller.callApi('/calpullix/client/promotions',this.getPromosRequest()).catch( (error) => {
            console.log(error);
            sucessfullCall = false;
            this.setState({
                errorMessage:'Ocurrió un error al comunicarse con el servidor, intenta más rarde'
            });
        });
        if(sucessfullCall){
                this.setState({ promosList: response.promotions});
        }*/
        this.setState({
            promosList: dummyPromosList.promotions,
        });
    }

    doAcceptPromos = async (e) => {
        /*var sucessfullCall = true;
        const response = await ApiCaller.callApi('/calpullix/update/client/promotions',this.getPromosRequest()).catch( (error) => {
            console.log(error);
            sucessfullCall = false;
            this.setState({
                errorMessage:'Ocurrió un error al comunicarse con el servidor, intenta más rarde'
            });
        });
        if(sucessfullCall){
                this.setState({ promosList: [] });
        }*/
        this.setState({
            promosList:[],
        });
        
    }


    render() {
        const { promosList } = this.state;
        const { page,navigation} = this.props;
        return (
            <BackgroundScrollCalpulliX addHeight={500}>
                <View >
                <HeaderCalpulliX/>
                    <Text
                        id='errorMessage'
                        style={stylesCommon.errorMessage}
                    >
                        {this.state.errorMessage}
                    </Text>
                    <Text style={[stylesCommon.headerText]} style={{ fontSize: 25, marginLeft: '5%', marginTop: '5%', color: '#F49315' }}>Productos sin clasificar</Text>
                    <OfferedPromos
                        labelNames={{ "name": "Nombre de promoción", "description": "Descripción"}}
                        promosList={promosList}
                        page={page}

                    />
                    <AcceptPromosButton
                        doAcceptPromos = { (e) => this.doAcceptPromos(e)}
                        marginTop = {25}
                    />
                </View>
            </BackgroundScrollCalpulliX>

        );
    }

}

