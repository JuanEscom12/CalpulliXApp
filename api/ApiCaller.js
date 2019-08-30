const host = 'http://10.62.197.99:8080';

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