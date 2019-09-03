const host = 'http://192.168.100.111:8080';

const callApi = async (_path, _request) => {
    const response = await fetch(host + _path, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            _request
        ),
    })
    const jsonResponse = await response.json();
    return jsonResponse;
}

export default {
    callApi,
} 