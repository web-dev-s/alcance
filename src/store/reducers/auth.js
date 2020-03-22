import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    authenticated: null,
    userToken: null,
    userType: null,
    error: null,
    loading: false,
    authRedirectPath: ''
};

const authStart = (state, action) => {
    console.log('======auth START=============')
    return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {

    console.log('======auth SUCCES=============')
    return  updateObject(state, {
        userToken: action.userToken,
        userType: action.userType,
        error: null,
        loading: false,
        authenticated: true
    });

};


const authFail = (state, action) => {
    console.log('======auth FAIL=============')
    console.log(action.error)
    return updateObject(state, {
        error: action.error,
        loading: false,
        userId: null,
        userType: null,
        authenticated: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { userToken: null, userType: null, authenticated: false, });
};

const setAuthRedirectPath = (state, action) => {
    console.log('======setAuthRedirectPath=============', action.path)
    return updateObject(state, { authRedirectPath: action.path })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default:
            return state;
    }
};

export default reducer;