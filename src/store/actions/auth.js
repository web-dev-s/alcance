import axios from 'axios';

import * as actionTypes from './actionTypes';
import { setShowUserInfo } from '../actions/alcance';
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};
export const authSuccess = (userToken, userType) => {

    return {
        type: actionTypes.AUTH_SUCCESS,
        userToken: userToken,
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

export const authLogin = (email, password, history, ) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            in_Email: email,
            in_Password: password,
        };
        const url = 'https://www.luzy-s3.net:5079/luzy_api/procedures/ven_LogIn'

        // let reqHeader = Object.assign({}, { "Accept": "application/json", "Content-Type": "application/json" });
        axios.post(url, authData, {})
            .then(response => {
                /* eslint eqeqeq: 0 */
                if (response.status == '200') {
                    console.log('auth login: ')

                    console.log(response);


                    // storeUsed_CredetialsLocal(email, password, userType);

                    if (response.data.result[0].Token !== null) {
                        localStorage.setItem('userType', response.data.result[0].User_Type);
                        localStorage.setItem('userToken', response.data.result[0].Token);
                        localStorage.setItem('emailUsed', email);
                        localStorage.setItem('passwordUsed', password);

                        const info = {
                            Name: response.data.result[0].Name,
                            Surname: response.data.result[0].Surname,
                            Phone: response.data.result[0].Phone,
                            Email: response.data.result[0].Email,
                            BirthDate: response.data.result[0].BirthDate,
                            IDCard: response.data.result[0].IDCard,
                            BusinessAddress: response.data.result[0].BusinessAddress,
                            BalanceMXN: response.data.result[0].BalanceMXN,
                            BalanceUSD: response.data.result[0].BalanceUSD,
                            BalanceBS: response.data.result[0].BalanceBS,
                            BusinessName: response.data.result[0].BusinessName,
                            State: response.data.result[0].State,
                            Code: response.data.result[0].Code
                        }

                        dispatch(setShowUserInfo({ showUserInfo: info }));
                        dispatch(authSuccess(response.data.result[0].Token, response.data.result[0].User_Type));
                        let redirect = '/comercio';
                        if (response.data.result[0].User_Type == 'client') redirect = '/client';
                        dispatch(setAuthRedirectPath(redirect));
                        history.push(redirect);


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
export const authRegister = (action, history, ) => {
    return dispatch => {
        dispatch(authStart());
        const authData = action;
        const url = 'https://www.luzy-s3.net:5079/luzy_api/procedures/ven_SignUp'

        console.log('=================auth register: ==authData==================');
        console.log(authData);

        // let reqHeader = Object.assign({}, { "Accept": "application/json", "Content-Type": "application/json" });
        axios.post(url, authData, {})
            .then(response => {
                console.log('=================auth register: ==response==================');
                console.log(response);
                /* eslint eqeqeq: 0 */
                if (response.status == '200') {
 

                    // storeUsed_CredetialsLocal(email, password, userType);

                    if (response.data.result[0].Token&&response.data.result[0].Token.length>2) {
                        localStorage.setItem('userType', response.data.result[0].User_Type);
                        localStorage.setItem('userToken', response.data.result[0].Token);
                        localStorage.setItem('emailUsed', response.data.result[0].Email);
                        localStorage.setItem('passwordUsed', authData.password);

                        const info = {
                            Name: response.data.result[0].Name,
                            Surname: response.data.result[0].Surname,
                            Phone: response.data.result[0].Phone,
                            Email: response.data.result[0].Email,
                            BirthDate: response.data.result[0].BirthDate,
                            IDCard: response.data.result[0].IDCard,
                            BusinessAddress: response.data.result[0].BusinessAddress,
                            BalanceMXN: response.data.result[0].BalanceMXN,
                            BalanceUSD: response.data.result[0].BalanceUSD,
                            BalanceBS: response.data.result[0].BalanceBS,
                            BusinessName: response.data.result[0].BusinessName,
                            State: response.data.result[0].State,
                            Code: response.data.result[0].Code
                        }

                        dispatch(setShowUserInfo({ showUserInfo: info }));
                        dispatch(authSuccess(response.data.result[0].Token, response.data.result[0].User_Type));
                        let redirect = '/comercio';
                        if (response.data.result[0].User_Type == 'client') redirect = '/client';
                        dispatch(setAuthRedirectPath(redirect));
                        history.push(redirect);


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
