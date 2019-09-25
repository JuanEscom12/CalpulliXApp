import React, { Component } from 'react';
import { View,Picker,Text,TextInput} from "react-native";
import HeaderCalpulliX from "../common/HeaderCalpulliX";
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import stylesCommon from '../common/style';
import ButtonCalpulliX from '../common/ButtonCalpulliX';

export default class OfficesForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            borderColorTextInput: "#F49315",
            backgroundColorUserInput: 'transparent',
            yearText: '',
            monthText:'',
            officeNameText:'',
        };
    }

    generateMonths = () =>{
        return ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    }

    generateYears = () =>{
        var currentYear = new Date().getFullYear();
        var arrayYears = [];
        const initialYear = 1970;
        for(var i = initialYear; i <= currentYear; i++ ){
            arrayYears.push(i);
        }
        return arrayYears;
    }

    handleOnFocus = () => {
        this.setState({
            borderColorTextInput: '#05AB50',
            backgroundColorUserInput: '#C1D9CC'
        })
    }

    handleOnBlur = () => {
        this.setState({
            borderColorTextInput: '#F49315',
            backgroundColorUserInput: 'transparent'
        })
    }

    handleChangeOfficeText = (text) => {
        this.setState({
            officeNameText: text,
        });
        this.props.handlerSearchInput(this.state);
    }

    handleSelectedYearChanged = (item,index) =>{
        this.setState({
            yearText:item
        });
        this.props.handlerSearchInput(this.state);
    }

    handleSelectedMonthChanged = (item,index) => {
        this.setState({
            monthText:item
        });
        this.props.handlerSearchInput(this.state);
    }


    render(){
        let yearItems = this.generateYears().map( (year,index) => {
            return <Picker.Item key={index} value={index} label={year.toString()} />
        });

        let monthItems = this.generateMonths().map( (month,index)=>{
            return <Picker.Item  key={index} value = {index} label = {month.toString()} />
        });

        const {
            doSearch,
            marginTop
        } = this.props;
        return(
            <View>
                <View style={{marginBottom:10}}>
                    <View style={{ flexDirection: 'row'}}>
                        <Text style={{marginLeft:'5%', fontSize:15}}>
                            Año
                        </Text>
                        <Text style={{marginLeft:'40%',fontSize:15}}>
                            Mes
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row'}}>
                        <View
                        style = {{marginLeft:'5%',width:'43.75%',height:'10%'}}
                        >
                            <Picker 
                                id='pickerYear'
                                selectedValue = {this.state.yearText}
                                onValueChange = {(item,index)=>
                                    this.handleSelectedYearChanged(item,index)
                                }
                            >
                                {yearItems}
                            </Picker>
                        </View>
                        <View
                            style = {{marginLeft:'2.5%',width:'43.75%',height:'10%'}}
                        >
                            <Picker 
                                id = 'pickerMonth'
                                selectedValue = {this.state.monthText}
                                
                                onValueChange = {(item,index)=>
                                    this.handleSelectedMonthChanged(item,index)
                                }

          
                                
                            >
                                {monthItems}
                            </Picker>
                        </View>
                    </View>
                    <View >
                        <View style={{flexDirection:'row'}}>
                            <Text style={{marginLeft:'5%',fontSize:15}} >
                                Nombre de sucursal
                            </Text>
                        </View>
                        <TextInput  
                            id='inputOffice'
                            style={[
                                stylesCommon.textInputCalpulliX,
                                {
                                    width:'90%',
                                    borderColor: this.state.borderColorTextInput,
                                    backgroundColor: this.state.backgroundColorUserInput
                                }
                            ]}
                            value={this.state.officeNameText}
                            onChangeText={(text)=> this.handleChangeOfficeText(text)}
                            onFocus={()=> this.handleOnFocus()}
                            onBlur = {()=> this.handleOnBlur()}
                            placeholder = 'Ingresa el nombre de la sucursal'
                            placeholderTextColor='#9E9E9E'
                        />
                        <View  style = {{flexDirection:'row',height : 100}} >
                            <ButtonCalpulliX 
                                title = {'Buscar'}
                                id = {'buttonSearch'}
                                arrayColors = {['#05AAAB', '#048585', '#048585']}
                                onPress = {doSearch}
                                width = {'50%'}
                                height = {45}
                                marginTop = {marginTop}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}