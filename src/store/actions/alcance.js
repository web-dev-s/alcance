import * as a from './actionTypes';
import { makeRequest } from '../api/apiCall';
import * as APIConstant from '../api/apiConstant';
import { apiErrorHandler } from "../api/errorHandle";
import moment from 'moment'

export const userLogin = (userData) => {
    return (dispatch, getState) => {
        let state = getState()
        return makeRequest(state.appReducer.baseURL + APIConstant.VEN_LOGIN, 'post', userData)
            .then((response) => {
                if (response && response.data && response.data.status === '200') {


                    return Promise.resolve({
                        token: response.data.result[0].Token,
                        status: response.data.status,
                        message: 'Successfully login'
                    });
                } else {
                    if (response && response.data && response.data.Message) {
                        return Promise.resolve({
                            status: response.data.status,
                            message: response.data.Message
                        });
                    } else {
                        return Promise.resolve({
                            status: response.data.status,
                            message: 'something went wrong'
                        });
                    }
                }
            })
            .catch((error) => {
                // return Promise.reject(error);
                return dispatch(apiErrorHandler(error));
            })
    };
};
export const userRegistration = (userData) => {
    return (dispatch, getState) => {
        let state = getState()
        return makeRequest(state.appReducer.baseURL + APIConstant.VEN_SIGNUP, 'post', userData)
            .then((response) => {
                if (response && response.data && response.data.status === '200') {
                    dispatch({
                        type: a.VEN_SIGNUP,
                        payload: response.data.result[0],
                    });

                    return Promise.resolve({
                        token: response.data.result[0].Token,
                        status: response.data.status,
                        message: 'Successfully signup'
                    });
                } else {
                    if (response && response.data && response.data.Message) {
                        return Promise.resolve({
                            status: response.data.status,
                            message: response.data.Message
                        });
                    } else {
                        return Promise.resolve({
                            status: response.data.status,
                            message: 'something went wrong'
                        });
                    }
                }
            })
            .catch((error) => {
                // return Promise.reject(error);
                return dispatch(apiErrorHandler(error));
            })
    };
};
export const setShowUserInfo = actionData => {
    console.log('---actions---setShowUserInfo---dispatch ------------------')

    return (dispatch, getState) => {

        dispatch({
            type: a.VEN_LOCAL_SHOW_USER_INFO,
            showUserInfo: actionData.showUserInfo,
        });

    };
};
export const updateUserData = actionData => {
    return (dispatch, getState) => {
        /*  let state = getState();  */
        console.log('---actions---updateUserData---sent------------------')
        console.log(actionData.data)
        return makeRequest(
            APIConstant.S3_BASE_URL + APIConstant.VEN_UPDATE_USER_DATA,
            'post',
            actionData.data,
        )
            .then(response => {
                console.log('------actions-----updateUserData---------------------')
                console.log(response)

                if (response && response.data && response.data.status === '200') {
                    const info = {
                        Name: response.data.result[0].Name,
                        Surname: response.data.result[0].Surname,
                        Phone: response.data.result[0].Phone,
                        Email: response.data.result[0].Email,
                        BirthDate: response.data.result[0].BirthDate,
                        IDCard: response.data.result[0].IDCard,
                        Picture: response.data.result[0].Picture,
                        BusinessName: response.data.result[0].BusinessName,
                        BusinessAddress: response.data.result[0].BusinessAddress,
                        State: response.data.result[0].State,
                    }

                    dispatch(setShowUserInfo({ showUserInfo: info }));
                    return Promise.resolve({
                        data: response.data,
                        status: response.data.status,
                        message: response.data.Message,
                    });
                } else {
                    if (response && response.data.Message) {
                        return Promise.resolve({
                            status: response.data.status,
                            message: response.data.Message,
                        });
                    } else {
                        return Promise.resolve({
                            status: response.data.status,
                            message: 'Something went wrong',
                        });
                    }
                }
            })
            .catch(error => {
                // return Promise.reject(error);
                return dispatch(apiErrorHandler(error));
            });
    };
};

