

export {
  authLogin, //used in Login 
  authRegister, //used in Register
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
  setProfileImage,


  generateTransferCode,// used in Client codigo



} from './alcance'
//denisa
export {
  updateUserData
} from './user'