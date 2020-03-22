import * as actionTypes from './actionTypes';
import axios from 'axios';

export const updateUserDataInit = () => {
    return {
        type: actionTypes.VEN_UPDATE_USER_INFO_INIT,
        loading: false,
        error: false
    };
};

export const updateUserDataSuccess = (response) => {
    return {
        type: actionTypes.VEN_UPDATE_USER_INFO_SUCCESS,
        loading: false,
        error: false,
        response: response
    };
};

export const updateUserDataError = (error) => {
    return {
        type: actionTypes.VEN_UPDATE_USER_INFO_ERROR,
        loading: false,
        error: error
    };
};

export const updateUserData = (data) => {
    console.log(data);
    return (dispatch, getState) => {
        console.log(getState("auth"))
        dispatch(updateUserDataInit());
        const url = 'https://www.luzy-s3.net:5079/luzy_api/procedures/ven_UpdateUserData';
        axios.post(url, { in_Token: getState().auth.userToken, ...data })
            .then(resp => console.log(resp))
            .catch(err => console.log(err))
    }
    return data;
}