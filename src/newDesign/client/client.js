import React, { useEffect, useState } from 'react';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import * as a from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';
import * as _ from 'lodash';
import { Button, Grid, List, Avatar, ListItemAvatar, ListItemText, ListItem } from '@material-ui/core';
import { updateObject, checkValidity, color } from '../../shared/utility';
import FlashingButton from '../../components/UI/FlashingButton/FlashingButton';
/* import Spinner from '../../components/UI/Spinner/Spinner'; */
import Modal from '../../components/UI/Modal/Modal';
import classes from './client.css';
import Input from '../../components/UI/Input/Input';
import balanceIMG from '../../assets/images/balance.png';
import arrow from '../../assets/images/chevron-right.png';
import giveMoney from '../../assets/images/redArrow.png';
import receiveMoney from '../../assets/images/greenArrow.png';

import wallet from '../../assets/images/wallet.png';
import paymentMethod from '../../assets/images/payment-method.png';
import password from '../../assets/images/password.png';
import clock from '../../assets/images/clock.png';
import customerSupport from '../../assets/images/customer-support.png';
import QRCode from 'qrcode.react';
import Card from '../../components/UI/Card/Card';
import NewLinkCard from '../../components/UI/Card/newLinkCard';
import { BrowserView, MobileView, /* isBrowser, isMobile */ } from "react-device-detect";