export const generateTransferCode = actionData => {
    return (dispatch, getState) => {
        /*  let state = getState();  */


        return makeRequest(
            APIConstant.S3_BASE_URL + APIConstant.VEN_GENERATE_TRANSFER_CODE,
            'post',
            actionData.data,
        )
            .then(response => {
                console.log('------actions-----generateTransferCode---------------------')
                console.log(response)

                if (response && response.data && response.data.status === '200') {
                    return Promise.resolve({
                        data: response.data,
                        status: response.data.status,
                        message: response.data.Message,
                    });
                } else {
                    if (response && response.data.Message) {
                        return Promise.resolve({
                            status: response.data.status,
                            message: response.data.Message,
                        });
                    } else {
                        return Promise.resolve({
                            status: response.data.status,
                            message: 'Something went wrong',
                        });
                    }
                }
            })
            .catch(error => {
                // return Promise.reject(error);
                return dispatch(apiErrorHandler(error));
            });
    };
};

export const getAllTransactionsForUser = actionData => {
    return (dispatch, getState) => {
        /*  let state = getState();  */

        console.log(actionData)
        return makeRequest(
            APIConstant.S3_BASE_URL + APIConstant.VEN_GET_ALL_TRANSACTIONS,
            'post',
            actionData.data,
        )
            .then(response => {
                console.log('--------actions---getAllTransactionsForUser---------------------')
                console.log(response)

                if (response && response.data && response.data.status === '200') {
                    return Promise.resolve({
                        data: response.data,
                        status: response.data.status,
                        message: response.data.Message,
                    });
                } else {
                    if (response && response.data.Message) {
                        return Promise.resolve({
                            status: response.data.status,
                            message: response.data.Message,
                        });
                    } else {
                        return Promise.resolve({
                            status: response.data.status,
                            message: 'Something went wrong',
                        });
                    }
                }
            })
            .catch(error => {
                // return Promise.reject(error);
                return dispatch(apiErrorHandler(error));
            });
    };
};
export const getExchangeRate = actionData => {
    return (dispatch, getState) => {
        /*  let state = getState();  */

        return makeRequest(
            'https://www.luzy-s3.net:5079/luzy_api/getExchangeCost',//+ APIConstant.VEN_GET_EXCHANGE_RATE,
            'post',
            actionData.data,
        )
            .then(response => {
                console.log('--------actions---getExchangeRate---------------------')
                console.log(response)

                if (response && response.data && response.data.status === '200') {

                    //  dispatch(updateBallance({ BalanceUSD: response.data.result.BalanceUSD, BalanceMXN: response.data.result.BalanceMXN, BalanceBS: response.data.result.BalanceBS }));
                    return Promise.resolve({
                        data: response.data,
                        status: response.data.status,
                        message: response.data.Message,
                    });
                } else {
                    if (response && response.data.Message) {
                        return Promise.resolve({
                            status: response.data.status,
                            message: response.data.Message,
                        });
                    } else {
                        return Promise.resolve({
                            status: response.data.status,
                            message: 'Something went wrong',
                        });
                    }
                }
            })
            .catch(error => {
                // return Promise.reject(error);
                return dispatch(apiErrorHandler(error));
            });
    };
};

