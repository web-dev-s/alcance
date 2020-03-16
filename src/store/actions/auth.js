import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};
export const authSuccess = (userId, userType) => {

    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userId,
        userType: userType,
        authenticated: true
    };
};
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};
export const storeUsed_CredetialsLocal = (email, pasword, type) => {

    //only in development mode to save time reentering all the time credentials
    switch (type) {
        case 'client': {
            localStorage.setItem('emailUsed4Client', email);
            localStorage.setItem('passwordUsed4Client', pasword);
            break;
        }
        case 'comercio': {
            localStorage.setItem('emailUsed4Comercio', email);
            localStorage.setItem('passwordUsed4Comercio', pasword);
            break;
        }
        case 'control': {
            localStorage.setItem('emailUsed4Control', email);
            localStorage.setItem('passwordUsed4Control', pasword);
            break;
        }
        default: return;
    }

}

export const auth = (email, password, userType, history, isSignup, ) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            in_Email: email,
            in_Password: password,
            in_UserType: userType,
        };
        let url = 'https://www.luzy-s3.net:5079/luzy_api/procedures/ven_SignUp'
        if (!isSignup) {
            url = 'https://www.luzy-s3.net:5079/luzy_api/procedures/ven_LogIn'
        }
        // let reqHeader = Object.assign({}, { "Accept": "application/json", "Content-Type": "application/json" });
        axios.post(url, authData, {})
            .then(response => {
              /* eslint eqeqeq: 0 */
                if (response.status == '200') {
                    //   if (response) { console.log('auth login: '+JSON.stringify(response)) }

                    localStorage.setItem('userType', userType);
                    localStorage.setItem('userId', response.data.result[0].ID);
                    // storeUsed_CredetialsLocal(email, password, userType);

                    if (response.data.result[0].ID !== null) {


                        dispatch(authSuccess(response.data.result[0].ID, userType));
                        history.push('/dashboard');


                    }
                    else dispatch(authFail(response.data.Message));
                }
                else {

                    dispatch(authFail(response.message));

                }
            })
            .catch(err => {
                dispatch(authFail(err.message));
            });
    };
};


export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const userId = localStorage.getItem('userId');
        const userType = localStorage.getItem('userId');
        dispatch(authSuccess(userId, userType));
        dispatch(checkAuthTimeout((9999999999999999999999999999999999999999999999999999 - new Date().getTime()) / 1000));

    }
};