import HeaderComponent from '../comComponents/HeaderComponent';
import FooterComponent from '../comComponents/FooterComponent';
import useWindowDimensions from '../../hooks/useWindowsDimensions';
const UserTypeClient = props => {
    const { height, width } = useWindowDimensions();
    const [checkTime, setCheckTime] = useState();
    const [stopChecking, setStopChecking] = useState(false);
    const [pendingPayment, setPendingPayment] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const [balance, setBalance] = useState(0);
    const [transList, setTransList] = useState([]);
    const [rechargeCode, setRechargeCode] = useState('');
    const [rechargeCodeMessage, setRechargeCodeMessage] = useState('');
    const [generatedQR, setGeneratedQR] = useState(null);

    const { userType, userId } = props;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    //  useEffect(() => { props.onClientDetails(props.userId.toString()).then(res => { if (res.status === '501') { setBalance(0); } if (res.status === '200') { setBalance(res.data.result[0].Balance); }; }); props.onClientTList(props.userId).then(res => { if (res.status === '501') { setTransList([]); } if (res.status === '200') { const list = _.orderBy(res.data.result, 'Date', 'desc'); setTransList([...list]); } }); const interval = setInterval(() => { setCheckTime(Date.now()) }, 5000); return () => { clearInterval(interval) } }, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    //  useEffect(() => { if ((userType === 'client')) { pendingPayment && setOpenDialog(true); } }, [pendingPayment, userType]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    //  useEffect(() => {
    //      if ((userType === 'client') && (!stopChecking)) {
    //          props.onClientCheckPendingPayments(userId).then(res => { if (res.status === '200') { setStopChecking(true); setPendingPayment({ id: res.data.result[0].ID, amount: res.data.result[0].Amount }); } });
    //      }
    //  }, [props, checkTime, userType, userId, stopChecking]);

    const chargeAcount = () => {
        props.onClientChargeAccount(props.userId, rechargeCode).then(res => {

            if (res.status === '200') {
                props.onClientDetails(props.userId).then(res => {
                    if (res.status === '501') { setBalance(0); }
                    if (res.status === '200') { setBalance(res.data.result[0].Balance); };
                });
                props.onClientTList(props.userId).then(res => {
                    if (res.status === '501') { setTransList([]); }
                    if (res.status === '200') { setTransList([...res.data.result]); }
                });

                setRechargeCodeMessage(<p style={{ color: 'green', fontWeight: '900' }}> Monto ingresado</p>);

            } else setRechargeCodeMessage(<p style={{ color: 'red', fontWeight: '900' }}>Código invalido ( {res.message} )</p>);
        });
    }
    const aprovePaymentTransfer = () => {
        if (pendingPayment.id === null) return;

        props.onApprovePaymentTransfer(pendingPayment.id).then(res => {
            if (res.status === '200') {
                setBalance(res.data.result[0].Balance);

                setOpenDialog(false); props.onClientTList(props.userId).then(res => {
                    if (res.status === '501') { setTransList([]); }
                    if (res.status === '200') { setTransList([...res.data.result]); setStopChecking(false); }
                });
            };
            /*   console.log('props.onApprovePaymentTransfer' + pendingPayment.id + '=>' + JSON.stringify(res)); */
        });
    }
    const mesageModalClosed = () => {
        setOpenDialog(false); setPendingPayment(null); setStopChecking(true);
        setTimeout(() => { setStopChecking(false) }, 5000);
    };
    let showMessage = <div style={{ zIndex: '200', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', }}>
            <h2 style={{ marginTop: '12px', color: 'black', fontWeight: '900', textAlign: ' center', display: 'inline-block' }}
            > Solicitud de transacción </h2>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', }}>
            <div style={{ marginTop: '3%', paddingTop: '3%', paddingRight: '4%' }}>
                <img src={giveMoney} alt="giveMoney" />
            </div>
            <div>
                <p style={{ color: pendingPayment && !isNaN(+pendingPayment.amount) && (+pendingPayment.amount) > 0 ? 'blue' : 'orange' }} >
                    <b style={{ color: pendingPayment && !isNaN(pendingPayment.amount) && (+pendingPayment.amount) > 0 ? 'green' : 'red' }}>
                        {(pendingPayment && pendingPayment.amount * 41624.00) || 0}
                    </b> $ Bolívares</p>
                <p style={{ color: pendingPayment && !isNaN(+pendingPayment.amount) && (+pendingPayment.amount) > 0 ? 'blue' : 'orange' }} >
                    <b style={{ color: pendingPayment && !isNaN(pendingPayment.amount) && (+pendingPayment.amount) > 0 ? 'green' : 'red' }} >
                        {(pendingPayment && !isNaN(+pendingPayment.amount)) ? pendingPayment.amount : 0}
                    </b> $ USD</p>
                <p style={{ 'blue': 'darkBlue' }} >
                </p>
                <p> Comercio ID: <b style={{ color: 'green' }} > {pendingPayment && pendingPayment.id !== null ? pendingPayment.id : '---'}
                </b>  </p>

            </div>

            {/*    <Spinner /> */}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', }}>
            <Button color="primary"
                style={{ marginTop: '12px', width: '30%', color: 'white', backgroundColor: '#f8bb48', borderRadius: '5px', fontWeight: '900', textAlign: ' center', display: 'inline-block' }}
                onClick={() => mesageModalClosed()}>
                NO INTERESA
</Button>
            <Button color="primary"
                style={{ marginTop: '12px', width: '30%', color: 'white', backgroundColor: '#f8bb48', borderRadius: '5px', fontWeight: '900', textAlign: ' center', display: 'inline-block' }}
                onClick={() => aprovePaymentTransfer()}>
                PAGAR
</Button>
        </div>
    </div >;


    const { showUserInfo } = props;


    return (<>
        <Modal show={openDialog} modalClosed={() => mesageModalClosed()}>
            {showMessage}
        </Modal>
        <MobileView style={{ width: width, height: height, marginTop: '48px' }}>
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
                            <label style={{ fontSize: '1.4rem', color: color.alcanceOrange }}> {'Jose Miguel'}{'.'}</label>
                        </div>
                        <div style={{
                            boxSizing: 'border-box', boxShadow: '0 2px 8px #ccc',
                            border: '1px solid lightgray', borderRadius: '4px',
                             /*  display: 'block', */   overflowY: 'auto', padding: '5px',
                            minWidth: props.minWidth ? props.minWidth : ('60%' || '300px'),
                            justifyContent: 'center', textAlign: 'center',

                            display: 'flex', flex: '0 0 30%',
                            maxWidth: '99%',
                            paddingBottom: '5px',
                            width: '100%',
                            position: 'relative',
                            overflow: 'hidden',
                            marginBottom: '15px',
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                                {/*     <div style={{ marginTop: '4%', paddingTop: '10%', paddingRight: '4%' }}>
                                    <img src={balanceIMG} alt="balanceIMG" />
                                </div> */}
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '80px', }}>
                                    <label style={{ color: color.alcanceOrange, fontSize: '14px', paddingTop: '10px', paddingBottom: '10px' }}>{'SALDO'}</label>
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '12px' }}>

                                        <label style={{ color: +showUserInfo.BalanceUSD > 0 ? 'blue' : color.brown, fontWeight: '400', margin: '3px', textAlign: 'justify' }} >
                                            $ <b style={{ color: +showUserInfo.BalanceUSD > 0 ? 'green' : 'red' }} >
                                                {new Intl.NumberFormat('en-EN').format(+showUserInfo.BalanceUSD)}
                                            </b>   USD</label>
                                        <label style={{ color: +showUserInfo.BalanceMXN > 0 ? 'blue' : color.brown, fontWeight: '400', margin: '3px', textAlign: 'justify' }} >
                                            $  <b style={{ color: +showUserInfo.BalanceMXN > 0 ? 'green' : 'red' }}>
                                                {new Intl.NumberFormat('en-EN').format(+showUserInfo.BalanceMXN)}
                                            </b>  MXN</label>
                                        <label style={{ color: +showUserInfo.BalanceBS > 0 ? 'blue' : color.brown, fontWeight: '400', margin: '3px', textAlign: 'justify' }} >
                                            $ <b style={{ color: +showUserInfo.BalanceBS > 0 ? 'green' : 'red' }}>
                                                {new Intl.NumberFormat('en-EN').format(+showUserInfo.BalanceBS)}
                                            </b>   BS</label>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: '80px' }}>
                                        <div style={{ marginTop: '12px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'inline-block', fontFamily: 'AvenirBlack', height: '30%', marginRight: '10px' }}
                                        >
                                            <FlashingButton
                                                clicked={(e) => alert('CAMBIAR')}
                                                label={'CAMBIAR'}
                                                style={{
                                                    color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '2px', minHeight: '20px', fontWeight: 'bold',
                                                    textAlign: ' center',
                                                    display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
                                                }}
                                                textStyle={{ fontSize: '12px' }}
                                            />
                                        </div>
                                        <div style={{ marginTop: '12px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'inline-block', fontFamily: 'AvenirBlack', height: '30%', marginLeft: '10px' }}
                                        >
                                            <FlashingButton
                                                clicked={(e) => alert('RECARGAR')}
                                                label={'RECARGAR'}
                                                style={{
                                                    color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '2px', minHeight: '20px', fontWeight: 'bold',
                                                    textAlign: ' center',
                                                    display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
                                                }} textStyle={{ fontSize: '12px' }}
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <NewLinkCard title={'GENERAR CÓDIGO '} clicked={() => { props.history.push('client_codigo') }}
                            textWrapperStyle={{ marginTop: '10px', marginBottom: '10px' }}
                        />
                        <NewLinkCard title={'OPERACIONES RECIENTES'} clicked={() => { props.history.push('client_operaciones') }}
                            textWrapperStyle={{ marginTop: '10px', marginBottom: '10px' }}
                        />
                        <NewLinkCard title={'PAGO'} clicked={() => { props.history.push('client_pago') }}
                            textWrapperStyle={{ marginTop: '10px', marginBottom: '10px' }}
                        />
                        <NewLinkCard title={'CÓDIGO REMESA'} clicked={() => { props.history.push('client_remesa') }}
                            textWrapperStyle={{ marginTop: '10px', marginBottom: '10px' }}
                        />
                        <NewLinkCard title={'AYUDA'} clicked={() => { props.history.push('client_ayuda') }}
                            textWrapperStyle={{ marginTop: '10px', marginBottom: '10px' }}
                        />
                    </div>
                    {/*   <FooterComponent
                        mainContainerStyle={{ bottom: '0px' }}
                        onBackClick={() => props.history.push('/logout')} /> */}


                </div >


            </div>
        </MobileView>



        <BrowserView>
            < div style={{ position: 'absolute', width: '400px',/*  height: '100%', */ overflow: 'hidden' }}>

                <div key={'mainContainer'}
                    className={classes.container} style={{
                        display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', margin: '0px',
                        backgroundImage: " linear-gradient( rgba(96, 70, 17, 0.7), rgba(96, 70, 17, 0.7) ),url(" + require("../../assets/images/wallpaper.png") + ")",
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: 'rgba(96, 70, 17, 0.7)',
                        minHeight: (+height).toString() + 'px',
                        minWidth: width,
                        color: color.brown,
                    }}>
                    <div style={{
                        display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', margin: '0px',
                        maxHeight: (+height).toString() + 'px',
                        overflowY: 'auto',
                        position: 'absolute', top: 0, bottom: '0px', left: '5px', right: '5px',
                    }}

                    >
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '4%' }}>
                            <label style={{ fontSize: '1.4rem', color: color.alcanceOrange }}>{'Bienvenido, '}</label>
                            <label style={{ fontSize: '1.4rem', color: color.alcanceOrange }}> {'Jose Miguel'}{'.'}</label>
                        </div>
                        <div style={{
                            boxSizing: 'border-box', boxShadow: '0 2px 8px #ccc',
                            border: '1px solid lightgray', borderRadius: '4px',
                            display: 'block', overflowY: 'auto', padding: '5px',
                            maxHeight: '800px',
                            minWidth: props.minWidth ? props.minWidth : ('60%' || '300px'),
                            justifyContent: 'center', textAlign: 'center',
                            minHeight: '60%',

                            maxWidth: '99%',
                            paddingBottom: '5px',
                            width: '100%',
                            position: 'relative',
                            overflow: 'hidden',
                            marginBottom: '25px',
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                                {/*     <div style={{ marginTop: '4%', paddingTop: '10%', paddingRight: '4%' }}>
                                    <img src={balanceIMG} alt="balanceIMG" />
                                </div> */}
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                                    <label style={{ color: color.alcanceOrange, fontSize: '14px', paddingBottom: '10px' }}>{'SALDO'}</label>
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '12px' }}>

                                        <label style={{ color: +balance > 0 ? 'blue' : color.brown, fontWeight: '400', margin: '3px', textAlign: 'justify' }} >
                                            $ <b style={{ color: +balance > 0 ? 'green' : 'red' }} >
                                                {balance}
                                            </b>   USD</label>
                                        <label style={{ color: +balance > 0 ? 'blue' : color.brown, fontWeight: '400', margin: '3px', textAlign: 'justify' }} >
                                            $  <b style={{ color: +balance > 0 ? 'green' : 'red' }}>
                                                {+balance * 41624.00 || 0}
                                            </b>  MXN</label>
                                        <label style={{ color: +balance > 0 ? 'blue' : color.brown, fontWeight: '400', margin: '3px', textAlign: 'justify' }} >
                                            $ <b style={{ color: +balance > 0 ? 'green' : 'red' }}>
                                                {+balance * 41624.00 || 0}
                                            </b>   BS</label>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                                        <div style={{ marginTop: '12px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'inline-block', fontFamily: 'AvenirBlack', height: '30%', marginRight: '10px' }}
                                        >
                                            <FlashingButton
                                                clicked={(e) => alert('CAMBIAR')}
                                                label={'CAMBIAR'}
                                                style={{
                                                    color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '2px', minHeight: '20px', fontWeight: 'bold',
                                                    textAlign: ' center',
                                                    display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
                                                }}
                                                textStyle={{ fontSize: '12px' }}
                                            />
                                        </div>
                                        <div style={{ marginTop: '12px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'inline-block', fontFamily: 'AvenirBlack', height: '30%', marginLeft: '10px' }}
                                        >
                                            <FlashingButton
                                                clicked={(e) => alert('RECARGAR')}
                                                label={'RECARGAR'}
                                                style={{
                                                    color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '2px', minHeight: '20px', fontWeight: 'bold',
                                                    textAlign: ' center',
                                                    display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
                                                }} textStyle={{ fontSize: '12px' }}
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <NewLinkCard title={'GENERAR CÓDIGO '} clicked={() => { props.history.push('client_codigo') }}
                            textWrapperStyle={{ marginTop: '10px', marginBottom: '10px' }}
                        />
                        <NewLinkCard title={'OPERACIONES RECIENTES'} clicked={() => { props.history.push('client_operaciones') }}
                            textWrapperStyle={{ marginTop: '10px', marginBottom: '10px' }}
                        />
                        <NewLinkCard title={'PAGO'} clicked={() => { props.history.push('client_pago') }}
                            textWrapperStyle={{ marginTop: '10px', marginBottom: '10px' }}
                        />
                        <NewLinkCard title={'CÓDIGO REMESA'} clicked={() => { props.history.push('client_remesa') }}
                            textWrapperStyle={{ marginTop: '10px', marginBottom: '10px' }}
                        />
                        <NewLinkCard title={'AYUDA'} clicked={() => { props.history.push('client_ayuda') }}
                            textWrapperStyle={{ marginTop: '10px', marginBottom: '10px' }}
                        /> </div>

                    <FooterComponent onBackClick={() => props.history.push('/logout')} />


                </div >

            </div>
        </BrowserView>


    </>);
}
const mapStateToProps = state => {
    return {
        userType: state.auth.userType,
        userId: state.auth.userId,
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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(UserTypeClient, axios));