export const exchangeCurrencies = actionData => {
    return (dispatch, getState) => {
        /*  let state = getState();  */

        return makeRequest(
            APIConstant.S3_BASE_URL_WITH_PORT + APIConstant.VEN_EXCHANGE_CURRENCIES,
            'post',
            actionData.data,
        )
            .then(response => {
                console.log('--------actions---getAllTransactionsForUser---------------------')
                console.log(response)

                if (response && response.data && response.data.status === '200') {

                    dispatch(updateBallance({ BalanceUSD: response.data.result.BalanceUSD, BalanceMXN: response.data.result.BalanceMXN, BalanceBS: response.data.result.BalanceBS }));
                    return Promise.resolve({
                        data: response.data,
                        status: response.data.status,
                        message: response.data.Message,
                    });
                } else {
                    if (response && response.data.Message) {
                        return Promise.resolve({
                            status: response.data.status,
                            message: response.data.Message,
                        });
                    } else {
                        return Promise.resolve({
                            status: response.data.status,
                            message: 'Something went wrong',
                        });
                    }
                }
            })
            .catch(error => {
                // return Promise.reject(error);
                return dispatch(apiErrorHandler(error));
            });
    };
};
export const updateBallance = actionData => {


    return (dispatch, getState) => {

        dispatch({
            type: a.VEN_UPDATE_BALLANCE,
            BalanceUSD: actionData.BalanceUSD,
            BalanceMXN: actionData.BalanceMXN,
            BalanceBS: actionData.BalanceBS
        });

    };
};
export const rechargeBallances = actionData => {
    return (dispatch, getState) => {
        /*  let state = getState();  */

        return makeRequest(
            APIConstant.S3_BASE_URL + APIConstant.VEN_RECHARGE_BALLANCE,
            'post',
            actionData.data,
        )
            .then(response => {
                console.log('--------actions---rechargeBallances---------------------')
                console.log(response)

                if (response && response.data && response.data.status === '200') {
                    const actionData = { BalanceUSD: response.data.result[0].BalanceUSD, BalanceMXN: response.data.result[0].BalanceMXN, BalanceBS: response.data.result[0].BalanceBS }
                    console.log('--------actions---rechargeBallances---------------------')
                    console.log(actionData)

                    dispatch(updateBallance(actionData));
                    return Promise.resolve({
                        data: response.data,
                        status: response.data.status,
                        message: response.data.Message,
                    });
                } else {
                    if (response && response.data.Message) {
                        return Promise.resolve({
                            status: response.data.status,
                            message: response.data.Message,
                        });
                    } else {
                        return Promise.resolve({
                            status: response.data.status,
                            message: 'Something went wrong',
                        });
                    }
                }
            })
            .catch(error => {
                // return Promise.reject(error);
                return dispatch(apiErrorHandler(error));
            });
    };
};
export const requestPayment = actionData => {
    return (dispatch, getState) => {
        /*  let state = getState();  */
        console.log('--------actions---requestPayment---sent------------------')
        console.log(actionData.data)
        return makeRequest(
            APIConstant.S3_BASE_URL + APIConstant.VEN_REQUEST_PAYMENT,
            'post',
            actionData.data,
        )
            .then(response => {
                console.log('--------actions---requestPayment---------------------')
                console.log(response)

                if (response && response.data && response.data.status === '200') {

                    //  console.log('--------actions---requestPayment---------------------')
                    //  console.log(actionData)

                    return Promise.resolve({
                        data: response.data,
                        status: response.data.status,
                        message: response.data.Message,
                    });
                } else {
                    if (response && response.data.Message) {
                        return Promise.resolve({
                            status: response.data.status,
                            message: response.data.Message,
                        });
                    } else {
                        return Promise.resolve({
                            status: response.data.status,
                            message: 'Something went wrong',
                        });
                    }
                }
            })
            .catch(error => {
                // return Promise.reject(error);
                return dispatch(apiErrorHandler(error));
            });
    };
};

