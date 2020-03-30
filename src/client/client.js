import React, { useEffect, useState } from 'react';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import axios from '../axios-orders';
import * as a from '../store/actions/actionTypes';
import * as actions from '../store/actions/index';
import * as _ from 'lodash';
import { updateObject, checkValidity, color } from '../shared/utility';
import FlashingButton from '../components/UI/FlashingButton/FlashingButton';
/* import Spinner from '../components/UI/Spinner/Spinner'; */
import BdModal from '../components/UI/Modal/BdModal';
import classes from './client.css';
import Input from '../components/UI/Input/Input';
import NewLinkCard from '../components/UI/Card/newLinkCard';
import { BrowserView, MobileView, /* isBrowser, isMobile */ } from "react-device-detect";
import error from '../assets/images/error.png'
import useWindowDimensions from '../hooks/useWindowsDimensions';
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
    useEffect(() => { const interval = setInterval(() => { setCheckTime(Date.now()) }, 5000); return () => { clearInterval(interval) } }, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { if ((userType === 'client')) { pendingPayment && setOpenDialog(true); } }, [pendingPayment, userType]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if ((userType === 'client') && (!stopChecking)) {
            props.onGetPendingPayments(props.userToken).then(res => {
                if (res.status === '200') {
                    console.log('--props.onGetPendingPayments---------------');
                    console.log(res);
                    setShowExchangeModal(false);


                    setStopChecking(true);

                    if (res.data.result[0].Code != null || res.data.result[0].Code != undefined)
                        setPendingPayment({
                            storeName: res.data.result[0].StoreName,
                            amount: res.data.result[0].Amount,
                            currency: res.data.result[0].Currency || '',
                            code: res.data.result[0].Code
                        });
                };

            });
        }
    }, [checkTime, stopChecking]);


    useEffect(() => { if (showExchangeModal) updateConversionRate() }, [showExchangeModal]);
    useEffect(() => { updateConversionRate(); }, [exchangeInfo.from, exchangeInfo.to]);
    useEffect(() => {
        const newAmount = ((+exchangeInfo.exchangeRate) * (+exchangeInfo.amount)).toFixed(2);
        setConvertedAmount(new Intl.NumberFormat('en-EN').format(newAmount))
    }, [exchangeInfo.amount]);
    const updateConversionRate = () => {

        if (exchangeInfo.from == exchangeInfo.to) {
            setExchangeInfo({ ...exchangeInfo, exchangeRate: '1' });
            setConvertedAmount((1) * exchangeInfo.amount)
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

    const aprovePaymentTransfer = (code) => {


        if (!code) return;

        props.onApprovePendingPayment(props.userToken, code).then(res => {
            if (res.status === '200') {
                console.log('---props.onApprovePendingPayment(code)-------------------------');
                console.log(code);
                console.log(res);
                setOpenDialog(false); setTimeout(() => { setStopChecking(false) }, 5000);
            };

        });
    }
    const mesageModalClosed = () => {
        setOpenDialog(false); setPendingPayment(null); setStopChecking(true);
        setTimeout(() => { setStopChecking(false) }, 10000);
    };


    let showPendingPayment = <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1, overflow: 'hidden', marginTop: '30px', }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', }}>
            <label style={{ fontSize: '0.9rem', color: color.alcanceOrange, }}>{'SOLICITUD DE TRANSACCIÓN '}</label>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>


            <p style={{ color: pendingPayment && !isNaN(+pendingPayment.amount) && (+pendingPayment.amount) > 0 ? 'blue' : color.black }} >
                {'$ '}
                <b style={{ color: pendingPayment && !isNaN(pendingPayment.amount) && (+pendingPayment.amount) > 0 ? 'green' : 'red' }}>
                    {(pendingPayment && pendingPayment.amount) || 0}
                </b>{' '}{pendingPayment && pendingPayment.currency}</p>
            <p style={{ color: color.alcanceOrange }}>{' Comercio ID:'}<b style={{ color: color.black }} > {pendingPayment && pendingPayment.storeName !== null ? pendingPayment.storeName : '---'}
            </b>
            </p>
            {/*    <Spinner /> */}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ marginTop: '12px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'inline-block', fontFamily: 'AvenirBlack', height: '30%', marginRight: '10px' }}
            >
                <FlashingButton
                    clicked={(e) => pendingPayment && aprovePaymentTransfer(pendingPayment.code)}
                    label={'ACEPTAR'}
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
                    clicked={(e) => mesageModalClosed(e)}
                    label={'RECHAZAR'}
                    style={{
                        color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '2px', minHeight: '20px', fontWeight: 'bold',
                        textAlign: ' center',
                        display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
                    }} textStyle={{ fontSize: '12px' }}
                />
            </div>
        </div>

    </div>;

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
                        <div style={{ display: 'flex', flex: 3, flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'center', marginTop: '5px', alignSelf: 'flex-end', wordWrap: 'wrap' }}>
                            <label style={{ fontSize: '12px', color: color.black, marginLeft: '10px', marginRight: '10px', }} >{exchangeInfo.exchangeRate}</label>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', marginTop: '5px' }}>
                        <div style={{ display: 'flex', flex: 3, flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', marginTop: '5px', alignSelf: 'flex-start', wordWrap: 'nowrap', whiteSpace: 'nowrap' }}>
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
    return (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', paddingLeft: '5%', paddingRight: '5%', marginTop: '0px', paddingTop: '28px' }} >
        <MobileView style={{ width: width, height: height, marginTop: '48px', position: 'relative' }}>
            {showExchangeModal && < div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}>
                <BdModal id='showExchange' show={showExchangeModal} modalClosed={() => { setShowExchangeModal(false) }}
                    mobileStyle={{ top: '15%', left: '10%', right: '10%', width: undefined }}
                >
                    {showExchange}
                </BdModal>
            </div>} 

            < div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}>
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
                        position: 'absolute', top: '0px', bottom: '0px', left: '5px', right: '5px',

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
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '0px', paddingTop: '10px', paddingBottom: '10px', minWidth: '80%' }}>
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
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '12px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
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


        onGetPendingPayments: (token) => dispatch(actions.getPendingPayments({ type: a.VEN_GET_PENDING_PAYMENTS, data: { in_Token: token, } })),
        onApprovePendingPayment: (token, code) => dispatch(actions.approvePendingPayment({ type: a.VEN_APROVE_PAYMENT, data: { in_Token: token, in_Code: code } })),

        onGetExchangeRate: (token, fromC, amount, toC) => dispatch(actions.getExchangeRate({ type: a.VEN_GET_EXCHANGE_RATE, data: { in_Token: token, in_FromCurrency: fromC, in_Amount: amount, in_ToCurrency: toC } })),
        onExchangeCurrencies: (token, fromC, amount, toC) => dispatch(actions.exchangeCurrencies({ type: a.VEN_EXCHANGE_CURRENCIES, data: { in_Token: token, in_FromCurrency: fromC, in_Amount: amount, in_ToCurrency: toC } })),

        onSetShowUserInfo: (showUserInfo) => dispatch(actions.setShowUserInfo({ showUserInfo: showUserInfo })),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(UserTypeClient, axios));
