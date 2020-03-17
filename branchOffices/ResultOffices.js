import AccordionCalpulliX from "../common/AccordionCalpulliX";
import {
    View
  } from 'react-native';
import React, { Component } from 'react';
import GenericAccordion from "../common/GenericAccordion";

export default class ResultOffices extends Component {

    render() {
        return(
                <View>
                    <GenericAccordion
                        labelNames = {this.props.labelNames}
                        content={this.props.officesList}
                        navigation={this.props.navigation} 
                        filteredProperties={["id", "header", "picture", "value"]}
                        headerLabel = {'Sucursal'}
                        renderDetailButton={false}  />
                </View>
        );
    }
}