export const getPendingPayments = actionData => {
    return (dispatch, getState) => {
        /*  let state = getState();  */
        console.log('--------actions---getPendingPayments---sent------------------')
        console.log(actionData.data)
        return makeRequest(
            APIConstant.S3_BASE_URL + APIConstant.VEN_GET_PENDING_PAYMENTS,
            'post',
            actionData.data,
        )
            .then(response => {
                console.log('--------actions---getPendingPayments---------------------')
                console.log(response)

                if (response && response.data && response.data.status === '200') {

                    //  console.log('--------actions---requestPayment---------------------')
                    //  console.log(actionData)

                    return Promise.resolve({
                        data: response.data,
                        status: response.data.status,
                        message: response.data.Message,
                    });
                } else {
                    if (response && response.data.Message) {
                        return Promise.resolve({
                            status: response.data.status,
                            message: response.data.Message,
                        });
                    } else {
                        return Promise.resolve({
                            status: response.data.status,
                            message: 'Something went wrong',
                        });
                    }
                }
            })
            .catch(error => {
                // return Promise.reject(error);
                return dispatch(apiErrorHandler(error));
            });
    };
};
export const approvePendingPayment = actionData => {

    return (dispatch, getState) => {
        console.log('--------actions---approvePendingPayment---sent-----------')
        console.log(actionData.data)
        return makeRequest(
            APIConstant.S3_BASE_URL + APIConstant.VEN_APROVE_PAYMENT,
            'post',
            actionData.data,
        )
            .then(response => {

                console.log('--------actions---approvePendingPayment--------')
                console.log(actionData.data)


                if (response && response.data && response.data.status === '200') {
                    const actionData = { BalanceUSD: response.data.result[0].BalanceUSD, BalanceMXN: response.data.result[0].BalanceMXN, BalanceBS: response.data.result[0].BalanceBS }
                    console.log('--------actions---rechargeBallances---------------------')
                    console.log(actionData)

                    dispatch(updateBallance(actionData));
                    return Promise.resolve({
                        data: response.data,
                        status: response.data.status,
                        message: response.data.Message,
                    });
                } else {
                    if (response && response.data.Message) {
                        return Promise.resolve({
                            status: response.data.status,
                            message: response.data.Message,
                        });
                    } else {
                        return Promise.resolve({
                            status: response.data.status,
                            message: 'Something went wrong',
                        });
                    }
                }
            })
            .catch(error => {
                // return Promise.reject(error);
                return dispatch(apiErrorHandler(error));
            });
    };
};
export const refreshBallances = actionData => {

    return (dispatch, getState) => {
        console.log('--------actions---refreshBallances---sent-----------')
        console.log(actionData.data)
        return makeRequest(
            APIConstant.S3_BASE_URL + APIConstant.VEN_REFRESH_BALLANCE,
            'post',
            actionData.data,
        )
            .then(response => {

                console.log('--------actions---refreshBallances--------')
                console.log(actionData.data)


                if (response && response.data && response.data.status === '200') {
                    const actionData = { BalanceUSD: response.data.result[0].BalanceUSD, BalanceMXN: response.data.result[0].BalanceMXN, BalanceBS: response.data.result[0].BalanceBS }
                    console.log('--------actions---rechargeBallances---in refreshBallances----------')
                    console.log(actionData)

                    dispatch(updateBallance(actionData));
                    return Promise.resolve({
                        data: response.data,
                        status: response.data.status,
                        message: response.data.Message,
                    });
                } else {
                    if (response && response.data.Message) {
                        return Promise.resolve({
                            status: response.data.status,
                            message: response.data.Message,
                        });
                    } else {
                        return Promise.resolve({
                            status: response.data.status,
                            message: 'Something went wrong',
                        });
                    }
                }
            })
            .catch(error => {
                // return Promise.reject(error);
                return dispatch(apiErrorHandler(error));
            });
    };
};
export const setProfileImage = actionData => {

    console.log(actionData)
    var tmppath0 = URL.createObjectURL(actionData.data[0]);

    var path = (window.URL || window.webkitURL).createObjectURL(actionData.data[0]);

    var tmppath = path.substring(path.indexOf(path.split(':')[1]), path.length - 1);

    console.log('path', path);
    const data = new FormData();
 /*    data.append("file", {
        name: actionData.data.name,
        type:actionData.data.type,//response.type,
        uri: tmppath//Constant.isANDROID ? response.uri : response.uri.replace("content://", "")
    }); */
    data.append('image', actionData.data[0])
    console.log(data)
   
   
   // userUploadFile(actionData.profileImag);
    /* return (dispatch, getState) => {

        dispatch({
            type: a.VEN_LOCAL_SAVE_PROFILE_IMAGE,
            profileImage: actionData.profileImage,
        });

    } */

};

