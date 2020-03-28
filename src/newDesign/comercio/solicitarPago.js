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
import classes from './comercio.css';
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
import QrReader from 'react-qr-reader';
import useWindowDimensions from '../../hooks/useWindowsDimensions';
const Comercio_Payment = props => {
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



    const [facingMode, setFacingMode] = useState('environment');
    const [readQR, setReadQR] = useState(true);
    const [readedQR, setReadedQR] = useState(null);
    const [qrReaderCamera, setQRReaderCamera] = useState(true);
    const [reqAmount, setReqAmount] = useState('');
    const [paymentInfo, setPaymentInfo] = useState({ currency: 'USD', amount: 1, client: '', });
    const { userType, userId } = props;
    // eslint-disable-next-line react-hooks/exhaustive-deps

    const handleScan = data => {
        if (data) {
            console.log(' handleScan read:');
            console.log(data);

            if (data) { setReadedQR(data); setQRReaderCamera(false); }
        }
        return;
    }
    const handleError = err => { console.log(err) };


    const comercio_requestPayment = () => {
        if (isNaN(+reqAmount) || reqAmount === null) return;
        const client_ID = readedQR;
        props.onRequestPayment(props.userToken, paymentInfo.amount, paymentInfo.currency, paymentInfo.client).then(res => {
            console.log('requestPayment read: ' + reqAmount + '=>' + JSON.stringify(res));
            setReadQR(false); setReqAmount(0); setQRReaderCamera(true);

            if (res) {
                if (res.data && res.data.status == '200') {

                }

            }
        });
    }

    return (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', paddingLeft: '5%', paddingRight: '5%' }} >

        <div className={classes.container} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
            <MobileView style={{ width: '100%', height: '100%', marginTop: '58px', marginBottom: '58px', position: 'relative' }}>
                <div className={classes.container} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch', overflowY: 'scroll' }}>

                    <div style={{ marginBottom: '4px', borderLeft: `5px solid ${color.alcanceOrange}`, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'center', }}>
                        <label style={{ fontSize: '1.4rem', color: color.alcanceOrange, marginLeft: '10px' }}>{'Solicitar pago'}</label>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'left', marginTop: '10px' }}>
                        {readQR ?
                            <div style={{ width: '98%' }}>
                                {qrReaderCamera ?
                                    <div style={{ display: 'flex', padding: '2%', }}>
                                        <QrReader
                                            delay={300}
                                            onError={handleError}
                                            onScan={handleScan}
                                            facingMode={facingMode.toString()}
                                            style={{ width: '100%', height: '100%', backgroundColor: 'yellow' }}
                                        />
                                    </div>
                                    : <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign: 'left', marginTop: '20px', marginBottom: '20px' }}>
                                        <QRCode value={readedQR} style={{ width: '100px', height: '100px' }} />
                                    </div>

                                }
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', textAlign: 'center', width: '100%' }}>
                                    <Input
                                        label={'Monto:'}
                                        labelStyle={{ color: color.alcanceOrange, /* fontStyle: 'italic', */ textAlign: 'left', fontSize: '12px' }}
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
                                        value={paymentInfo.amount}
                                        // invalid={!emailValid}
                                        // shouldValidate={{ required: true, isEmail: true }}
                                        // touched={emailTouched}
                                        changed={(e) => { setPaymentInfo({ ...paymentInfo, amount: e.currentTarget.value }); }}
                                    /*  onFocus={(e) => { setMessage(''); }} */
                                    />
                                    <Input
                                        label={'A moneda:'}
                                        labelStyle={{ color: color.alcanceOrange, /* fontStyle: 'italic', */ textAlign: 'left', fontSize: '12px' }}
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
                                        value={paymentInfo.currency}
                                        // invalid={!emailValid}
                                        // shouldValidate={{ required: true, isEmail: true }}
                                        // touched={emailTouched}
                                        changed={e => { setPaymentInfo({ ...paymentInfo, currency: e.currentTarget.value }); }}
                                    /*  onFocus={() => { setMessage(''); }} */
                                    />
                                    <div style={{ marginTop: '12px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'flex', justifyContent: 'center', fontFamily: 'AvenirBlack', width: '70%', height: '60%' }}                                        >
                                        <FlashingButton
                                            clicked={(e) => { comercio_requestPayment(e) }}
                                            label={'SOLICITAR'}
                                            style={{
                                                color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '2px', minHeight: '40px', fontWeight: 'bold',
                                                textAlign: ' center',
                                                display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
                                            }} />
                                    </div>
                                </div>

                            </div>
                            : <div style={{ width: '98%' }}>

                            </div>
                        }
                    </div>

                </div>
            </MobileView>
            < BrowserView>
                <p>UNDER CONSTRUCTION</p>
            </BrowserView>
        </div >
    </div >);
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


        onRequestPayment: (token, amount, currency, clientCode) => dispatch(actions.requestPayment({ type: a.VEN_REQUEST_PAYMENT, data: { in_Token: token, in_Amount: amount, in_Currency: currency, in_ClientCode: clientCode } })),



    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Comercio_Payment, axios));
