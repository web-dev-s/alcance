

export {
  authLogin,
  authRegister,
  logout,
  authFail,
  setAuthRedirectPath,
  authCheckState,
  /*   storeUsed_CredetialsLocal */
} from './auth';

export {

  clientChargeAccount,
  clientGetTransactionHistory,
  clientApprovePaymentTransfer,
  clientGetDetails,
  clientCheckPendingPayments,

  comercioGetTransactionHistory,
  comercioAddPaymentRequest,
  comercioGetDetails,


  controlGetDetails,
  controlGetTransactionHistory,
  controlGenerateCode,
  setShowUserInfo,
  setProfileImage
} from './alcance'

//denisa
export {
  updateUserData
} from './user'