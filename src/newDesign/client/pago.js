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
import Cards from '../../components/UI/Card/Card';
import NewLinkCard from '../../components/UI/Card/newLinkCard';
import { BrowserView, MobileView, /* isBrowser, isMobile */ } from "react-device-detect";

import HeaderComponent from '../comComponents/HeaderComponent';
import FooterComponent from '../comComponents/FooterComponent';
const UserTypeClient = props => {

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


    const Card = (props) => {
        return < div style={{
            boxSizing: 'border-box', boxShadow: '0 2px 8px #ccc',
            border: '1px solid lightgray', borderRadius: '3px',
            display: 'block', overflowY: 'auto', padding: '5px',
            maxHeight: '800px',
            minWidth: props.minWidth ? props.minWidth : ('60%' || '300px'),
            justifyContent: 'center', textAlign: 'center',
            minHeight: '60%',

            maxWidth: '99%',
            paddingBottom: '5px',
            width: '90%',
            position: 'relative',
            overflow: 'hidden',
            marginTop: '10px', marginBottom: '10px',
        }
        }>
            {props.children}
        </div >
    }



    return (<div className={classes.container} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: '10px', marginRight: '10px', }}>
        <Modal show={openDialog} modalClosed={() => mesageModalClosed()}>
            {showMessage}
        </Modal>
        <div className={classes.container} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
            <BrowserView>
                < div style={{ display: 'contents', justifyContent: 'center', alignContent: 'center', flexWrap: 'wrap' }}>
                    <Grid container item spacing={4} justify="flex-start" alignItems="flex-start">
                        <Grid zeroMinWidth container item md={6} lg={4} spacing={1}   >
                            <Card title={'Saldo'} backgroundimage={wallet} >
                                <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                                    <div style={{ marginTop: '4%', paddingTop: '10%', paddingRight: '4%' }}>
                                        <img src={balanceIMG} alt="balanceIMG" />
                                    </div>
                                    <div>
                                        <div  >
                                            <p style={{ color: +balance > 0 ? 'blue' : 'orange' }} >
                                                <b style={{ color: +balance > 0 ? 'green' : 'red' }}>
                                                    {+balance * 41624.00 || 0}
                                                </b> $ Bolívares</p>
                                            <p style={{ color: +balance > 0 ? 'blue' : 'orange' }} >
                                                <b style={{ color: +balance > 0 ? 'green' : 'red' }} >
                                                    {balance}
                                                </b> $ USD</p>
                                        </div>
                                        <div style={{ marginTop: '12px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'inline-block', fontFamily: 'AvenirBlack', width: '98%', height: '30%' }}
                                        >
                                            <FlashingButton
                                                clicked={(e) => alert('CAMBIAR')}
                                                label={'CAMBIAR'}
                                                style={{ color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '10px', minHeight: '40px', fontWeight: 'bold', textAlign: ' center', }} />
                                        </div>
                                        {/* 
                                            <Button color="primary"
                                                style={{ marginTop: '12px', marginBottom: '12px', color: 'white', backgroundColor: '#f8bb48', borderRadius: '5px', fontSize: ' bold', textAlign: ' center', display: 'inline-block', fontFamily: 'AvenirBlack', width: '90%', height: '30%' }}
                                                onClick={(e) => alert('CAMBIAR')}>
                                                CAMBIAR
                                        </Button> */}
                                    </div>
                                </div>
                            </Card>
                        </Grid>
                        <Grid zeroMinWidth container item md={12} lg={4} spacing={1}  >
                            <Card title={'Operaciones recientes'} minWidth={'90%'} backgroundimage={clock} >
                                <List dense style={{ minWidth: '99%' }}>
                                    {transList && transList.length ? transList.map((item, idx) => {
                                        /*     const labelId = `checkbox-list-secondary-label-${item.Name || item.PassportNumber}`;
                                            let checked = false; */
                                        return (
                                            <ListItem key={idx} button style={{ display: 'flex', width: '100%' }}>
                                                <img alt={`Avatar n°${idx + 1}`} src={+item.Amount > 0 ? receiveMoney : giveMoney} style={{ width: '10px', height: '10px', marginRight: '2px', resize: 'contain', justifyContent: 'center', transform: 'rotate(180deg)' }} />

                                                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                                    <div style={{ display: 'flex', flex: 1, flexDirection: 'row', lineHeight: '1.1' }}>
                                                        <ListItemText id={idx + '3'} primary={+item.Amount > 0 ? 'Recibiste' : 'Enviaste'} style={{ color: +item.Amount > 0 ? 'green' : 'red', fontWeight: '900', paddingLeft: '5px', marginBottom: 0 }} />
                                                        <ListItemText id={idx + '2'} primary={'$' + item.Amount} style={{ color: +item.Amount > 0 ? 'green' : 'red', fontWeight: '900', display: 'flex', justifyContent: 'center' }} />
                                                        {(item.ComercioID) && <ListItemText id={idx + '13'} primary={+item.Amount > 0 ? 'de ' : 'a ' + item.ComercioID} style={{ color: +item.Amount > 0 ? 'green' : 'red', display: 'flex', justifyContent: 'center' }} />
                                                        }
                                                        {(item.ControlID) && <ListItemText id={idx + '13'} primary={+item.Amount > 0 ? 'de ' : 'a ' + item.ControlID} style={{ color: +item.Amount > 0 ? 'green' : 'red', display: 'flex', justifyContent: 'center' }} />
                                                        }
                                                        {(item.PassportNumber) &&
                                                            <ListItemText id={idx + '1'} primary={'(' + item.PassportNumber + ')'} style={{ color: 'blue', fontWeight: '900', display: 'flex', justifyContent: 'center' }} />
                                                        }
                                                    </div>
                                                    <div style={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'left' }}>
                                                        <ListItemText id={idx + '1'} primary={' in ' + item.Date} style={{ color: 'darkGray' /* +item.Amount > 0 ? 'green' : 'red'  */, paddingLeft: '5px', display: 'flex', marginTop: 0 }} />
                                                    </div>
                                                    {/*  {(item.Name || item.PassportNumber) && <ListItemText id={idx + '1'} primary={' from ' + item.Name + '(' + item.PassportNumber + ')'} style={{ color: +item.Amount > 0 ? 'blue' : 'green' }} />} */}

                                                </div>


                                            </ListItem>
                                        );
                                    }) : <ListItem key={1} button>
                                            <ListItemAvatar>
                                                <Avatar alt={`Avatar n°1`} src={balanceIMG} />
                                            </ListItemAvatar>
                                            <ListItemText id={1} primary={'No tienes operaciones recientes'} style={{ color: 'black', fontWeight: '900', paddingTop: '30px', paddingBottom: '30px' }} />
                                        </ListItem>}
                                </List>
                            </Card>
                        </Grid>
                        <Grid zeroMinWidth container item md={6} lg={4} spacing={1}   >
                            <Card title={'Comprar o pagar'} minWidth={'90%'} backgroundimage={paymentMethod}>
                                <div style={{ display: 'flex', width: '100%' }} >
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center', width: '100%' }}>
                                        <div style={{ marginTop: '12px', marginBottom: '0px', fontSize: ' bold', textAlign: ' center', display: 'inline-block', fontFamily: 'AvenirBlack', width: '100%', height: '30px' }}                                            >
                                            <FlashingButton
                                                clicked={(e) => setGeneratedQR(<QRCode value={props.userId} style={{ marginTop: '12px', }} />)}
                                                label={'GEN CÓDIGO QR'}
                                                style={{ color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '10px', minHeight: '40px', fontWeight: 'bold', textAlign: ' center', }} />
                                        </div>
                                        <div style={{ padding: '5px', paddingTop: '15%', paddingBottom: '5%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                                            {generatedQR}
                                            {generatedQR &&
                                                <p style={{ fontFamily: 'AvenirRoman', textTransform: 'initial', marginLeft: '10px', marginRight: '5px', marginTop: '20px', textAlign: 'center' }}>Preséntate con este código al comercio.</p>}

                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Grid>
                        <Grid zeroMinWidth container item md={6} lg={4} spacing={1}   >
                            <Card title={'Código remesas'} minWidth={'90%'} backgroundimage={password}>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', textAlign: 'center' }}>
                                        {(rechargeCodeMessage !== null) && rechargeCodeMessage}
                                        <p style={{ fontFamily: 'AvenirRoman', textTransform: 'initial', marginLeft: '10px', marginRight: '5px', textAlign: 'center' }}>Introduzca el codigo de la remesa que recibiste:</p>
                                        <Input
                                            containerStyle={{ width: '90%' }}
                                            inputStyle={{ paddingTop: '10px', minHeight: '40px', fontSize: '16px', marginLeft: '10px', paddingLeft: '10px', marginRight: '5px', }}
                                            elementType='input'
                                            elementConfig={{ type: 'text', placeholder: 'Código', }}
                                            value={rechargeCode}
                                            /*   invalid={!formElement.config.valid}
                                              shouldValidate={formElement.config.validation} */
                                            changed={e => setRechargeCode(e.currentTarget.value)}
                                            onBlur={(e) => { setRechargeCode('') }}
                                        />
                                        <div style={{ marginTop: '12px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'flex', justifyContent: 'center', fontFamily: 'AvenirBlack', width: '40%', height: '30%' }}                                        >
                                            <FlashingButton
                                                clicked={(e) => { chargeAcount() }}
                                                label={'ENVIAR'}
                                                style={{ color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '10px', minHeight: '40px', fontWeight: 'bold', textAlign: ' center', }} />
                                        </div>
                                        {/*  <Button color="primary"
                                                style={{ marginTop: '12px', marginBottom: '12px', color: 'white', backgroundColor: '#f8bb48', borderRadius: '5px', fontSize: ' bold', textAlign: ' center', display: 'inline-block', fontFamily: 'AvenirBlack' }}
                                                onClick={(e) => chargeAcount()}>
                                                ENVIAR
                    </Button> */}
                                    </div>
                                </div>
                            </Card>
                        </Grid>
                        <Grid zeroMinWidth container item md={6} lg={4} spacing={1}   >
                            <Card title={'Configuración y ayuda'} minWidth={'90%'} backgroundimage={customerSupport}>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                                    <div style={{ marginTop: '12px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'inline-block', fontFamily: 'AvenirBlack', width: '100%', height: '60%' }}                                        >
                                        <FlashingButton
                                            clicked={(e) => {
                                                props.onSetShowUserInfo(true);
                                                props.history.push(props.match.userInfo);
                                            }}
                                            label={'CONFIGURACIÓN'}
                                            style={{ color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '10px', minHeight: '40px', fontWeight: 'bold', textAlign: ' center', }} />
                                    </div>
                                    <div style={{ marginTop: '12px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'inline-block', fontFamily: 'AvenirBlack', width: '100%', height: '50%' }}                                        >
                                        <FlashingButton
                                            clicked={(e) => { alert('AYUDA') }}
                                            label={'AYUDA'}
                                            style={{ color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '10px', minHeight: '40px', fontWeight: 'bold', textAlign: ' center', }} />
                                    </div>
                                    {/*  <Button color="primary"
                                            style={{ marginTop: '12px', color: 'white', backgroundColor: '#f8bb48', borderRadius: '5px', fontSize: ' bold', textAlign: ' center', fontFamily: 'AvenirBlack', width: '100%', height: '40%' }}
                                            onClick={(e) => alert('CONFIGURACIÓN')}
                                        >CONFIGURACIÓN  </Button>
                                        <Button color="primary"
                                            style={{ marginTop: '12px', marginBottom: '12px', color: 'white', backgroundColor: '#f8bb48', borderRadius: '5px', fontSize: ' bold', textAlign: ' center', fontFamily: 'AvenirBlack', width: '100%', height: '50%' }}
                                            onClick={(e) => alert('AYUDA')}
                                        >AYUDA </Button> */}
                                </div>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </BrowserView>
            <MobileView>
                <div className={classes.container} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', marginLeft: '10px', marginRight: '10px', marginTop: '2%' }}>
                
                    < div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', }}>

                        <div style={{ marginBottom: '4%', borderLeft: `5px solid ${color.alcanceOrange}`, display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'center', }}>
                            <text style={{ fontSize: '1.4rem', color: color.alcanceOrange, marginLeft: '10px' }}>{'Pago'}</text>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign: 'left', marginTop: '20px' }}>
                            <QRCode value={'123'/* props.userId */} />
                        </div>

                    </div>
                  
                </div>
            </MobileView>
        </div >
    </div >);
}
const mapStateToProps = state => {
    return {
        userType: state.auth.userType,
        userId: state.auth.userId
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
