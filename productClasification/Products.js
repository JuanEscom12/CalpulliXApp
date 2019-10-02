import React , { PureComponent } from 'react';
import { View,Text, StyleSheet} from "react-native";
import ClassifyButton from '../common/ClassifyButton'
import UnclasifiedProducts from './UnclasifiedProducts';
import stylesCommon from '../common/style';
import HeaderCalpulliX from "../common/HeaderCalpulliX";
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import Paginator from 'react-native-paginator';
import PaginatorStyles from '../common/paginatorStyle';

/* Quitar al solucionar bug TypeError: Network request failed*/


const dummyProductsList = {
    "productsClassify": [
        {
            "id": 0,
            "content": "\nNombre                                                  Producto X \n\nDescripcion                                             Descripcion\n\nMarca                                                   Marca YYY  \n\nTamaño                                                 25 X 10 X 12\n\nColor                                                   Amarillo   \n\nMaterial                                                Material   \n\nPrecio                                                  125.00 $   \n\nClasificaion:                                           2          \n",
            "name": "Producto X",
            "description": "Descripcion",
            "brand": "Marca YYY",
            "size": 199.1200000000000045474735088646411895751953125,
            "color": "Amarillo",
            "material": "Material",
            "price": 125,
            "classification":2,
        },
        {
            "id": 1,
            "content": "\nNombre                                                  Producto X \n\nDescripcion                                             Descripcion\n\nMarca                                                   Marca YYY  \n\nTamaño                                                 25 X 10 X 12\n\nColor                                                   Amarillo   \n\nMaterial                                                Material   \n\nPrecio                                                  125.00 $   \n\nClasificaion:                                           2          \n",
            "name": "Producto X",
            "description": "Descripcion",
            "brand": "Marca YYY",
            "size": 199.1200000000000045474735088646411895751953125,
            "color": "Amarillo",
            "material": "Material",
            "price": 125
        },
        {
            "id": 2,
            "content": "\nNombre                                                  Producto X \n\nDescripcion                                             Descripcion\n\nMarca                                                   Marca YYY  \n\nTamaño                                                 25 X 10 X 12\n\nColor                                                   Amarillo   \n\nMaterial                                                Material   \n\nPrecio                                                  125.00 $   \n\nClasificaion:                                           2          \n",
            "name": "Producto X",
            "description": "Descripcion",
            "brand": "Marca YYY",
            "size": 199.1200000000000045474735088646411895751953125,
            "color": "Amarillo",
            "material": "Material",
            "price": 125
        },
        {
            "id": 3,
            "content": "\nNombre                                                  Producto X \n\nDescripcion                                             Descripcion\n\nMarca                                                   Marca YYY  \n\nTamaño                                                 25 X 10 X 12\n\nColor                                                   Amarillo   \n\nMaterial                                                Material   \n\nPrecio                                                  125.00 $   \n\nClasificaion:                                           2          \n",
            "name": "Producto X",
            "description": "Descripcion",
            "brand": "Marca YYY",
            "size": 199.1200000000000045474735088646411895751953125,
            "color": "Amarillo",
            "material": "Material",
            "price": 125
        },
        {
            "id": 4,
            "content": "\nNombre                                                  Producto X \n\nDescripcion                                             Descripcion\n\nMarca                                                   Marca YYY  \n\nTamaño                                                 25 X 10 X 12\n\nColor                                                   Amarillo   \n\nMaterial                                                Material   \n\nPrecio                                                  125.00 $   \n\nClasificaion:                                           2          \n",
            "name": "Producto X",
            "description": "Descripcion",
            "brand": "Marca YYY",
            "size": 199.1200000000000045474735088646411895751953125,
            "color": "Amarillo",
            "material": "Material",
            "price": 125
        }
    ]
};



export default class Products extends PureComponent{


    constructor(props){
        super(props);
        this.state = {
            showClassifyButton:true,
            itemsPerPage:5,
            itemCount:30,
            page:1,
            errorMessage:'',
            productsList:[]
        };

        this.doProductClassification = this.doProductClassification.bind(this);
    }

    componentDidMount(){
        this.getInitialProducts(null);
    }

