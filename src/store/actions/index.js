

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
  getAllTransactionsForUser, //used in Client Operaciones
  getExchangeRate,//used in Client (exchange modal)
  exchangeCurrencies,//used in Client (exchange modal)
  rechargeBallances,//used in Codigo remesa

  requestPayment,//used in comercio account solicitar pago
} from './alcance'
//denisa
export {
  updateUserData
} from './user'