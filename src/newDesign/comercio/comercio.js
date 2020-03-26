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
const UserTypeComercio = props => {

    const [balance, setBalance] = useState(0);
    const [transList, setTransList] = useState([]);

    const [readQR, setReadQR] = useState(false);
    const [qrReaderCamera, setQRReaderCamera] = useState(true);
    const [readedQR, setReadedQR] = useState(null);
    const [reqAmount, setReqAmount] = useState('');
    const [facingMode, setFacingMode] = useState('environment');

    const {/*  userType, */ userId } = props;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        // window.postMessage("Sending data from WebView" + props.match.url);

        props.onComercioDetails(props.userId).then(res => {
            if (res.status === '501') setBalance(0)
            if (res.status === '200') { setBalance(res.data.result[0].Balance); };
        });
        props.onComercioTList(props.userId).then(res => {
            if (res.status === '501') { setTransList([]); }
            if (res.status === '200') {
                const list = _.orderBy(res.data.result, 'Date', 'desc');
                setTransList([...list]);
            }

        });
    }, [props]);
    const handleScan = data => {
        if (data) {
            //  console.log(' handleScan read:' + data); setReadesQR(data);
            if (!isNaN(data)) { setReadedQR(data); setQRReaderCamera(false); }
        }
        return;
    }
    const handleError = err => { console.log(err) };
    const comercio_requestPayment = () => {
        if (isNaN(+reqAmount) || reqAmount === null) return;
        const client_ID = readedQR;
        props.onComercioAddPaymentRequest(userId, client_ID, reqAmount).then(res => {
            //   console.log('requestPayment read: ' + reqAmount + '=>' + JSON.stringify(res));
            setReadQR(false); setReqAmount(0); setQRReaderCamera(true);
        });
    }
    return (<div className={classes.container} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
        <MobileView style={{ width: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{
                display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                marginTop: '2%'
            }}>
                < div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'center', width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '4%' }}>
                        <label style={{ fontSize: '1.4rem', color: color.alcanceOrange }}>{'Bienvenido, '}</label>
                        <label style={{ fontSize: '1.4rem', color: color.alcanceOrange }}> {'Salva Foods'}{'.'}</label>
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
                                        $ <b style={{ color: +balance > 0 ? 'green' : 'red' }}>
                                            {+balance * 41624.00 || 0}
                                        </b>   BS</label>
                                </div>

                            </div>
                        </div>
                    </div>


                    <NewLinkCard title={'OPERACIONES RECIENTES'} clicked={() => { props.history.push('comercio_operaciones') }}
                        textWrapperStyle={{ marginTop: '10px', marginBottom: '10px' }}
                    />
                    <NewLinkCard title={'SOLICITAR PAGO'} clicked={() => { props.history.push('comercio_pago') }}
                        textWrapperStyle={{ marginTop: '10px', marginBottom: '10px' }}
                    />

                </div>
            </div>
        </MobileView>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
            <BrowserView>
                < div style={{ display: 'contents', justifyContent: 'center', alignContent: 'center', flexWrap: 'wrap', }}>
                    <Grid container item spacing={4} justify="flex-start" alignItems="flex-start">
                        <Grid zeroMinWidth container item md={6} lg={4} spacing={1}   /*  xs={10} sm={8} md={6} lg={6} xl={3} */>
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
                                        <div style={{ marginTop: '12px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'inline-block', fontFamily: 'AvenirBlack', width: '98%', height: '30%' }}>
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
                        <Grid zeroMinWidth container item md={12} lg={4} spacing={1}   /*  xs={10} sm={8} md={6} lg={6} xl={3} */>
                            <Card title={'Operaciones recientes'} minWidth={'90%'} backgroundimage={clock}/*  minWidth={((true) && '420px') || null} */>
                                <List dense style={{ minWidth: '90%' }}>
                                    {transList && transList.length
                                        ? transList.map((item, idx) => {
                                            /*   const labelId = `checkbox-list-secondary-label-${item.Name || item.PassportNumber}`;
                                              let checked = false; */
                                            return (
                                                <ListItem key={idx} button>
                                                    {/*  <ListItemAvatar>
                                                            <Avatar alt={`Avatar n°${idx + 1}`} src={+ item.Amount > 0 ? receiveMoney : giveMoney} style={{ padding: '1%', margin: '5%' }} />
                                                        </ListItemAvatar> */}
                                                    <img alt={`Avatar n°${idx + 1}`} src={+item.Amount > 0 ? receiveMoney : giveMoney} style={{ width: '10px', height: '10px', marginRight: '2px', resize: 'contain', justifyContent: 'center', transform: 'rotate(180deg)' }} />
                                                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                                        <div style={{ display: 'flex', flex: 1, flexDirection: 'row', lineHeight: '1.1' }}>
                                                            <ListItemText id={idx + '3'} primary={+item.Amount > 0 ? 'Recibiste' : 'Enviaste'} style={{ color: +item.Amount > 0 ? 'green' : 'red', fontWeight: '900', paddingLeft: '5px', marginBottom: 0 }} />
                                                            <ListItemText id={idx + '2'} primary={'$' + item.Amount} style={{ color: +item.Amount > 0 ? 'green' : 'red', fontWeight: '900', width: '30%', display: 'flex', justifyContent: 'center' }} />
                                                            <ListItemText id={idx + '1'} primary={+item.Amount > 0 ? 'de ' : 'a ' + item.ClientID} style={{ color: +item.Amount > 0 ? 'blue' : 'green', width: '30%', display: 'flex', justifyContent: 'center' }} />
                                                        </div>
                                                        <div style={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'left' }}>
                                                            <ListItemText id={idx + '1'} primary={' in ' + item.Date} style={{ color: +item.Amount > 0 ? 'darkGray' : 'red', paddingLeft: '5px', display: 'flex', marginTop: 0 }} />
                                                        </div>
                                                    </div>
                                                </ListItem>
                                            );
                                        })
                                        : (<ListItem key={1} button>
                                            <ListItemAvatar>
                                                <Avatar alt={`Avatar n°1`} src={balanceIMG} />
                                            </ListItemAvatar>
                                            <ListItemText id={1} primary={'No tienes operaciones recientes'} style={{ color: 'black', fontWeight: '900' }} />
                                        </ListItem>)
                                    }
                                </List>
                            </Card>
                        </Grid>
                        <Grid zeroMinWidth container item md={6} lg={4} spacing={1}   /*  xs={10} sm={8} md={6} lg={6} xl={3} */>
                            <Card title={'Comprar o pagar'} backgroundimage={paymentMethod} >
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100%', alignItems: 'center', textAlign: 'center' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
                                        <div style={{ flex: 1, marginTop: '12px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'flex', alignItems: 'stretch', maxWidth: '70%', fontFamily: 'AvenirBlack',/*  width: '70%', */ height: '60%' }}                                        >
                                            <FlashingButton
                                                clicked={(e) => { setReadQR(!readQR); setQRReaderCamera(true); }}
                                                label={'LEER CÓDIGO QR'}
                                                style={{ color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '10px', minHeight: '40px', fontWeight: 'bold', textAlign: ' center', }} />
                                        </div>
                                        {readQR && <div style={{ flex: 0.15, marginTop: '12px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'flex', fontFamily: 'AvenirBlack', width: '70%', height: '60%' }}                                        >
                                            <FlashingButton
                                                clicked={(e) => { if (facingMode === 'user') setFacingMode('environment'); else if (facingMode === 'environment') setFacingMode('user'); else setFacingMode('user') }}
                                                label={'SWITCH CAMERA'}
                                                style={{ paddingLeft: '5px', paddingRight: '5px', color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '10px', minHeight: '40px', fontWeight: 'bold', textAlign: ' center', fontSize: '1.1vh' }} />
                                        </div>}


                                    </div>
                                    {readQR &&
                                        <div style={{ width: '98%' }}>
                                            {qrReaderCamera &&
                                                <div style={{ display: 'flex', padding: '2%', }}>
                                                    <QrReader
                                                        delay={300}
                                                        onError={handleError}
                                                        onScan={handleScan}
                                                        facingMode={facingMode.toString()}
                                                        style={{ width: '100%', height: '100%' }}
                                                    />
                                                </div>
                                            }
                                            {(readQR) &&
                                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                                                    <p>{readedQR}</p>
                                                    <Input
                                                        containerStyle={{ width: '90%' }}
                                                        labelStyle={{ textAlign: 'left', paddingLeft: '0px', }}
                                                        inputStyle={{ paddingTop: '10px', minHeight: '40px', fontSize: '16px', marginLeft: '0px', paddingLeft: '10px', marginRight: '5px', }}
                                                        label={'Monto pedido'}
                                                        elementType='text'
                                                        elementConfig={{ type: 'number', placeholder: '$ Monto', }}
                                                        value={reqAmount}
                                                        /*   invalid={!formElement.config.valid}
                                                          shouldValidate={formElement.config.validation} */
                                                        changed={e => setReqAmount(e.currentTarget.value)}
                                                    />
                                                    {readedQR && reqAmount > 0 && <div style={{ marginTop: '12px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'flex', justifyContent: 'center', fontFamily: 'AvenirBlack', width: '70%', height: '60%' }}                                        >
                                                        <FlashingButton
                                                            clicked={(e) => { comercio_requestPayment() }}
                                                            label={'ENVIAR'}
                                                            style={{ color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '10px', minHeight: '40px', fontWeight: 'bold', textAlign: ' center', }} />
                                                    </div>}
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>
                            </Card>
                        </Grid>
                        <Grid zeroMinWidth container item md={6} lg={4} spacing={1}   /*  xs={10} sm={8} md={6} lg={6} xl={3} */>
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
                                </div>
                            </Card>
                        </Grid>

                    </Grid>
                </div>
            </BrowserView>

        </div >

    </div>);
};

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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(UserTypeComercio, axios));
