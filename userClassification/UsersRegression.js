import React, { PureComponent } from 'react';
import { View } from 'react-native';
import CalpulliXTable from '../common/CalpulliXTable';
import Paginator from 'react-native-paginator';
import { NavigationEvents } from 'react-navigation';
import CONSTANTS from '../common/Constants';
import ApiCaller from '../api/ApiCaller';


export default class UsersRegression extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            itemsPerPage: 5,
            rows: this.props.rows,
        };
    }

    handlerPagination = (_numberPage) => {
        this.setState({
            page: _numberPage,
        });
        this.getUsersRegression(_numberPage);
    }

    getUsersRegression = async (_numberPage) => {
        const result = await ApiCaller.callApi(this.props.apiPath,
            this.getRequestUsersRegression(_numberPage),
            CONSTANTS.PORT_CUSTOMERS, CONSTANTS.POST_METHOD)
            .catch((error) => {
                console.log(error);
                this.setState({
                    errorMessage: 'Ocurrió un error favor de intentar mas tarde.',
                });
            });
        console.log(':: Result API Users Regression ', result);
        if (result.usersRegression !== null) {
            this.setState({
                rows: result.usersRegression,
                errorMessage: '',
            });
        }
    }

    getRequestUsersRegression = (_numberPage) => {
        const request = {
            "idProfile": this.props.id,
            "page": _numberPage,
        };
        return request;
    }

    cleanInput = () => {
        this.setState({
            rows: this.props.rows,
            page: 1,
        });
    }

    render() {
        const { headers, marginLeft, itemCount } = this.props;
        return (
            <View style={{ marginLeft: marginLeft }}>
                <NavigationEvents onWillFocus={() => {
                    this.cleanInput();
                }} />
                
                <CalpulliXTable
                    width={140}
                    headers={headers}
                    data={this.state.rows}
                    marginTop={10}
                    
                    textStyle={{
                        margin: 5,
                        fontSize: 9,
                    }}
                    backgroundColorView={'#F3F9FA'}
                    backgroundColorRows={'white'} />
                
                <View style={{ width: 140,  }}>
                <Paginator
                    totalItems={itemCount}
                    onChange={numberPage => this.handlerPagination(numberPage)}
                    activePage={this.state.page}
                    itemsPerPage={this.state.itemsPerPage}
                    disabled={false}
                    buttonControlStyles = {{
                        width: 140,
                    }}
                    buttonStyles={
                        {
                            backgroundColor: '#F3F9FA',
                            color: '#156869',
                            borderColor: '#156869',
                            height: 25,
                            width: 25, 
                        }
                    }
                    buttonActiveStyles={{
                        backgroundColor: '#05AAAB',
                        color: '#F3F9FA',
                        borderColor: '#05AAAB',
                        height: 25,
                        width: 25, 
                    }} />
               </View>

            </View>
        );
    }
}