

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

  setShowUserInfo,
  setProfileImage,


  updateUserData, //used in ProfileInfo

  generateTransferCode,// used in Client codigo
  getAllTransactionsForUser, //used in Client Operaciones
  getExchangeRate,//used in Client (exchange modal)
  exchangeCurrencies,//used in Client (exchange modal)
  rechargeBallances,//used in Codigo remesa

  requestPayment,//used in comercio account solicitar pago
  getPendingPayments, //used in client hook
  approvePendingPayment, //used in client modal pending payment
  refreshBallances, //used in comercio for refreshing balances after client accepts pending payments
} from './alcance' 