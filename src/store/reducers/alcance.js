import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import avatar  from '../../assets/images/blankProfile.png';

const initialState = { 
    profileImage:avatar,
    showUserInfo: false,  
};
/*  // eslint-disable-line
const clientChargeAccount = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};
 // eslint-disable-line
const controlGenerateCode = (state, action) => {
    return updateObject(state, { error: null, loading: true });
}; */

/* // eslint-disable-line
const authSuccess = (state, action) => {
   console.log(JSON.stringify(action))
   return updateObject(state, {
       userId: action.userId,
       userType: action.userType,
       error: null,
       loading: false,
       authenticated: true
   });
};
// eslint-disable-line
const authFail = (state, action) => {
   return updateObject(state, {
       error: action.error,
       loading: false,
       userId: null,
       userType: null,
       authenticated: false
   });
};
// eslint-disable-line
const authLogout = (state, action) => {
   return updateObject(state, { userId: null, userType: null, authenticated: false, });
};
*/
const setShowUserInfo = (state, action) => {
 
    return updateObject(state, { showUserInfo: action.showUserInfo })
}
const setProfileImage = (state, action) => {
 
    return updateObject(state, { profileImage: action.profileImage })
}
const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.VEN_CLIENT_CHARGE_ACCOUNT: return setAuthRedirectPath(state, action);
        case actionTypes.VEN_CLIENT_GET_TRANSACTIONS_LIST: return setAuthRedirectPath(state, action);
        case actionTypes.VEN_CLIENT_APPROVE_PAYMENT_TRANSFER: return setAuthRedirectPath(state, action);
        case actionTypes.VEN_CLIENT_GET_DETAILS: return setAuthRedirectPath(state, action);

        case actionTypes.VEN_COMERCIO_GET_TRANSACTIONS_LIST: return setAuthRedirectPath(state, action);
        case actionTypes.VEN_COMERCIO_ADD_PAYMENT_REQUEST: return setAuthRedirectPath(state, action);
        case actionTypes.VEN_COMERCIO_GET_DETAILS: return setAuthRedirectPath(state, action);

        case actionTypes.VEN_CONTROL_GET_DETAILS: return setAuthRedirectPath(state, action);
        case actionTypes.VEN_CONTROL_GET_TRANSACTIONS_LIST: return setAuthRedirectPath(state, action);
        case actionTypes.VEN_CONTROL_GENERATE_CODE: return setAuthRedirectPath(state, action);

        case actionTypes.VEN_LOCAL_SHOW_USER_INFO: return setShowUserInfo(state, action);
        case actionTypes.VEN_LOCAL_SAVE_PROFILE_IMAGE: return setProfileImage(state, action);

        default:
            return state;
    }
};

export default reducer;
