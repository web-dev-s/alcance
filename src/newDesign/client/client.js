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
import BdModal from '../comComponents/BdModal';
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
import error from '../../assets/images/error.png'
import useWindowDimensions from '../../hooks/useWindowsDimensions';
const UserTypeClient = props => {
    const { height, width } = useWindowDimensions();
    const [checkTime, setCheckTime] = useState();
    const [stopChecking, setStopChecking] = useState(false);
    const [pendingPayment, setPendingPayment] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);


    const [exchangeInfo, setExchangeInfo] = useState({ from: 'USD', amount: 1, to: 'MXN', exchangeRate: 1, });
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [showExchangeModal, setShowExchangeModal] = useState(false);
    const [message, setMessage] = useState('');


    const { userType, userToken } = props;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    //  useEffect(() => { props.onClientDetails(props.userId.toString()).then(res => { if (res.status === '501') { setBalance(0); } if (res.status === '200') { setBalance(res.data.result[0].Balance); }; }); props.onClientTList(props.userId).then(res => { if (res.status === '501') { setTransList([]); } if (res.status === '200') { const list = _.orderBy(res.data.result, 'Date', 'desc'); setTransList([...list]); } }); const interval = setInterval(() => { setCheckTime(Date.now()) }, 5000); return () => { clearInterval(interval) } }, []);

    useEffect(() => { updateConversionRate() }, []);
    useEffect(() => { updateConversionRate(); }, [exchangeInfo.from, exchangeInfo.to]);
    useEffect(() => {
        const newAmount = ((+exchangeInfo.exchangeRate) * (+exchangeInfo.amount)).toFixed(2);
        setConvertedAmount(new Intl.NumberFormat('en-EN').format(newAmount))
    }, [exchangeInfo.amount]);
    const updateConversionRate = () => {

        if (exchangeInfo.from == exchangeInfo.to) {
            setExchangeInfo({ ...exchangeInfo, exchangeRate: '1' });
            setConvertedAmount((+exchangeInfo.exchangeRate) * 1)
        }
        else {
            props.onGetExchangeRate(userToken, exchangeInfo.from, exchangeInfo.amount, exchangeInfo.to).then(res => {
                if (res.data && res.data.status === '200') {
                    if (res.data.result) {

                        console.log('---UserTypeClient------exchangeCurrencies----------------------');
                        console.log(res);
                        console.log(props.showUserInfo);
                        setExchangeInfo({ ...exchangeInfo, exchangeRate: res.data.result.currencyExchangePerUnit });
                        // setConvertedAmount(res.data.result.exchangeCost);
                        setConvertedAmount((+res.data.result.currencyExchangePerUnit) * (+exchangeInfo.amount))
                    }
                }
            });
        }
    }
    const exchangeCurrencies = () => {
        props.onExchangeCurrencies(userToken, exchangeInfo.from, exchangeInfo.amount, exchangeInfo.to).then(res => {
            if (res.data && res.data.status === '200') {
                if (res.data.result) {

                    console.log('---UserTypeClient------exchangeCurrencies----------------------')

                    console.log(res);
                    console.log(props.showUserInfo);
                    setShowExchangeModal(false);
                }
                else setMessage(res.data.Message);
            }
        }
        );
    }

    const aprovePaymentTransfer = () => {
        //  if (pendingPayment.id === null) return;

        //  props.onApprovePaymentTransfer(pendingPayment.id).then(res => {
        //      if (res.status === '200') {
        //          setBalance(res.data.result[0].Balance);

        //          setOpenDialog(false); props.onClientTList(props.userId).then(res => {
        //              if (res.status === '501') { setTransList([]); }
        //              if (res.status === '200') { setTransList([...res.data.result]); setStopChecking(false); }
        //          });
        //      };
        //      /*   console.log('props.onApprovePaymentTransfer' + pendingPayment.id + '=>' + JSON.stringify(res)); */
        //  });
    }
    const mesageModalClosed = () => {
        setOpenDialog(false); setPendingPayment(null); setStopChecking(true);
        setTimeout(() => { setStopChecking(false) }, 5000);
    };
    let showTansaction = <div style={{ zIndex: '200', justifyContent: 'center', alignItems: 'center', marginTop: '25px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', }}>
            <label style={{ fontSize: '1.0rem', color: color.alcanceOrange, }}>{'SOLICITUD DE TRANSACCIÓN '}</label>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>


            <p style={{ color: pendingPayment && !isNaN(+pendingPayment.amount) && (+pendingPayment.amount) > 0 ? 'blue' : color.black }} >
                {'$ '}
                <b style={{ color: pendingPayment && !isNaN(pendingPayment.amount) && (+pendingPayment.amount) > 0 ? 'green' : 'red' }}>
                    {(pendingPayment && pendingPayment.amount * 41624.00) || 0}
                </b>{'  Bolívares'}</p>
            {/*     <p style={{ color: pendingPayment && !isNaN(+pendingPayment.amount) && (+pendingPayment.amount) > 0 ? 'blue' : 'orange' }} >
                <b style={{ color: pendingPayment && !isNaN(pendingPayment.amount) && (+pendingPayment.amount) > 0 ? 'green' : 'red' }} >
                    {(pendingPayment && !isNaN(+pendingPayment.amount)) ? pendingPayment.amount : 0}
                </b> $ USD</p> */}


            <p style={{ color: color.alcanceOrange }}>{' Comercio ID:'}<b style={{ color: color.black }} > {pendingPayment && pendingPayment.id !== null ? pendingPayment.id : '---'}
            </b>
            </p>



            {/*    <Spinner /> */}
        </div>


        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ marginTop: '12px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'inline-block', fontFamily: 'AvenirBlack', height: '30%', marginRight: '10px' }}
            >
                <FlashingButton
                    clicked={(e) => aprovePaymentTransfer(true)}
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
                    clicked={(e) => mesageModalClosed()}
                    label={'RECHAZAR'}
                    style={{
                        color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '2px', minHeight: '20px', fontWeight: 'bold',
                        textAlign: ' center',
                        display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
                    }} textStyle={{ fontSize: '12px' }}
                />
            </div>
        </div>

    </div >;

    let showExchange = <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', }}>
            <label style={{ fontSize: '1.2rem', color: color.alcanceOrange, marginLeft: '10px' }}>{'CAMBIAR'}</label>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%', textAlign: 'left', marginTop: '20px' }}>
                <Input
                    label={'De moneda:'}
                    labelStyle={{ color: color.black, /* fontStyle: 'italic', */ textAlign: 'left', fontSize: '12px' }}
                    containerStyle={{
                        borderBottom: '2px solid #ccc', outline: 'none',
                        display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'center',
                        width: '100%', paddingTop: '2px', minHeight: '50px', fontSize: '12px', marginRight: '5px', marginLeft: '5px', marginTop: '20px'
                    }}
                    middleContainerStyle={{ border: 'none', outline: 'none' }}
                    inputStyle={{ minHeight: '50px', outline: 'none', fontSize: '14px', border: 0, boxShadow: 'none' }}
                    // leftImage={require("../../assets/images/user.png")}
                    elementType={'select'}
                    elementConfig={{ options: [{ value: 'USD', displayValue: 'USD' }, { value: 'MXN', displayValue: 'MXN' }, { value: 'BS', displayValue: 'BS' }] }}
                    optionStyle={{ outline: 'none', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    value={exchangeInfo.from}
                    // invalid={!emailValid}
                    // shouldValidate={{ required: true, isEmail: true }}
                    // touched={emailTouched}
                    changed={e => { setExchangeInfo({ ...exchangeInfo, from: e.currentTarget.value }); }}
                    onFocus={() => { setMessage(''); }}
                />
                <Input
                    label={'Monto:'}
                    labelStyle={{ color: color.black, /* fontStyle: 'italic', */ textAlign: 'left', fontSize: '12px' }}
                    containerStyle={{
                        borderBottom: '2px solid #ccc', marginTop: '20px',
                        display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'center',
                        width: '100%', paddingTop: '2px', minHeight: '50px', fontSize: '12px', marginRight: '5px', marginLeft: '5px',
                    }}
                    middleContainerStyle={{ border: 'none', }}
                    inputStyle={{ minHeight: '50px', border: 'none', fontSize: '14px', outline: 'none' }}
                    // leftImage={require("../../assets/images/user.png")}
                    elementType='input'
                    elementConfig={{ type: 'number', placeholder: 'monto', }}
                    value={exchangeInfo.amount}
                    // invalid={!emailValid}
                    // shouldValidate={{ required: true, isEmail: true }}
                    // touched={emailTouched}
                    changed={(e) => { setExchangeInfo({ ...exchangeInfo, amount: e.currentTarget.value }); }}
                    onFocus={(e) => { setMessage(''); }}
                />
                <Input
                    label={'A moneda:'}
                    labelStyle={{ color: color.black, /* fontStyle: 'italic', */ textAlign: 'left', fontSize: '12px' }}
                    containerStyle={{
                        borderBottom: '2px solid #ccc', outline: 'none',
                        display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'center',
                        width: '100%', paddingTop: '2px', minHeight: '50px', fontSize: '12px', marginRight: '5px', marginLeft: '5px', marginTop: '20px'
                    }}
                    middleContainerStyle={{ border: 'none', outline: 'none' }}
                    inputStyle={{ minHeight: '50px', outline: 'none', fontSize: '14px', border: 0, boxShadow: 'none' }}
                    // leftImage={require("../../assets/images/user.png")}
                    elementType={'select'}
                    elementConfig={{ options: [{ value: 'USD', displayValue: 'USD' }, { value: 'MXN', displayValue: 'MXN' }, { value: 'BS', displayValue: 'BS' }] }}
                    optionStyle={{ outline: 'none', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    value={exchangeInfo.to}
                    // invalid={!emailValid}
                    // shouldValidate={{ required: true, isEmail: true }}
                    // touched={emailTouched}
                    changed={e => { setExchangeInfo({ ...exchangeInfo, to: e.currentTarget.value }); }}
                    onFocus={() => { setMessage(''); }}
                />
                <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch', alignSelf: 'flex-start', marginTop: '20px', width: '100%' }}>
                    <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', marginTop: '5px' }}>
                        <div style={{ display: 'flex', flex: 3, flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', marginTop: '5px', alignSelf: 'flex-start', wordWrap: 'wrap' }}>
                            <label style={{ fontSize: '12px', marginRight: '10px' }}>{'Tasa de cambio: '}</label>
                        </div>
                        <div style={{ display: 'flex', flex: 3, flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', marginTop: '5px', alignSelf: 'flex-end', wordWrap: 'wrap' }}>
                            <label style={{ fontSize: '12px', color: color.black, marginLeft: '10px', }} >{exchangeInfo.exchangeRate}</label>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', marginTop: '5px' }}>
                        <div style={{ display: 'flex', flex: 3, flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', marginTop: '5px', alignSelf: 'flex-start', wordWrap: 'wrap' }}>
                            <label style={{ fontSize: '12px', marginRight: '10px' }}>{'Monto convertido: '}</label>
                        </div>
                        <div style={{ display: 'flex', flex: 3, flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'center', marginTop: '5px', alignSelf: 'flex-end', wordWrap: 'wrap' }}>
                            <label style={{ fontSize: '12px', color: color.alcanceOrange, marginLeft: '10px', marginRight: '10px', maxWidth: '140px' }} > {convertedAmount} {exchangeInfo.to} </label>
                        </div>

                    </div>
                </div>
            </div>

            {message && message.length > 2 && <div style={{ marginTop: '15px', marginBottom: '15px', display: 'flex', flex: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', }}>
                <img src={error} alt="error" style={{ width: '25px', height: '25px', resizeMode: 'contain', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: '0px' }} />
                <label style={{ paddingLeft: '5px', color: color.red, fontSize: '12px' }}>{message}</label>
            </div>
            }
            <div style={{ marginTop: '12px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'inline-block', fontFamily: 'AvenirBlack', height: '30%', marginRight: '10px' }}
            >
                <FlashingButton
                    clicked={(e) => exchangeCurrencies()}
                    label={'CAMBIAR'}
                    style={{
                        color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '2px', minHeight: '20px', fontWeight: 'bold',
                        textAlign: ' center', minWidth: '120px',
                        display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
                    }}
                    textStyle={{ fontSize: '12px' }}
                />
            </div>
        </div >
    </div>;

    const { showUserInfo } = props;


    return (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', paddingLeft: '5%', paddingRight: '5%' }} >
        < div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}>
            <BdModal show={openDialog} modalClosed={() => mesageModalClosed()}
                mobileStyle={{ top: '15%', left: '10%', right: '10%', width: undefined }}
            >
                {showTansaction}
            </BdModal>
        </div>
        <MobileView style={{ width: width, height: height, marginTop: '48px', position: 'relative' }}>
            < div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}>
                <BdModal show={showExchangeModal} modalClosed={() => { setShowExchangeModal(false) }}
                    mobileStyle={{ top: '15%', left: '10%', right: '10%', width: undefined }}
                >
                    {showExchange}
                </BdModal>
            </div>
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
                            flex: '0 0 40%',

                            paddingBottom: '5px',
                            width: '100%',
                            position: 'relative',
                            overflow: 'hidden',
                            marginBottom: '15px',
                        }}>


                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '80px', paddingTop: '30px', paddingBottom: '30px' }}>
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
                                            clicked={(e) => setShowExchangeModal(true)}
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
                                            clicked={(e) => props.history.push('/client_remesa')}
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
                </div >
            </div>
        </MobileView>

        <BrowserView>

            <p>UNDER CONSTRUCTION</p>

        </BrowserView>


    </div>);
}
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

        onGetExchangeRate: (token, fromC, amount, toC) => dispatch(actions.getExchangeRate({ type: a.VEN_GET_EXCHANGE_RATE, data: { in_Token: token, in_FromCurrency: fromC, in_Amount: amount, in_ToCurrency: toC } })),
        onExchangeCurrencies: (token, fromC, amount, toC) => dispatch(actions.exchangeCurrencies({ type: a.VEN_EXCHANGE_CURRENCIES, data: { in_Token: token, in_FromCurrency: fromC, in_Amount: amount, in_ToCurrency: toC } })),

        onSetShowUserInfo: (showUserInfo) => dispatch(actions.setShowUserInfo({ showUserInfo: showUserInfo })),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(UserTypeClient, axios));
