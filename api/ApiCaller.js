const host = 'http://192.168.100.111:';


const callApi = async (_path, _request, _port, _method) => {
    console.log(':: REQUEST: ', JSON.stringify(_request));
    var response;
    if (_method === 'POST') {
        response = await fetch(host + _port + _path, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                _request
            ),
        });
    } else {
        response = await fetch(host + _port + _path, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
    }
    const jsonResponse = await response.json();
    console.log(':: Response API: ' + JSON.stringify(jsonResponse));
     return jsonResponse;
}

export default {
    callApi,
} 