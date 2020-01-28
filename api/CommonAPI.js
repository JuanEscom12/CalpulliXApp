import ApiCaller from '../api/ApiCaller';
import CONSTANTS from '../common/Constants';

const callBranches = async () => {
    console.log(':: Branch API ');
    var result = await ApiCaller.callApi('/calpullix/branch/list', null, 
    CONSTANTS.PORT_BRANCH, CONSTANTS.GET_METHOD);
    return result.branch;
}

export default {
    callBranches,
} 