export const saveProfileImage = actionData => {
    return (dispatch, getState) => {
        /*  let state = getState();  */
        console.log('---actions---setProfileImage---sent------------------')
        console.log(actionData.data)
        return makeRequest(
            APIConstant.S3_BASE_URL + APIConstant.VEN_UPDATE_USER_DATA,
            'post',
            actionData.data,
        )
            .then(response => {
                console.log('------actions-----updateUserData---------------------')
                console.log(response)

                if (response && response.data && response.data.status === '200') {
                    const info = {
                        Name: response.data.result[0].Name,
                        Surname: response.data.result[0].Surname,
                        Phone: response.data.result[0].Phone,
                        Email: response.data.result[0].Email,
                        BirthDate: response.data.result[0].BirthDate,
                        IDCard: response.data.result[0].IDCard,
                        Picture: response.data.result[0].Picture,
                        BusinessName: response.data.result[0].BusinessName,
                        BusinessAddress: response.data.result[0].BusinessAddress,
                        State: response.data.result[0].State,
                    }

                    dispatch(setShowUserInfo({ showUserInfo: info }));
                    return Promise.resolve({
                        data: response.data,
                        status: response.data.status,
                        message: response.data.Message,
                    });
                } else {
                    if (response && response.data.Message) {
                        return Promise.resolve({
                            status: response.data.status,
                            message: response.data.Message,
                        });
                    } else {
                        return Promise.resolve({
                            status: response.data.status,
                            message: 'Something went wrong',
                        });
                    }
                }
            })
            .catch(error => {
                // return Promise.reject(error);
                return dispatch(apiErrorHandler(error));
            });
    };
};
//used globally in app, for any upload file needed to get in return a link for passing it to another api call
export const userUploadFile = (data) => {
    return (dispatch, getState) => {
        let state = getState()
        console.log('actions-> before userUploadPicture-> ');
        return makeRequest(APIConstant.S1_UPLOAD_URL, 'post', data, { "Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded" })
            .then((response) => {

                console.log('actions->userUploadPicture->raw  stringified' + JSON.stringify(response.result));


                // return (dispatch, getState) => {
                //
                //     dispatch({
                //         type: a.VEN_LOCAL_SAVE_PROFILE_IMAGE,
                //         profileImage: actionData.profileImage,
                //     });
                //
                // }

                /* if (response && response.data && response.status == '200') {
                    return Promise.resolve({
                        status: response.status,
                        url: response.data.FileURL
                    });
                } else {
                    if (response && response.data) {
                        return Promise.resolve({
                            status: response.status,
                        });
                    } else {
                        return Promise.resolve({
                            status: response.status,
                            message: 'something went wrong'
                        });
                    }
                } */
            })
            .catch((error) => {
                // return Promise.reject(error);
                return dispatch(apiErrorHandler(error));
            })
    };
};
















/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




//details:
export const clientGetDetails = actionData => {
    // console.log('clientGetDetails Client details:' + JSON.stringify(actionData));
    /*   {
          in_UserID:"9"
        } */

    return (dispatch, getState) => {
        /*  let state = getState();  */
        return makeRequest(
            APIConstant.S3_BASE_URL + APIConstant.VEN_CLIENT_GET_DETAILS,
            'post',
            actionData.data,
        )
            .then(response => {
                //     console.log('clientGetDetails Client details response:' + JSON.stringify(response));
                if (response && response.data && response.data.status === '200') {
                    /*  dispatch({
                         type: a.VEN_CLIENT_GET_DETAILS,
                         payload: response.data.result,
                     }); */
                    return Promise.resolve({
                        data: response.data,
                        status: response.data.status,
                        message: response.data.Message,
                    });
                } else {
                    if (response && response.data.Message) {
                        return Promise.resolve({
                            status: response.data.status,
                            message: response.data.Message,
                        });
                    } else {
                        return Promise.resolve({
                            status: response.data.status,
                            message: 'Something went wrong',
                        });
                    }
                }
            })
            .catch(error => {
                // return Promise.reject(error);
                return dispatch(apiErrorHandler(error));
            });
    };
};
export const comercioGetDetails = actionData => {

    /*   {
         in_ID:"2"
        } */

    return (dispatch, getState) => {
        /*  let state = getState();  */
        return makeRequest(
            APIConstant.S3_BASE_URL + APIConstant.VEN_COMERCIO_GET_DETAILS,
            'post',
            actionData.data,
        )
            .then(response => {
                if (response && response.data && response.data.status === '200') {
                    /*   dispatch({
                          type: a.VEN_COMERCIO_GET_DETAILS,
                          payload: response.data.result,
                      }); */
                    return Promise.resolve({
                        data: response.data,
                        status: response.data.status,
                        message: response.data.Message,
                    });
                } else {
                    if (response && response.data.Message) {
                        return Promise.resolve({
                            status: response.data.status,
                            message: response.data.Message,
                        });
                    } else {
                        return Promise.resolve({
                            status: response.data.status,
                            message: 'Something went wrong',
                        });
                    }
                }
            })
            .catch(error => {
                // return Promise.reject(error);
                return dispatch(apiErrorHandler(error));
            });
    };
};
export const controlGetDetails = actionData => {

    /*   
        {
             in_ID:"2"
        }
        */

    return (dispatch, getState) => {
        /*  let state = getState();  */
        return makeRequest(
            APIConstant.S3_BASE_URL + APIConstant.VEN_CONTROL_GET_DETAILS,
            'post',
            actionData.data,
        )
            .then(response => {
                if (response && response.data && response.data.status === '200') {
                    /*  dispatch({
                         type: a.VEN_CONTROL_GET_DETAILS,
                         payload: response.data.result,
                     }); */
                    return Promise.resolve({
                        data: response.data,
                        status: response.data.status,
                        message: response.data.Message,
                    });
                } else {
                    if (response && response.data.Message) {
                        return Promise.resolve({
                            status: response.data.status,
                            message: response.data.Message,
                        });
                    } else {
                        return Promise.resolve({
                            status: response.data.status,
                            message: 'Something went wrong',
                        });
                    }
                }
            })
            .catch(error => {
                // return Promise.reject(error);
                return dispatch(apiErrorHandler(error));
            });
    };
};

