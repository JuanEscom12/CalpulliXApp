import {
    View
  } from 'react-native';
import React, { Component } from 'react';
import GenericAccordion from "../common/GenericAccordion";


export default class UnclasifiedUsers extends Component{

    constructor(props){
        super(props);
        this.setState = {
            page: this.props.page,
        };
    }
    render(){
        
        return(
                <View>
                    <GenericAccordion
                        labelNames = {this.props.labelNames}
                        filteredProperties={["id","content"]}
                        headerLabel = {'ID de cliente'}
                        content={this.props.usersList}
                        path={'/calpullix/client/promotions'}
                        screen={'ClientPromotions'}
                        navigation={this.props.navigation} 
                        renderDetailButton={true}
                        titleButton={'Ver Detalle'} 
                    />
                </View>
        );
    }
}