
const isValidRegExp = (_value, _regExp, _isEmpty) => {
    console.log(':: REQUEST: ', _value, _regExp);
    var result = false;
    if (_isEmpty && isEmpty(_value)) {
        result = true;
    } else if (!_isEmpty && !isEmpty(_value) && _regExp.test(_value)) {
        result = true;
    }
    console.log(':: RESULT REGEXP ', result);
    return result;
}

const isEmpty = (_value) => {
    return (_value === '' || _value == null || _value == undefined);
}

export default {
    isValidRegExp,
    isEmpty,
} 