//transactions history:
export const clientGetTransactionHistory = actionData => {

    /*   {
          in_ClientID:"2"
        } */

    return (dispatch, getState) => {
        /*  let state = getState();  */
        return makeRequest(
            APIConstant.S3_BASE_URL + APIConstant.VEN_CLIENT_GET_TRANSACTIONS_LIST,
            'post',
            actionData.data,
        )
            .then(response => {
                if (response && response.data && response.data.status === '200') {
                    /*  dispatch({
                         type: a.VEN_CLIENT_GET_TRANSACTIONS_LIST,
                         payload: response.data.result,
                     }); */
                    return Promise.resolve({
                        data: response.data,
                        status: response.data.status,
                        message: response.data.Message,
                    });
                } else {
                    if (response && response.data.Message) {
                        return Promise.resolve({
                            status: response.data.status,
                            message: response.data.Message,
                        });
                    } else {
                        return Promise.resolve({
                            status: response.data.status,
                            message: 'Something went wrong',
                        });
                    }
                }
            })
            .catch(error => {
                // return Promise.reject(error);
                return dispatch(apiErrorHandler(error));
            });
    };
};
export const comercioGetTransactionHistory = actionData => {

    /*   {
          in_ComercioID :"2"
        } */

    return (dispatch, getState) => {
        /*  let state = getState();  */
        return makeRequest(
            APIConstant.S3_BASE_URL + APIConstant.VEN_COMERCIO_GET_TRANSACTIONS_LIST,
            'post',
            actionData.data,
        )
            .then(response => {
                if (response && response.data && response.data.status === '200') {
                    /*  dispatch({
                         type: a.VEN_CONTROL_GET_TRANSACTIONS_LIST,
                         payload: response.data.result,
                     }); */
                    return Promise.resolve({
                        data: response.data,
                        status: response.data.status,
                        message: response.data.Message,
                    });
                } else {
                    if (response && response.data.Message) {
                        return Promise.resolve({
                            status: response.data.status,
                            message: response.data.Message,
                        });
                    } else {
                        return Promise.resolve({
                            status: response.data.status,
                            message: 'Something went wrong',
                        });
                    }
                }
            })
            .catch(error => {
                // return Promise.reject(error);
                return dispatch(apiErrorHandler(error));
            });
    };
};
export const controlGetTransactionHistory = actionData => {

    /*  {
      in_ControlID:"2"
        } */

    return (dispatch, getState) => {
        /*  let state = getState();  */
        return makeRequest(
            APIConstant.S3_BASE_URL + APIConstant.VEN_CONTROL_GET_TRANSACTIONS_LIST,
            'post',
            actionData.data,
        )
            .then(response => {
                if (response && response.data && response.data.status === '200') {
                    /* dispatch({
                        type: a.VEN_CONTROL_GET_TRANSACTIONS_LIST,
                        payload: response.data.result,
                    }); */
                    return Promise.resolve({
                        data: response.data,
                        status: response.data.status,
                        message: response.data.Message,
                    });
                } else {
                    if (response && response.data.Message) {
                        return Promise.resolve({
                            status: response.data.status,
                            message: response.data.Message,
                        });
                    } else {
                        return Promise.resolve({
                            status: response.data.status,
                            message: 'Something went wrong',
                        });
                    }
                }
            })
            .catch(error => {
                // return Promise.reject(error);
                return dispatch(apiErrorHandler(error));
            });
    };
};


