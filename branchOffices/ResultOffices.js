import AccordionCalpulliX from "../common/AccordionCalpulliX";
import {
    View
  } from 'react-native';
import React, { Component } from 'react';
import GenericAccordion from "../common/GenericAccordion";

export default class ResultOffices extends Component {

    render(){
        return(
                <View>
                    <GenericAccordion
                        labelNames = {this.props.labelNames}
                        filteredProperties={["id","content"]}
                        headerLabel = {'Sucursal'}
                        content={this.props.officesList}
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