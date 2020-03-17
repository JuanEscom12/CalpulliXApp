import React, { PureComponent } from 'react';
import { View, Text } from "react-native";
import stylesCommon from '../common/style';
import ApiCaller from '../api/ApiCaller';
import CONSTANTS from '../common/Constants';
import CalpulliXTable from '../common/CalpulliXTable';
import styles from './styles';
import Paginator from 'react-native-paginator';

export default class PromotionsProductDetail extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            itemsPerPage: 10,
            rows: this.props.rows,
            errorMessage: '',
        };
    }

    handlerPagination = (_numberPage) => {
        this.setState({
            page: _numberPage,
        });
        this.getRecomendations(_numberPage);
    }

    getRecomendations = async (_numberPage) => {
        const result = await ApiCaller.callApi(this.props.apiPath,
            this.getRequestRecomendations(_numberPage),
            CONSTANTS.PORT_CUSTOMERS, CONSTANTS.POST_METHOD)
            .catch((error) => {
                console.log(error);
                this.setState({
                    errorMessage: 'Ocurrio un error, favor de intentar mas tarde.',
                });
            });
        console.log(':: Result API Recomendations ', result);
        if (result.recomendations !== null) {
            this.setState({
                rows: result.recomendations,
                errorMessage: '',
            });
        }
    }

    getRequestRecomendations = (_numberPage) => {
        const request = {
            "idProfile": this.props.id,
            "page": _numberPage,
        };
        return request;
    }

    render() {
        const { headers, date, title, itemCount } = this.props;
        return (
            <View style={[styles.scene, { backgroundColor: '#F3F9FA' }]} >
                <View style={{ backgroundColor: '#EDEDED', marginBottom: 20 }}>
                    <Text
                        id='errorMessagePromotions'
                        style={[stylesCommon.errorMessage, { marginTop: 5 }]}>
                        {this.state.errorMessage}
                    </Text>
                    <Text style={{ fontSize: 12, marginLeft: '5%', marginTop: 10, color: '#F49315' }}>
                        {title}
                    </Text>
                    <Text style={{ fontSize: 12, marginLeft: '5%', marginTop: 10, marginBottom: 20, color: '#F49315' }}>
                        {'Hora de termino del proceso: ' + date}
                    </Text>
                </View>

                <CalpulliXTable
                    headers={headers}
                    data={this.state.rows}
                    marginTop={5}
                    textStyle={{
                        margin: 5,
                        fontSize: 9,
                    }}
                    backgroundColorView={'#F3F9FA'}
                    backgroundColorRows={'white'} />

                <Paginator
                    totalItems={itemCount}
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

            </View>
        );
    }

}