// transfer amount
export const controlGenerateCode = actionData => {
    return (dispatch, getState) => {
        /*  let state = getState();  */
        return makeRequest(
            APIConstant.S3_BASE_URL + APIConstant.VEN_CONTROL_GENERATE_CODE,
            'post',
            actionData.data,
        )
            .then(response => {
                if (response && response.data && response.data.status === '200') {
                    return Promise.resolve({
                        data: response.data,
                        status: response.data.status,
                        message: response.data.Message,
                    });
                } else {
                    if (response && response.data.Message) {
                        return Promise.resolve({
                            status: response.data.status,
                            message: response.data.Message,
                        });
                    } else {
                        return Promise.resolve({
                            status: response.data.status,
                            message: 'Something went wrong',
                        });
                    }
                }
            })
            .catch(error => {
                // return Promise.reject(error);
                return dispatch(apiErrorHandler(error));
            });
    };
};
export const clientChargeAccount = actionData => {

    /*   {
         in_ClientID:"4",
         in_Code:"5"
        } */

    return (dispatch, getState) => {
        /*  let state = getState();  */
        return makeRequest(
            APIConstant.S3_BASE_URL + APIConstant.VEN_CLIENT_CHARGE_ACCOUNT,
            'post',
            actionData.data,
        )
            .then(response => {
                if (response && response.data && response.data.status === '200') {
                    /* dispatch({
                        type: a.VEN_CLIENT_CHARGE_ACCOUNT,
                        payload: response.data.result,
                    }); */
                    return Promise.resolve({
                        data: response.data,
                        status: response.data.status,
                        message: response.data.Message,
                    });
                } else {
                    if (response && response.data.Message) {
                        return Promise.resolve({
                            status: response.data.status,
                            message: response.data.Message,
                        });
                    } else {
                        return Promise.resolve({
                            status: response.data.status,
                            message: 'Something went wrong',
                        });
                    }
                }
            })
            .catch(error => {
                // return Promise.reject(error);
                return dispatch(apiErrorHandler(error));
            });
    };
};
/*
export const comercioAddPaymentRequest = actionData => {

    /*   {
          in_ClientID:"4",
          in_ComercioID:"1",
          in_Amount:"30" 
   */
/* 
  // console.log('addPaymentRequest:' + JSON.stringify(actionData));
   return (dispatch, getState) => {
         /*  let state = getState(); 
       return makeRequest(
           APIConstant.S3_BASE_URL + APIConstant.VEN_COMERCIO_ADD_PAYMENT_REQUEST,
           'post',
           actionData.data,
       )
           .then(response => {
               if (response && response.data && response.data.status === '200') {
                   console.log('addPaymentRequest:' + JSON.stringify(response));
                   /*  dispatch({
                        type: a.VEN_COMERCIO_ADD_PAYMENT_REQUEST,
                        payload: response.data.result,
                    });  */
