import {
    View
  } from 'react-native';
import React, { Component } from 'react';
import GenericAccordion from "../common/GenericAccordion";

export default class UnclasifiedProducts extends Component{

    constructor(props){
        super(props);
        this.setState = {
            page: this.props.state,
        };
    }
    render(){
        return(
                <View>
                    <GenericAccordion
                        labelNames = {this.props.labelNames}
                        filteredProperties={["id","content"]}
                        headerLabel = {'ID de producto'}
                        content={this.props.productsList}
                        path={'/calpullix/login'}
                        screen={'ForgotUserPassword'}
                        navigation={this.props.navigation} 
                        renderDetailButton={false}
                        titleButton={'Ver Detalle'} 
                    />
                </View>
        );
    }
}