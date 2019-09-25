import React , { PureComponent } from 'react';
import { View,Text} from "react-native";
import ClassifyButton from './ClassifyButton'
import UnclasifiedProducts from './UnclasifiedProducts';
import stylesCommon from '../common/style';
import HeaderCalpulliX from "../common/HeaderCalpulliX";
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';


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
            "price": 125
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
            page:0,
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
                this.setState({ productsList: response.productsClassify});
        }*/
        this.setState({
            productsList:dummyProductsList.productsClassify,
        });
    }

    doProductClassification = async(e) => {
        /*var sucessfullCall = true;
        const response = await ApiCaller.callApi('/calpullix/update/products/classify',this.getProductsClassifyRequest()).catch( (error) => {
            console.log(error);
            sucessfullCall = false;
            this.setState({
                errorMessage:'Ocurrió un error al comunicarse con el servidor, intenta más rarde'
            });
        });
        if(sucessfullCall){
                this.setState({ productsList: response.productsClassify});
        }*/
        this.setState({
            productsList:dummyProductsList.productsClassify,
        });
    }

    handlerNextPage = (_State) => {
        this.setState({
            page:_State.page,
        });
    }


    render(){
        const {productsList,page} = this.state; 
        return(
            <BackgroundScrollCalpulliX addHeight = {500}>
                <View >
                    <HeaderCalpulliX/>
                    <Text
                        id='errorMessage'
                        style ={stylesCommon.errorMessage}
                    >
                        {this.state.errorMessage}
                    </Text>
                    <ClassifyButton
                        doProductClassification={(e)=>{this.doProductClassification(e)}}
                        marginTop = {25}
                    />
                    <Text style={[stylesCommon.headerText]} style={{fontSize:25,marginLeft:'5%',marginTop:'5%',color:'#F49315'}}>Productos sin clasificar</Text>
                    <UnclasifiedProducts
                        labelNames = {{"name":"Nombre","description":"Descripción","brand":"Marca","size":"Tamaño","color":"Color","material":"Material","price":"Precio"}}
                        productsList = {productsList}
                        page = {page}
                        handlerNextPage = {this.handlerNextPage}
                        
                    />
                </View>
            </BackgroundScrollCalpulliX>

        );
    }

}