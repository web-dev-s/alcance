import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import avatar from '../../assets/images/blankProfile.png';

const initialState = {
    profileImage: '',
    showUserInfo: {
        User_Type: '',
        Name: '',
        Surname: '',
        Phone: '',
        Email: '',
        BirthDate: '',
        IDCard: '',
        BalanceMXN: '',
        BalanceUSD: '',
        BalanceBS: '',
        BusinessName: '',
        BusinessAddress: '',
        State: '',
        Code: ''
    }
};
const setShowUserInfo = (state, action) => {

    return updateObject(state, { showUserInfo: {...state.showUserInfo, ...action.showUserInfo} })
}
const seBallanceAmounts = (state, action) => {
    console.log('---seBallanceAmounts---- reducer---------------')
    console.log(action)
    return updateObject(state, { showUserInfo: { ...state.showUserInfo, BalanceUSD: action.BalanceUSD, BalanceMXN: action.BalanceMXN, BalanceBS: action.BalanceBS } })
}

const setProfileImage = (state, action) => {

    return updateObject(state, { profileImage: action.profileImage })
}
const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
      //  case actionTypes.VEN_CLIENT_CHARGE_ACCOUNT: return setAuthRedirectPath(state, action);
      //  case actionTypes.VEN_CLIENT_GET_TRANSACTIONS_LIST: return setAuthRedirectPath(state, action);
      //  case actionTypes.VEN_CLIENT_APPROVE_PAYMENT_TRANSFER: return setAuthRedirectPath(state, action);
      //  case actionTypes.VEN_CLIENT_GET_DETAILS: return setAuthRedirectPath(state, action);
//
      //  case actionTypes.VEN_COMERCIO_GET_TRANSACTIONS_LIST: return setAuthRedirectPath(state, action);
      //  case actionTypes.VEN_COMERCIO_ADD_PAYMENT_REQUEST: return setAuthRedirectPath(state, action);
      //  case actionTypes.VEN_COMERCIO_GET_DETAILS: return setAuthRedirectPath(state, action);
//
      //  case actionTypes.VEN_CONTROL_GET_DETAILS: return setAuthRedirectPath(state, action);
      //  case actionTypes.VEN_CONTROL_GET_TRANSACTIONS_LIST: return setAuthRedirectPath(state, action);
      //  case actionTypes.VEN_CONTROL_GENERATE_CODE: return setAuthRedirectPath(state, action);







        ///for version redesigned:
        case actionTypes.VEN_LOCAL_SHOW_USER_INFO: return setShowUserInfo(state, action);
        case actionTypes.VEN_UPDATE_BALLANCE: return seBallanceAmounts(state, action);
        case actionTypes.VEN_LOCAL_SAVE_PROFILE_IMAGE: return setProfileImage(state, action);

        default:
            return state;
    }
};

export default reducer;
