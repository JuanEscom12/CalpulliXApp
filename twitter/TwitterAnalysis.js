import React, { PureComponent } from 'react';
import { Text, View, Image, Alert, Dimensions } from 'react-native';
import BackgroundScrollCalpulliX from '../common/BackgroundScrollCalpulliX';
import { NavigationEvents } from 'react-navigation';
import HeaderCalpulliXBack from '../common/HeaderCalpulliXBack';
import ApiCaller from '../api/ApiCaller';
import AccordionTwitterCalpulliX from './AccordionTwitterCalpulliX';
import ButtonCalpulliX from '../common/ButtonCalpulliX';
import CONSTANTS from '../common/Constants';
import stylesCommon from '../common/style';
import {
    PieChart,
} from "react-native-chart-kit";

const color = ["#29B4B5", "#68CBCD", "#9ADDDF"];

export default class TwitterAnalysis extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            twitterDetail: [],
            errorMessage: '',
        }
        this.getTwitters();
    }

    getTwitters = async () => {
        const result = await ApiCaller.callApi('/calpullix/twitter/retrieve',
            this.getTwitterRequest(),
            CONSTANTS.TWITTER_PORT, CONSTANTS.POST_METHOD)
            .catch((error) => {
                console.log(error);
                this.setState({
                    errorMessage: 'Ocurrio un error, favor de intentar mas tarde.',
                });
            });
        if (result) {
            var twitterDetail = [];
            twitterDetail.push(
                this.getProfileImage(result)
            );
            this.setState({
                twitterDetail: twitterDetail,
            });
        } else {
            twitterDetail.push(
                <ButtonCalpulliX
                    title={'Iniciar Análisis'}
                    id={'buttonAnalysis'}
                    arrayColors={['#05AAAB', '#048585', '#048585']}
                    onPress={() => this.startAnalisis()}
                    width={'35%'}
                    height={38}
                    marginTop={25}
                    marginBottom={0} />
            );
            this.setState({
                twitterDetail: twitterDetail,
                errorMessage: 'No se encontraron resultados.',

            });
        }
    }

    getProfileImage = (_perfilInfo) => {
        return (
            <View>
                {this.getHeaderScreen(_perfilInfo)}
                <ButtonCalpulliX
                    title={'Iniciar Análisis'}
                    id={'buttonAnalysis'}
                    arrayColors={['#05AAAB', '#048585', '#048585']}
                    onPress={() => this.startAnalisis()}
                    width={'35%'}
                    height={38}
                    marginTop={10}
                    marginBottom={0} />
                {this.getAccordion(_perfilInfo)}
                {this.getPieChart(_perfilInfo)}
                {this.getCloudWords(_perfilInfo)}
            </View>);
    }

    getHeaderScreen = (_perfilInfo) => {
        var base64Image = CONSTANTS.PREFIX_BASE64 + _perfilInfo.perfilPicture;
        return (
            <View style={{ flexDirection: "row" }}>
                <Image
                    style={{
                        height: 70,
                        width: 70,
                        borderWidth: 1.5,
                        borderColor: '#746F6F',
                        borderRadius: 400 / 2,
                        marginLeft: '15%',
                    }}
                    source={{ uri: base64Image }} />
                <Text style={{ fontSize: 12, fontWeight: "bold", marginLeft: 20, marginTop: 10 }}>
                    {_perfilInfo.namePerfil + '\n'}
                    <Text style={{ fontSize: 10, marginLeft: 20, fontWeight: "normal" }}>
                        {_perfilInfo.atName}
                    </Text>
                </Text>
            </View>
        );
    }

    getAccordion = (_perfilInfo) => {
        var fields = [];
        fields.push(_perfilInfo.positiveMessages);
        fields.push(_perfilInfo.negativeMessages);
        fields.push(_perfilInfo.neutralMessages);

        return (<View style={{ marginTop: 15 }}>
            <AccordionTwitterCalpulliX
                content={fields}
                marginTop={0}
                marginLeftRowHeader={'57%'} />
        </View>);
    }

    getPieChart = (_perfilInfo) => {
        const width = Dimensions.get("window").width - 20;
        var data = this.getGraphicData(_perfilInfo.graphic);
        return (
            <View style={{
                marginTop: 10, marginLeft: '2%', backgroundColor: '#EDEDED', marginRight: '2%',
                borderWidth: 0.5, borderColor: '#4C4C4C', borderRadius: 3
            }} >
                <PieChart
                    style={{
                        marginLeft: 5,
                    }}
                    data={data}
                    width={width}
                    height={250}
                    chartConfig={{
                        backgroundColor: "#FDFDFD",
                        backgroundGradientFrom: "#FDFDFD",
                        backgroundGradientTo: "#FDFDFD",
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(190, 14, 27, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(36, 36, 35, ${opacity})`,
                        propsForLabels: {
                            fontSize: 8,
                        },
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute />
            </View>
        );
    }

    getCloudWords = (_perfilInfo) => {
        var base64WordCloud = CONSTANTS.PREFIX_BASE64 + _perfilInfo.wordCloud;
        return (
            <View style={{ marginTop: 20, width: '100%' }} >
                <View style={{ marginLeft: 'auto', marginBottom: 10, marginRight: 'auto', width: '90%' }}>
                    <Text style={{ fontSize: 11 }}>Palabras clave:</Text>

                    {_perfilInfo.keyWords.map((item, index) =>
                        this.getWord(item, index))}

                </View>
                <Image
                    style={{
                        height: 200,
                        width: '90%',
                        borderWidth: 0.5,
                        borderColor: '#746F6F',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        borderRadius: 3,
                    }}
                    source={{ uri: base64WordCloud }} />
            </View>
        );
    }

    getGraphicData = (_graphic) => {
        var result = [];
        for (var index = 0; index < _graphic.length; index++) {
            result.push(
                {
                    name: _graphic[index].name,
                    population: _graphic[index].value,
                    color: color[index],
                    legendFontColor: "#4C4C4C",
                    legendFontSize: 11
                });
        }
        return result;
    }

    getWord = (_word, _index) => {
        var result;

        result = (<Text style={{ fontSize: 11, fontWeight: 'bold' }} key={_index}>{_word}</Text>);

        return result;
    }

    getTwitterRequest = () => {
        var date = new Date().toDateString();
        const request = {
            "date": date,
        };
        console.log(':: Request Detail ', request);
        return request;
    }

    cleanInput = () => {
        if (this.props.navigation.state.params &&
            this.props.navigation.state.params.navigateFromMenu) {
            this.setState({
                errorMessage: '',
            });
            this.getTwitters();
            this.props.navigation.state.params.navigateFromMenu = false;
        }
    }

    startAnalisis = async () => {
        const result = await ApiCaller.callApi('/calpullix/twitter/start-analysis',
            this.getTwitterRequest(),
            CONSTANTS.TWITTER_PORT, CONSTANTS.GET_METHOD)
            .catch((error) => {
                console.log(error);
                this.setState({
                    errorMessage: 'Ocurrio un error, favor de intentar mas tarde.',
                });
            });
        if (result.started) {
            Alert.alert("Se ha iniciado el análisis con éxito.");
        }
    }

    render() {
        return (
            <BackgroundScrollCalpulliX addHeight={1000}>
                <NavigationEvents
                    onWillFocus={() => {
                        this.cleanInput();
                    }} />
                <HeaderCalpulliXBack
                    navigation={this.props.navigation}
                    backButton={false}
                    title={'Análisis de twitter'} />
                <Text
                    id='errorMessageTwitter'
                    style={[stylesCommon.errorMessage, { marginTop: 5 }]}>
                    {this.state.errorMessage}
                </Text>
                <View style={{ marginTop: 10 }}>
                    {this.state.twitterDetail}
                </View>
            </BackgroundScrollCalpulliX>

        );

    }

}