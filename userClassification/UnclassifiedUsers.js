import {
    View
  } from 'react-native';
import React, { Component } from 'react';
import GenericAccordion from "../common/GenericAccordion";
import CONSTANTS from '../common/Constants';


export default class UnclasifiedUsers extends Component{

    constructor(props) {
        super(props);
        this.setState = {
            page: this.props.page,
        };
        
    }
    render() {
        return(
                <View>
                    <GenericAccordion
                        labelNames = {this.props.labelNames}
                        filteredProperties={["id","content", "header"]}
                        headerLabel = {'Perfil '}
                        port={CONSTANTS.PORT_CUSTOMERS}
                        content={this.props.usersList}
                        path={'/calpullix/client/detail/retreive'}
                        screen={'ClassificationUsersDetail'}
                        navigation={this.props.navigation} 
                        renderDetailButton={true}
                        titleButton={'Ver Detalle'} />
                </View>
        );
    }
}