    getProductsClassifyRequest(){
        const request = {
            page:this.state.page,
            productsToClassify:this.state.productsList.map((product)=>{return product.id;}),
        };

        return request;
    }

    getInitialProducts = async(e) => {
        /*var sucessfullCall = true;
        const response = await ApiCaller.callApi('/calpullix/products/classify',this.getProductsClassifyRequest()).catch( (error) => {
            console.log(error);
            sucessfullCall = false;
            this.setState({
                errorMessage:'Ocurrió un error al comunicarse con el servidor, intenta más rarde'
            });
        });
        if(sucessfullCall){
                this.setState({ productsList: response.productsClassify,itemCount: response.itemCount});
        }*/
        this.setState({
            productsList:dummyProductsList.productsClassify,
        });
    }

    getNewProducts = async (e) => {
        let validResponse = true;
        /*let sucessfullCall = true;
        const response = await ApiCaller.callApi('/calpullix/products/classify',this.getProductsClassifyRequest()).catch( (error) => {
            console.log(error);
            sucessfullCall = false;
            this.setState({
                errorMessage:'Ocurrió un error al comunicarse con el servidor, intenta más rarde'
            });
        });
        if(sucessfullCall){
                validResponse = response.isValid;
                this.setState({ productsList: response.productsClassify});
        }*/

        this.setState({
            productsList: dummyProductsList.productsClassify,
            showClassifyButton:validResponse,
        });
    }

    doProductClassification = async() => {
        let validResponse = false;
        /*let sucessfullCall = true;
        const response = await ApiCaller.callApi('/calpullix/update/products/classify',this.getProductsClassifyRequest()).catch( (error) => {
            console.log(error);
            sucessfullCall = false;
            this.setState({
                errorMessage:'Ocurrió un error al comunicarse con el servidor, intenta más rarde'
            });
        });
        if(sucessfullCall){
                validResponse = response.isValid;
                this.setState({ productsList: response.productsClassify});
        }*/

        this.setState({
            productsList:dummyProductsList.productsClassify,
            showClassifyButton:validResponse,
        });

    }

    handlerPageChange = (pageNumber) => {
        this.setState({
            page:pageNumber,
        });
        this.getNewProducts(null);
    }


    render(){
        const {productsList,page,errorMessage,itemCount,itemsPerPage,showClassifyButton} = this.state; 
        const { navigation } = this.props;
        return(
            <BackgroundScrollCalpulliX addHeight = {500}>
                <View >
                    <HeaderCalpulliX/>
                    <Text
                        id='errorMessage'
                        style ={stylesCommon.errorMessage}
                    >
                        {errorMessage}
                    </Text>
                    {showClassifyButton &&
                        <ClassifyButton
                            doProductClassification={(e)=>{this.doProductClassification()}}
                        marginTop = {25}
                         />
                    }
                    {productsList.length != 0 &&
                        <Text style={[stylesCommon.headerText]} style={{fontSize:25, marginLeft:'5%',marginTop: 30, color:'#F49315'}}>Productos sin clasificar</Text>
                    }
                    <UnclasifiedProducts
                        navigation={navigation}
                        labelNames = {{"name":"Nombre","description":"Descripción","brand":"Marca","size":"Tamaño",
                        "color":"Color","material":"Material","price":"Precio","classification":"Clasificación"}}
                        productsList = {productsList}
                        page = {page}
                        handlerNextPage = {this.handlerNextPage}
                        
                    />
                    <Paginator
                        totalItems={itemCount}
                        onChange={pageNumber => this.handlerPageChange(pageNumber)}
                        activePage={page}
                        disabled={false}
                        itemsPerPage={itemsPerPage}
                        //buttonStyles={PaginatorStyles.Button}
                        //buttonActiveStyles={PaginatorStyles.ActiveButton}
                        buttonStyles = {
                             {
                                backgroundColor:'#F3F9FA',
                                color:'#156869',
                                borderColor:'#156869',
                                
                            }
                        }
                        buttonActiveStyles = {{
                            backgroundColor:'#05AAAB',
                            color:'#F3F9FA',
                            borderColor:'#05AAAB'
                        }}
                        />
                </View>
            </BackgroundScrollCalpulliX>

        );
    }
}