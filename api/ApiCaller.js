import { AsyncStorage } from 'react-native';
import CONSTANTS from '../common/Constants';

const host = 'http://192.168.100.111:';


const callApi = async (_path, _request, _port, _method) => {
    console.log(':::: REQUEST API : ', _path, JSON.stringify(_request));
    var response = executeRequest(_path, _request, _port, _method);
    var statusCode;
    var jsonResponse;
    await response.then(
        async function(response) {
            statusCode = response.status;
          }
    );
    console.log(':: Http Status ', statusCode);
    if (statusCode == 401 || statusCode == 403) {
        response = executeRequest(
            '/calpullix/login/token', '', CONSTANTS.GATEWAY, CONSTANTS.POST_METHOD);
        var authToken;
        await response.then(
            function(response) {
                authToken = response.headers.get('authorization');
              }
        );
        console.log(':: Authorization-Header ', authToken);
        AsyncStorage.setItem('token', authToken);
        token = await AsyncStorage.getItem('token');
        console.log(':: Nuevo Token ', token);
        response = executeRequest(_path, _request, _port, _method);
        await response.then(
            async function(response) {
                jsonResponse = await response.json();
                console.log(':: JSON: ', jsonResponse);
              }
        );
    } else if (_path == '/calpullix/login') {
        await response.then(
            async function(response) {
                jsonResponse = await response.json();
                console.log(':: JSON: ', jsonResponse);
              }
        );
        console.log(':: TOKEN ', jsonResponse.token);
        AsyncStorage.setItem('token', jsonResponse.token); 
        token = await AsyncStorage.getItem('token'); 
    } else {
        await response.then(
            async function(response) {
                jsonResponse = await response.json();
                console.log(':: JSON: ', jsonResponse);
              }
        );
    }
    console.log(':: Response API: ' + JSON.stringify(jsonResponse));
     return jsonResponse;
}

executeRequest = async (_path, _request, _port, _method) => {
    var response;
    var token = await AsyncStorage.getItem('token');
    console.log(':: Persisted Token ', token);
    if (_method === 'POST') {
        response = await fetch(host + CONSTANTS.GATEWAY + _path, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify(
                _request
            ),
        });
    } else {
        response = await fetch(host + CONSTANTS.GATEWAY + _path, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        });
    }
    return response;
} 

export default {
    callApi,
} 