/*

                   return Promise.resolve({
                       data: response.data,
                       status: response.data.status,
                       message: response.data.Message,
                   });
               } else {
                   if (response && response.data.Message) {
                       return Promise.resolve({
                           status: response.data.status,
                           message: response.data.Message,
                       });
                   } else {
                       return Promise.resolve({
                           status: response.data.status,
                           message: 'Something went wrong',
                       });
                   }
               }
           })
           .catch(error => {
               // return Promise.reject(error);
               return dispatch(apiErrorHandler(error));
           });
   };
};

 export const clientAprovePaymentRequest = actionData => {

   /*   {
        in_RequestID:"7"
       }  
   return (dispatch, getState) => {
         /*  let state = getState();  
       return makeRequest(
           APIConstant.S3_BASE_URL + APIConstant.VEN_CLIENT_APROVE_PAYMENT_REQUEST,
           'post',
           actionData.data,
       )
           .then(response => {
               if (response && response.data && response.data.status === '200') {
                   /* dispatch({
                       type: a.VEN_CLIENT_APROVE_PAYMENT_REQUEST,
                       payload: response.data.result,
                   });  
                   return Promise.resolve({
                       data: response.data,
                       status: response.data.status,
                       message: response.data.Message,
                   });
               } else {
                   if (response && response.data.Message) {
                       return Promise.resolve({
                           status: response.data.status,
                           message: response.data.Message,
                       });
                   } else {
                       return Promise.resolve({
                           status: response.data.status,
                           message: 'Something went wrong',
                       });
                   }
               }
           })
           .catch(error => {
               // return Promise.reject(error);
               return dispatch(apiErrorHandler(error));
           });
   };
};
*/
export const comercioAddPaymentRequest = actionData => {

    /*  {
              in_ClientID:"4",
              in_ComercioID:"1",
              in_Amount:"30"
      } */

    return (dispatch, getState) => {
        /*  let state = getState();  */
        return makeRequest(
            APIConstant.S3_BASE_URL + APIConstant.VEN_COMERCIO_ADD_PAYMENT_REQUEST,
            'post',
            actionData.data,
        )
            .then(response => {
                if (response && response.data && response.data.status === '200') {
                    /* dispatch({
                        type: a.VEN_COMERCIO_ADD_PAYMENT_REQUEST,
                        payload: response.data.result,
                    }); */
                    return Promise.resolve({
                        data: response.data,
                        status: response.data.status,
                        message: response.data.Message,
                    });
                } else {
                    if (response && response.data.Message) {
                        return Promise.resolve({
                            status: response.data.status,
                            message: response.data.Message,
                        });
                    } else {
                        return Promise.resolve({
                            status: response.data.status,
                            message: 'Something went wrong',
                        });
                    }
                }
            })
            .catch(error => {
                // return Promise.reject(error);
                return dispatch(apiErrorHandler(error));
            });
    };
};
export const clientCheckPendingPayments = actionData => {

    /*  { 
             in_ClientID:"2" 
      } */

    return (dispatch, getState) => {
        /*  let state = getState();  */
        return makeRequest(
            APIConstant.S3_BASE_URL + APIConstant.VEN_CLIENT_CHECK_PENDING_PAYMENTS,
            'post',
            actionData.data,
        )
            .then(response => {
                if (response && response.data && response.data.status === '200') {
                    /* dispatch({
                        type: a.VEN_COMERCIO_ADD_PAYMENT_REQUEST,
                        payload: response.data.result,
                    }); */
                    return Promise.resolve({
                        data: response.data,
                        status: response.data.status,
                        message: response.data.Message,
                    });
                } else {
                    if (response && response.data.Message) {
                        return Promise.resolve({
                            status: response.data.status,
                            message: response.data.Message,
                        });
                    } else {
                        return Promise.resolve({
                            status: response.data.status,
                            message: 'Something went wrong',
                        });
                    }
                }
            })
            .catch(error => {
                // return Promise.reject(error);
                return dispatch(apiErrorHandler(error));
            });
    };
};
export const clientApprovePaymentTransfer = actionData => {

    /*  { 
             in_ClientID:"2" 
      } */

    return (dispatch, getState) => {
        /*  let state = getState();  */
        return makeRequest(
            APIConstant.S3_BASE_URL + APIConstant.VEN_CLIENT_APPROVE_PAYMENT_TRANSFER,
            'post',
            actionData.data,
        )
            .then(response => {
                if (response && response.data && response.data.status === '200') {
                    /* dispatch({
                        type: a.VEN_COMERCIO_ADD_PAYMENT_REQUEST,
                        payload: response.data.result,
                    }); */
                    return Promise.resolve({
                        data: response.data,
                        status: response.data.status,
                        message: response.data.Message,
                    });
                } else {
                    if (response && response.data.Message) {
                        return Promise.resolve({
                            status: response.data.status,
                            message: response.data.Message,
                        });
                    } else {
                        return Promise.resolve({
                            status: response.data.status,
                            message: 'Something went wrong',
                        });
                    }
                }
            })
            .catch(error => {
                // return Promise.reject(error);
                return dispatch(apiErrorHandler(error));
            });
    };
};



