import React, { Component } from 'react';
import { View,Picker,Text,TextInput} from "react-native";
import HeaderCalpulliX from "../common/HeaderCalpulliX";
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import stylesCommon from '../common/style';
import ButtonCalpulliX from '../common/ButtonCalpulliX';
import  PickerCalpulliX  from '../common/PickerCalpulliX';


var functionClearPicker;

export default class OfficesForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            borderColorTextInput: "#F49315",
            backgroundColorUserInput: '#FDFDFD',
            yearText: '',
            monthText:'',
            officeNameText:'',
        };
    }

    generateMonths = () =>{
        return [
            {
                color:'#2660A4',
                name:'Enero',
                value:1
            },
            {
                color:'#FF6B35',
                name:'Febrero',
                value:2
            },
            {
                color:'#2660A4',
                name:'Marzo',
                value:3
            },
            {
                color:'#FF6B35',
                name:'Abril',
                value:4
            },
            {
                color:'#2660A4',
                name:'Mayo',
                value:5
            },
            {
                color:'#FF6B35',
                name:'Junio',
                value:5
            },
            {
                color:'#2660A4',
                name:'Julio',
                value:6
            },
            {
                color:'#FF6B35',
                name:'Julio',
                value:7
            },
            {
                color:'#2660A4',
                name:'Agosto',
                value:8
            },
            {
                color:'#FF6B35',
                name:'Septiembre',
                value:9
            },
            {
                color:'#2660A4',
                name:'Octubre',
                value:10
            },
            {
                color:'#FF6B35',
                name:'Noviembre',
                value:11
            },
            {
                color:'#2660A4',
                name:'Diciembre',
                value:12
            },
        ];
    }

    generateYears = () =>{
        let currentYear = new Date().getFullYear();
        let arrayYears = [];
        const initialYear = 1970;
        for(var i = initialYear; i <= currentYear; i++ ){
            arrayYears.push({
                color: (initialYear % 2 == 0 ? '#FF6B35' :'#2660A4'),
                name:""+i,
                value:i-initialYear+1,
            });
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
            backgroundColorUserInput: '#FDFDFD'
        })
    }

    handleChangeOfficeText = (text) => {
        this.setState({
            officeNameText: text,
        });
        this.props.handlerSearchInput(this.state);
    }

    handleSelectedYearChanged = (value) =>{
        this.setState({
            yearText:value
        });
        this.props.handlerSearchInput(this.state);
    }

    handleSelectedMonthChanged = (value) => {
        this.setState({
            monthText:value
        });
        this.props.handlerSearchInput(this.state);
    }

    setFunctionClearPicker = (_clear) => {
        functionClearPicker = _clear;
      }

    render(){

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
                        <Text style={{marginLeft:'45%',fontSize:15}}>
                            Mes
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row'}}>
                        <View
                        style = {{marginLeft:'2.5%',width:'44%',height:'10%'}} >
                            <PickerCalpulliX
                                data={this.generateYears()}
                                updateState={(item) =>this.handleSelectedYearChanged(item)}
                                placeholder={'Año'}
                                labelFunction={item => item.name}
                                functionClearPicker={this.setFunctionClearPicker} />
                        </View>
                        <View
                            style = {{marginLeft:'6%',width:'44%',height:'10%'}} >
                            <PickerCalpulliX
                                data={this.generateMonths()}
                                updateState={this.handleSelectedMonthChanged}
                                placeholder={'Mes'}
                                labelFunction={item => item.name}
                                functionClearPicker={this.setFunctionClearPicker} />
                        </View>
                    </View>
                    <View >
                        <View style={{flexDirection:'row',marginTop:'5%'}}>
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
                            placeholder = '    Ingresa el nombre de la sucursal'
                            placeholderTextColor='#9E9E9E'
                        />
                        <View  style = {{flexDirection:'row',height : 70}} >
                            <ButtonCalpulliX 
                                title = {'Buscar'}
                                id = {'buttonSearch'}
                                arrayColors = {['#05AAAB', '#048585', '#048585']}
                                onPress = {doSearch}
                                width = {'40%'}
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