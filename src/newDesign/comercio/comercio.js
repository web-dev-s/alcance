import React, { useEffect, useState } from 'react';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import * as a from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';
import * as _ from 'lodash';
import { Grid, List, Avatar, ListItemAvatar, ListItemText,/*  ListItemSecondaryAction, */ ListItem } from '@material-ui/core';
import FlashingButton from '../../components/UI/FlashingButton/FlashingButton';
/* import Spinner from '../../components/UI/Spinner/Spinner'; */
import classes from './comercio.css';
import Input from '../../components/UI/Input/Input';
import balanceIMG from '../../assets/images/balance.png';

import giveMoney from '../../assets/images/redArrow.png';
import receiveMoney from '../../assets/images/greenArrow.png';
import wallet from '../../assets/images/wallet.png';
import paymentMethod from '../../assets/images/payment-method.png';
import clock from '../../assets/images/clock.png';
import customerSupport from '../../assets/images/customer-support.png';
import QrReader from 'react-qr-reader';
import Card from '../../components/UI/Card/Card';
/* import Uxi from '../../hoc/Uxi/Uxi'; */
/* import httpErrorHandler from '../../hooks/http-error-handler'; */
import { BrowserView, MobileView, /* isBrowser, isMobile */ } from "react-device-detect";
import NewLinkCard from '../../components/UI/Card/newLinkCard';
import { updateObject, checkValidity, color } from '../../shared/utility';
import useWindowDimensions from '../../hooks/useWindowsDimensions';
const UserTypeComercio = props => {
    const { height, width } = useWindowDimensions();
    const [balance, setBalance] = useState(0);
    const [transList, setTransList] = useState([]);

    const [readQR, setReadQR] = useState(false);
    const [qrReaderCamera, setQRReaderCamera] = useState(true);
    const [readedQR, setReadedQR] = useState(null);
    const [reqAmount, setReqAmount] = useState('');
    const [facingMode, setFacingMode] = useState('environment');

    const { showUserInfo } = props;

    return (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', paddingLeft: '5%', paddingRight: '5%' }} >

        <MobileView style={{ width: width, height: height, marginTop: '48px', position: 'relative' }}>

            < div style={{ position: 'absolute', width: '100%',/*  height: '100%', */ overflow: 'hidden' }}>
                <div key={'mainContainer'}
                   /*  className={classes.container}  */ style={{
                        display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', margin: '0px',
                        minHeight: (+height).toString() + 'px',
                        minWidth: width,
                        color: color.brown,
                    }}>

                    <div style={{
                        display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', margin: '0px',
                        maxHeight: (+height).toString() + 'px',
                        overflowY: 'auto', paddingBottom: '45px',
                        position: 'absolute', top: '68px', bottom: '0px', left: '5px', right: '5px',

                    }}  >
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: '15px', paddingBottom: '15px', marginBottom: '4%' }}>
                            <label style={{ fontSize: '1.4rem', color: color.alcanceOrange }}>{'Bienvenido, '}</label>
                            <label style={{ fontSize: '1.4rem', color: color.alcanceOrange }}> {showUserInfo.Name} {showUserInfo.Surname}{'.'}</label>
                        </div>
                        <div style={{
                            boxSizing: 'border-box', boxShadow: '0 2px 8px #ccc',
                            border: '1px solid lightgray', borderRadius: '4px',
                            overflowY: 'auto', padding: '5px',

                            display: 'flex', justifyContent: 'center', textAlign: 'center', flex: 0,
                            flex: '0 0 20%',

                            paddingBottom: '5px',
                            width: '100%',
                            position: 'relative',
                            overflow: 'hidden',
                            marginBottom: '15px',
                        }}>


                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '8px', paddingTop: '30px', paddingBottom: '30px' }}>
                                <label style={{ color: color.alcanceOrange, fontSize: '14px', paddingTop: '10px', paddingBottom: '10px' }}>{'SALDO'}</label>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '12px' }}>

                                    <label style={{ color: +showUserInfo.BalanceBS > 0 ? 'blue' : color.brown, fontWeight: '400', margin: '3px', textAlign: 'justify' }} >
                                        $ <b style={{ color: +showUserInfo.BalanceBS > 0 ? 'green' : 'red' }}>
                                            {new Intl.NumberFormat('en-EN').format(+showUserInfo.BalanceBS)}
                                        </b>   BS</label>
                                </div>
                            </div>

                        </div>

                        <NewLinkCard title={'OPERACIONES RECIENTES'} clicked={() => { props.history.push('comercio_operaciones') }}
                            textWrapperStyle={{ marginTop: '10px', marginBottom: '10px', height: undefined }}
                            mainContainerStyle={{ maxHeight: '40px', marginTop: '10px', marginBottom: '10px', }}
                        />
                        <NewLinkCard title={'SOLICITAR PAGO'} clicked={() => { props.history.push('comercio_pago') }}
                            textWrapperStyle={{ marginTop: '10px', marginBottom: '10px', height: undefined }}
                            mainContainerStyle={{ maxHeight: '40px', marginTop: '20px', marginBottom: '10px', }}
                        />
                    </div>

                </div >
            </div>
        </MobileView>

        <BrowserView>

            <p>UNDER CONSTRUCTION</p>

        </BrowserView>


    </div>);
};

const mapStateToProps = state => {
    return {
        userType: state.auth.userType,
        userToken: state.auth.userToken,
        showUserInfo: state.al.showUserInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
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
        onApprovePaymentTransfer: (reqId) => dispatch(actions.clientApprovePaymentTransfer({ type: a.VEN_CLIENT_APPROVE_PAYMENT_TRANSFER, data: { in_RequestID: reqId } })),

        onSetShowUserInfo: (showUserInfo) => dispatch(actions.setShowUserInfo({ showUserInfo: showUserInfo })),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(UserTypeComercio, axios));
