import React, { useEffect } from 'react';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import * as a from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';
/* import Spinner from '../../components/UI/Spinner/Spinner'; */
import classes from './DashBoardScreen';
import UserTypeClient from './userTypeClient';
import UserTypeComercio from '../DashboardScreen/userTypeComercio';
import UserTypeControl from './userTypeControl';
const DashBoardScreen = props => {
  useEffect(() => { window.postMessage("Messge from webView this is Dashboard", "*") }, []);

  // eslint-disable-line
  const { userType } = props;

  return (
    <div className={classes.container} style={{ paddingTop: '1%' }}>
      {(userType === 'control') && <UserTypeControl match={{ url: '/dashboard/control', userInfo: '/dashboard/userInfo', }} history={props.history} />}
      {(userType === 'client') && <UserTypeClient match={{ url: '/dashboard/client', userInfo: '/dashboard/userInfo', }} history={props.history} />}
      {(userType === 'comercio') && <UserTypeComercio match={{ url: '/dashboard/comercio', userInfo: '/dashboard/userInfo', }} history={props.history} />}
    </div >

  );
};

const mapStateToProps = state => {
  return {
    userType: state.auth.userType,
    userId: state.auth.userId
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),

    onClientDetails: (id) => dispatch(actions.clientGetDetails({ type: a.VEN_CONTROL_GET_DETAILS, data: { in_ID: id } })),
    onComercioDetails: (id) => dispatch(actions.comercioGetDetails({ type: a.VEN_CONTROL_GET_DETAILS, data: { in_ID: id } })),
    onControlDetails: (id) => dispatch(actions.controlGetDetails({ type: a.VEN_CONTROL_GET_DETAILS, data: { in_ID: id } })),


    onClientTList: (id) => dispatch(actions.clientGetTransactionHistory({ type: a.VEN_CLIENT_GET_TRANSACTIONS_LIST, data: { in_ClientID: id } })),
    onComercioTList: (id) => dispatch(actions.comercioGetTransactionHistory({ type: a.VEN_COMERCIO_GET_TRANSACTIONS_LIST, data: { in_ComercioID: id } })),
    onControlTList: (id) => dispatch(actions.controlGetTransactionHistory({ type: a.VEN_CONTROL_GET_TRANSACTIONS_LIST, data: { in_ControlID: id } })),

    onControlGenerateCode: (id, name, docId, amount) => dispatch(actions.controlGenerateCode({ type: a.VEN_CONTROL_GENERATE_CODE, data: { in_ControlID: id, in_Name: name, in_PassportNumber: docId, in_Amount: amount } })),
    onClientChargeAccount: (id, code) => dispatch(actions.clientChargeAccount({ type: a.VEN_CLIENT_CHARGE_ACCOUNT, data: { in_ClientID: id, in_Code: code } })),

    onComercioAddPaymentRequest: (id, client_ID, reqAmount) => dispatch(actions.comercioAddPaymentRequest({ type: a.VEN_COMERCIO_ADD_PAYMENT_REQUEST, data: { in_ComercioID: id, in_ClientID: client_ID, in_Amount: reqAmount } })),
    onClientCheckPendingPayments: (id) => dispatch(actions.clientCheckPendingPayments({ type: a.VEN_CLIENT_CHECK_PENDING_PAYMENTS, data: { in_ClientID: id } })),
    onApprovePaymentTransfer: (reqId) => dispatch(actions.clientApprovePaymentTransfer({ type: a.VEN_CLIENT_APPROVE_PAYMENT_TRANSFER, data: { in_RequestID: reqId } }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(DashBoardScreen, axios));
